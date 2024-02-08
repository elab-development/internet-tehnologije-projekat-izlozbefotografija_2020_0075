import React, { useEffect, useState } from "react";
import "./visit.css";
import Footer from "../footer/Footer.jsx";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { TiWeatherCloudy } from "react-icons/ti";
import { FaTemperatureHigh } from "react-icons/fa";

const Visit = () => {
    const faqData = [
        {
            question: "How can I purchase tickets to the art gallery?",
            answer: "Tickets can be reserved online through our website or purchased in person at the gallery's ticket counter. Online tickets offer the convenience of skip-the-line entry.",
        },
        {
            question: "Is there a discount for students and seniors?",
            answer: "Yes, we offer discounted admission rates for students and seniors. Please present a valid student ID or proof of age at the ticket counter to avail the discount.",
        },
        {
            question: "Do you offer guided tours of the art exhibitions?",
            answer: "Yes, we provide guided tours of our art exhibitions led by knowledgeable and passionate guides. Guided tours offer in-depth insights into the artworks, artists, and the gallery's history. You inquire at the information desk during your visit.",
        },
    ];

    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState(null);

    //ako je vec rasireno pitanje, skupice ga tako sto stavi null na expandedQuestion, i kada je ono null znaci da ni jedno pitanje nije rasireno
    function handleToggle(index) {
        setExpandedQuestion((prevIndex) =>
            prevIndex === index ? null : index
        );
    }

    let key = "4d83dbe3aa10fd34ec2992cfa845f9a3";

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=44.78&lon=20.44&appid=${key}`
            );
            console.log(response.data);
            setWeather(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error while fetching trivia.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="visit">
            <div className="visit-title-container">
                <h2 className="visit-title">Visit</h2>
            </div>

            <div className="visit-info">
                <div className="visit-info-left">
                    <div className="visit-map">
                        {/* one greske u konzoli se jave zbog ovoga izgleda... */}
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="100%"
                            style={{
                                border: "0",
                                borderRadius: "6.25rem 0rem",
                            }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.1405173420007!2d20.453526399999998!3d44.8187019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654c59e46621%3A0x50ef1b3f2f0ea492!2z0JrRgNCw0ZnQsCDQn9C10YLRgNCwIDExLCDQkdC10L7Qs9GA0LDQtA!5e0!3m2!1ssr!2srs!4v1706105891178!5m2!1ssr!2srs"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="visit-contact">
                        <p>
                            <span>Address:</span> Kralja Petra 111
                        </p>
                        <p>
                            <span>Phone:</span> +381 23456789
                        </p>
                        <p>
                            <span>Email:</span> alelierartisan@art.com
                        </p>
                    </div>
                </div>
                <div className="visit-info-right">
                    <h3>Opening Hours</h3>
                    <div className="visit-hours">
                        <p>Thursday to Friday:</p>
                        <p>10:00 - 19:00</p>
                    </div>
                    <div className="visit-hours">
                        <p>Saturday & Sunday:</p>
                        <p>10:00 - 15:00</p>
                    </div>
                    <div className="visit-hours">
                        <p>Monday:</p>
                        <p>CLOSED</p>
                    </div>
                </div>
            </div>
            <div className="visit-title-container">
                <h2 className="visit-title">
                    PERFECT WEATHER FOR A GALLERY DATE
                </h2>
                <p>
                    It looks like the perfect time to book your ticket for this
                    week.
                </p>
            </div>
            <div className="weather">
                {loading ? (
                    <p>Loading trivia...</p>
                ) : (
                    <div className="weather-container">
                        <h3>
                            <TiWeatherCloudy className="weather-icon" />
                            {weather.weather[0].main} :{" "}
                            <span>{weather.weather[0].description}</span>
                        </h3>
                        <p>
                            <FaTemperatureHigh className="weather-icon" />
                            <span>min:</span>{" "}
                            {(weather.main.temp_min - 273.15).toFixed(2)}
                            °C
                            <span> max:</span>{" "}
                            {(weather.main.temp_max - 273.15).toFixed(2)}
                            °C
                        </p>
                    </div>
                )}
            </div>

            <div className="visit-title-container">
                <h2 className="visit-title">FAQ</h2>
            </div>
            <div className="visit-faq">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="faq-item"
                        onClick={() => handleToggle(index)}
                    >
                        <div className="faq-question">
                            {faq.question}
                            <IoIosArrowDown
                                className={
                                    expandedQuestion === index ? "expanded" : ""
                                }
                            />
                        </div>
                        {expandedQuestion === index && (
                            <div className="faq-answer">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Visit;
