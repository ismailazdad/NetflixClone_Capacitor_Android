import React, {useContext, useState} from "react";
import styled from "styled-components";
import {playerOptions} from "../../utils/hooks";
import {useParams} from "react-router";
import MovieDetails from "../../components/MovieDetails";
import YouTube from "react-youtube";
import './style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand, faPlayCircle, faVolumeHigh, faVolumeXmark, faWarning} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import MovieReviews from "../../components/MovieReviews";
import {App} from "@capacitor/app";
import {MoviesContext} from "../../utils/context";
import urls from "../../utils/urls";

const Container = styled.div`
    @media  only screen and (orientation: landscape){
        display : none ;
    }
`
const Expand = styled.div`
    position:absolute;
    right:2vh;
    z-index:1100;
    top: 15vh;
    cursor:pointer;
    @media only screen and (max-width:768px ){
        position: fixed;
        z-index: 2000;
        right: 2vh;
        top: 9vh;
    }
`
const SoundContainer = styled.div`
    position:absolute;
    cursor:pointer;
    right:2vh;
    z-index:1000;
    top:2vh;
    @media only screen and (max-width:768px ){
        position: fixed;
    }
`
const MovieButton = styled.button`
    //position:absolute;
    margin-top: 1vh;
    z-index:1;
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
    @media  only screen and (max-width:768px ){
        margin-left:1vh;
        //width: 15vh;
        height:5vh;        
    }     
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`


function Movie() {
    const { videoId, sound, imdbId,language, showType} = useParams()
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isVideoError, setIisVideoError] = useState(false)
    const [isVideoLoading, setIsVideoLoading] = useState(false)
    const [isEnableSound, setIsEnableSound] = useState(sound === "true")
    const [playerObject, setPlayerObject] = useState(false)
    const {currentMovie} = useContext(MoviesContext)
    const id = currentMovie?.id;
    const name =  showType === "tv" ?
        currentMovie?.original_name.toLowerCase().replaceAll(":","").replaceAll(" ","-") :
        currentMovie?.original_title ? currentMovie?.original_title.toLowerCase().replaceAll(":","").replaceAll(" ","-") :
        currentMovie?.title ? currentMovie?.title.toLowerCase().replaceAll(":","").replaceAll(" ","-")  : undefined

    ;
    const ystUrl = name && currentMovie?.first_air_date && showType === "tv"?
       "https://en.yts-official.org/series/"+ name.toLowerCase().replace(" ","-")+ "-" + currentMovie.first_air_date.split("-")[0] :
        name && currentMovie?.release_date && showType === "movie"?
            "https://en.yts-official.org/movies/"+ name+ "-" + currentMovie.release_date.split("-")[0]:
            undefined
    const title = currentMovie?.title || currentMovie?.name;
    const image = urls.findImagesUrl +currentMovie?.poster_path;
    App.addListener('appStateChange', (state) => {
        if (state.isActive) {
            playerObject.playVideo();
        } else {
            playerObject.pauseVideo();
        }
    });

    playerOptions.playerVars.mute = !isEnableSound;
    playerOptions.playerVars.fs = 1;
    playerOptions.playerVars.controls = 0;
    playerOptions.playerVars.showinfo = 0;
    playerOptions.playerVars.start = 3;
    playerOptions.playerVars.color = 'white';
    playerOptions.playerVars.enablejsapi = 1;
    const enableSound = () => {
        if (playerObject.isMuted()) {
            playerObject.unMute()
            playerObject.setVolume(50)
            setIsEnableSound(true)
        } else {
            playerObject.mute();
            setIsEnableSound(false)
        }
    }

    const enableFullScreen = () => {
        const playerElement = document.getElementById('vidPlayer')
        const requestFullScreen = playerElement.requestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen;
        if (requestFullScreen) {
            requestFullScreen.bind(playerElement)()
            window.screen.orientation.lock('landscape')
        }
    }
   const enablePause=()=>{
        if(playerObject.getPlayerState()!==1){
            playerObject.playVideo();
        } else {
            playerObject.pauseVideo();
        }
    }

    return (

        <div key={`${id}--bannerVideo`} style={{background:`url(${image})`,backgroundPosition:"center",backgroundColor:"black",backgroundSize: "contain",backgroundRepeat:"no-repeat", color: 'white', height: '100vh', overflowX: 'hidden', position: 'fixed'}}>
            <Container style={{
                position: 'absolute',
                zIndex: '1',
                marginTop: '3vh',
                marginLeft: '1vh',
                marginRight: '1vh',
            }}>
                <>
                    <FontAwesomeIcon icon={faWarning}/> {" use Vpn"}
                </>
                <div style={{display: "flex", flexDirection : "inherit", alignItems: "center",fontSize:"10px"}}>
                    <>
                        { showType === "movie" && (
                            <a href={`https://moviestrailerwatch.surge.sh/?tmdb_id=`+id} target="_blank">
                                <MovieButton>
                                    Watch{" "}
                                    <FontAwesomeIcon icon={faPlayCircle}/>
                                </MovieButton>
                            </a>
                        )}

                        { (showType === "movie" && ystUrl) && (
                            <a href={ystUrl} target="_blank">
                                <MovieButton>
                                    Watch{" "}
                                    <FontAwesomeIcon icon={faPlayCircle}/>
                                </MovieButton>
                            </a>
                        )}

                        { showType === "tv" && (
                            <a href={ystUrl} target="_blank">
                                <MovieButton>
                                     Watch{" "}
                                    <FontAwesomeIcon icon={faPlayCircle}/>
                                </MovieButton>
                            </a>
                        )}
                    </>
                    <Link to={showType ==="movie" ? `/` : `/tv`}>
                        <MovieButton>Back</MovieButton>
                    </Link>
                </div>
                <div style={{textAlign: "center",userSelect: 'none'}}>
                    <h3 onClick={enablePause}>{title}</h3>
                    {isVideoPlaying ?
                        <div>
                            <SoundContainer onClick={enableSound}>
                                {isEnableSound ?
                                    <FontAwesomeIcon icon={faVolumeHigh}/>
                                    :
                                    <FontAwesomeIcon icon={faVolumeXmark}/>
                                }
                            </SoundContainer>
                            <Expand id='expend' onClick={enableFullScreen}>
                                <FontAwesomeIcon icon={faExpand}/>
                            </Expand>
                        </div>
                        : ''}
                </div>
                <MovieReviews title={title} language={language} id={id} imdbId={imdbId} showComment={false}/>
                <MovieDetails showType={showType} id={id} language={language} />
            </Container>

            {videoId !== undefined ? (
                <YouTube id='vidPlayer' className='video-background'
                         style={{opacity: isVideoPlaying ? 1 : 0}}
                         onPlay={e => {
                             setPlayerObject(e.target);
                             setIsVideoPlaying(true);
                             setIsVideoLoading(false);
                             setIisVideoError(false);

                         }}
                         onError={e => {
                             setIisVideoError(true);
                             setIsVideoPlaying(false);
                         }}
                         onReady={e=>{
                             setPlayerObject(e.target);
                             e.target.playVideo();
                             setIsVideoPlaying(false);
                             setIsVideoLoading(true);
                         }}
                         onStateChange={e=>console.log("state change",e.target)}
                         onEnd={ e=> {setIsVideoPlaying(false)}}
                         videoId={videoId}
                         opts={playerOptions}
                />
            ):(
                <></>
            )}

        </div>
    );
}

export default Movie;

