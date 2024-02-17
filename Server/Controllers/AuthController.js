const UserModel = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../Config/token");

//registering a new user
const registerUser = async (req, res) => {
  //encrypting user password

  //make a salt from bcrypt lib with a value of 10
  const salt = await bcrypt.genSalt(10);

  //add salt to password
  const hashPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPass;

  //map data to UserModel
  const newUser = new UserModel(req.body);
  const { email } = req.body;

  try {
    //check if a username is already registered on the same username
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: "username is already registered" });
    }
    const user = await newUser.save();

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      "process.env.JWT_SECRETKEY",
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //find user in database
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("Incorrect credentials");
      } else {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          "process.env.JWT_SECRETKEY",
          { expiresIn: "3h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET all users
/**
 * @description Get All Users
 * @route `/api/user?search=ese`
 * @access Public
 * @type GET
 */
const getAllUsers = async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //query database to search for a user but not the user logged in
  const users = await UserModel.find(keyWord).find({ 
    _id: { $ne: req.user._id },
  });
  res.send(users);
};

module.exports = { registerUser, loginUser, getAllUsers };
