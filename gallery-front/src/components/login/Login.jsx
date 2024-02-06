import React from "react";
import "./login.css";
import Button from "../button/Button.jsx";
import Footer from "../footer/Footer.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ addToken, addUser }) => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    let navigate = useNavigate();

    function handleInput(e) {
        let newUserData = userData;
        newUserData[e.target.name] = e.target.value;
        //console.log(newUserData);
        setUserData(newUserData);
    }

    function handleLogin(e) {
        e.preventDefault();
        axios
            .post("api/login", userData)
            .then((res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    window.sessionStorage.setItem(
                        "auth_token",
                        res.data.access_token
                    );
                    addToken(res.data.access_token);
                    addUser(res.data.user);
                    if (res.data.user.role === "admin") {
                        navigate("/profile");
                    } else {
                        navigate("/");
                    }
                } else {
                    setError(
                        "It seems like your credentials are incorrect. Please try again."
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="login App">
            <div className="login-title-container">
                <h2 className="login-title">Log In</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleLogin}>
                    {error && <p className="error-login">{error}</p>}
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            onInput={handleInput}
                        />
                        <label className="login-question">
                            <Link to="/forgot-password">
                                Forgot your password?
                            </Link>
                        </label>
                    </div>

                    <Button
                        className="login-button"
                        label="LOG IN"
                        type="submit"
                    />
                    <p className="login-question">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </form>

                <Footer />
            </div>
        </div>
    );
};

export default Login;
