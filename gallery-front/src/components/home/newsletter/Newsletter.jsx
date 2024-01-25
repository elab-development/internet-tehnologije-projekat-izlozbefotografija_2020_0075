import React, { useState } from "react";
import "./newsletter.css";
import Button from "../../button/Button";
import axios from "axios";

const Newsletter = () => {
    const [newsletterEmail, setNewsletterEmail] = useState({
        email: "",
    });

    const [error, setError] = useState(null);

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
                setError(null);
            })
            .catch((err) => {
                console.log(err);
                setError(
                    "It seems like your email is not correct. Please try again."
                );
            });
    }

    return (
        <form className="newsletter" onSubmit={handleNewsletter}>
            <h2>Join Us on the Journey</h2>
            <p>
                {" "}
                Atelier Artisan is more than a gallery; it's an ode to the
                enduring legacy of human creativity and craftsmanship. Come,
                explore, and be part of the ever-evolving tapestry of art at
                Atelier Artisan.
            </p>
            <input
                type="text"
                name="email"
                onInput={handleInput}
                placeholder="Enter your email here"
            />
            {error == null ? (
                <p className="newsletter-error"></p>
            ) : (
                <p className="newsletter-error">{error}</p>
            )}
            <Button type="submit" label="SUBSCRIBE TO OUR NEWSLETTER" />
        </form>
    );
};

export default Newsletter;
