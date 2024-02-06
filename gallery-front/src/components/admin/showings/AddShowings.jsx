import React, { useState } from "react";
import Button from "../../button/Button";
import axios from "axios";

const AddShowings = ({ selectedExhibition, artworks, fetchArtworks }) => {
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    function handleArtworkChange(event) {
        const selectedId = event.target.value;
        setSelectedArtwork(selectedId);
    }

    function handleAddingArtwork() {
        if (selectedArtwork && selectedExhibition) {
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "api/showings",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
                data: {
                    artwork_id: selectedArtwork,
                    exhibition_id: selectedExhibition,
                },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setSelectedArtwork(null);
                    fetchArtworks();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="add-new-showing">
            <div className="visit-title-container">
                <h3>Add Artwork to Exhibition</h3>
                <p>Select an artwork and add it to the selected exhibition.</p>
            </div>
            <div className="select-exhibition">
                <label htmlFor="artworkSelect">Select Artwork:</label>
                <select
                    id="artworkSelect"
                    value={selectedArtwork ? selectedArtwork.id : ""}
                    onChange={handleArtworkChange}
                >
                    <option value="" disabled>
                        Select an artwork
                    </option>
                    {artworks.map((art) => (
                        <option key={art.id} value={art.id}>
                            {art.title} by {art.artist}
                        </option>
                    ))}
                </select>
                <Button label="ADD" onClick={handleAddingArtwork} />
            </div>
        </div>
    );
};

export default AddShowings;
