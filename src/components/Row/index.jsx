import React, {useContext, useRef, useState} from "react";
import YouTube from "react-youtube";
import urls from "../../utils/urls";
import movieTrailer from "movie-trailer";
import {useFetchList} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import PlayerMenu from "../PlayerMenu";
import {Link} from "react-router-dom";

const RowContainer = styled.div`
    color: white;
    margin-left: 20px;
`
const RowPoster = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-behavior:smooth;
    padding: 20px;
    ::-webkit-scrollbar {
    display: none;
    float :right;
}
`
const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const StyledImage = styled.img`
    object-fit: contain;
    margin-right:  ${({isLargeRow}) => (isLargeRow ? '10px' : '0px')};
    transition: transform 450ms;
    max-height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '100px')};
    &:hover{
      transform:  ${({isLargeRow}) => (isLargeRow ? 'scale(1.15)' : 'scale(1.5)')}; 
    }
`
const Container = styled.div`
    cursor:pointer;
    object-fit: contain;
    max-height: 100px;
    margin-right: 10px;
    transition: transform 450ms;
    max-height: 250px;
    // border :solid 1px red;
`
const Chevron = styled.div`
    position: inherit;
    height:${({isLargeRow}) => isLargeRow ? '250px;' : '100px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
     &:hover{
          opacity:.50;
          -moz-opacity:.50; 
          filter:alpha(opacity=50);         
    }
`
const LoaderContainer = styled.div`
    background-color: #000000;
    // border: 1px solid red;
    position: absolute;
    margin-top:${({isLargeRow}) => isLargeRow ? '100px' : '123px'}; 
    width: ${({isLargeRow}) => isLargeRow ? '400px' : '300px'};
    height: ${({isLargeRow}) => isLargeRow ? '300px' : '150px'};
    z-index:10;
`

function Row({title, url, isLargeRow}) {
    const myRef = useRef(null);
    const [isOpenL, setIsOpenL] = useState(false);
    const [isOpenR, setIsOpenR] = useState(true);
    const [trailerURL, setTrailerURL] = useState("");
    const {isLoading, data, error} = useFetchList(url);
    const [myVideoId, setMyVideoId] = useState(null);
    const [vidError, setVidError] = useState(true);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isVideoShown, setIsVideoShown] = useState(false);
    const type = url.toString().includes('tv') ? 'tv' : 'movie'
    // const movies = data.slice(9, 11);
    const movies = data;

    const scrollLeft = function () {
        const leftsize = isLargeRow ? 1000 : 600;
        const ec = myRef.current.offsetWidth - myRef.current.scrollLeft;
        if (ec <= myRef.current.offsetWidth * 0.15) {
            setIsOpenR(false);
            setIsOpenL(true);
        } else if (ec <= myRef.current.offsetWidth * 0.60) {
            setIsOpenR(true);
            setIsOpenL(true);
        }
        myRef.current.scrollLeft += leftsize;
    };

    const scrollRight = function () {
        const leftsize = isLargeRow ? 1000 : 600;
        const ec = myRef.current.offsetWidth - myRef.current.scrollLeft;
        if (myRef.current.scrollLeft <= leftsize) {
            setIsOpenR(true);
            setIsOpenL(false);
        } else if (ec <= myRef.current.offsetWidth * 0.60) {
            setIsOpenR(true);
            setIsOpenL(true);
        }
        myRef.current.scrollLeft -= leftsize
    };

    if (error) {
        return <span>Oups something went wrong</span>
    }
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
            mute: 1
        },
    };

    const resetStateVideo = async function (e) {
        setTrailerURL("");
        setVidError(false);
        setIsVideoLoading(false);
        setIsVideoShown(false);
        setMyVideoId(null);
    }

    const HandleVideo = async (movie) => {
        if (!isVideoShown) {
            setTrailerURL("");
            setVidError(false);
            setIsVideoLoading(true);
            setMyVideoId(null);
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get("v"));
                    setMyVideoId(movie.id)
                    setVidError(false);
                    setIsVideoShown(true);
                })
                .catch((e) => {
                    setMyVideoId(null);
                    setTrailerURL("");
                    setVidError(true);
                })
        }
    };

    return (
        (isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <RowContainer id="RowContainer">
                    <h2>{title}</h2>
                    {isOpenR ? <Chevron style={{float: 'right'}} icon={ChevronRight} onClick={scrollLeft} isLargeRow={isLargeRow}/> : ''}
                    {isOpenL ? <Chevron style={{float: 'left'}} icon={ChevronLeft} onClick={scrollRight} isLargeRow={isLargeRow}/> : ''}
                    <RowPoster id="RowPoster" ref={myRef}>
                        {movies && movies.map((movie, index) => (
                            <Container onMouseLeave={() => resetStateVideo()} onMouseEnter={() => HandleVideo(movie)} key={`${movie.id}'---'`}>
                                {/*{JSON.stringify(movie)}*/}
                                {myVideoId === movie.id && vidError === false ?
                                    (
                                        <div style={{
                                            width: isLargeRow ? '400px' : '300px',
                                            height: isLargeRow ? '300px' : '100px',
                                            marginTop: isLargeRow ? '-7.5rem' : '-9rem',
                                            position:'revert'
                                        }}
                                        >
                                            {isVideoLoading ?
                                                <LoaderContainer isLargeRow={isLargeRow}>
                                                    <LoaderWrapper data-testid='loader'>
                                                        <Loader id='myloader'
                                                                style={{margin: '30% 0% 0% 0%', position: 'absolute'}}/>
                                                    </LoaderWrapper>
                                                </LoaderContainer>
                                                : ''}
                                            <YouTube
                                                onPlay={e => {
                                                    setIsVideoLoading(false);
                                                }}
                                                onError={e => setVidError(true)}
                                                id="vidContainer"
                                                videoId={trailerURL}
                                                opts={opts}/>
                                            <PlayerMenu
                                                id={movie.id}
                                                name={movie.name}
                                                title={movie.title}
                                                overview={movie.overview}
                                                media_type={movie.media_type}
                                                genre_ids={movie.genre_ids}
                                                popularity={movie.popularity}
                                                vote_average={movie.vote_average}
                                                isLargeRow={isLargeRow}
                                                type={type}
                                            />
                                        </div>
                                    ) :
                                    (
                                            <Link key={`rows--${index}`}
                                                  to={`/movieDetails/${movie.id}/${type}`}>
                                                <StyledImage
                                                    key={movie.id}
                                                    src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                                    alt={movie.name}
                                                    isLargeRow={isLargeRow}
                                                />
                                            </Link>
                                    )
                                }
                            </Container>
                        ))}
                    </RowPoster>
                </RowContainer>)
        ))
}

export default Row;
