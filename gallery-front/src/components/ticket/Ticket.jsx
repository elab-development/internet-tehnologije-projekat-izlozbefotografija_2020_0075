import React from "react";
import "./ticket.css";
import { FaUser } from "react-icons/fa";
import Button from "../button/Button";
import axios from "axios";

const Ticket = ({ number, exhibitionTitle, date, personCount, id }) => {
    function handleDownload() {
        if (id) {
            console.log(id);
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `api/tickets/${id}/pdf`,
                headers: {
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
                responseType: "blob",
            };

            axios
                .request(config)
                .then((response) => {
                    console.log("Successful download!");
                    //da zna da treba da ocekuje pdf
                    const blob = new Blob([response.data], {
                        type: "application/pdf",
                    });
                    //pravi url gde ce pdf da se otvori
                    const url = URL.createObjectURL(blob);
                    //otvara pdf
                    window.open(url);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

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
                <Button label="Download Ticket" onClick={handleDownload} />
            </div>
        </div>
    );
};

export default Ticket;
