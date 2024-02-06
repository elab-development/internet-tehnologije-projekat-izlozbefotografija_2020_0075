import axios from "axios";
import AddExibition from "./exhibitions/AddExibition";
import DeleteExhibition from "./exhibitions/DeleteExhibition";
import { useEffect, useState } from "react";

const AdminExhibitions = ({ setExhibitionsHome }) => {
    const [exhibitions, setExhibitions] = useState();
    const [loading, setLoading] = useState(true);

    function fetchExhibitions() {
        axios.get("api/exhibitions").then((res) => {
            console.log(res.data.exhibitions);
            setLoading(false);
            setExhibitions(res.data.exhibitions);
            setExhibitionsHome(res.data.exhibitions);
        });
    }

    function handleChangedExhibitions() {
        fetchExhibitions();
        //setExhibitionsHome(exhibitions);
    }

    useEffect(() => {
        fetchExhibitions();
    }, []);

    return (
        <div>
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading Exhibitions...</p>
            ) : (
                <>
                    <AddExibition handleAdd={handleChangedExhibitions} />

                    <DeleteExhibition
                        handleDelete={handleChangedExhibitions}
                        exhibitions={exhibitions}
                    />
                </>
            )}
        </div>
    );
};

export default AdminExhibitions;
