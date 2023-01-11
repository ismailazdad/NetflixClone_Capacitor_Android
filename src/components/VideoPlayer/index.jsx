import React, {useState} from "react";
import urls from "../../utils/urls";
import {Loader} from "../../utils/style/Atoms";
import YouTube from "react-youtube";
import { playerOptions,getGenres,useTransitionControl} from "../../utils/hooks";
import PlayerMenu from "../PlayerMenu";
import {Link} from "react-router-dom";
import './style.css'
import {Card, GenresTypes, LoaderContainer, LoaderWrapper, PlayModalMenuButton, StyledImage, VideoContainer,LoaderParentContainer} from "./style";
import movieTrailer from "movie-trailer";
import {Modal} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import PlayButton from "../../assets/play2.png";

const transitionStyles ={
    no_data:{transform: 'scale(1)',transition : 'transform 1s'},
    entering:{transform: 'scaleX(1.05)',transition : 'transform 500ms'},
    entered:{transform: 'scaleX(1.15) scaleY(1.15)',transition : 'transform 3s'},
    exiting:{transform: 'scale(1.15)',transition : 'transform 1s'},
    exited:{transform: 'scale(1)',transition : 'transform 1s'},
    finish:{transform: 'scale(1)',transition : 'transform 1s'},
}
const defaultStyle ={
    transition : 'transform 1s',
    transform : 'scale(1)',
}

function VideoPlayer({isLargeRow,movie,type,scrollLeft,scrollRight,index,isActive,onShow,onLeave,useRank}) {
    let [stateVideo, enterVideo,exitedVideo] = useTransitionControl(500);
    const videoStyle = {
        ...defaultStyle,
        ...transitionStyles[stateVideo] ?? {},
    };
    const [trailerURL, setTrailerURL] = useState("");
    const [vidError, setVidError] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    playerOptions.height = '350';
    //to systematic auto play with google video api , make mute to 1
    playerOptions.playerVars.mute = 1;
    const [show, setShow] = useState(false);
    let year = (movie?.release_date ? movie?.release_date : movie?.first_air_date)?.substring(0, 4);
    let genres = getGenres(movie.genre_ids);
    let notes = Math.ceil(movie.vote_average * 10);

    const ResetStateVideo =  function (e) {
        setTrailerURL("");
        setVidError(false);
        setIsVideoLoading(false);
        exitedVideo();
        setIsVideoPlaying(false);
        onLeave();
    }

    const HandleVideo =  (movie) => {
        if(!isVideoPlaying && !vidError){
            enterVideo();
            setTrailerURL("");
            setVidError(false);
            setIsVideoLoading(true);
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get("v"));
                    setVidError(false);
                })
                .catch((e) => {
                    setTrailerURL("");
                    setVidError(true);
                })
        }
        onShow();
    };

    return (<div>
        <Card key={`${movie.id}'---'`}  onTouchStart={() =>{ HandleVideo(movie)}} onMouseLeave={(e) => {ResetStateVideo();}} onMouseEnter={() => HandleVideo(movie)} useRank={useRank}>
            { ((isActive || stateVideo ==='exiting'|| stateVideo ==='exited')  && !scrollLeft && !scrollRight && !vidError )  ?
                (
                    <LoaderParentContainer style={{...videoStyle}}>
                        <LoaderContainer isVideoLoading={isVideoLoading} isLargeRow={isLargeRow} stateVideo={stateVideo}>
                            <StyledImage
                                key={movie.id}
                                src={`${urls.findImagesUrl}${ movie.backdrop_path}`}
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
                                onReady={e=>{ e.target.playVideo();setIsVideoPlaying(false);setIsVideoLoading(true);}}
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
                                onDetails={()=>{setShow(true); }}
                            />
                        </VideoContainer>
                    </LoaderParentContainer>
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
            <Modal key={`${movie.id}'--Card'`} show={show} className="my-modal" style={{zIndex:'10000'}} >
                <Modal.Dialog style={{backgroundSize: 'cover',backgroundImage: `url(${urls.findImagesUrl+movie.backdrop_path})`}}>
                    <Modal.Header onClick={() => setShow(false)} style={{border: 'transparent'}}  >
                        <Modal.Title><h1>{movie?.title} </h1></Modal.Title>
                        <button type="button" style={{border: 'transparent'}} aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body style={{paddingTop: '13%' ,overflow: 'hidden'}}>
                        <span>{movie?.overview}</span>
                    </Modal.Body>
                    <Modal.Footer style={{border: 'transparent',display: 'initial'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Link  to={`/movieDetails/${movie.id}/${type}`}>
                                <PlayModalMenuButton  isLargeRow={isLargeRow}><img alt='' src={PlayButton}/></PlayModalMenuButton>
                            </Link>
                            <span>{genres.join(' . ')}</span>
                            <GenresTypes>{notes}%</GenresTypes> {year}
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
    </div>
    );
}
export default VideoPlayer;