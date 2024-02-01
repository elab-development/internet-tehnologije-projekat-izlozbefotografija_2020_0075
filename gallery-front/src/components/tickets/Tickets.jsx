import React, { useState, useEffect } from "react";
import "./tickets.css";
import axios from "axios";
import Ticket from "../ticket/Ticket";
import Button from "../button/Button";
import Footer from "../footer/Footer";
import TicketReservation from "./TicketReservation";

const Tickets = ({ user, exhibitions }) => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [tickets, setTickets] = useState(null);

    function handlePageChanging(page) {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTickets = tickets ? tickets.slice(startIndex, endIndex) : [];

    const totalPages = Math.ceil((tickets ? tickets.length : 0) / itemsPerPage);

    const handleReservationSuccess = () => {
        if (user) {
            axios.get(`api/tickets?user_id=${user.id}`).then((res) => {
                setTickets(res.data.tickets);
            });
        }
    };

    useEffect(() => {
        handleReservationSuccess();
    }, [user]);
    
    return (
        <div className="tickets">
            <div className="ticket-reservation-container">
                <TicketReservation
                    user={user}
                    exhibitions={exhibitions}
                    reservationSuccess={handleReservationSuccess}
                />
            </div>

            <div className="tickets-title-container">
                <h2 className="tickets-title">Tickets</h2>
            </div>

            <div className="all-tickets-container">
                {tickets === null ? (
                    <p className="tickets-message">Loading tickets...</p>
                ) : tickets.length === 0 ? (
                    <p className="tickets-message">
                        You don't have any tickets.
                    </p>
                ) : (
                    <>
                        <p className="tickets-message">
                            Here are all your tickets for the exhibitions.
                        </p>
                        {currentTickets.map((ticket, index) => (
                            <Ticket
                                key={ticket.id}
                                number={startIndex + index + 1}
                                exhibitionTitle={ticket.exhibition.name}
                                date={ticket.date}
                                personCount={ticket.person_count}
                            />
                        ))}
                    </>
                )}
            </div>

            <div className="pagination-buttons">
                <Button
                    label="PREVIOUS"
                    onClick={() => handlePageChanging(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {currentPage} / {totalPages}
                <Button
                    label="NEXT"
                    onClick={() => handlePageChanging(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Tickets;
