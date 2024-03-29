import React, {createContext,  useState} from 'react'

export const MoviesContext = createContext()

export const MoviesProvider = ({ children }) => {
    const [moviesContext, setMoviesContext] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const savedCurrentMovie = localStorage.getItem('currentMovie')
    const [currentMovie, setCurrentMovie] = useState(savedCurrentMovie ? JSON.parse(savedCurrentMovie) : null );
    const [showModal, setShowModal] = useState(false);
    const saveMoviesContext = (newMovies) => {
        setMoviesContext([ ...newMovies ])
    }
    const saveCurrentIndex = (index) => {
        setCurrentIndex(index)
    }
    const saveMovie = (movie) => {
        setCurrentMovie({...movie})
        localStorage.setItem('currentMovie', JSON.stringify({...movie}))
    }
    const setModalVisibility = (value) => {
        setShowModal(value);
    }

    return (
        <MoviesContext.Provider value={{ moviesContext, saveMoviesContext,currentIndex, saveCurrentIndex,currentMovie,saveMovie,showModal, setModalVisibility }}>
            {children}
        </MoviesContext.Provider>
    )
}
