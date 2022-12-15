import {Link} from "react-router-dom";
import styled from "styled-components";
import React from "react";
import PlayButton from "../../assets/play2.png"
import {MovieGenres,tvGenres} from "../../utils/hooks";

const PlayerContainer = styled.div`
  position: sticky;
  // bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2b2b2b;
  height: ${({isLargeRow}) => isLargeRow ? '70px' : '36px'} ;
  margin-top: ${({isLargeRow}) => isLargeRow ? '-5rem' : '-7rem'};
  max-width : ${({isLargeRow}) => isLargeRow ? 'inherit' : '300px'};
  padding-top: 10px;
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

function PlayerMenu({id,name,title,overview,media_type,genre_ids,popularity,vote_average,isLargeRow,type}) {
    let genresMovies =  genre_ids.map((item) => MovieGenres.find(x => x.id === item)?.name)
    let genresTv =  genre_ids.map((item) => tvGenres.find(x => x.id === item)?.name)
    let genres = genresMovies.concat(genresTv).filter((item,index)=>genresMovies.indexOf(item)===index);
    let notes = Math.ceil(vote_average*10)
    return (
        <PlayerContainer  isLargeRow={isLargeRow} key={`${id}--sub`}>
            <PlayerTitle> {title ? title : name}</PlayerTitle>
            <Link  to={`/movieDetails/${id}/${type}`}>
                <PlaySubMenuButton isLargeRow={isLargeRow}><img src={PlayButton}/></PlaySubMenuButton>
            </Link>
            <span style={{maxWidth:'50%'}}>{ genres.join(' . ')}</span>
            {isLargeRow ?   <GenresTypes >{notes}%</GenresTypes>:''}
            <PlayerDescription>
                {isLargeRow ?truncate(overview, 150):''}
            </PlayerDescription>
        </PlayerContainer>
    )
}
export default PlayerMenu