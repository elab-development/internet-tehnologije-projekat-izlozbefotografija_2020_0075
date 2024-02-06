import React, { useState } from "react";
import Button from "../../button/Button";
import axios from "axios";

const DeleteExhibition = ({ exhibitions, handleDelete }) => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [operationStatus, setOperationStatus] = useState(null);

    const handleExhibitionChange = (event) => {
        console.log(event.target.value);
        const selectedId = event.target.value;
        setSelectedExhibition(selectedId);
    };

    const handleDeleteClick = () => {
        if (selectedExhibition) {
            console.log(selectedExhibition);
        }

        let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `api/exhibitions/${selectedExhibition}`,
            headers: {
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
        };

        axios
            .request(config)
            .then((response) => {
                console.log("Exhibition successfully deleted!");
                handleDelete();
                setSelectedExhibition(null);
                setOperationStatus("Exhibition deleted successfully!");
                setTimeout(() => {
                    setOperationStatus(null);
                }, 4000);
            })
            .catch((error) => {
                console.log(error);
                setOperationStatus("Failed to delete exhibition...");
                setTimeout(() => {
                    setOperationStatus(null);
                }, 4000);
            });
    };

    return (
        <div className="delete-exhibition">
            <div className="visit-title-container">
                <h2 className="visit-title">Delete Exhibition</h2>
                <p>Select an exhibition that you want to delete.</p>
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

                <Button
                    label="DELETE EXHIBITION"
                    onClick={handleDeleteClick}
                    disabled={!selectedExhibition}
                />
                {operationStatus && <div>{operationStatus}</div>}
            </div>
        </div>
    );
};

export default DeleteExhibition;
