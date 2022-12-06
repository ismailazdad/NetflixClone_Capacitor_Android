import React, {useRef, useState} from "react";
import YouTube from "react-youtube";
import urls from "../../utils/urls";
import movieTrailer from "movie-trailer";
import {useFetchList} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"

const RowContainer = styled.div`
    color: white;
    margin-left: 20px;
`
const RowPoster = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-behavior:smooth;
    padding: 20px;
    ::-webkit-scrollbar {
    display: none;
}
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledImage = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 100px;
  margin-right: 10px;
  transition: transform 450ms;
  &:hover{
    transform: scale(1.08);
  }
`
const StyledBigImage = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 100px;
  margin-right: 10px;
  transition: transform 450ms;
  max-height: 250px;
   &:hover{
      transform: scale(1.09);
  }
`

const ChevronL = styled.div`
    float: right;
    position: inherit;
    // height: 246px;
    height:${({large}) =>large ? '251px;' : '100px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
    &:hover{
          opacity:.50;
          -moz-opacity:.50; 
          filter:alpha(opacity=50); 
    }
`

const ChevronR = styled.div`
    float: left;
    position: inherit;
    height:${({large}) =>large ? '251px;' : '100px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
     &:hover{
          opacity:.50;
          -moz-opacity:.50; 
          filter:alpha(opacity=50);         
    }
`

function Row({title, url, isLargeRow}) {
    const myRef = useRef(null);
    const [isOpenL,setIsOpenL] = useState(false)
    const [isOpenR,setIsOpenR] = useState(true)

    const scrollLeft = function () {
        const leftsize = isLargeRow ? 200 : 250;
        const ec = myRef.current.offsetWidth - myRef.current.scrollLeft;
        if(ec <= myRef.current.offsetWidth * 0.15){
            setIsOpenR(false);
            setIsOpenL(true);
        }else if(ec <= myRef.current.offsetWidth * 0.40){
            setIsOpenR(true);
            setIsOpenL(true);
        }
        myRef.current.scrollLeft += leftsize;
    };

    const scrollRight = function () {
        const leftsize = isLargeRow ? 200 : 250;
        const ec = myRef.current.offsetWidth - myRef.current.scrollLeft;
        if(myRef.current.scrollLeft <=leftsize){
            setIsOpenR(true);
            setIsOpenL(false);
        }else if(ec <= myRef.current.offsetWidth * 0.40){
            setIsOpenR(true);
            setIsOpenL(true);
        }
        myRef.current.scrollLeft -= leftsize
    };

    const [trailerURL, setTrailerURL] = useState("");
    const {isLoading, data, error} = useFetchList(url);
    const movies = data;
    if (error) {
        return <span>Oups something went wrong</span>
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        (isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <RowContainer id="RowContainer">
                    <h2>{title}</h2>
                    {isOpenR ?
                        <ChevronL icon={ChevronRight} onClick={scrollLeft} large={isLargeRow} />:''
                     }
                    {isOpenL ?
                        <ChevronR icon={ChevronLeft}  onClick={scrollRight} large={isLargeRow} />:''
                    }
                    <RowPoster id="RowPoster" ref={myRef}>
                        {movies && movies.map((movie) => (
                            (isLargeRow === true ?
                                (
                                    <StyledBigImage
                                        onClick={() => handleClick(movie)}
                                        key={movie.id}
                                        src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                        alt={movie.name}
                                    />
                                ) : (
                                    <StyledImage
                                        onClick={() => handleClick(movie)}
                                        key={movie.id}
                                        src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                        alt={movie.name}
                                    />
                                ))
                        ))
                        }
                    </RowPoster>
                    {trailerURL && <YouTube videoId={trailerURL} opts={opts}/>}
                </RowContainer>)
        ))
}

export default Row;
