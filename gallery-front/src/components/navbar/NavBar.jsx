import React from "react";
import "./navbar.css";
import Button from "../button/Button";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const NavBar = ({ token }) => {
    function handleLogout() {
        //ovako izgleda heder kada saljemo zahtev za logout
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "api/logout",
            headers: {
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
        };

        //izvrsava se zahtev
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                //kada se izloguje uspesno, obrisace mu se token
                window.sessionStorage.setItem("auth_token", null);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <nav>
                <Link to="/">
                    <img className="logo" src="/images/logo.png" alt="logo" />
                </Link>
                <ul>
                    <li>
                        <Link to="/about">ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/exhibitions">EXHIBITIONS</Link>
                    </li>
                    <li>
                        <Link to="/visit">VISIT</Link>
                    </li>
                    {token == null ? (
                        <li>
                            <Button
                                type="button"
                                label="LOGIN"
                                to="/login"
                                className="nav-button"
                            />
                        </li>
                    ) : (
                        <li>
                            <Button
                                type="button"
                                label="LOGOUT"
                                to="/"
                                className="nav-button"
                                onClick={handleLogout}
                            />
                        </li>
                    )}
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default NavBar;
