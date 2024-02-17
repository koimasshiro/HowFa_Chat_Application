import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import "../../Pages/AuthPage/AuthPage.css";
import { logIn } from "../../Actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //retrieve loading state from redux store
  const loading = useSelector((state) => state.AuthReducer.loading);

  const dispatch = useDispatch();

  //set state to collect form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function resetForm() {
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            required
          />
          <i className="fas fa-user"></i>
          <label htmlFor="">Email</label>
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
        <div className="forgot-pass">
          <a href="">forgot password?</a>
        </div>
        <button className="btn" type="submit" disabled={loading}>
          Login
        </button>
        <div className="link">
          <p>
            Don't have an account?
            <a className="signup-link" onClick={props.handleSignInClick}>
              {" "}
              sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
