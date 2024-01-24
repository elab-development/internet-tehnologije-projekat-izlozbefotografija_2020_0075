import React, { useState } from "react";
import "./home.css";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../footer/Footer.jsx";
import Button from "../button/Button.jsx";
import Exhibition from "../exhibition/Exhibition.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ exhibitions }) => {
    const [newsletterEmail, setNewsletterEmail] = useState({
        email: "",
    });

    let threeExhibitions;

    if (exhibitions == null || exhibitions.length === 0) {
        threeExhibitions = [];
    } else if (exhibitions.length > 3) {
        threeExhibitions = exhibitions.slice(0, 3);
    } else {
        threeExhibitions = exhibitions;
    }

    function handleInput(e) {
        let newEmail = newsletterEmail;
        newsletterEmail[e.target.name] = e.target.value;
        //console.log(newEmail);
        setNewsletterEmail(newEmail);
    }

    function handleNewsletter(e) {
        e.preventDefault();
        axios
            .post("api/newsletters", newsletterEmail)
            .then((res) => {
                console.log(res.data);
                alert("Thank you for subscribing to our newsletter!");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="home">
            <section className="first-section">
                <div className="title">
                    <h1>Atelier Artisan</h1>
                    <h3>
                        Artisanal <span>Elegance</span>, Artistic{" "}
                        <span>Brilliance</span>
                    </h3>
                    <a href="#quote">
                        <div className="arrow-container"></div>
                    </a>
                </div>
            </section>

            <section className="second-section" id="quote">
                <img src="/images/home-quote-large.png" alt="quote" />
            </section>

            <section className="third-section">
                <div className="about-text">
                    <div className="section-title-container">
                        <h2 className="section-title">About The Atelier</h2>
                    </div>

                    <div className="description">
                        Established with a passion for promoting the mastery of
                        artisanal craftsmanship, <span>Atelier Artisan </span>
                        was founded on the belief that every piece of art tells
                        a unique story. Our journey began with a commitment to
                        curate a space that not only showcases the diversity of
                        artistic expression but also pays homage to the
                        meticulous skill and dedication of artisans.
                        <img
                            className="museum-icon"
                            src="/images/museum-icon.png"
                            alt=""
                        />
                    </div>

                    <div className="more">
                        <IoArrowForwardCircleOutline className="more-icon" />
                        <Link to="/about">Find out more</Link>
                    </div>
                </div>
                <div className="about-photo">
                    <img src="/images/about-image.png" alt="the atelier" />
                </div>
            </section>

            <section className="fourth-section">
                <div className="section-title-container">
                    <h2 className="section-title">Exhibitions</h2>
                </div>
                <div className="exhibitions-description">
                    <p>
                        These are just some of the current exhibitions in our
                        gallery.{" "}
                    </p>
                    <Button
                        type="button"
                        to="/exhibitions"
                        label="EXPLORE ALL EXHIBITIONS"
                    />
                </div>
                <div className="exhibitions-container">
                    {threeExhibitions.length === 0 ? (
                        <p>Sorry, there are no current exhibitions...</p>
                    ) : (
                        threeExhibitions.map((exhibit) => {
                            return (
                                <Exhibition
                                    key={exhibit.id}
                                    id={exhibit.id}
                                    title={exhibit.name}
                                    startDate={exhibit.start_date}
                                    endDate={exhibit.end_date}
                                />
                            );
                        })
                    )}
                </div>
            </section>

            <section className="fifth-section">
                <form className="newsletter" onSubmit={handleNewsletter}>
                    <h2>Join Us on the Journey</h2>
                    <p>
                        {" "}
                        Atelier Artisan is more than a gallery; it's an ode to
                        the enduring legacy of human creativity and
                        craftsmanship. Come, explore, and be part of the
                        ever-evolving tapestry of art at Atelier Artisan.
                    </p>
                    <input
                        type="text"
                        name="email"
                        onInput={handleInput}
                        placeholder="Enter your email here"
                    />
                    <Button type="submit" label="SUBSCRIBE TO OUR NEWSLETTER" />
                </form>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
