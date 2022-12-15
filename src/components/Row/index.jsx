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
    let [stateVideo, enterVideo,exitedVideo] = useTransitionControl(500);
    const style = {
        ...defaultStyle,
        ...transitionStyles[stateVideo] ?? {},
    };
    const [stateImage, enterImage,exitedImage] = useTransitionControl(500);
    const style2 = {
        ...defaultStyleImg,
        ...transitionStylesImages[stateImage] ?? {},
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
    const movies = data;

    if (error) {
        return <span>Oups something went wrong</span>
    }

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
                    <RowPoster id="RowPoster" ref={myRef}  scroll={scroll} scrollL={scrollLeft}>
                        {movies && movies.map((movie, index) => (
                            <Card key={`${movie.id}'---'`} onMouseLeave={(e) => {ResetStateVideo();}} onMouseEnter={() => HandleVideo(movie)}>
                                { (myVideoId === movie.id && vidError === false && !scroll && !scrollLeft) || (myVideoId === movie.id && stateVideo==='exited')  ?
                                    (
                                        <div style={{width: isLargeRow ? '320px' : '300px', height: isLargeRow ? '260px' : '150px',}}>
                                            {isVideoLoading  ?
                                                <LoaderContainer  id='test' isVideoLoading={isVideoLoading} isLargeRow={isLargeRow}>
                                                        <StyledImage
                                                                onMouseEnter={enterImage}
                                                                onMouseLeave={exitedImage}
                                                                style={style2}
                                                                key={movie.id}
                                                                src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                                                alt={movie.name}
                                                                isLargeRow={isLargeRow}
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
                                                            onMouseEnter={enterVideo}
                                                            onMouseLeave={exitedVideo}
                                                            style={style}>
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