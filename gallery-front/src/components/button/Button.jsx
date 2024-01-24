import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

const Button = ({ onClick, label, className, type, to }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    if (to) {
        return (
            <Link to={to}>
                <button onClick={handleClick} className={className} type={type}>
                    {label}
                </button>
            </Link>
        );
    }
    return (
        <button onClick={handleClick} className={className} type={type}>
            {label}
        </button>
    );
};

export default Button;
