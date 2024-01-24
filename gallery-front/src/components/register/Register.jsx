import React from "react";
import "../login/login.css";
import "./register.css";
import Button from "../button/Button.jsx";
import Footer from "../footer/Footer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });

    let navigate = useNavigate();

    function handleInput(e) {
        let newUserData = userData;
        newUserData[e.target.name] = e.target.value;
        //console.log(newUserData);
        setUserData(newUserData);
    }

    function handleRegister(e) {
        e.preventDefault();
        axios
            .post("api/register", userData)
            .then((res) => {
                console.log(res.data);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="register App">
            <div className="login-title-container">
                <h2 className="login-title">Register</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleRegister}>
                    <div className="form-field">
                        <label htmlFor="first_name">First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="last_name">Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onInput={handleInput}
                        />
                    </div>
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
                    </div>

                    <Button
                        className="login-button"
                        label="REGISTER"
                        type="submit"
                    />
                </form>

                <Footer />
            </div>
        </div>
    );
};

export default Register;
