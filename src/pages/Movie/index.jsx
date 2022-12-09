import React, {useState} from "react";
import urls from "../../utils/urls"
import styled from "styled-components";
import {useFetchById,playerOptions} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import {useParams} from "react-router";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    background: ${({image}) => 'url(' + image + ') ;'}
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
    width: 87rem;
    line-height: 1.3;
    padding-top: 0.5rem;
    font-size: 1.5rem;
    max-width: 120rem;
    height: 82px;
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

const MovieErrorLoader = styled.div`
    margin-top: 185px;
    top: 50px;
    left: 41%;
    position: absolute;
    color: black;
    height:440px;
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

function Movie() {
    const {id: myId, type: myType} = useParams()
    let url = urls.findById.replace('{type}', myType).replace('{id}', myId);
    const {isLoading, data, error} = useFetchById(url)
    let genres = data?.genres;
    let productions = data?.production_companies;
    let languages = data?.spoken_languages;
    let adults = data?.adult
    let year =  data?.release_date
    year = year?.toString().substring(0,4);
    genres = genres?.map((e) => e?.name).join(', ');
    productions = productions?.map((e) => e?.name).join(', ');
    languages = languages?.map((e) =>  Object.values(e)).flat().join(', ');
    let popularity = Math.ceil(data?.vote_average*10);
    const [trailerURL, setTrailerURL] = useState("");
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [vidError, setVidError] = useState(false);
    const [startVideo, setStartVideo] = useState(false);
    playerOptions.height = window.screen.height-(window.screen.height*0.35);
    playerOptions.playerVars.mute = 0;
    let h = playerOptions.height.toString()+'px'

    if (error || vidError) {
        return <MovieHeader><MovieErrorLoader><span>Oups something went wrong</span></MovieErrorLoader></MovieHeader>
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const handleClick = (movie) => {
        setStartVideo(true)
        if (trailerURL) {
            setTrailerURL("");
        } else {
            setVidError(false);
            setIsVideoLoading(true);
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get("v"));
                })
                .catch((e) => {
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
                <div style={{background: 'black',height:'100vh',    overflowX: 'hidden'}}>
                <MovieHeader image={data?.backdrop_path ? urls.findImagesUrl + data.backdrop_path : ''}>
                    <MovieHeaderContent>
                        <MovieTitle> {data?.title || data?.name || data?.original_name}</MovieTitle>
                        <div style={{  width: '100%',display: 'flex', flexDirection: 'row',justifyContent: 'center'}}>
                            <div style={{  width: '300px'}}>
                                <MovieButton onClick={() => handleClick(data)}>Play</MovieButton>
                                <MovieButton>My List</MovieButton>
                            </div>
                            <div style={{  width: '100%',display: 'flex',marginLeft:'20px'}}>
                                <div style={{width: '10%',   color:'lightgreen',fontWeight: '800'}}>Recommand at {popularity}%</div>
                                <div> for : {!adults ? 'Adults':' All family'}</div>
                                <div style={{border:'solid 1px', height: 'fit-content',marginLeft: '5px'}}> {year}</div>
                            </div>
                        </div>
                        <div style={{  height: '200px', width: '30rem', lineHeight: '1.2rem',float:'right'}}>
                            <div>Genres : {genres}</div>
                            <div>Productions : {productions}</div>
                            <div>Languages : {languages}</div>
                        </div>
                        <MovieDescription style={{width:'50%',display:'flex'}}>
                            {truncate(data?.overview, 250)}
                        </MovieDescription>

                    </MovieHeaderContent>
                    <MovieFadeBottom/>

                </MovieHeader>
                    <VideoContainer startVideo={startVideo} h={h}>
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
        )
    );
}

export default Movie;
