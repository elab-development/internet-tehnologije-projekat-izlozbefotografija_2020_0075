import React from "react";
import "./exhibition.css";
import { BsArrowUpRightCircle } from "react-icons/bs";

const Exhibition = ({ id, title, startDate, endDate }) => {
    return (
        <a href="">
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
        </a>
    );
};

export default Exhibition;
