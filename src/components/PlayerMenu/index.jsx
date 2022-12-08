import {Link} from "react-router-dom";
import styled from "styled-components";
import React from "react";
import PlayButton from "../../assets/play2.png"

const MovieGenres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
const tvGenres = [{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}]

const PlayerContainer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2b2b2b;
  height: ${({isLargeRow}) => isLargeRow ? '70px' : '36px'} ;
  top: ${({isLargeRow}) => isLargeRow ? '9px' : '137px'};
  max-width : ${({isLargeRow}) => isLargeRow ? 'inherit' : '300px'};
  padding-top: 5px;
  font-size : 1em;
`
const PlaySubMenuButton = styled.button`       
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left:   ${({isLargeRow}) => isLargeRow ? '0.6rem' : '0.5rem'} ;
    height:   ${({isLargeRow}) => isLargeRow ? '32px' : '30px'} ;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 20px;
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    background-color: #c4c4c4;
    width :30px ;  
    margin-left: 6px;
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
}
`
const PlayerTitle = styled.h1`
    font-size: 1rem;
    font-weight: 500;
    margin-top: -1.5em;
    position: absolute;
`
const PlayerDescription = styled.h1`
    padding-left : 0.1rem;
    padding-top: 0.3rem;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    font-size: 0.65rem;
    max-width: 400px;
    height: 28px;
    margin: 0 0 0 0;
    overflow: hidden;    
    line-height: 0.9rem;
`
const GenresTypes = styled.div`
    display:initial;
    color:lightgreen;
    float:right;
    padding-right:1%;
    font-size: 1rem;
`
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function PlayerMenu({id,name,title,overview,media_type,genre_ids,popularity,vote_average,isLargeRow}) {
    let genresMovies =  genre_ids.map((item) => MovieGenres.find(x => x.id === item)?.name)
    let genresTv =  genre_ids.map((item) => tvGenres.find(x => x.id === item)?.name)
    let genres = genresMovies.concat(genresTv).filter((item,index)=>genresMovies.indexOf(item)===index);

    return (
        <PlayerContainer  isLargeRow={isLargeRow} key={`${id}--sub`}>
            <PlayerTitle> {title}</PlayerTitle>
            <Link  to={`/movie/${title ? title : name}`}>
                <PlaySubMenuButton isLargeRow={isLargeRow}><img src={PlayButton}/></PlaySubMenuButton>
            </Link>
            { genres.join(' . ')}
            {isLargeRow ?   <GenresTypes >{Math.ceil(vote_average*10)}%</GenresTypes>:''}
            <PlayerDescription>
                {isLargeRow ?truncate(overview, 150):''}
            </PlayerDescription>
        </PlayerContainer>
    )
}
export default PlayerMenu