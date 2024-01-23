import React from "react";
import "./navbar.css";
import Button from "../button/Button";

const NavBar = () => {
    return (
        <nav>
            <a href="/">
                <img className="logo" src="/images/logo.png" alt="logo" />
            </a>
            <ul>
                <li>
                    <a href="">ABOUT</a>
                </li>
                <li>
                    <a href="">EXHIBITIONS</a>
                </li>
                <li>
                    <a href="">VISIT</a>
                </li>
                <li>
                    <Button label="LOGIN" />
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
