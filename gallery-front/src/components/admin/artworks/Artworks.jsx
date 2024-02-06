import React, { useState } from "react";
import Button from "../../button/Button";
import "../admin.css";

const Artworks = ({ artworks }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageChanging(page) {
        setCurrentPage(page);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentArtworks = artworks
        ? artworks.slice(startIndex, endIndex)
        : [];

    const totalPages = artworks ? Math.ceil(artworks.length / itemsPerPage) : 0;

    return (
        <div className="all-artworks">
            <div className="all-artworks-list">
                {currentArtworks.map((art) => (
                    <div className="one-artwork" key={art.id}>
                        <div>
                            <b>{art.title}</b> by {art.artist}
                        </div>
                        <div>
                            <span>image: </span>
                            {art.artwork_image ? "image set" : "no image"}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination-buttons">
                <Button
                    label="PREVIOUS"
                    onClick={() => handlePageChanging(currentPage - 1)}
                    disabled={currentPage === 1 || artworks.length === 0}
                />
                {currentPage} / {totalPages}
                <Button
                    label="NEXT"
                    onClick={() => handlePageChanging(currentPage + 1)}
                    disabled={
                        currentPage === totalPages || artworks.length === 0
                    }
                />
            </div>
        </div>
    );
};

export default Artworks;
