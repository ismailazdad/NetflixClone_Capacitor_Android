import React, {useState} from "react";
import styled from "styled-components";
import {playerOptions} from "../../utils/hooks";
import {useParams} from "react-router";
import MovieDetails from "../../components/MovieDetails";
import YouTube from "react-youtube";
import './style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand, faVolumeHigh, faVolumeXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import MovieReviews from "../../components/MovieReviews";
import {App} from "@capacitor/app";

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
    position:absolute;
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
        width: 20vh;
        height:5vh;        
    }     
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`


function Movie() {
    const {id, videoId, sound, title, imdbId,language} = useParams()
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isVideoError, setIisVideoError] = useState(false)
    const [isVideoLoading, setIsVideoLoading] = useState(false)
    const [isEnableSound, setIsEnableSound] = useState(sound === "true")
    const [playerObject, setPlayerObject] = useState(false)
    const [isAppActive, setAppActive]= useState(true)

    playerOptions.playerVars.mute = 1;
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
        }
    }
    return (

        <div key={`${id}--bannerVideo`}
             style={{background: 'black', color: 'white', height: '100vh', overflowX: 'hidden', position: 'fixed'}}>
            <div style={{
                position: 'absolute',
                zIndex: '1',
                marginTop: '15vh',
                marginLeft: '1vh',
                marginRight: '1vh',
            }}>
                <div style={{height: '10vh'}}>
                    <h3>{title}</h3>
                    <Link to={`/`}>
                        <MovieButton>Back</MovieButton>
                    </Link>
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
                <MovieDetails id={id} language={language}/>
            </div>

            <YouTube id='vidPlayer' className='video-background'
                     onPlay={e => {
                         setPlayerObject(e.target);
                         setIsVideoPlaying(true);
                         setIsVideoLoading(false);
                         setIisVideoError(false);

                     }}
                     onError={e => {setIisVideoError(true);setIsVideoPlaying(false)}}
                     onReady={e=>{setPlayerObject(e.target);e.target.playVideo();;setIsVideoPlaying(false);setIsVideoLoading(true);}}
                     onPause={e=>playerObject.playVideo()}
                     onStateChange={e=>console.log("state change",e.target)}
                     onEnd={ e=> {setIsVideoPlaying(false)}}
                     videoId={videoId}
                     opts={playerOptions}
            />

        </div>
    );
}

export default Movie;

