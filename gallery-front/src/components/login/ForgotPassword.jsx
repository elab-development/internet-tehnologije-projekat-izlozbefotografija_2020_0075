import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleInput = (e) => {
        if (e.target.name === "email") setEmail(e.target.value);
        if (e.target.name === "newPassword") setNewPassword(e.target.value);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email || !newPassword) {
            setError("Please fill in all fields.");
            return;
        }

        axios
            .post("api/forgot-password", { email, new_password: newPassword })
            .then((res) => {
                setMessage(res.data.message);
                setError(null);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((err) => {
                setError(
                    "It seems like your credentials are incorrect. Please try again."
                );
            });
    };

    return (
        <div>
            <div className="reset-title-container">
                <h2 className="reset-title">Password Reset</h2>
            </div>

            <div className="form-container">
                <form
                    onSubmit={(e) => {
                        handleForgotPassword(e);
                    }}
                >
                    {message && <p className="message-reset">{message}</p>}
                    {error && <p className="error-reset">{error}</p>}
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleInput}
                        />
                    </div>
                    <Button
                        className="reset-button"
                        label="RESET PASSWORD"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
