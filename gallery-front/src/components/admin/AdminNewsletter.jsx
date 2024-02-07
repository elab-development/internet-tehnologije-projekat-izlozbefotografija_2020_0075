import axios from "axios";
import React, { useEffect, useState } from "react";
import "./admin.css";
import Button from "../button/Button";
import Footer from "../footer/Footer";

const AdminNewsletter = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    function handleRadioSelect(nl) {
        setSelected(nl);
        console.log(nl.email);
    }

    function handleDelete() {
        if (selected) {
            let config = {
                method: "delete",
                maxBodyLength: Infinity,
                url: `api/newsletters/${selected.id}`,
                headers: {
                    Authorization:
                        "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log("Email deleted!");
                    setNewsletters(
                        newsletters.filter((nl) => nl.email !== selected.email)
                    );
                    setSelected(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function fetchNewsletters() {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "api/newsletters",
            headers: {
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response);
                setNewsletters(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchNewsletters();
    }, []);

    return (
        <div className="newsletters-page">
            <div className="visit-title-container">
                <h2 className="visit-title">Newsletter subscribers</h2>
                <p>
                    Here are all the users who subsribed to the gallery
                    newsletter.
                </p>
            </div>
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading Newsletters...</p>
            ) : (
                <>
                    <div className="all-newsletters">
                        <div className="newsletter-buttons">
                            {newsletters &&
                                newsletters.map((nl) => (
                                    <div key={nl.id} className="one-email">
                                        <input
                                            type="radio"
                                            id={nl.id}
                                            name="email"
                                            value={nl.email}
                                            onChange={() =>
                                                handleRadioSelect(nl)
                                            }
                                        />
                                        <label htmlFor={nl.id}>
                                            {nl.email}
                                        </label>
                                    </div>
                                ))}
                        </div>

                        <Button
                            label="DELETE SELECTED SUBSCRIBER"
                            onClick={handleDelete}
                        />
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default AdminNewsletter;
