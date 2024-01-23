import React from "react";
import "./home.css";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import NavBar from "../navbar/NavBar.jsx";
import Footer from "../footer/Footer.jsx";
import Button from "../button/Button.jsx";
import Exhibition from "../exhibition/Exhibition.jsx";

const Home = () => {
    const exhibitions = [
        {
            id: 1,
            title: "Vivid Visions: A Contemporary Art Showcase",
            startDate: "Jan 3, 2023",
            endDate: "Aug 1, 2024",
        },
        {
            id: 2,
            title: "Ethereal Explorations: A Mixed Media Exhibition",
            startDate: "Feb 15, 2024",
            endDate: "Oct 11, 2024",
        },
        {
            id: 3,
            title: "Gallery in Bloom: Springtime Art Showcase",
            startDate: "May 30, 2024",
            endDate: "Aug 14, 2024",
        },
    ];

    return (
        <div className="home">
            <section className="first-section">
                <NavBar />
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
                        <a href="">Find out more</a>
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
                    <Button label="EXPLORE ALL EXHIBITIONS" />
                </div>
                <div className="exhibitions-container">
                    {exhibitions.map((exhibition) => (
                        <Exhibition
                            key={exhibition.id}
                            id={exhibition.id}
                            title={exhibition.title}
                            startDate={exhibition.startDate}
                            endDate={exhibition.endDate}
                        />
                    ))}
                </div>
            </section>

            <section className="fifth-section">
                <div className="newsletter">
                    <h2>Join Us on the Journey</h2>
                    <p>
                        {" "}
                        Atelier Artisan is more than a gallery; it's an ode to
                        the enduring legacy of human creativity and
                        craftsmanship. Come, explore, and be part of the
                        ever-evolving tapestry of art at Atelier Artisan.
                    </p>
                    <input type="text" placeholder="Enter your email here" />
                    <Button label="SUBSCRIBE TO OUR NEWSLETTER" />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
