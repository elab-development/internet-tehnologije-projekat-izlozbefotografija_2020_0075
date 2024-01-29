import React from "react";
import "./ticket.css";
import { FaUser } from "react-icons/fa";

const Ticket = ({ number, exhibitionTitle, date, personCount }) => {
    return (
        <div className="ticket">
            <div className="ticket-left">
                <h3>{number}</h3>
                <p>{exhibitionTitle}</p>
            </div>
            <div className="ticket-right">
                <p>{date}</p>
                <div className="person-count">
                    <FaUser className="icon" /> {personCount}
                </div>
            </div>
        </div>
    );
};

export default Ticket;
