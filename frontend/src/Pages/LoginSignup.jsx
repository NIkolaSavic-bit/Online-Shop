import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(false);

    // Signup state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [registerMessage, setRegisterMessage] = useState("");

    // Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!agree) {
            setRegisterMessage("You must agree to the terms.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5145/api/auth/register", {
                name,
                email,
                password
            }, { withCredentials: true });
            setRegisterMessage(res.data.message);
        } catch (err) {
            setRegisterMessage(err.response?.data?.message || "Registration failed");
        }
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5145/api/auth/login", {
                email: loginEmail,
                password: loginPassword
            }, { withCredentials: true });
            console.log(res.data);
            setLoginMessage(res.data.message);
            if (res.data.message === "Login successful") {
                navigate("/"); // redirect to home page
            }
        } catch (err) {
            setLoginMessage(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-signup">
            <div className={`card-container ${isLogin ? "flipped" : ""}`}>
                <div className="card">
                    {/* Signup Card */}
                    <div className="card-front">
                        <h1>Sign Up</h1>
                        <div className="login-signup-fields">
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name">Your name</label>
                            </div>

                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>

                            <div className="input-container">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        <div className="login-signup-agree">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            <p>By continuing, I agree to the terms of use & privacy policy</p>
                        </div>

                        <button className="button-continue" onClick={handleRegister}>
                            Continue
                        </button>
                        {registerMessage && <p className="login-message">{registerMessage}</p>}

                        <p className="login-signup-login">
                            Already have an account?{" "}
                            <span onClick={() => setIsLogin(true)}>Login here</span>
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="card-back">
                        <h1>Login</h1>
                        <div className="login-signup-fields">
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email-login"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email-login">Email Address</label>
                            </div>

                            <div className="input-container">
                                <input
                                    type="password"
                                    id="password-login"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="password-login">Password</label>
                            </div>
                        </div>

                        <button className="button-continue" onClick={handleLogin}>
                            Login
                        </button>
                        {loginMessage && <p className="login-message">{loginMessage}</p>}

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
