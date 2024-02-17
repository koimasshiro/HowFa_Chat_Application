import React, { useState } from "react";
import "../../Pages/AuthPage/AuthPage.css";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { signUp, logIn } from "../../Actions/AuthAction";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //retrieve loading state from redux store
  const loading = useSelector((state) => state.AuthReducer.loading);

  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  //set state to collect form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.password === formData.confirmPass
      ? dispatch(signUp(formData))
      : setConfirmPass(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function resetForm() {
    setConfirmPass(true);
    setFormData({
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPass: "",
    });
  }

  return (
    <>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h2>sign up</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
            <i className="fas fa-user"></i>
            <label htmlFor="">username</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
            <label htmlFor="">email</label>
          </div>
          <div className="form-group">
            <input
              type={show ? "text" : "password"}
              name="password"
              onChange={handleChange}
              required
            />
            <span>
              <button onClick={handleClick}>
                {show ? (
                  <BiHide style={{ fontSize: "20px" }} />
                ) : (
                  <BiShow style={{ fontSize: "20px" }} />
                )}
              </button>
            </span>
            <label htmlFor="">password</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPass"
              onChange={handleChange}
              required
            />
            <i className="fas fa-lock"></i>
            <label htmlFor="">confirm password</label>
          </div>
          <div className="form-group">
            <input type="file" p={1.5} accept="image/*" name="image" onChange={handleChange}/>
            <label htmlFor="">Upload profile picture</label>
          </div>
          <button type="submit" disabled={loading} className="btn">
            Sign Up
          </button>
          <div className="link">
            <p>
              You already have an account?
              <a className="signin-link" onClick={props.handleSignUpClick}>
                {" "}
                sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
