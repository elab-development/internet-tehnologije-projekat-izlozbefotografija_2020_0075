import "./App.css";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/navbar/NavBar";
import Visit from "./components/visit/Visit";
import Exhibitions from "./components/exhibitions/Exhibitions";
import axios from "axios";

function App() {
    const [token, setToken] = useState();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [exhibitions, setExhibitions] = useState(null);

    useEffect(() => {
        if (exhibitions == null) {
            axios.get("api/exhibitions").then((res) => {
                console.log(res.data.exhibitions);
                setExhibitions(res.data.exhibitions);
            });
        }
    }, []);

    function addToken(auth_token) {
        setToken(auth_token);
    }

    function addUser(user) {
        setLoggedInUser(user);
        console.log(user);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar token={token} />}>
                    <Route
                        path=""
                        element={<Home exhibitions={exhibitions} />}
                    />
                    <Route path="about" element={<About />} />
                    <Route
                        path="login"
                        element={
                            <Login addUser={addUser} addToken={addToken} />
                        }
                    />
                    <Route path="register" element={<Register />} />
                    <Route path="visit" element={<Visit />} />
                    <Route
                        path="exhibitions"
                        element={<Exhibitions exhibitions={exhibitions} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
