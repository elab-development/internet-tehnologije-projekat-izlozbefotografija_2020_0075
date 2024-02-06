import React, { useState } from "react";
import Button from "../../button/Button";
import axios from "axios";

const UpdateExhibition = ({ exhibitions, handleUpdate }) => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        start_date: "",
        end_date: "",
    });
    const [validationError, setValidationError] = useState(null);
    const [operationStatus, setOperationStatus] = useState(null);

    const handleDataChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleExhibitionChange = (event) => {
        console.log(event.target.value);
        const selectedId = event.target.value;
        setSelectedExhibition(selectedId);

        let exh = exhibitions.find((ex) => ex.id == selectedId);
        console.log(exh);
        setFormData({
            name: exh.name,
            start_date: exh.start_date,
            end_date: exh.end_date,
        });
    };

    const handleUpdateClick = (e) => {
        e.preventDefault();

        //da li su datumi jedan pre drugog
        if (new Date(formData.start_date) >= new Date(formData.end_date)) {
            setValidationError("Start date must be before end date.");
            return;
        }

        setValidationError(null); //ako je ok nema greske

        if (selectedExhibition) {
            console.log(selectedExhibition);

            let config = {
                method: "put",
                maxBodyLength: Infinity,
                url: `api/exhibitions/${selectedExhibition}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
                data: formData,
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setOperationStatus("Exhibition updated successfully!");
                    handleUpdate();

                    //tajmer za poruku o uspesnosti operacije:
                    setTimeout(() => {
                        setOperationStatus(null);
                    }, 4000);
                })
                .catch((error) => {
                    console.log(error);
                    setOperationStatus("Failed to update exhibition...");
                    setTimeout(() => {
                        setOperationStatus(null);
                    }, 4000);
                });
        }
    };

    return (
        <div className="update-exhibition">
            <div className="visit-title-container">
                <h2 className="visit-title">Update Exhibition</h2>
                <p>Select an exhibition and then update its details.</p>
            </div>
            <div className="select-exhibition">
                <label htmlFor="exhibitionSelect">Select Exhibition:</label>
                <select
                    id="exhibitionSelect"
                    value={selectedExhibition ? selectedExhibition.id : ""}
                    onChange={handleExhibitionChange}
                >
                    <option value="" disabled>
                        Select an exhibition
                    </option>
                    {exhibitions.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                            {ex.name}
                        </option>
                    ))}
                </select>

                <form onSubmit={handleUpdateClick}>
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
                        <div className="validation-error">
                            {validationError}
                        </div>
                    )}

                    <Button label="UPDATE EXHIBITION" type="submit" />
                    {operationStatus && <div>{operationStatus}</div>}
                </form>
            </div>
        </div>
    );
};

export default UpdateExhibition;
