import React, {useEffect, useState} from "react";
import styled from "styled-components";
import movieTrailer from "movie-trailer";
import {playerOptions} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import YouTube from "react-youtube";
import {Link} from "react-router-dom";
import { useCallback } from 'react'
import './style.css'

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    background: ${({imageUrl}) => 'url(' + imageUrl + ') ;'}
    background-position: center;   
    user-select: none;
`
const MovieHeaderContent = styled.div`
    margin-left: 30px;
    padding-top: 140px;
    z-index: 10000;
    position: absolute;
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
    font-size:${({textLen}) =>  textLen < 170  ? '' : '1.5rem'}; 
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
    width: 100%;
    position: absolute;
    bottom: -0.5vh;
    z-index: 1000;
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    position:absolute;
    z-index: 1000;
    margin: -15% 0% 0% 45%;
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
`
function Banner({imageUrl,title,adults,popularity,year,genres,productions,languages,overview,isMainMenu,id,type,showDescription}){
    const [trailerURL, setTrailerURL] = useState("");
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [vidError, setVidError] = useState(false);
    playerOptions.height = window.screen.height-(window.screen.height*0.35);
    playerOptions.playerVars.mute = 1;

    const handleClick = useCallback((title) => {
        setTrailerURL("");
        setVidError(false);
        setIsVideoPlaying(false);
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
    },[]);

    useEffect(() => {
        if(!isMainMenu){
         handleClick(title);
        }
    }, [title,handleClick,isMainMenu])


    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <MovieHeader imageUrl={imageUrl} isVideoPlaying={isVideoPlaying}>
            <MovieHeaderContent id='test'>
                <MovieTitle> {title}</MovieTitle>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div style={{width: '300px'}}>
                            <Link to={`/movieDetails/${id}/${type}`}>
                                <MovieButton>Play</MovieButton>
                            </Link>
                        <MovieButton>My List</MovieButton>
                    </div>
                    <div style={{width: '100%', display: 'flex', marginLeft: '20px'}}>
                        <div style={{width: '10%', color: 'lightgreen', fontWeight: '800'}}>Recommand at {popularity}%
                        </div>
                        <div> for : {!adults ? ' Adults' : ' All family'}</div>
                        <div style={{border: 'solid 1px', height: 'fit-content', marginLeft: '5px'}}> {year}</div>
                    </div>
                </div>
                {showDescription ?
                <div style={{height: '200px', width: '30rem', lineHeight: '1.3rem', float: 'right'}}>
                    <div><span style={{color:'gray'}}>Genres</span> : {genres}</div>
                    <div><span style={{color:'gray'}}>Productions</span> : {productions}</div>
                    <div><span style={{color:'gray'}}>Languages</span> : {languages}</div>
                </div>:''}
                <MovieDescription style={{ display: 'flex'}} textLen={overview.length}>
                    {isMainMenu ? truncate(overview,250):truncate(overview,500)}
                </MovieDescription>
            </MovieHeaderContent>
            {!isMainMenu && trailerURL?
            <LoaderContainer >
                {vidError ? <span style={{color:'white'}}>Oups something went wrong</span>:''}
                {/*better rendering without loading icon*/}
                {/*{(isVideoLoading )?*/}
                {/*    <LoaderWrapper data-testid='loader'>*/}
                {/*        <Loader id='myloader'/>*/}
                {/*    </LoaderWrapper>*/}
                {/*    :''}*/}
                    <VideoContainer isVideoLoading={isVideoLoading}>
                        <YouTube id='vidPlayer' className='video-background-banner'
                                 onPlay={e => {setIsVideoLoading(false);setIsVideoPlaying(true)}}
                                 onError={e => {setVidError(true);setIsVideoPlaying(false)}}
                                 onReady={e=>{setIsVideoPlaying(false);setIsVideoLoading(true);}}
                                 videoId={trailerURL}
                                 opts={playerOptions}
                        />
                    </VideoContainer>
            </LoaderContainer>
            :''}
            <MovieFadeBottom id='test2' />
        </MovieHeader>
    )
}
export default  Banner