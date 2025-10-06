import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="login-signup">
      <div className={`card-container ${isLogin ? "flipped" : ""}`}>
        <div className="card">
          <div className="card-front">
            <h1>Sign Up</h1>
            <div className="login-signup-fields">
              <div className="input-container">
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">Your name</label>
              </div>

              <div className="input-container">
                <input type="email" id="email" placeholder=" " required />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="input-container">
                <input type="password" id="password" placeholder=" " required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="button-continue">Continue</button>
            <p className="login-signup-login">
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here</span>
            </p>
            <div className="login-signup-agree">
              <input type="checkbox" id="agree" />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
          </div>

          <div className="card-back">
            <h1>Login</h1>
            <div className="login-signup-fields">
              <div className="input-container">
                <input type="email" id="email-login" placeholder=" " required />
                <label htmlFor="email-login">Email Address</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  id="password-login"
                  placeholder=" "
                  required
                />
                <label htmlFor="password-login">Password</label>
              </div>
            </div>
            <button className="button-continue">Login</button>
            <p className="login-signup-login">
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up here</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
