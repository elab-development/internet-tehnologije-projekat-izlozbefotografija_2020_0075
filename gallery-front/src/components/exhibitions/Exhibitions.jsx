import React from "react";
import "./exhibitions.css";
import Exhibition from "../exhibition/Exhibition";
import Footer from "../footer/Footer";
import { useState } from "react";
import Button from "../button/Button";

const Exhibitions = ({ exhibitions }) => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageChanging(page) {
        setCurrentPage(page);
    }

    //racunanje potrebnih indeksa:
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    //trenutno se prikaze samo podskup skupa svih izlozbi
    const currentExhibitions = exhibitions
        ? exhibitions.slice(startIndex, endIndex)
        : [];

    //koliko ce ukupno strana da bude:
    //ceil zaokruzuje na sledeci veci ceo broj
    const totalPages = Math.ceil(
        (exhibitions ? exhibitions.length : 0) / itemsPerPage
    );

    return (
        <div className="exhibitions">
            <div className="exhibitions-title-container">
                <h2 className="exhibitions-title">Exhibitions</h2>
            </div>

            <div className="all-exhibitions-container">
                {exhibitions == null ? (
                    <p className="exhibitions-message">
                        We're sorry, there are no exhibitions at our Atelier
                        currently.
                    </p>
                ) : (
                    <>
                        <p className="exhibitions-message">
                            Here are all exhibitions held in our Atelier.
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
                    disabled={currentPage === 1}
                />
                {currentPage} / {totalPages}
                <Button
                    label="NEXT"
                    onClick={() => handlePageChanging(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Exhibitions;
