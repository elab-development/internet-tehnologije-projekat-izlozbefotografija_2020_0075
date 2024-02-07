import React, { useEffect, useState } from "react";
import "./trivia.css";
import axios from "axios";
import Button from "../../button/Button";

const Trivia = () => {
    const category = "artliterature";
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const fetchTrivia = async () => {
        try {
            const response = await axios.get(
                `https://api.api-ninjas.com/v1/trivia?category=${category}`,
                {
                    headers: {
                        "X-Api-Key": "n/CxZVW4fT3ES3I7qD0/1Q==BChnJbzwrCpHWzCO",
                    },
                }
            );
            console.log(response.data);
            setQuestion(response.data[0].question);
            setAnswer(response.data[0].answer);
            setLoading(false);
        } catch (error) {
            console.log("Error while fetching trivia.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrivia();
    }, []);

    const nextQuestion = () => {
        setShow(false);
        setQuestion("");
        setAnswer("");
        setLoading(true);
        fetchTrivia();
    };

    const revealAnswer = () => {
        setShow(!show);
    };

    return (
        <div className="trivia-container">
            {loading ? (
                <p>Loading trivia...</p>
            ) : (
                <div className="trivia">
                    <p className="trivia-question">{question}</p>
                    <div className="trivia-answer">
                        <p>{show && answer}</p>
                        <Button
                            label="Reveal Answer"
                            onClick={revealAnswer}
                            disabled={show}
                        />
                    </div>

                    <Button label="NEXT QUESTION" onClick={nextQuestion} />
                </div>
            )}
        </div>
    );
};

export default Trivia;
