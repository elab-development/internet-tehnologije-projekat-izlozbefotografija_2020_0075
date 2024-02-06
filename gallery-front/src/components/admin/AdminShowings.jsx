import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import AddShowings from "./showings/AddShowings";

const AdminShowings = ({ exhibitions }) => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allExhistingArtworks, setAllExhistingArtworks] = useState([]);

    const handleExhibitionChange = (event) => {
        console.log(event.target.value);
        const selectedId = event.target.value;
        setSelectedExhibition(selectedId);
        setSelectedArtwork(null);
    };

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "api/artworks",
        };

        axios
            .request(config)
            .then((response) => {
                console.log("Got the artworks!");
                setAllExhistingArtworks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchArtworks();
    }, [selectedExhibition]);

    function fetchArtworks() {
        if (selectedExhibition) {
            setLoading(true);
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `api/exhibitions/${selectedExhibition}/artworks`,
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    console.log("Got the artworks!");
                    setArtworks(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setArtworks([]);
                    setLoading(false);
                });
        }
    }

    const handleArtworkSelect = (artworkId) => {
        setSelectedArtwork(artworkId);
    };

    const handleDeleteShowing = () => {
        if (selectedArtwork && selectedExhibition) {
            console.log("delete showing");
            let config = {
                method: "delete",
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
                    fetchArtworks();
                    setSelectedArtwork(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <div className="visit-title-container">
                <h2 className="visit-title">Artworks in Exhibition</h2>
                <p>
                    Select an exhibition and see what artworks are available to
                    see there.
                </p>
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
            </div>

            {selectedExhibition && (
                <>
                    <div>
                        {loading ? (
                            <p style={{ textAlign: "center" }}>
                                Loading artworks...
                            </p>
                        ) : artworks && artworks.length !== 0 ? (
                            <>
                                <table className="artwork-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Artist</th>
                                            <th>Select</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {artworks.map((artwork) => (
                                            <tr key={artwork.id}>
                                                <td>{artwork.title}</td>
                                                <td>{artwork.artist}</td>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        id={artwork.id}
                                                        name="selectedArtwork"
                                                        checked={
                                                            selectedArtwork ===
                                                            artwork.id
                                                        }
                                                        onChange={() =>
                                                            handleArtworkSelect(
                                                                artwork.id
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Button
                                    className="delete-showing-button"
                                    label="DELETE SHOWING"
                                    onClick={handleDeleteShowing}
                                />
                            </>
                        ) : (
                            <p style={{ textAlign: "center" }}>
                                No artworks available for this exhibition.
                            </p>
                        )}
                    </div>
                    <AddShowings
                        artworks={allExhistingArtworks}
                        selectedExhibition={selectedExhibition}
                        fetchArtworks={fetchArtworks}
                    />
                </>
            )}
        </div>
    );
};

export default AdminShowings;
