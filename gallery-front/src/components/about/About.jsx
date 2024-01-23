import React from "react";
import "./about.css";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

const About = () => {
    return (
        <div className="about">
            <NavBar />
            <div className="about-title-container">
                <h2 className="about-title">About The Atelier</h2>
            </div>

            <section className="about-general">
                <div className="about-general-left">
                    <p>
                        Welcome to <span>Atelier Artisan</span> , where art
                        becomes an immersive journey, and every creation is a
                        testament to the boundless realms of human imagination.
                        Nestled in Belgrade, our gallery is more than a space
                        for art – it's a sanctuary for creativity, a celebration
                        of craftsmanship, and a bridge between tradition and
                        innovation.
                    </p>
                    <div className="about-icons-container">
                        <div className="icons-left">
                            <div className="about-icon">
                                <img
                                    src="/images/about-art.png"
                                    alt="art icon"
                                />
                                <p>
                                    Curatorial
                                    <br />
                                    Excellence
                                </p>
                            </div>
                            <div className="about-icon">
                                <img
                                    src="/images/about-palette.png"
                                    alt="palette icon"
                                />
                                <p>
                                    Immersive
                                    <br />
                                    Atmosphere
                                </p>
                            </div>
                            <div className="about-icon">
                                <img
                                    src="/images/about-sparkle.png"
                                    alt="sparkle icon"
                                />
                                <p>
                                    Timeless
                                    <br />
                                    Elegance
                                </p>
                            </div>
                        </div>

                        <div className="icons-right">
                            <div className="about-icon">
                                <img
                                    src="/images/about-people.png"
                                    alt="people icon"
                                />
                                <p>
                                    Community
                                    <br />
                                    Involvement
                                </p>
                            </div>
                            <div className="about-icon">
                                <img
                                    src="/images/about-tap.png"
                                    alt="tap     icon"
                                />
                                <p>
                                    Tech-Integrated
                                    <br />
                                    Exhibitions
                                </p>
                            </div>
                            <div className="about-icon">
                                <img
                                    src="/images/about-crown.png"
                                    alt="crown icon"
                                />
                                <p>
                                    Exclusive
                                    <br />
                                    Events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-general-right">
                    <img
                        className="about-general-photo"
                        src="/images/about-image.png"
                        alt="the atelier"
                    />
                </div>
            </section>

            <section className="about-mvs">
                <div className="about-mvs-content">
                    <div className="about-mvs-text">
                        <h2>Mission</h2>
                        <p>
                            At Atelier Artisan, our mission is to provide a
                            platform where artists and artisans converge to
                            create a harmonious symphony of creativity. We aim
                            to foster an appreciation for the marriage of
                            traditional craftsmanship and contemporary artistic
                            vision, bridging the gap between the past and the
                            present.
                        </p>
                    </div>
                    <div className="about-mvs-text">
                        <h2>Vision</h2>
                        <p>
                            Our vision is to be a destination where each visitor
                            embarks on a journey through the realms of
                            imagination, guided by the hands of skilled artisans
                            and the visionaries who shape our ever-evolving art
                            landscape. We aspire to be more than a gallery; we
                            are a community that cherishes the transformative
                            power of art.
                        </p>
                    </div>
                    <div className="about-mvs-text">
                        <h2>Our Space</h2>
                        <p>
                            Located in the heart of Belgrade, our gallery space
                            is designed to be both immersive and welcoming.
                            Whether you are a seasoned art enthusiast or a
                            casual visitor, our exhibitions are curated to evoke
                            emotions, spark conversations, and transport you
                            into the world of artistic expression.
                        </p>
                    </div>
                </div>

                <Footer />
            </section>
        </div>
    );
};

export default About;
