import React, {Component} from "react";
import styled from "styled-components";
import movieTrailer from "movie-trailer";
import {playerOptions} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import YouTube from "react-youtube";
import {Link} from "react-router-dom";
import './style.css'
import Header from "../Header";

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    position:absolute;
    z-index:100;
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
    height: 125px;
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

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

class BannerVideo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trailerURL: "",
            isVideoLoading: false,
            vidError: false,
            startVideo: false,
        }
        playerOptions.height = window.screen.height - (window.screen.height * 0.35);
        playerOptions.playerVars.mute = 0;
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
            this.setStartVideo(true);
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

    render() {
        const {imageUrl, title, adults, popularity, year, genres, productions, languages, overview, isMainMenu, id, type} = this.props
        return (
            <div>
                <Header/>
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
                                    <MovieButton onClick={() => this.handleClick(title)}>Play</MovieButton>
                                }
                                <MovieButton>My List</MovieButton>
                            </div>
                            <div style={{width: '100%', display: 'flex', marginLeft: '20px'}}>
                                <div style={{width: '10%', color: 'lightgreen', fontWeight: '800'}}>Recommand
                                    at {popularity}%
                                </div>
                                <div> for : {!adults ? ' Adults' : ' All family'}</div>
                                <div style={{
                                    border: 'solid 1px',
                                    height: 'fit-content',
                                    marginLeft: '5px'
                                }}> {year}</div>
                            </div>
                        </div>
                        {!isMainMenu ?
                            <div style={{height: '200px', width: '30rem', lineHeight: '1.3rem', float: 'right'}}>
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
                        (this.state.startVideo ?
                                <YouTube className='video-background'
                                         onPlay={e => this.setIsVideoLoading(false)}
                                         onError={e => this.setVidError(true)}
                                         videoId={this.state.trailerURL}
                                         opts={playerOptions}
                                /> : ''
                        )}
                </div>
            </div>
        )
    }
}

export default BannerVideo