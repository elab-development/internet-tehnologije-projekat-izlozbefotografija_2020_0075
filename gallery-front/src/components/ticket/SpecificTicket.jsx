import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ticket.css";
import "../exhibition/exhibitionDetails.css";

const SpecificTicket = () => {
    const { id } = useParams();
    const [ticketDetails, setTicketDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://127.0.0.1:8000/api/tickets/52",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(response.data);
                    setTicketDetails(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    return (
        <div className="qr-details">
            <div className="exhibitions-title-container">
                <h2 className="exhibitions-title">
                    Thank you for your reservation!
                </h2>
                <h3>We hope you enjoy your visit!</h3>
            </div>
            {!loading && (
                <div className="ticket-details-container">
                    <p>
                        <span>Ticket id: </span> {ticketDetails.id}
                    </p>
                    <p>
                        <span>Date: </span> {ticketDetails.date}
                    </p>
                    <p>
                        <span>Number of people: </span>
                        {"   "}
                        {ticketDetails.person_count}
                    </p>
                    <p>
                        <span>Exhibition: </span>
                        {"   "}
                        {ticketDetails.exhibition.name}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SpecificTicket;
