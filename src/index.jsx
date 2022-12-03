import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Routes,Route} from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Router>
        <Header/>
        <Routes>
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route exact path="/movies" element={<Movies />}>
            </Route>
        </Routes>
        <Footer />
    </Router>
    // </React.StrictMode>
);

