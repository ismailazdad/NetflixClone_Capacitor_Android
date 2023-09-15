import React, {useContext, useRef, useState, useEffect} from "react";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import {useFetchList} from "../../utils/hooks";
import urls from "../../utils/urls";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import BackupSmall from "../../assets/backup2.png";
import BackupLarge from "../../assets/backup3.png";
import './style.css'
import {MoviesContext} from "../../utils/context";

export const RowContainer = styled.div`
    color: white;
    margin-left: 20px;
    overflow-y: hidden;
    overflow-x: hidden;   
    user-select: none;
    @media  only screen and (orientation: landscape){
        opacity :0;
    }
`
export const RowPoster = styled.div`
    display: flex;
    overflow-y: hidden;
    scroll-behavior:smooth;
    padding: 20px;
    padding-right:300px;
    ::-webkit-scrollbar {
        display: none;
        float :right;
    }
`
export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    `
export const TrendNumber = styled.h1`
    font-size: 210px;
    height: fit-content;    
    color: black;
    width: fit-content;
    top: 0;
    margin: 0;
    -webkit-text-stroke: 2px white; 
    @media  only screen and (max-width:768px ){     
        font-size: 16vh;
    }    
`
export const Chevron = styled.div`
    position: absolute;
    z-index:100;
    opacity : 0.4;
    height:${({isLargeRow}) => isLargeRow ? '250px;' : '200px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
    background-color: black;
    border: solid 1px white;
    @media  only screen and (max-width:768px ){
        height:${({isLargeRow}) => isLargeRow ? '20vh' : '15vh'}; 
        width: 3vh;
    }  
    &:hover{
        opacity:.90;
        -moz-opacity:.50; 
        filter:alpha(opacity=50);         
    }
`
export const StyledImage = styled.div`
    object-fit: contain;
    max-height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '200px')};     
    height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '200px')};   
    margin-left: ${({useRank}) => useRank ? '-35px' : '10px'};   
    transition: transform 700ms;
      &:hover{      
        transform:  ${({isLargeRow}) => (isLargeRow ? 'scale(1.15)' : 'scale(1.25)')};
    }  
         
    @media  only screen and (max-width:768px ){
        max-height:  ${({isLargeRow}) => (isLargeRow ? '20vh' : '15vh')};     
        height:  ${({isLargeRow}) => (isLargeRow ? '20vh' : '15vh')};    
        width:  ${({isLargeRow}) => (isLargeRow ? '13vh' : '25vh')};    
        max-width: ${({isLargeRow}) => isLargeRow ? '30vh' : '30vh'};  
        &:hover{      
            transform:  scale(1.25);
        } 
    }  
    width:  ${({isLargeRow}) => (isLargeRow ? '18vh' : '25vh')};  
    // max-width: ${({isLargeRow}) => isLargeRow ? '400px' : '400px'};   
    // background-size: contain;
    background-size: cover;    
    background-repeat: no-repeat;
    background-position: center;           
    background-image: ${({imageUrl}) => 'url(' + imageUrl + ')'}, ${({backup}) => 'url(' + backup + ')'};           
    `

const Discover = styled.button`
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    width: 15vh;
    @media  only screen and (max-width:768px ){
        margin-top:1vh;
        margin-left:0.3vh;
        margin-right:1vh;
        height:5vh;        
    }    
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`
function RowBanner({ title, url, isLargeRow, useRank, sort, myList, confirm }) {
    const myRef = useRef(null)
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState([])
    const [scrollRight, setScrollRight] = useState(false)
    const [scrollLeft, setScrollLeft] = useState(false)
    const { moviesContext, saveMoviesContext, currentIndex, saveCurrentIndex, saveMovie } = useContext(MoviesContext)
    const [isLoading, setIsLoading] = useState(true)
    const { data, error } = useFetchList(url, useRank)
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" })

    useEffect(() => {
        setIsLoading(true)

        if (error && myList?.length === 0) {
            setIsLoading(false)
            return
        }

        if (data && data.length > 0) {
            setMovies((prevMovies) => [...prevMovies, ...data])
        }

        setIsLoading(false)
    }, [data, error, myList])

    const scrollToLeft = async function () {
        const container = myRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        let screenWidth = window.innerWidth;
        screenWidth = isMobile ? screenWidth : isLargeRow ? screenWidth / 1.5 : screenWidth / 2;
        container.scrollLeft += screenWidth;

        if (container.scrollLeft >= maxScrollLeft-300) {
            setPage((prevPage) => prevPage + 1);
            const newUrl = url.replace("&page=1", `&page=${page + 1}`);
            try {
                const response = await fetch(newUrl);
                const newData = await response.json();
                setMovies((prevMovies) => [...prevMovies, ...newData.results]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };;

    const scrollToRight = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isMobile ? screenWidth : isLargeRow ? screenWidth / 1.5 : screenWidth / 2;
        myRef.current.scrollLeft -= screenWidth;
    };

    const updateMovies = (movie, currentIndex) => {
        const currentMoviesId = JSON.stringify(movies.map((current) => current?.id));
        const moviesContextIds = JSON.stringify(moviesContext?.map((current) => current?.id));
        if (currentMoviesId !== moviesContextIds) {
            saveMoviesContext(movies);
        }
        saveCurrentIndex(currentIndex);
        saveMovie(movie);
    };

    return (
        isLoading ? (
            <LoaderWrapper data-testid="loader">
                <Loader />
            </LoaderWrapper>
        ) : (
            movies.length > 0 ? (
                <RowContainer id="RowContainer">
                    <h2>{title}</h2>
                    <Chevron
                        className="chevron"
                        style={{ right: "0" }}
                        icon={ChevronRight}
                        onClick={scrollToLeft}
                        onMouseOver={() => setScrollRight(true)}
                        onMouseLeave={() => setScrollRight(false)}
                        isLargeRow={isLargeRow}
                    />
                    <Chevron
                        className="chevron"
                        style={{ left: "0" }}
                        icon={ChevronLeft}
                        onClick={scrollToRight}
                        onMouseOver={() => setScrollLeft(true)}
                        onMouseLeave={() => setScrollLeft(false)}
                        isLargeRow={isLargeRow}
                    />
                    <RowPoster id="RowPoster" ref={myRef} scrollRight={scrollRight} scrollLeft={scrollLeft}>
                        {movies.map((movie, index) => (
                            (!confirm ? (
                                <div key={index + "_container"} style={{ display: "flex", justifyContent: "space-between" }}>
                                    {useRank ? <TrendNumber>{index + 1}</TrendNumber> : ""}
                                    <StyledImage
                                        key={movie.id}
                                        imageUrl={`${isLargeRow ? urls.findImagesUrl.replace("original", "w185") + movie.poster_path : urls.findImagesUrl.replace("original", "w300") + movie.backdrop_path}`}
                                        backup={isLargeRow ? BackupLarge : BackupSmall}
                                        alt={movie.name}
                                        isLargeRow={isLargeRow}
                                        isActive={currentIndex === movie}
                                        onTouchEnd={(e) => {
                                            updateMovies(movie, index);
                                            e.preventDefault();
                                        }}
                                        onClick={() => {
                                            updateMovies(movie, index);
                                        }}
                                        useRank={useRank}
                                        onError={(e) => e.target.parentNode.style.display = "none"}
                                    />
                                </div>
                            ) : (
                                <div key={index + "_containerConf"} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <StyledImage
                                            key={movie.id}
                                            imageUrl={`${isLargeRow ? urls.findImagesUrl.replace("original", "w185") + movie.poster_path : urls.findImagesUrl.replace("original", "w300") + movie.backdrop_path}`}
                                            backup={isLargeRow ? BackupLarge : BackupSmall}
                                            alt={movie.name}
                                            isLargeRow={isLargeRow}
                                            onError={(e) => e.target.parentNode.style.display = "none"}
                                        />
                                        <Discover onClick={e => updateMovies(movie, index)}>discover</Discover>
                                    </div>
                                </div>
                            ))
                        ))}
                    </RowPoster>
                </RowContainer>
            ) : (
                <div>No Results for {title}...</div>
            )
        )
    );
}

export default RowBanner;