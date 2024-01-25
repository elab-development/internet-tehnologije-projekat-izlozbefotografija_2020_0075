import React from "react";
import { useParams } from "react-router-dom";
import useExhibitionDetails from "./useExhibitionDetails.js";

const ExhibitionDetails = () => {
    //id potice iz konteksta koji nam BrowserRouter omogucava da imamo jer je on oko cele aplikacije
    const { id } = useParams();
    const exhibitionDetails = useExhibitionDetails(id);

    return (
        <div>
            <div className="exhibitions-title-container">
                <h2 className="exhibitions-title">
                    {exhibitionDetails ? exhibitionDetails.name : ""}
                </h2>
            </div>
        </div>
    );
};

export default ExhibitionDetails;
