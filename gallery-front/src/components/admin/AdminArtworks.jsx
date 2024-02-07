import axios from "axios";
import React, { useEffect, useState } from "react";
import Artworks from "./artworks/Artworks";
import DeleteArtwork from "./artworks/DeleteArtwork";
import AddArtwork from "./artworks/AddArtwork";
import AddArtworkImage from "./artworks/AddArtworkImage";
import Footer from "../footer/Footer";

const AdminArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleChangedArtworks() {
        fetchArtworks();
    }

    function fetchArtworks() {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "api/artworks",
            headers: {
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
        };

        axios
            .request(config)
            .then((response) => {
                console.log("Got the artworks!");
                setArtworks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchArtworks();
    }, []);

    return (
        <div className="admin-artworks">
            <div className="visit-title-container">
                <h2 className="visit-title">Artworks</h2>
                <p>
                    Here you can work with the artworks in the gallery database.
                </p>
            </div>
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading Artworks...</p>
            ) : (
                <>
                    <Artworks artworks={artworks} />

                    <AddArtwork handleAdd={handleChangedArtworks} />

                    <AddArtworkImage
                        artworks={artworks}
                        handleAdd={handleChangedArtworks}
                    />

                    <DeleteArtwork
                        artworks={artworks}
                        handleDelete={handleChangedArtworks}
                    />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default AdminArtworks;
