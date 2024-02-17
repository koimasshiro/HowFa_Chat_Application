import React, { useState } from 'react';
import './AuthPage.css';
import Register from '../../Component/Auth/Register';
import Login from '../../Component/Auth/Login';

const AuthPage = () => {
    
    //Swap between login and signup UI design
    const [isSignIn, setIsSignIn] = useState(true);

    const handleSignUpClick = () => {
      setIsSignIn(false);
    };
  
    const handleSignInClick = () => {
      setIsSignIn(true);
    };

  return (
    <div className="authContainer">
      <div
        className={`wrapper ${isSignIn ? "animated-signin" : "animated-signup"
          }`}
      >

        <Register handleSignUpClick={handleSignUpClick}/>
        <Login handleSignInClick={handleSignInClick}/>
      </div>
    </div>

  )
}

export default AuthPage