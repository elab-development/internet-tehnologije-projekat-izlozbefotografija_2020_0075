import React from "react";
import "./exhibition.css";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Exhibition = ({ id, title, startDate, endDate }) => {
    return (
        <Link to={`/exhibitions/${id}`}>
            <div className="exhibition">
                <div className="exhibition-left">
                    <h3>{id}</h3>
                    <p>{title}</p>
                </div>
                <div className="exhibition-right">
                    <p>
                        {startDate} to {endDate}
                    </p>
                    <BsArrowUpRightCircle className="icon" />
                </div>
            </div>
        </Link>
    );
};

export default Exhibition;
