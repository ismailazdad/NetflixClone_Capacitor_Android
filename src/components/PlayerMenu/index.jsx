import {Link} from "react-router-dom";
import styled from "styled-components";
import React from "react";
import PlayButton from "../../assets/play2.png"
import {MovieGenres,TvGenres} from "../../utils/hooks";
import InfoSvg from "../../assets/info.svg"
const PlayerContainer = styled.div`
  position: sticky;
  left: 0;
  width: 100%;
  background-color: #2b2b2b;
  height: ${({isLargeRow}) => isLargeRow ? '70px' : '36px'} ;
  margin-top: ${({isLargeRow}) => isLargeRow ? '-5.5rem' : '-6rem'};
  max-width : inherit;
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
    padding-top: 0.2rem;
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
    margin-top: -2.5em;
    position: absolute;
`
const PlayerDescription = styled.h1`
    padding-left : 0.1rem;
    // padding-top: 0.1rem;
    width: auto;
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

function PlayerMenu({id,name,title,overview,media_type,genre_ids,popularity,vote_average,isLargeRow,type,onDetails}) {
    let genresMovies =  genre_ids.map((item) => MovieGenres.find(x => x.id === item)?.name)
    let genresTv =  genre_ids.map((item) => TvGenres.find(x => x.id === item)?.name)
    let genres = genresMovies.concat(genresTv).filter((item,index)=>genresMovies.indexOf(item)===index);
    let notes = Math.ceil(vote_average*10)
    return (
        <PlayerContainer  isLargeRow={isLargeRow} key={`${id}--sub`}>
            <PlayerTitle> {title ? title : name}</PlayerTitle>
            <Link  to={`/movieDetails/${id}/${type}`}>
                <PlaySubMenuButton isLargeRow={isLargeRow}><img alt='' src={PlayButton}/></PlaySubMenuButton>
            </Link>
              <GenresTypes >{notes}%</GenresTypes>
            <span style={{maxWidth:'30%'}}>{isLargeRow ? genres.slice(0,2).join(' . '):genres.slice(0,2).join(' . ')}</span>
            <div title='more details' onClick={onDetails} style={{position:'relative',float:'right', right:'10px'}}>
                <img alt='' src={InfoSvg}/>
            </div>
            <PlayerDescription >
                {isLargeRow ?truncate(overview, 120):''}
            </PlayerDescription>
        </PlayerContainer>
    )
}
export default PlayerMenu