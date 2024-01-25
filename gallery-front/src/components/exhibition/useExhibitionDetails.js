import axios from "axios";
import { useState, useEffect } from "react";

const localCache = {};

export default function useExhibitionDetails(id) {
    const [exhibitionDetails, setExhibitionDetails] = useState(null);

    useEffect(() => {
        if (!id) {
            setExhibitionDetails(null);
        } else if (localCache[id]) {
            setExhibitionDetails(localCache[id]);
        } else {
            requestExhibitionDetails();
        }

        async function requestExhibitionDetails() {
            setExhibitionDetails(null);

            try {
                const response = await axios.get(`api/exhibitions/${id}`);
                //console.log(response);
                const data = response.data.data;

                setExhibitionDetails({
                    name: data.name,
                    start_date: data.start_date,
                    end_date: data.end_date,
                });

                console.log("inside");
                localCache[id] = {
                    name: data.name,
                    start_date: data.start_date,
                    end_date: data.end_date,
                };
            } catch (error) {
                console.error(
                    "Error while fetching exhibition details.",
                    error
                );
                setExhibitionDetails(null);
            }
        }
    }, [id]);

    return exhibitionDetails;
}
