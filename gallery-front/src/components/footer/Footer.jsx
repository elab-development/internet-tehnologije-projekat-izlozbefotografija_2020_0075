import React from "react";
import "./footer.css";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <div className="up">
                <div className="logo-title">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Atelier Artisan</p>
                </div>
                <div className="socials">
                    <a href="https://www.instagram.com/">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="https://www.facebook.com">
                        <FaFacebookF className="icon" />
                    </a>
                    <a href="https://www.youtube.com">
                        <AiOutlineYoutube className="icon" />
                    </a>
                </div>
            </div>

            <div className="down">
                <p>©2023 All Rights Reserved. Projekat za ITEH.</p>
            </div>
        </footer>
    );
};

export default Footer;
