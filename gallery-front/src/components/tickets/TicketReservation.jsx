import React, { useState } from "react";
import "./tickets.css";
import axios from "axios";

const TicketReservation = ({ user, exhibitions }) => {
    const [selectedExhibition, setSelectedExhibition] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [personCount, setPersonCount] = useState(1);
    const [reservationMessage, setReservationMessage] = useState(null);

    const handleExhibitionChange = (event) => {
        setSelectedExhibition(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handlePersonCountChange = (event) => {
        setPersonCount(parseInt(event.target.value, 10));
    };

    const handleReservationSubmit = () => {
        if (!selectedExhibition || !selectedDate || personCount <= 0) {
            setReservationMessage("Please fill in all fields.");
            return;
        }

        axios
            .post("api/tickets", {
                user_id: user.id,
                exhibition_id: selectedExhibition,
                date: selectedDate,
                person_count: personCount,
            })
            .then((res) => {
                setReservationMessage("Reservation successful!");
            })
            .catch((error) => {
                setReservationMessage("Error during reservation!");
            });
    };

    return (
        <div className="ticket-reservation">
            <div className="reservation-title-container">
                <h2 className="tickets-title">Ticket Reservation</h2>
            </div>

            <p className="reservation-message">
                Select an exhibition, choose a date, specify the number of
                persons, and click 'RESERVE TICKET' to secure your spot.
            </p>

            <form>
                <div className="form-field">
                    <label>
                        <span>Exhibition: </span>
                        <select
                            onChange={handleExhibitionChange}
                            value={selectedExhibition}
                        >
                            <option value="" disabled>
                                Select an exhibition
                            </option>
                            {exhibitions &&
                                exhibitions.map((exhibition) => (
                                    <option
                                        key={exhibition.id}
                                        value={exhibition.id}
                                    >
                                        {exhibition.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>

                <div className="form-field">
                    <label>
                        <span>Date: </span>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </label>
                </div>

                <div className="form-field">
                    <label>
                        <span>Number of Persons: </span>
                        <input
                            type="number"
                            value={personCount}
                            onChange={handlePersonCountChange}
                            min="1"
                        />
                    </label>
                </div>

                <div className="form-field">
                    <button type="button" onClick={handleReservationSubmit}>
                        RESERVE TICKET
                    </button>
                </div>
            </form>

            {reservationMessage && (
                <p
                    className={
                        reservationMessage.includes("successful")
                            ? "success-message"
                            : "error-message"
                    }
                >
                    {reservationMessage}
                </p>
            )}
        </div>
    );
};

export default TicketReservation;
