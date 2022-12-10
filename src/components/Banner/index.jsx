import React, {useEffect, useState} from "react";
import styled from "styled-components";
import movieTrailer from "movie-trailer";
import {playerOptions} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import YouTube from "react-youtube";
import {Link} from "react-router-dom";

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    background: ${({imageUrl}) => 'url(' + imageUrl + ') ;'}
    background-position: center ;
`
const MovieHeaderContent = styled.div`
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
`
const MovieTitle = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
`
const MovieDescription = styled.h1`
    width: 70%;
    line-height: 1.3;
    padding-top: 0.5rem;
    font-size: 1.5rem;
    max-width: 120rem;
    height: 100px;
    overflow:hidden;
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
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
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
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const VideoContainer = styled.div`
    width: 100%;
    object-fit: contain;
    height:${({h,startVideo}) => startVideo ? `${h}`:``};
    position: ${({startVideo}) => startVideo ? 'absolute' : 'relative'}; 
    top:28rem;
`

function Banner({imageUrl,title,adults,popularity,year,genres,productions,languages,overview,isMainMenu,id,type}){
    const [trailerURL, setTrailerURL] = useState("");
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [vidError, setVidError] = useState(false);
    const [startVideo, setStartVideo] = useState(false);
    playerOptions.height = window.screen.height-(window.screen.height*0.35);
    playerOptions.playerVars.mute = 0;
    let h = playerOptions.height.toString()+'px'

    const handleClick = (title) => {
        if(!startVideo){
            setStartVideo(true);
            if (trailerURL) {
                setTrailerURL("");
            } else {
                setVidError(false);
                setIsVideoLoading(true);
                movieTrailer(title)
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerURL(urlParams.get("v"));
                    })
                    .catch((e) => {
                        setTrailerURL("");
                        setVidError(true);
                    })
            }
        }
    };
    useEffect(() => {
        if(!isMainMenu){
            handleClick(title)
        }
    }, [title])


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div>
        <MovieHeader imageUrl={imageUrl}>
            <MovieHeaderContent>
                <MovieTitle> {title}</MovieTitle>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div style={{width: '300px'}}>
                        {isMainMenu ?
                            <Link to={`/movieDetails/${id}/${type}`}>
                                <MovieButton>Play</MovieButton>
                            </Link>
                            :
                            <MovieButton onClick={() => handleClick(title)}>Play</MovieButton>
                        }
                        <MovieButton>My List</MovieButton>
                    </div>
                    <div style={{width: '100%', display: 'flex', marginLeft: '20px'}}>
                        <div style={{width: '10%', color: 'lightgreen', fontWeight: '800'}}>Recommand at {popularity}%
                        </div>
                        <div> for : {!adults ? ' Adults' : ' All family'}</div>
                        <div style={{border: 'solid 1px', height: 'fit-content', marginLeft: '5px'}}> {year}</div>
                    </div>
                </div>
                {!isMainMenu ?
                <div style={{height: '200px', width: '30rem', lineHeight: '1.3rem', float: 'right'}}>
                    <div><span style={{color:'gray'}}>Genres</span> : {genres}</div>
                    <div><span style={{color:'gray'}}>Productions</span> : {productions}</div>
                    <div><span style={{color:'gray'}}>Languages</span> : {languages}</div>
                </div>:''}
                <MovieDescription style={{ display: 'flex'}}>
                    {isMainMenu ? truncate(overview,250):truncate(overview,500)}
                </MovieDescription>
            </MovieHeaderContent>
            <MovieFadeBottom/>
        </MovieHeader>
            <VideoContainer startVideo={startVideo} h={h}>
                {vidError ? <span style={{color:'white'}}>Oups something went wrong</span>:''}
                {(isVideoLoading && trailerURL==="")?
                    <LoaderWrapper data-testid='loader'>
                        <Loader id='myloader' style={{margin: '14% 0% 0 0'}}/>
                    </LoaderWrapper>
                    :
                    (startVideo ?
                            <YouTube
                                onPlay={e => setIsVideoLoading(false)}
                                onError={e => setVidError(true)}
                                videoId={trailerURL}
                                opts={playerOptions}
                            />:''
                    )}
            </VideoContainer>
        </div>
    )
}
export default  Banner