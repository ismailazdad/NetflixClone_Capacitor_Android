import React, {Component} from "react";
import styled from "styled-components";
import movieTrailer from "movie-trailer";
import {playerOptions} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import YouTube from "react-youtube";
import {Link} from "react-router-dom";
import './style.css'
import Header from "../Header";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExpand, faVolumeHigh, faVolumeXmark} from '@fortawesome/free-solid-svg-icons'

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    position:absolute;
    z-index:100;
    overflow: hidden;
`
const MovieHeaderContent = styled.div`
    margin-left: 30px;
    padding-top: 5vh;
    @media  only screen and (max-width:768px ){
        margin-left: 0px;
    }    
`
const MovieTitle = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
    font-size: 5vh;
    @media  only screen and (max-width:768px ){        
        width:50vh;
        font-weight: 400;
        padding-bottom: 0rem;
        position:relative;
        padding-right:1vh;
    }    
`
const MovieDescription = styled.h1`
    width: 70%;
    line-height: 1.8rem;
    padding-top: 0.5rem;
    font-size: 1.5rem;
    max-width: 120rem;
    height: 125px;
    overflow:hidden;    
    @media  only screen and (max-width:768px ){        
        width: 48vh;
        font-size: 1.1rem;
        height: 38vh;
    }
   
`
const MovieButton = styled.button`
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
        margin-top:1vh;
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

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const More = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    @media  only screen and (max-width:768px ){
        display:block;       
    }
`
const SoundContainer = styled.div`
    position:absolute;
    cursor:pointer;
    right:5vh;
    z-index:1000;
    top:0;
    @media only screen and (max-width:768px ){
        position: fixed;
    }
`
const Expand = styled.div`
    position:absolute;
    right:5vh;
    z-index:1100;
    top: 15vh;
    cursor:pointer;
    @media only screen and (max-width:768px ){
        position: fixed;
        z-index: 2000;
        right: 5vh;
        top: 25vh;
    }
`
class BannerVideo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trailerURL: "",
            isVideoLoading: false,
            vidError: false,
            startVideo: false,
            sound:false,
            playerObj : {},
        }
        playerOptions.height = window.screen.height - (window.screen.height * 0.35);
        playerOptions.playerVars.mute = 1;
    }

    setTrailerURL(title) {
        this.setState({trailerURL: title})
    }

    setIsVideoLoading(flag) {
        this.setState({isVideoLoading: flag})
    }

    setVidError(flag) {
        this.setState({vidError: flag})
    }

    setStartVideo(flag) {
        this.setState({startVideo: flag})
    }
    setPlayerObj(obj) {
        this.setState({playerObj: obj})
    }
    truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    componentDidMount() {
        if (!this.props.isMainMenu) {
            this.handleClick(this.props.title)
        }
    }

    handleClick = (title) => {
        if (!this.state.startVideo) {
            this.setStartVideo(false);
            this.setPlayerObj({});
            if (this.state.trailerURL) {
                this.setTrailerURL("");
            } else {
                this.setVidError(false);
                this.setIsVideoLoading(true);
                movieTrailer(title)
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        this.setTrailerURL(urlParams.get("v"));
                    })
                    .catch((e) => {
                        this.setTrailerURL("");
                        this.setVidError(true);
                    })
            }
        }
    };
    enableSound = () => {
        if(this.state.playerObj.isMuted()){
            this.state.playerObj.unMute()
            this.state.playerObj.setVolume(50)
            this.setState({sound: true})
        }else{
            this.state.playerObj.mute();
            this.setState({sound: false})
        }
    }

    enableFullScreen = () => {
        const playerElement = document.getElementById('vidPlayer')
        const requestFullScreen = playerElement.requestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen ;
        if (requestFullScreen) {
            requestFullScreen.bind(playerElement)()
        }
    }

    render() {
        const {imageUrl, title, adults, popularity, year, genres, productions, languages, overview, isMainMenu, id, type} = this.props
        return (
            <div>
                <Header/>
                <MovieHeader imageUrl={imageUrl}>
                    <MovieHeaderContent>
                        <MovieTitle> {title}</MovieTitle>
                            <More>
                                <div style={{width: '300px'}}>
                                    {isMainMenu ?
                                        <Link to={`/movieDetails/${id}/${type}`}>
                                            <MovieButton>Play</MovieButton>
                                        </Link>
                                        :
                                        <MovieButton onClick={() => this.handleClick(title)}>Play</MovieButton>
                                    }
                                    <MovieButton>My List</MovieButton>

                                    {!isMainMenu && this.state.startVideo?
                                        <div>
                                            <SoundContainer onClick={this.enableSound}>
                                                {this.state.sound ?
                                                    <FontAwesomeIcon icon={faVolumeHigh}/>
                                                    :
                                                    <FontAwesomeIcon icon={faVolumeXmark}/>
                                                }
                                            </SoundContainer>
                                            <Expand id='expend' onClick={this.enableFullScreen}>
                                                <FontAwesomeIcon icon={faExpand}/>
                                            </Expand>
                                        </div>
                                        :''}
                                </div>
                                <div style={{width: '100%', display: 'flex', marginLeft: '20px'}}>
                                    <div style={{width: '20vh', color: 'lightgreen', fontWeight: '800'}}>Recommand
                                        at {popularity}%
                                    </div>
                                    <div> for : {!adults ? ' Adults' : ' All family'}</div>
                                    <div style={{
                                        border: 'solid 1px',
                                        height: 'fit-content',
                                        marginLeft: '5px'
                                    }}> {year}</div>
                                </div>
                        </More>
                        {!isMainMenu ?
                            <div style={{ width: '50vh', lineHeight: '1.3rem', float: 'left'}}>
                                <div><span style={{color: 'gray'}}>Genres</span> : {genres}</div>
                                <div><span style={{color: 'gray'}}>Productions</span> : {productions}</div>
                                <div><span style={{color: 'gray'}}>Languages</span> : {languages}</div>
                            </div> : ''}
                        <MovieDescription style={{display: 'flex'}}>
                            {isMainMenu ? this.truncate(overview, 250) : this.truncate(overview, 500)}
                        </MovieDescription>
                    </MovieHeaderContent>
                </MovieHeader>
                <div>
                    {this.state.vidError ? <span style={{color: 'white'}}>Oups something went wrong</span> : ''}
                    {(this.state.isVideoLoading && this.state.trailerURL === "") ?
                        <LoaderWrapper data-testid='loader'>
                            <Loader id='myloader' style={{margin: '14% 0% 0 0'}}/>
                        </LoaderWrapper>
                        :
                        <YouTube id='vidPlayer'
                                 className='video-background'
                                 onPlay={e => {this.setPlayerObj(e.target);this.setIsVideoLoading(false);this.setStartVideo(true)}}
                                 onError={e => this.setVidError(true)}
                                 onReady={e=>{ e.target.playVideo();}}
                                 videoId={this.state.trailerURL}
                                 opts={playerOptions}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default BannerVideo