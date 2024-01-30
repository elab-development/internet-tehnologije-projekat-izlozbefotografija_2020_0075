import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import {
    BsPerson,
    BsEnvelope,
    BsPersonCheck,
    BsPersonBoundingBox,
    BsPersonCircle,
    BsPersonLinesFill,
} from "react-icons/bs";
import Footer from "../footer/Footer";

const Profile = ({ token }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    }, [token]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-title-container">
                <h2 className="profile-title">Profile</h2>
            </div>

            <div className="all-profile-info-containter">
                <p className="profile-message">Welcome to your profile page!</p>

                <div className="profile-info">
                    <BsPerson className="profile-icon" />
                    <div className="profile-detail">
                        Username: {user.data.username}
                    </div>
                </div>

                <div className="profile-info">
                    <BsEnvelope className="profile-icon" />
                    <div className="profile-detail">
                        Email: {user.data.email}
                    </div>
                </div>

                <div className="profile-info">
                    <BsPersonLinesFill className="profile-icon" />
                    <div className="profile-detail">
                        First Name: {user.data.first_name}
                    </div>
                </div>

                <div className="profile-info">
                    <BsPersonLinesFill className="profile-icon" />
                    <div className="profile-detail">
                        Last Name: {user.data.last_name}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
