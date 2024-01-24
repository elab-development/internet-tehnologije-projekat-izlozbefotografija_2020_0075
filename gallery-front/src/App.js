import "./App.css";
import About from "./components/about/About";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/navbar/NavBar";

function App() {
    const [token, setToken] = useState();

    function addToken(auth_token) {
        setToken(auth_token);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar token={token} />}>
                    <Route path="" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route
                        path="login"
                        element={<Login addToken={addToken} />}
                    />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
