import React, { useState } from "react";
import "./tickets.css";
import axios from "axios";

const TicketReservation = ({ user, exhibitions, reservationSuccess }) => {
    const [selectedExhibition, setSelectedExhibition] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [personCount, setPersonCount] = useState(1);
    const [reservationMessage, setReservationMessage] = useState(null);

    const handleExhibitionChange = (event) => {
        setReservationMessage(null);
        setSelectedExhibition(event.target.value);
    };

    const handleDateChange = (event) => {
        setReservationMessage(null);
        setSelectedDate(event.target.value);
    };

    const handlePersonCountChange = (event) => {
        setReservationMessage(null);
        setPersonCount(parseInt(event.target.value, 10));
    };

    const handleReservationSubmit = () => {
        if (!selectedExhibition || !selectedDate || personCount <= 0) {
            setReservationMessage("Please fill in all fields.");
            return;
        }

        if (new Date(selectedDate) < new Date()) {
            setReservationMessage("Selected date must be in the future.");
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
                reservationSuccess();
            })
            .catch((error) => {
                if (error.response.data.message.includes("date")) {
                    setReservationMessage("Selected date is outside the valid range.");
                } else {
                    setReservationMessage("Error during reservation!");
                }
            });
    };

    return (
        <div className="ticket-reservation">
            <div className="tickets-title-container">
                <h2 className="tickets-title">Ticket Reservation</h2>
            </div>

            <form>
                <p className="reservation-message">
                    Select an exhibition, choose a date, specify the number of
                    persons, and click 'RESERVE TICKET' to secure your spot.
                </p>

                <div className="form-field">
                    <label>Exhibition:</label>
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
                </div>

                <div className="form-field">
                    <label>Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                </div>

                <div className="form-field">
                    <label>Number of Persons:</label>
                        <input
                            type="number"
                            value={personCount}
                            onChange={handlePersonCountChange}
                            min="1"
                        />
                </div>

                <div className="form-btn">
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
