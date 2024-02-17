const UserModel = require("../Model/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get a user from database
const getUser = async(req, res)=>{

    //fetch user Id from request
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if(user){
            //remove password from response
            const {password, ...details} = user._doc
            console.log(user._doc)
            res.status(200).json(details)
        }
        else{
            res.status(404).json("User does not exist")
        }
    } 
    catch (error) {
        res.status(500).json(error)
    }
}

//update user
const updateUser = async(req, res)=>{
    const id = req.params.id;

    //fetch data from request body
    const {_id, currentUserAdminStatus, password} = req.body;

    if(id === _id ){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id
                },
                process.env.JWT_SECRETKEY,
                {expiresIn: '1h'}
            )
            
            res.status(200).json({user, token})
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied!!")
    }
}
//Delete user
const deleteUser = async(req, res)=>{
    const id = req.params.id;

    const {currentUserId, currentUserAdminStatus} = req.body;

    if(currentUserId === id || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully")
        } 
        catch (error) {
            res.status(500).json(error) 
        }
    }
    else{
        res.status(403).json("Request Denied!, You can only delete your account")
    }
}


//get all users

const getAllUsers = async(req, res)=>{
    try {
        let users = await UserModel.find();
        users = users.map((user)=>{
            const {password, ...otherDetails} = user._doc
            return otherDetails;
        });
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {getAllUsers, getUser, updateUser, deleteUser}