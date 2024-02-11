import React, { useState } from "react";
import "./tickets.css";
import axios from "axios";
import emailjs from 'emailjs-com';
import QRCode from 'qrcode.react';


const TicketReservation = ({ user, exhibitions, reservationSuccess }) => {
    const [selectedExhibition, setSelectedExhibition] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [personCount, setPersonCount] = useState(1);
    const [reservationMessage, setReservationMessage] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    console.log(exhibitions);

    const handleExhibitionChange = (event) => {
        setQrCodeUrl("");
        setReservationMessage(null);
        setSelectedExhibition(event.target.value);
    };

    const handleDateChange = (event) => {
        setQrCodeUrl("");
        setReservationMessage(null);
        setSelectedDate(event.target.value);
    };

    const handlePersonCountChange = (event) => {
        setQrCodeUrl("");
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
            }, {
                headers: {
                    Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
                }
            })
            .then((res) => {
                setReservationMessage("Reservation successful!");

                const selectedExhibitionObj = exhibitions.find(exhibition => exhibition.id === parseInt(selectedExhibition, 10));
                const exhibitionName = selectedExhibitionObj ? selectedExhibitionObj.name : 'Unknown Exhibition';

                const qrCodeUrl = `http://localhost:3000/tickets/${res.data.ticketId}`;
                setQrCodeUrl(qrCodeUrl);
                console.log(qrCodeUrl);

                const templateParams = {
                    to_email: user.email,
                    username: user.username,
                    exhibition: exhibitionName,
                    date: selectedDate,
                    personCount: personCount,
                };

                emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams, 'PUBLIC_KEY')
                    .then((response) => {
                        console.log('Email sent successfully:', response);
                    })
                    .catch((error) => {
                        console.error('Error sending email:', error);
                    });

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

            {qrCodeUrl && (
                <div className="qr-code-container">
                    <QRCode value={qrCodeUrl} />
                </div>
            )}
        </div>
    );
};

export default TicketReservation;
