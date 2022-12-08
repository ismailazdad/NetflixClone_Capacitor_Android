import React from "react";
import urls from "../../utils/urls"
import styled from "styled-components";
import {useFetch, useFetch2} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import {useParams} from "react-router";

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    background: ${({image}) => 'url(' + image + ') ;'}
    background-position: center ;
`
const MovieContent = styled.div`
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
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
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
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Movie() {
    // const {title:title} = useParams()
    const {id: myTitle} = useParams()
    const {isLoading, data, error} = useFetch(urls.findTv+myTitle)
    const {isLoading2, data2, error2} = useFetch(urls.findMovie+myTitle)
    console.log(data,data2)

    const dataFinal = data ? Object.values(data).length === 0 ? data2: data : data2
    if (error) {
        return <MovieHeader><MovieErrorLoader><span>Oups something went wrong</span></MovieErrorLoader></MovieHeader>
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        (isLoading ? (
            <LoaderWrapper data-testid='loader'>
                <Loader/>
            </LoaderWrapper>
        ) : (
            <MovieHeader image={dataFinal?.backdrop_path ? urls.findImagesUrl + dataFinal.backdrop_path : ''}>
                <MovieContent>
                    <MovieTitle>
                        {dataFinal?.title || dataFinal?.name || dataFinal?.original_name}
                    </MovieTitle>
                    <div>
                        <MovieButton>Play</MovieButton>
                        <MovieButton>My List</MovieButton>
                    </div>
                    <MovieDescription>
                        {truncate(dataFinal?.overview, 150)}
                    </MovieDescription>
                </MovieContent>
                <MovieFadeBottom/>
            </MovieHeader>
        ))
    );
}

export default Movie;
