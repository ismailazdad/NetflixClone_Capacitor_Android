import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MoviesBanner from "./pages/MoviesBanner";
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import {MoviesProvider} from "./utils/context"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import TvsBanner from "./pages/TvsBanner";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <MoviesProvider>
            <Header/>
            <Routes>
                <Route exact path="/" element={<MoviesBanner/>}>
                </Route>
                <Route exact path="/tv" element={<TvsBanner/>}>
                </Route>
                <Route exact path="/actor/:id/:language/:showType" element={<Actor/>}>
                </Route>
                <Route exact path="/movieDetails/:videoId/:sound/:imdbId/:language/:showType" element={<Movie/>}>
                </Route>
            </Routes>
            <Footer/>
        </MoviesProvider>
    </Router>
);

serviceWorkerRegistration.register();