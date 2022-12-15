import React, {useRef, useState} from "react";
import YouTube from "react-youtube";
import urls from "../../utils/urls";
import movieTrailer from "movie-trailer";
import {playerOptions, useFetchList, useTransitionControl, useTransitionControlImage} from "../../utils/hooks";
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
    animation-direction  :  alternate-reverse;
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
    margin-left: 10px;
`
const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const StyledImage = styled.img`
    object-fit: contain;
    max-height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '150px')};
    transition : transform 2s;
    // &:hover{
    //   transform:  ${({isLargeRow}) => (isLargeRow ? 'scale(1.1)' : 'scale(1.1)')}; 
    // }
`
const VideoContainer = styled.div`
    margin-top:  ${({isLargeRow}) => (isLargeRow ? '-5.5rem' : '-7.5rem')}; 
    z-index:100;
    position:initial;
    top:0;
    overflow: hidden;
    display: ${({isVideoLoading}) => isVideoLoading ? 'none' : 'block'};   
`

const Chevron = styled.div`
    position: absolute;
    z-index:100;
    opacity : 0.4;
    height:${({isLargeRow}) => isLargeRow ? '250px;' : '150px'}; 
    width: 38px;
    margin-top: 60px;
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
    position:relative;
    width: ${({isLargeRow}) => isLargeRow ? '320px' : '300px'};
    height: ${({isLargeRow}) => isLargeRow ? '300px' : '150px'};
    z-index:1000;
    // display: ${({isVideoLoading}) => isVideoLoading ? 'block' : 'none'};  
`


const transitionStyles ={
    entering:{transform: 'scale(1)',transition : 'transform 1s'},
    no_data:{transform: 'scale(1)',transition : 'transform 1s'},
    entered:{transform: 'scale(1.2)',transition : 'transform 4s'},
    exiting:{transform: 'scale(1)',transition : 'transform 60ms'},
    exited:{transform: 'scale(1)',transition : 'transform 60ms'},

}
const defaultStyle ={
    transition : 'transform 1s',
    transform : 'scale(1)',
}
const transitionStylesImages ={
    entering:{transform: 'scale(1.2)',transition : 'transform 1s'},
    no_data:{transform: 'scale(1)',transition : 'transform 1s'},
    entered:{transform: 'scale(1.2)',transition : 'transform 2s'},
    exiting:{transform: 'scale(1)',transition : 'transform 60ms'},
    exited:{transform: 'scale(1)',transition : 'transform 60ms'},
}
const defaultStyleImg ={
    transition : 'transform 1s',
    transform : 'scale(1)',
    width:'100%'
}

function Row({title, url, isLargeRow}) {
    let [state, enter,exit,exited,empty] = useTransitionControl();
    const style = {
        ...defaultStyle,
        ...transitionStyles[state] ?? {},
    };

    const [state2, enter2,exit2,exited2,empty2] = useTransitionControlImage();
    const style2 = {
        ...defaultStyleImg,
        ...transitionStylesImages[state2] ?? {},
    };
    const myRef = useRef(null);
    const [trailerURL, setTrailerURL] = useState("");
    const {isLoading, data, error} = useFetchList(url);
    const [myVideoId, setMyVideoId] = useState(null);
    const [vidError, setVidError] = useState(true);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isVideoShown, setIsVideoShown] = useState(false);
    const [scroll,setScroll]= useState(false);
    const [scrollLeft,setScrollLeft]= useState(false);
    const [mouseLeave,setMouseLeave]=useState(false);
    const type = url.toString().includes('/tv') ? 'tv' : 'movie'
    playerOptions.height = '350';
    playerOptions.playerVars.mute = 1;
    // const movies = data.slice(0,3);
    const movies = data;

    if (error) {
        return <span>Oups something went wrong</span>
    }


    // if((state === 'no_data' || state === 'entered') && mouseLeave){
    //     empty();
    // }

    const ResetStateVideo =  function (e) {
        setMouseLeave(true);
        setTrailerURL("");
        setVidError(false);
        setIsVideoLoading(false);
        setIsVideoShown(false);
        // setMyVideoId(null);
    }


    const HandleVideo = async (movie) => {
        if (!isVideoShown) {
            setMouseLeave(false);
            setTrailerURL("");
            setVidError(false);
            setIsVideoLoading(true);
            setMyVideoId(null);
            console.log('video loading')
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
                    <Chevron  style={{left: '0'}} icon={ChevronLeft} onMouseOver={()=>setScrollLeft(true)} onMouseLeave={()=>setScrollLeft(false)}  isLargeRow={isLargeRow}/>
                    state: {state}
                    <br></br>
                    state2: {state2}
                    <RowPoster id="RowPoster" ref={myRef}  scroll={scroll} scrollL={scrollLeft}>
                        {movies && movies.map((movie, index) => (
                            <Card key={`${movie.id}'---'`} onMouseLeave={(e) => {ResetStateVideo();}} onMouseEnter={() => HandleVideo(movie)}>
                                { (myVideoId === movie.id && vidError === false && !scroll && !scrollLeft)  ?
                                    (
                                        <div style={{
                                                width: isLargeRow ? '320px' : '300px',
                                                height: isLargeRow ? '260px' : '150px',
                                            }}
                                        >
                                            {isVideoLoading  ?
                                            <LoaderContainer  id='test'

                                                isVideoLoading={isVideoLoading}
                                                isLargeRow={isLargeRow}>
                                                <StyledImage
                                                    onMouseEnter={enter2}
                                                    onMouseLeave={exited2}
                                                    style={style2}
                                                             key={movie.id}
                                                             src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                                             alt={movie.name}
                                                             isLargeRow={isLargeRow}
                                                             // style={{width:'100%'}}

                                                />
                                                <LoaderWrapper  data-testid='loader'>
                                                    <Loader id='myloader'
                                                            style={{margin: '-36% 0% 0% 0%', position: 'absolute'}}/>
                                                </LoaderWrapper>
                                            </LoaderContainer>
                                            :''}

                                            <VideoContainer id='test1'
                                                            isLargeRow={isLargeRow}
                                                            isVideoLoading={isVideoLoading}
                                                            onMouseEnter={enter}
                                                            onMouseLeave={exited}
                                                            style={style}
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

                                            </VideoContainer>

                                        </div>

                                    ) :


                                    <Link key={`rows--${index}`} to={`/movieDetails/${movie.id}/${type}`}>
                                        <StyledImage

                                            key={movie.id}
                                            src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                            alt={movie.name}
                                            isLargeRow={isLargeRow}
                                        />
                                    </Link>
                                }

                            </Card>


                        ))}
                    </RowPoster>
                </RowContainer>)
        ))
}

export default Row;
