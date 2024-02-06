import React, { useState } from "react";
import Button from "../../button/Button";
import "../admin.css";
import axios from "axios";

const AddArtwork = ({ handleAdd }) => {
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
    });
    const [operationStatus, setOperationStatus] = useState(null);

    function handleDataChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "api/artworks",
            headers: {
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
            data: formData,
        };

        axios
            .request(config)
            .then((response) => {
                console.log("Successfully added artwork!");
                setFormData({
                    title: "",
                    artist: "",
                });
                setOperationStatus("Artwork added successfully!");
                handleAdd();

                //tajmer za poruku o uspesnosti operacije:
                setTimeout(() => {
                    setOperationStatus(null);
                }, 4000);
            })
            .catch((error) => {
                console.log(error);
                setOperationStatus("Failed to add artwork...");
                setTimeout(() => {
                    setOperationStatus(null);
                }, 4000);
            });
    }

    return (
        <div className="add-artwork">
            <div className="visit-title-container">
                <h2 className="visit-title">Add New Artwork</h2>
                <p>Fill in this form with the data about the new artwork.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleDataChange}
                    required
                />

                <label htmlFor="artist">Artist:</label>
                <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleDataChange}
                    required
                />

                <Button label="SAVE ARTWORK" type="submit" />
                {operationStatus && <div>{operationStatus}</div>}
            </form>
        </div>
    );
};

export default AddArtwork;
