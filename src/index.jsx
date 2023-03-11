import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviesBanner from "./pages/MoviesBanner";
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router";
import Movie from "./pages/Movie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Router>
        <Header/>
        <Routes>
            {/*<Route exact path="/" element={<Home/>}>*/}
            <Route exact path="/" element={<MoviesBanner/>}>
            </Route>
            {/*<Route exact path="/movies" element={<Movies />}>*/}
            {/*</Route>*/}
            <Route exact path="/movies2" element={<MoviesBanner />}>
            </Route>
            <Route exact path="/movieDetails/:id/:type" element={ <Movie />}>
            </Route>
        </Routes>
        <Footer />
    </Router>
    // </React.StrictMode>
);

