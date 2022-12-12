import React, {useRef, useState} from "react";
import YouTube from "react-youtube";
import urls from "../../utils/urls";
import movieTrailer from "movie-trailer";
import {playerOptions, useFetchList} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import PlayerMenu from "../PlayerMenu";
import {Link} from "react-router-dom";

import "./style.css";

const RowContainer = styled.div`
    color: white;
    margin-left: 20px;
    overflow-y: hidden;
    overflow-x: hidden;           
`
const RowPoster = styled.div`
    display: flex;
    overflow-y: hidden;
    scroll-behavior:smooth;
    padding: 20px;
    width: fit-content;
    ::-webkit-scrollbar {
        display: none;
        float :right;
    }
    animation: slide 3s linear infinite;  
    animation-iteration-count : infinite;
    animation-direction  :  alternate-reverse;;
    ${({scrollL , scroll}) => (!scrollL && !scroll ? 'animation-play-state :paused ;':'animation-play-state:running;')}     
    @keyframes slide { 
         0% {
        transform: translate3d(-50%, 0, 0);
         }
         100% {
          
          transform: translate3d(0, 0, 0);
             }
     }
`
const Card = styled.div`
    cursor:pointer;
    object-fit: contain;
    max-height: 100px;
    margin-right: 10px;
    transition: transform 3s;
    max-height: 250px;
    // border :solid 1px red;

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
const Test = styled.div`
    object-fit: contain;
    transition: transform 3s;
    // &:hover{
    //   transform:  ${({isLargeRow}) => (isLargeRow ? 'scale(1.15)' : 'scale(1.5)')}; 
    // }

`

const Chevron = styled.div`
    position: absolute;
    z-index:100;
    opacity : 0.4;
    height:${({isLargeRow}) => isLargeRow ? '252px;' : '100px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
    background-color:gray;
     &:hover{
          opacity:.90;
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
    // const [isOpenL, setIsOpenL] = useState(false);
    // const [isOpenR, setIsOpenR] = useState(true);
    const [trailerURL, setTrailerURL] = useState("");
    const {isLoading, data, error} = useFetchList(url);
    const [myVideoId, setMyVideoId] = useState(null);
    const [vidError, setVidError] = useState(true);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isVideoShown, setIsVideoShown] = useState(false);
    const [scroll,setScroll]= useState(false);
    const [scrollL,setScrollL]= useState(false);
    const [vidEffect,setVidEffect]=useState(false);
    const type = url.toString().includes('/tv') ? 'tv' : 'movie'
    playerOptions.height = '390';
    playerOptions.playerVars.mute = 1;
    const movies = data;

    if (error) {
        return <span>Oups something went wrong</span>
    }

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
                    <Chevron  style={{right: '0'}} icon={ChevronRight} onMouseOver={()=>setScroll(true)} onMouseLeave={()=>setScroll(false)} isLargeRow={isLargeRow}/>
                    <Chevron  style={{left: '0'}} icon={ChevronLeft} onMouseOver={()=>setScrollL(true)} onMouseLeave={()=>setScrollL(false)}  isLargeRow={isLargeRow}/>
                    <RowPoster id="RowPoster" ref={myRef}  scroll={scroll} scrollL={scrollL}>
                        {movies && movies.map((movie, index) => (

                            <Card onMouseLeave={() => resetStateVideo()} onMouseEnter={() => HandleVideo(movie)} key={`${movie.id}'---'`}>
                                {myVideoId === movie.id && vidError === false && !scroll && !scrollL && !vidEffect  ?
                                    (
                                        <div
                                            style={{
                                            width: isLargeRow ? '400px' : '300px',
                                            height: isLargeRow ? '300px' : '100px',
                                            marginTop: isLargeRow ? '-7.5rem' : '-9rem',
                                        }}
                                        >
                                            {isVideoLoading  ?
                                                <LoaderContainer isLargeRow={isLargeRow}>
                                                    <StyledImage
                                                        key={movie.id}
                                                        src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                                        alt={movie.name}
                                                        isLargeRow={isLargeRow}
                                                        style={{width:'100%'}}
                                                    />
                                                    <LoaderWrapper data-testid='loader'>
                                                        <Loader id='myloader'
                                                                style={{margin: '-36% 0% 0% 0%', position: 'absolute'}}/>
                                                    </LoaderWrapper>
                                                </LoaderContainer>
                                                 : ''}
                                                <Test
                                                    // onAnimationEnd={()=>{console.log('animation end');setVidEffect(true)}} onAnimationStart={()=>{console.log('animation start');setVidEffect(false)}}
                                                      // onMouseOver={()=>setVidEffect(true)} onMouseLeave={()=>setVidEffect(false)}
                                                >
                                                    <YouTube
                                                        onPlay={e => {setIsVideoLoading(false);}}
                                                        onError={e => setVidError(true)}
                                                        id="vidContainer"
                                                        videoId={trailerURL}
                                                        opts={playerOptions}/>
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
                                                </Test>
                                        </div>
                                    ) :
                                    (
                                        <Link key={`rows--${index}`} to={`/movieDetails/${movie.id}/${type}`}>
                                            <StyledImage
                                                key={movie.id}
                                                src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                                alt={movie.name}
                                                isLargeRow={isLargeRow}
                                            />
                                        </Link>

                                    )
                                }
                            </Card>

                        ))}
                    </RowPoster>
                </RowContainer>)
        ))
}

export default Row;
