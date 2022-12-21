import React, {useRef, useState} from "react";
import YouTube from "react-youtube";
import urls from "../../utils/urls";
import movieTrailer from "movie-trailer";
import {playerOptions, useFetchList, useTransitionControl} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import PlayerMenu from "../PlayerMenu";
import {Link} from "react-router-dom";
import {RowContainer,RowPoster,Card,LoaderWrapper,StyledImage,VideoContainer,Chevron,LoaderContainer} from "./style"

const transitionStyles ={
    no_data:{transform: 'scale(1)',transition : 'transform 1s'},
    entering:{transform: 'scaleX(1.05)',transition : 'transform 500ms'},
    entered:{transform: 'scaleX(1.15) scaleY(1.15)',transition : 'transform 4s'},
    exiting:{transform: 'scale(1.15)',transition : 'transform 1s'},
    exited:{transform: 'scale(1)',transition : 'transform 1s'},
    finish:{transform: 'scale(1)',transition : 'transform 1s'},
}
const defaultStyle ={
    transition : 'transform 1s',
    transform : 'scale(1)',
}

function Row({title, url, isLargeRow}) {
    let [stateVideo, enterVideo,exitedVideo] = useTransitionControl(500);
    const videoStyle = {
        ...defaultStyle,
        ...transitionStyles[stateVideo] ?? {},
    };
    const myRef = useRef(null);
    const [trailerURL, setTrailerURL] = useState("");
    const {isLoading, data, error} = useFetchList(url);
    const [myVideoId, setMyVideoId] = useState(null);
    const [vidError, setVidError] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [scroll,setScroll]= useState(false);
    const [scrollLeft,setScrollLeft]= useState(false);
    const type = url.toString().includes('/tv') ? 'tv' : 'movie'
    playerOptions.height = '350';
    playerOptions.playerVars.mute = 1;
    // const movies = data;
    const movies = data.slice(4,8);

    if (error) {
        return <span>Oups something went wrong</span>
    }

    const ResetStateVideo =  function (e) {
        setTrailerURL("");
        setVidError(false);
        setIsVideoLoading(false);
        if(stateVideo ==='entered' || stateVideo ==='entering'){
            exitedVideo();
        } else{
            setMyVideoId(null);
        }
    }

    const HandleVideo =  (movie) => {
        setMyVideoId(null);
        enterVideo();
        setTrailerURL("");
        setVidError(false);
        setIsVideoLoading(true);
        movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerURL(urlParams.get("v"));
                setMyVideoId(movie.id)
                setVidError(false);
            })
            .catch((e) => {
                setMyVideoId(null);
                setTrailerURL("");
                setVidError(true);
                setMyVideoId(null);
            })
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
                    <RowPoster id="RowPoster" ref={myRef}  scroll={scroll} scrollL={scrollLeft}>
                        state : {stateVideo}
                        {movies && movies.map((movie, index) => (
                            <Card key={`${movie.id}'---'`} onMouseLeave={(e) => {ResetStateVideo();}} onMouseEnter={() => HandleVideo(movie)}>
                                { (myVideoId === movie.id && stateVideo !=='finish'  && !scrollLeft && !scroll && !vidError )  ?
                                    (
                                        <div style={{...{position:'inherits',border:'solid 1px transparent',width: isLargeRow ? '300px' : '300px', height: isLargeRow ? '260px' : '150px',},...videoStyle}}>
                                            <LoaderContainer isVideoLoading={isVideoLoading} isLargeRow={isLargeRow} stateVideo={stateVideo}>
                                                <StyledImage
                                                    key={movie.id}
                                                    src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path  : movie.backdrop_path}`}
                                                    alt={movie.name}
                                                    isLargeRow={isLargeRow}
                                                />
                                                <LoaderWrapper data-testid='loader'>
                                                    <Loader id='myloader'
                                                            style={{
                                                                margin: '-36% 0% 0% 0%',
                                                                position: 'absolute'
                                                            }}/>
                                                </LoaderWrapper>
                                            </LoaderContainer>

                                            <VideoContainer isLargeRow={isLargeRow} isVideoLoading={isVideoLoading} stateVideo={stateVideo}>
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
                                    </Link>}
                            </Card>
                        ))}
                    </RowPoster>
                </RowContainer>)
        ))
}
export default Row;