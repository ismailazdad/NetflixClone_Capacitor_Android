import React, {createContext, useState} from 'react'

export const MoviesContext = createContext()

export const MoviesProvider = ({ children }) => {
    const [moviesContext, setMoviesContext] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentMovie, setCurrentMovie] = useState(null);
    const saveMoviesContext = (newMovies) => {
        setMoviesContext([ ...newMovies ])
    }
    const saveCurrentIndex = (index) => {
        setCurrentIndex(index)
    }
    const saveMovie = (movie) => {
        setCurrentMovie({...movie})
    }
    return (
        <MoviesContext.Provider value={{ moviesContext, saveMoviesContext,currentIndex, saveCurrentIndex,currentMovie,saveMovie }}>
            {children}
        </MoviesContext.Provider>
    )
}
