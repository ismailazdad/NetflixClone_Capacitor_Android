import React, {Component} from "react";
import styled from "styled-components";
import movieTrailer from "movie-trailer";
import {playerOptions, TEXT_COLLAPSE_OPTIONS} from "../../utils/hooks";
import YouTube from "react-youtube";
import {Link} from "react-router-dom";
import './style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeftLong, faArrowRightLong, faExpand, faVolumeHigh, faVolumeXmark} from '@fortawesome/free-solid-svg-icons'
import {Fade, Modal} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PlayButton from "../../assets/play2.png";
import Backup from "../../assets/backup.png";
import InfoSvg from "../../assets/info.svg";
import Credits from "../Credits";
import VideoList from "../VideosList";
import MovieDetails from "../MovieDetails";
import {Loader} from "../../utils/style/Atoms";
import MovieReviews from "../MovieReviews";
import urls from "../../utils/urls";
import RowBanner from "../RowBanner";
import MovieProvider from "../Provider";
import imageMyList from "../../assets/list.png";
import imageRemoveMyList from "../../assets/listremove.png";
import {MoviesContext} from "../../utils/context";

export const PlayModalMenuButton = styled.button`       
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 0.7rem ;
    height:  35px;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 20px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    background-color: #c4c4c4;
    width :35px ;  
    margin-left: 6px;
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
}
`
export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const MovieHeader = styled.div` 
    @media  only screen and (max-width:768px ){
        color: white;
        object-fit: contain;
        height: 448px;
        background-size: cover;   
        background-image: ${({imageUrl}) => 'url(' + imageUrl + ')'},  ${({backup}) => 'url(' + backup + ')'};       
        background-position: center;   
        user-select: none;
        height: 30vh;
        background-position: 30%; 
        background-size:cover;
    }
`
const MovieHeaderContent = styled.div`
    margin-left: 30px;
    padding-top: 140px;
    z-index: 10000;
    position: ${({isMainMenu}) =>  isMainMenu   ? 'absolute' : 'absolute'}; 
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
       margin-top:6vh;
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
const Details = styled.div`
    display:none; 
     @media  only screen and (max-width:768px ){
        display:block;
        position: fixed;
        z-index: 2000;
        left:0vh;
        top: 25vh; 
    } 
`

class Banner extends Component {
    timer;
    static contextType = MoviesContext;
    constructor(props) {
        super(props)
        this.state = {
            trailerURL: "",
            isVideoLoading: false,
            isVideoPlaying: false,
            vidError: false,
            startVideo: false,
            playerObj : {},
            sound:false,
            showModal:false,
            focus : this.props.focus,
            first : true,
            key : 1,
            isMainMenu : this.props.isMainMenu
        }

    playerOptions.height = window.screen.height-(window.screen.height*0.35);
    playerOptions.playerVars.mute = 1;
    playerOptions.playerVars.fs=1;
    playerOptions.playerVars.controls=0;
    playerOptions.playerVars.showinfo=0;
    playerOptions.playerVars.start=3;
    playerOptions.playerVars.color='white';
    playerOptions.playerVars.enablejsapi=1;
    TEXT_COLLAPSE_OPTIONS.minHeight = 150;
    TEXT_COLLAPSE_OPTIONS.maxHeight = 250;
    }

    addOneItem(id) {
        const cartFilteredCurrentMovie = this.props.myList.filter((item) => item.id !== id)
        const result = [...cartFilteredCurrentMovie]
        result.unshift(
            {
                id: id,
                title: this.props.title,
                backdrop_path: this.props.imageUrl,
                poster_path: this.props.imageUrlPoster,
                overview: this.props.overview,
                genres: this.props.genres,
                popularity: this.props.popularity,
                release_date: this.props.year,
                adults: this.props.adults,
                imdbId:""
            })
        this.props.updateMyList(result)
    }

    removeOneItem(id) {
        const cartFilteredCurrentMovie = this.props.myList.filter((item) => item.id !== id)
        let result = [...cartFilteredCurrentMovie]
        this.props.updateMyList(result)
    }

    setImdbId(id){
        this.setState({imdbId: id})
    }
    updateImdbId = (id) =>{
        this.setImdbId( id)
    }

    setMainMenu(flag){
        this.setState({isMainMenu: flag})
    }

    updateMenuStatue = (flag) =>{
        this.setMainMenu( flag)
    }

    setFirst(flag){
        this.setState({first: flag})
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

    setShowModal(flag) {
        this.setState({showModal: flag})
    }

    truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    showModalDelay = () => {
        this.timer = setTimeout(() => {
            if (!this.props.focus && !this.props.touchState && !this.state.first) {
                this.setShowModal(true)
            }
        }, 10000);
    }

    componentDidMount() {
        if (!this.props.isMainMenu) {
            this.handleClick(this.props.id)
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.title !==  this.props.title) {
            playerOptions.playerVars.mute = !this.state.sound ? 1 : 0;
            this.handleClick(nextProps.id)
            this.setState({key: 1})
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    handleClick = (id) => {
        clearTimeout(this.timer);
        this.setTrailerURL("");
        this.setVidError(false);
        this.setIsVideoLoading(true);
        this.setIsVideoPlaying(false);
        this.setPlayerObj({});
        //test movietrailer with specified language
        movieTrailer(null, {tmdbId: id, language: this.props.language})
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                this.setTrailerURL(urlParams.get("v"));
                this.setVidError(false);
            })
            .catch((e) => {
                //if no trailer in specified language, call movietrailer withtout specified language
                this.setTrailerURL("");
                this.setVidError(false);
                movieTrailer(null, {tmdbId: id})
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        this.setTrailerURL(urlParams.get("v"));
                    })
                    .catch((e) => {
                        this.setTrailerURL("");
                        this.setVidError(true);
                    })
            })
    };

    updateTrailer = (key) =>{
        clearTimeout(this.timer)
        playerOptions.playerVars.mute = !this.state.sound ? 1 : 0;
        this.setVidError(false)
        this.setTrailerURL( key)
    }

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
            clearTimeout(this.timer);
            window.screen.orientation.lock('landscape')
        }
    }

    handleSelect = (key) =>{
           this.setState({key: key})
    }

    render(){
        const {imageUrl,imageUrlPoster,title,adults,popularity,year,overview,isMainMenu,id,type,language,character,showSimilar} = this.props;
        return (
            <MovieHeader imageUrl={imageUrl} backup={Backup}>
                <MovieHeaderContent id='test' isMainMenu={isMainMenu} >
                    {!this.state.isMainMenu && this.state.isVideoPlaying?
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
                    <Details id='myModal' title='more details' onClick={e => {this.setState({showModal: true}); clearTimeout(this.timer);}} >
                        <img style={{width:'3.5vh'}} alt='' src={InfoSvg}/>
                    </Details>
                    {!this.state.isVideoPlaying || !this.state.showModal ?
                        <MovieTitle> {title}</MovieTitle>
                        : <MovieTitle/>
                    }

                    <DescriptionContainer>
                        {!this.state.isVideoPlaying || !this.state.showModal ?
                            <div style={{width: '70vh', height: '5vh'}}>
                                {!showSimilar ?
                                    <Link to={`/`}>
                                        <MovieButton>Back</MovieButton>
                                    </Link>:''}
                            </div>
                            :
                            <div style={{width: '70vh', height: '5vh'}}>
                            </div>}
                        <RecommendedLine style={{width: '100%', display: 'flex', textAlign: 'center',marginLeft:'5vh'}}>
                            <Recommended>Recommand at {popularity}%</Recommended>
                            <div> for : {adults ? ' Adults  ' : 'All family'}</div>
                            <div style={{border: 'solid 1px', height: 'fit-content', marginLeft: '5px'}}> {year}</div>
                        </RecommendedLine>
                    </DescriptionContainer>

                </MovieHeaderContent>
                {!this.state.isMainMenu && this.state.trailerURL?
                    <LoaderContainer >
                        {this.state.vidError ? <span style={{color:'white'}}>Oups something went wrong</span>:''}
                        {(this.state.isVideoLoading )?
                            <LoaderWrapper data-testid='loader'>
                                <Loader style={{marginTop:'0vh'}} id='myloader'/>
                            </LoaderWrapper>
                            :''}
                        <VideoContainer isVideoLoading={this.state.isVideoLoading} videoPlaying={this.state.isVideoPlaying}>
                            <YouTube id='vidPlayer' className='video-background-banner'
                                     onPlay={e => {
                                         this.setPlayerObj(e.target);
                                         this.setIsVideoLoading(false);
                                         this.setIsVideoPlaying(true);
                                         clearTimeout(this.timer);
                                         this.showModalDelay()
                                         this.setFirst(false)
                                     }}
                                     onError={e => {this.setVidError(true);this.setIsVideoPlaying(false)}}
                                     onReady={e=>{e.target.playVideo();this.setIsVideoPlaying(false);this.setIsVideoLoading(true);}}
                                     onPause={e=>this.state.playerObj.playVideo()}
                                     onStateChange={e=>console.log("state change",e.target)}
                                     onEnd={ e=> {this.setIsVideoPlaying(false)}}
                                     videoId={this.state.trailerURL}
                                     opts={playerOptions}
                            />
                        </VideoContainer>
                    </LoaderContainer>
                    :''}
                <MovieFadeBottom />
                <Modal key={`--CardModal'`} show={this.state.showModal} className="my-modal" style={{top:'30vh', WebkitUserSelect: 'none',backgroundColor:'gray'}} >
                    <Modal.Dialog style={{backgroundPosition:'top', backgroundSize: 'cover',backgroundImage: `url(${imageUrlPoster})`}}>
                        <Modal.Header onClick={() => {
                            this.setState({showModal: false});
                            clearTimeout(this.timer);
                            if(!this.props.showSimilar)
                                this.setState({isMainMenu: true})
                        }} style={{border: 'transparent',height:'9vh'}}  >
                            <Modal.Title><h1 style={{ lineHeight: '0.8'}}>{title} </h1></Modal.Title>
                            <button type="button" style={{border: 'transparent',backgroundColor: 'transparent',color: 'white'}} aria-label="Close">
                                <span>&times;</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body className="container" style={{overflowX: 'hidden', overflowY: 'scroll'}}>
                            {
                                this.props?.myList.map(e=>e.id).includes(id) ?
                                    <img alt={`add${id}`} style={{height: '4vh',width: '4vh',float: 'right'}} onClick={e=>this.removeOneItem(id)} src={imageRemoveMyList} />
                                    :
                                    <img alt={`rem${id}`} style={{height: '4vh',width: '4vh',float: 'right'}} onClick={e=>this.addOneItem(id)} src={imageMyList} />
                            }
                            <Tabs
                                className="mb-3"
                                transition={Fade}
                                activeKey={this.state.key }
                                onSelect={this.handleSelect}
                                // fill  justify
                            >
                                <Tab eventKey={1} title="Movie" >
                                    {character ? character : ''}
                                    <MovieDetails id={id} language={language} updateImdbId={this.updateImdbId}/>
                                    <MovieProvider id={id} language={language.length > 2 ? language?.split("-")[1] : language.toUpperCase()}/>
                                </Tab>
                                <Tab eventKey={2} title="trailers">
                                    <VideoList id={id} language={language} setTrailerURL={this.updateTrailer} isVideoPlaying={this.state.isVideoPlaying} trailerURL={this.state.trailerURL} updateMenuStatue={this.updateMenuStatue} />
                                </Tab>
                                <Tab eventKey={3} title="Casting">
                                    <Credits id={id} language={language}/>
                                </Tab>
                                {this.props.showSimilar ?
                                    <Tab eventKey={4} title="Similar">
                                    <RowBanner style={{position: 'relative'}} title='Similar Movie'
                                               url={urls.findRecommendedById.replace("{id}", id) + language}
                                               isLargeRow={true}/>
                                    <RowBanner style={{position: 'relative'}} title='Recommended Movie'
                                               url={urls.findSimilarById.replace("{id}", id) + language}
                                               isLargeRow={true}/>
                                    </Tab> : ''}

                                <Tab eventKey={5} title="Review">
                                    <MovieReviews title={title} language={language} id={id}  imdbId={this.state.imdbId} showComment={true}/>
                                </Tab>
                            </Tabs>
                        </Modal.Body>
                        <Modal.Footer style={{border: 'transparent',display: 'initial'}}>
                            <div className="d-flex justify-content-between" >
                                {this.context.moviesContext[this.context.currentIndex - 1] ?
                                    <div onClick={() => {
                                        this.context.saveCurrentIndex(this.context.currentIndex - 1)
                                        this.context.saveMovie(this.context.moviesContext[this.context.currentIndex - 1])
                                    }}>
                                        <FontAwesomeIcon size="xl"
                                                         style={{color: 'white', paddingLeft: '0px !important'}}
                                                         icon={faArrowLeftLong}/>
                                    </div>
                                    : <div>
                                        <FontAwesomeIcon size="xl"
                                                         style={{color: 'transparent', paddingLeft: '0px !important'}}
                                                         icon={faArrowLeftLong}/>
                                    </div>
                                }
                                {this.state.trailerURL !=="" ?
                                    <div>
                                    <Link  to={`/movieDetails/${id}/${this.state.trailerURL}/${this.state.sound}/${this.props.title}/${this.state.imdbId}/${language}`} >
                                        <PlayModalMenuButton ><img alt='' src={PlayButton}/></PlayModalMenuButton>
                                    </Link>
                                </div>
                                        :""}

                                {this.context.moviesContext[this.context.currentIndex + 1] ?
                                    <div onClick={() => {
                                        this.context.saveCurrentIndex(this.context.currentIndex + 1)
                                        this.context.saveMovie(this.context.moviesContext[this.context.currentIndex + 1])
                                    }}>
                                        <FontAwesomeIcon size="xl"
                                                         style={{color: 'white', paddingLeft: '0px !important'}}
                                                         icon={faArrowRightLong}/>
                                    </div>
                                    :
                                    <div>
                                        <FontAwesomeIcon size="xl"
                                                         style={{color: 'transparent', paddingLeft: '0px !important'}}
                                                         icon={faArrowRightLong}/>
                                    </div>
                                }
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </MovieHeader>

        )
    }
}
export default  Banner