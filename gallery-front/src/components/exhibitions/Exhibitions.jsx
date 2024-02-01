import React from "react";
import "./exhibitions.css";
import Exhibition from "../exhibition/Exhibition";
import Footer from "../footer/Footer";
import { useState } from "react";
import Button from "../button/Button";

const Exhibitions = ({ exhibitions }) => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [showAllExhibitions, setShowAllExhibitions] = useState(true);

    function handlePageChanging(page) {
        setCurrentPage(page);
    }
    
    const filteredExhibitions = showAllExhibitions
        ? exhibitions
        : exhibitions.filter((exhibition) => new Date(exhibition.end_date) > new Date());
    
    //racunanje potrebnih indeksa:
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    //trenutno se prikaze samo podskup skupa svih izlozbi
    const currentExhibitions = filteredExhibitions ? filteredExhibitions.slice(startIndex, endIndex) : [];

    //koliko ce ukupno strana da bude:
    //ceil zaokruzuje na sledeci veci ceo broj
    const totalPages = filteredExhibitions ? Math.ceil(filteredExhibitions.length / itemsPerPage) : 0;

    return (
        <div className="exhibitions">
            <div className="exhibitions-title-container">
                <h2 className="exhibitions-title">Exhibitions</h2>
            </div>

            <div className="all-exhibitions-container">
                <Button
                    label={showAllExhibitions ? "Show Current" : "Show All"}
                    onClick={() => setShowAllExhibitions(!showAllExhibitions)}
                />
                {filteredExhibitions.length === 0 ? (
                    <p className="exhibitions-message">
                        {showAllExhibitions
                            ? "We're sorry, there are no exhibitions at our Atelier currently."
                            : "There are no exhibitions at our Atelier."}
                    </p>
                ) : (
                    <>
                        <p className="exhibitions-message">
                            {showAllExhibitions
                                ? "Here are all exhibitions held in our Atelier."
                                : "Here are the current exhibitions held in our Atelier."}
                        </p>
                        {currentExhibitions.map((exhibition) => (
                            <Exhibition
                                key={exhibition.id}
                                id={exhibition.id}
                                title={exhibition.name}
                                startDate={exhibition.start_date}
                                endDate={exhibition.end_date}
                            />
                        ))}
                    </>
                )}
            </div>

            <div className="pagination-buttons">
                <Button
                    label="PREVIOUS"
                    onClick={() => handlePageChanging(currentPage - 1)}
                    disabled={
                        currentPage === 1 || filteredExhibitions.length === 0
                    }
                />
                {currentPage} / {totalPages}
                <Button
                    label="NEXT"
                    onClick={() => handlePageChanging(currentPage + 1)}
                    disabled={
                        currentPage === totalPages ||
                        filteredExhibitions.length === 0
                    }
                />
            </div>

            <Footer />
        </div>
    );
};

export default Exhibitions;
