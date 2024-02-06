import React, { useState } from "react";
import "../admin.css";
import Button from "../../button/Button";
import axios from "axios";

const AddExibition = ({ handleAdd }) => {
    const [formData, setFormData] = useState({
        name: "",
        start_date: "",
        end_date: "",
    });
    //obrada greske za datum
    const [validationError, setValidationError] = useState(null);
    const [operationStatus, setOperationStatus] = useState(null);

    const handleDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //da li su datumi jedan pre drugog
        if (new Date(formData.start_date) >= new Date(formData.end_date)) {
            setValidationError("Start date must be before end date.");
            return;
        }

        //da li su datumi u buducnosti
        const currentDate = new Date();
        if (
            new Date(formData.start_date) <= currentDate ||
            new Date(formData.end_date) <= currentDate
        ) {
            setValidationError(
                "Both start date and end date must be in the future."
            );
            return;
        }

        setValidationError(null); //ako je ok nema greske

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "api/exhibitions",
            headers: {
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
            data: formData,
        };

        axios
            .request(config)
            .then((response) => {
                console.log("Successfully added exhibition!");
                setFormData({
                    name: "",
                    start_date: "",
                    end_date: "",
                });
                setOperationStatus("Exhibition added successfully!");
                handleAdd();

                //tajmer za poruku o uspesnosti operacije:
                setTimeout(() => {
                    setOperationStatus(null);
                }, 4000);
            })
            .catch((error) => {
                console.log(error);
                setOperationStatus("Failed to add exhibition...");
                setTimeout(() => {
                    setOperationStatus(null);
                }, 4000);
            });
    };

    return (
        <div className="add-exhibition">
            <div className="visit-title-container">
                <h2 className="visit-title">Add New Exhibition</h2>
                <p>Fill in this form with the data about the new exhibition.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleDataChange}
                    required
                />

                <label htmlFor="start_date">Start Date:</label>
                <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleDataChange}
                    required
                />

                <label htmlFor="end_date">End Date:</label>
                <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleDataChange}
                    required
                />

                {validationError && (
                    <div className="validation-error">{validationError}</div>
                )}

                <Button label="SAVE EXHIBITION" type="submit" />
                {operationStatus && <div>{operationStatus}</div>}
            </form>
        </div>
    );
};

export default AddExibition;
