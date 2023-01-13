import React, {Component} from "react";
import styled from "styled-components";
import movieTrailer from "movie-trailer";
import {playerOptions} from "../../utils/hooks";
import YouTube from "react-youtube";
import {Link} from "react-router-dom";
import './style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExpand, faVolumeHigh, faVolumeXmark} from '@fortawesome/free-solid-svg-icons'

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    background: ${({imageUrl}) => 'url(' + imageUrl + ') ;'}
    background-position: center;   
    user-select: none;
    @media  only screen and (max-width:768px ){
        height: 30vh;
        background-position: 30%; 
        background-size:cover;
    }
`
const MovieHeaderContent = styled.div`
    margin-left: 30px;
    padding-top: 140px;
    z-index: 10000;
    position: ${({isMainMenu}) =>  isMainMenu   ? 'relative' : 'absolute'}; 
    @media  only screen and (max-width:768px ){
        padding-top: 0px;
        margin-left: 0px;
        height:30vh;
    }
`
const MovieTitle = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
    @media  only screen and (max-width:768px ){
        font-size: 1.7rem;
        font-weight: 400;
        padding-top: 0.5rem;
        position:relative;
        width:45vh;
        height:10vh;
        max-width:45vh;
        max-height:20vh;
        margin-top: 4vh;
    }
`
const MovieDescription = styled.h1`
    width: 70%;
    line-height: 1.3;
    padding-top: 0.5rem;
    font-size:${({textLen}) =>  textLen < 170  ? '' : '1.5rem'}; 
    max-width: 120rem;
    height: 100px;
    overflow:hidden;
    @media  only screen and (max-width:768px ){
        display : none !important;
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
    width: 15vh;
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
const Recommended = styled.div`
    width: 18vh;
    color: lightgreen;
    font-weight: 800;
    @media  only screen and (max-width:768px ){
       width: 20vh;        
    }     
`
const RecommendedLine = styled.div`
    width: 100%;
    display: flex; 
    margin-left: 20px;
    @media  only screen and (max-width:768px ){
       margin-top:5vh;
    }
`

const DescriptionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media  only screen and (max-width:768px ){
        display:block;
    }      
`
const MovieFadeBottom = styled.div`
    height: 7.4rem;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37, 37, 37, 0.61),
        #111  
    );
    width: 100%;
    position: ${({isMainMenu}) =>  isMainMenu   ? 'relative' : 'absolute'}; 
    bottom: ${({isMainMenu}) =>  isMainMenu   ? '2.5vh' : '-0.5vh'};  
    z-index: 1000;
    @media  only screen and (max-width:768px ){
        display : none ;
    }
`


const LoaderContainer = styled.div`
    width: 100%;
    object-fit: contain;
    position: absolute ;
    top :0;
    z-index:100;
`
const VideoContainer = styled.div`
    display: ${({isVideoLoading}) =>  !isVideoLoading  ? 'block' : 'none'};   
    opacity : ${({videoPlaying}) =>  !videoPlaying  ? '0' : '1'};
    @media  only screen and (max-width:768px ){
        height:5vh;
    }
`
const SoundContainer = styled.div`
    position:absolute;
    cursor:pointer;
    right:1vh;
    z-index:1000;
    top:0;
    @media only screen and (max-width:768px ){
        position: fixed;
    }
`
const Expand = styled.div`
    position:absolute;
    right:1vh;
    z-index:1100;
    top: 40vh;
    cursor:pointer;
    @media only screen and (max-width:768px ){
        position: fixed;
        z-index: 2000;
        right: 1vh;
        top: 25vh;
    }
`

class Banner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trailerURL: "",
            isVideoLoading: false,
            isVideoPlaying: false,
            vidError: false,
            startVideo: false,
            playerObj : {},
            sound:false
        }
    playerOptions.height = window.screen.height-(window.screen.height*0.35);
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

    setIsVideoPlaying(flag) {
        this.setState({isVideoPlaying: flag})
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

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.title !==  this.props.title) {
            playerOptions.playerVars.mute = !this.state.sound ? 1 : 0;
            this.handleClick(nextProps.title)
        }
    }


    handleClick = (title) => {
        this.setTrailerURL("");
        this.setVidError(false);
        this.setIsVideoLoading(true);
        this.setIsVideoPlaying(false);
        this.setPlayerObj({});
        movieTrailer(title)
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                this.setTrailerURL(urlParams.get("v"));
            })
            .catch((e) => {
                this.setTrailerURL("");
                this.setVidError(true);
            })
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

    render(){
        const {imageUrl,title,adults,popularity,year,genres,productions,languages,overview,isMainMenu,id,type,showDescription,isMobile} = this.props;
        return (
            <MovieHeader imageUrl={imageUrl}>
                <MovieHeaderContent id='test' isMainMenu={isMainMenu} >
                    {!isMainMenu && this.state.isVideoPlaying?
                        <div>
                            <SoundContainer onClick={this.enableSound}>
                                {this.state.sound ?
                                    <FontAwesomeIcon icon={faVolumeHigh}/>
                                    :
                                    <FontAwesomeIcon icon={faVolumeXmark}/>
                                }
                            </SoundContainer>
                            <Expand onClick={this.enableFullScreen}>
                                <FontAwesomeIcon icon={faExpand}/>
                            </Expand>
                        </div>
                        :''}
                    <MovieTitle> {title}</MovieTitle>
                    <DescriptionContainer>
                        {!isMobile ?
                            <div style={{width: '70vh',height:'5vh'}}>
                                <Link to={`/movieDetails/${id}/${type}`}>
                                    <MovieButton>Play</MovieButton>
                                </Link>
                                <MovieButton>My List</MovieButton>
                            </div>
                            :
                            !this.state.sound ?
                                <div style={{width: '70vh', height: '5vh'}}>
                                    <Link to={`/movieDetails/${id}/${type}`}>
                                        <MovieButton>Play</MovieButton>
                                    </Link>
                                    <MovieButton>My List</MovieButton>
                                </div>
                                :
                                <div style={{width: '70vh', height: '5vh'}}>
                                </div>
                        }
                        <RecommendedLine style={{width: '100%', display: 'flex', marginLeft: '20px'}}>
                            <Recommended>Recommand at {popularity}%</Recommended>
                            <div> for : {!adults ? ' Adults' : ' All family'}</div>
                            <div style={{border: 'solid 1px', height: 'fit-content', marginLeft: '5px'}}> {year}</div>
                        </RecommendedLine>
                    </DescriptionContainer>
                    {showDescription ?
                        <div style={{height: '200px', width: '30rem', lineHeight: '1.3rem', float: 'right'}}>
                            <div><span style={{color:'gray'}}>Genres</span> : {genres}</div>
                            <div><span style={{color:'gray'}}>Productions</span> : {productions}</div>
                            <div><span style={{color:'gray'}}>Languages</span> : {languages}</div>
                        </div>:''}
                    <MovieDescription style={{ display: 'flex'}} textLen={overview.length}>
                        {isMainMenu ? this.truncate(overview,250):this.truncate(overview,500)}
                    </MovieDescription>
                </MovieHeaderContent>
                {!isMainMenu && this.state.trailerURL?
                    <LoaderContainer >
                        {this.state.vidError ? <span style={{color:'white'}}>Oups something went wrong</span>:''}
                        {/*better rendering without loading icon*/}
                        {/*{(this.state.isVideoLoading )?*/}
                        {/*    <LoaderWrapper data-testid='loader'>*/}
                        {/*        <Loader id='myloader'/>*/}
                        {/*    </LoaderWrapper>*/}
                        {/*    :''}*/}
                        <VideoContainer isVideoLoading={this.state.isVideoLoading} videoPlaying={this.state.isVideoPlaying}>
                            <YouTube id='vidPlayer' className='video-background-banner'
                                     onPlay={e => {this.setPlayerObj(e.target);this.setIsVideoLoading(false);this.setIsVideoPlaying(true)}}
                                     onError={e => {this.setVidError(true);this.setIsVideoPlaying(false)}}
                                     onReady={e=>{e.target.playVideo();this.setIsVideoPlaying(false);this.setIsVideoLoading(true);}}
                                     onEnd={ e=> {this.setIsVideoPlaying(false)}}
                                     videoId={this.state.trailerURL}
                                     opts={playerOptions}
                            />
                        </VideoContainer>
                    </LoaderContainer>
                    :''}
                <MovieFadeBottom id='test2' isMainMenu={isMainMenu} />
            </MovieHeader>
        )
    }
}

export default  Banner