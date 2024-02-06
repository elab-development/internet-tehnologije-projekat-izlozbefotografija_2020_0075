import React, { useState } from "react";
import Button from "../../button/Button";
import "../admin.css";
import axios from "axios";

const DeleteArtwork = ({ artworks, handleDelete }) => {
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [operationStatus, setOperationStatus] = useState(null);

    const handleArtworkChange = (event) => {
        console.log(event.target.value);
        const selectedId = event.target.value;
        setSelectedArtwork(selectedId);
    };

    const handleDeleteClick = () => {
        if (selectedArtwork) {
            console.log("Deleting artwork:", selectedArtwork);
            let config = {
                method: "delete",
                maxBodyLength: Infinity,
                url: `api/artworks/${selectedArtwork}`,
                headers: {
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log("Successfully deleted!");
                    handleDelete(selectedArtwork);
                    setSelectedArtwork(null);
                    setOperationStatus("Artwork deleted successfully!");
                    setTimeout(() => {
                        setOperationStatus(null);
                    }, 4000);
                })
                .catch((error) => {
                    console.log(error);
                    setOperationStatus("Failed to delete artwork...");
                    setTimeout(() => {
                        setOperationStatus(null);
                    }, 4000);
                });
        }
    };

    return (
        <div>
            <div className="visit-title-container">
                <h2 className="visit-title">Delete Artwork</h2>
                <p>Select an artwork that you want to delete.</p>
            </div>

            <div className="select-artwork">
                <label htmlFor="artworkSelect">Select Artwork:</label>
                <select
                    id="artworkSelect"
                    value={selectedArtwork ? selectedArtwork.id : ""}
                    onChange={handleArtworkChange}
                >
                    <option value="" disabled>
                        Select an artwork
                    </option>
                    {artworks.map((artwork) => (
                        <option key={artwork.id} value={artwork.id}>
                            {artwork.title} by {artwork.artist}
                        </option>
                    ))}
                </select>

                <Button
                    label="DELETE ARTWORK"
                    onClick={handleDeleteClick}
                    disabled={!selectedArtwork}
                />
                {operationStatus && <div>{operationStatus}</div>}
            </div>
        </div>
    );
};

export default DeleteArtwork;
