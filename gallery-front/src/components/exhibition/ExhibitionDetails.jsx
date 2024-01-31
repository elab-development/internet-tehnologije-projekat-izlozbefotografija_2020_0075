import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useExhibitionDetails from "./useExhibitionDetails.js";
import axios from "axios";
import "./exhibitionDetails.css";

const ExhibitionDetails = () => {
    //id potice iz konteksta koji nam BrowserRouter omogucava da imamo jer je on oko cele aplikacije
    const { id } = useParams();
    const exhibitionDetails = useExhibitionDetails(id);
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await axios.get(`api/exhibitions/${id}/artworks`);
                setArtworks(response.data);
            } catch (error) {
                console.error("Error while fetching artworks.", error);
            }
        };

        if (id) {
            fetchArtworks();
        }
    }, [id]);
    
    return (
        <div>
            <div className="exhibitions-title-container">
                <h2 className="exhibitions-title">
                    {exhibitionDetails ? exhibitionDetails.name : ""}
                </h2>
            </div>
    
            <div className="artworks-container">
                {artworks && artworks.length > 0 ? (
                    <>
                        <p className="exhibition-message">
                            Explore diverse artworks from the current exhibition below!
                            Each piece tells a unique story, inviting you to dive into
                            the world of creativity and imagination.
                        </p>
    
                        {artworks.map((artwork) => (
                            <div key={artwork.id} className="artwork-item">
                                {artwork.artwork_image ? (
                                    <img
                                        src={artwork.artwork_image}
                                        alt={artwork.title}
                                        className="artwork-image"
                                    />
                                ) : (
                                    <p className="no-image-message">
                                        No image available for this artwork.
                                    </p>
                                )}
                                <p className="artwork-details">
                                    <span className="artwork-title">
                                        {artwork.title}
                                    </span>{" "}
                                    by {artwork.artist}
                                </p>
                            </div>
                        ))}
                    </>
                ) : (
                    <p className="exhibition-message">
                        No artworks are currently available for this exhibition.
                    </p>
                )}
            </div>
        </div>
    );
    
};

export default ExhibitionDetails;
