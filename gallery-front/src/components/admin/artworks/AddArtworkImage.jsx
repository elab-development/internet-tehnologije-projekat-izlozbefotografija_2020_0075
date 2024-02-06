import React, { useState } from "react";
import "../admin.css";
import axios from "axios";

const AddArtworkImage = ({ artworks, handleAdd }) => {
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [operationStatus, setOperationStatus] = useState(null);

    const handleArtworkChange = (event) => {
        console.log(event.target.value);
        const selectedId = event.target.value;
        setSelectedArtwork(selectedId);
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
        console.log(event.target.files);
    };

    function handleUpload() {
        console.log("upload");
        if (selectedArtwork && imageFile) {
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `api/artworks/${selectedArtwork}/upload-image`,
                headers: {
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                    "Content-Type": "multipart/form-data",
                },
                data: { artwork_image: imageFile },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log("Successful image upload!");
                    setOperationStatus("Image uploaded successfully!");
                    handleAdd();
                    setSelectedArtwork(null);
                    setImageFile(null);

                    //tajmer za poruku o uspesnosti operacije:
                    setTimeout(() => {
                        setOperationStatus(null);
                    }, 4000);
                })
                .catch((error) => {
                    console.log(error);
                    setOperationStatus("Failed to upload image...");
                    setTimeout(() => {
                        setOperationStatus(null);
                    }, 4000);
                });
        }
    }

    return (
        <div className="add-artwork-image">
            <div className="visit-title-container">
                <h2 className="visit-title">Add Artwork Image</h2>
                <p>Choose one of the artworks and upload its image.</p>
            </div>

            <form>
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

                <label htmlFor="imageUpload">Upload Image:</label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button type="button" onClick={handleUpload}>
                    Upload Image
                </button>
                {operationStatus && <div>{operationStatus}</div>}
            </form>
        </div>
    );
};

export default AddArtworkImage;
