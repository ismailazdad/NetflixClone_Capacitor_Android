import React, {useState} from "react";
import urls from "../../utils/urls";
import {Loader} from "../../utils/style/Atoms";
import YouTube from "react-youtube";
import {playerOptions, useFetchList, useTransitionControl} from "../../utils/hooks";
import PlayerMenu from "../PlayerMenu";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Card, LoaderContainer, LoaderWrapper, RowPoster, StyledImage, VideoContainer} from "../Row/style";
import movieTrailer from "movie-trailer";

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


function VidePlayer({isLargeRow,movie,type,scrollLeft,scroll,index,isActive,onShow,onLeave}) {
    let [stateVideo, enterVideo,exitedVideo] = useTransitionControl(500);
    const videoStyle = {
        ...defaultStyle,
        ...transitionStyles[stateVideo] ?? {},
    };
    playerOptions.height = '350';
    playerOptions.playerVars.mute = 1;
    const [trailerURL, setTrailerURL] = useState("");
    const [myVideoId, setMyVideoId] = useState(null);
    const [vidError, setVidError] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const ResetStateVideo =  function (e) {
        setTrailerURL("");
        setVidError(false);
        setIsVideoLoading(false);
        // if(stateVideo ==='entered' || stateVideo ==='entering'){
            exitedVideo();
        // } else{
        //     setMyVideoId(null);
        // }
        setIsVideoPlaying(false);
        // setMyVideoId(null);
        onLeave();
    }

    const HandleVideo =  (movie) => {
        onShow();
        if(!isVideoPlaying){
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
        }
    };

    return (<div>
    {/*        {isActive ? (*/}
    {/*    <p>active</p>*/}
    {/*) : (<p>non active</p>)}*/}
    {/*        stateVideo {stateVideo}*/}
        <Card key={`${movie.id}'---'`} onMouseLeave={(e) => {ResetStateVideo();}} onMouseEnter={() => HandleVideo(movie)}>
            { ((isActive || stateVideo ==='exiting'|| stateVideo ==='exited')  && !scrollLeft && !scroll && !vidError )  ?
                (
                    <div style={{...{position:'inherits',border:'solid 1px transparent',width: isLargeRow ? '320px' : '300px', height: isLargeRow ? '260px' : '150px',},...videoStyle}}>
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
                                onPlay={e => {setIsVideoLoading(false);setIsVideoPlaying(true)}}
                                onError={e => {setVidError(true);setIsVideoPlaying(false)}}
                                onReady={e=>{setIsVideoPlaying(false);setIsVideoLoading(true);}}
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
        </Card></div>
    );
}

export default VidePlayer;