import React, {useRef, useState} from "react";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import {useFetchList} from "../../utils/hooks";
import {Link} from "react-router-dom";
import urls from "../../utils/urls";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";

export const RowContainer = styled.div`
    color: white;
    margin-left: 20px;
    overflow-y: hidden;
    overflow-x: hidden;   
`
export const RowPoster = styled.div`
    display: flex;
    overflow-y: hidden;
    scroll-behavior:smooth;
    padding: 20px;
    padding-right:300px;
    ::-webkit-scrollbar {
        display: none;
        float :right;
    }
`
export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    `
export const TrendNumber = styled.h1`
    font-size: 210px;
    height: fit-content;    
    color: black;
    width: fit-content;
    top: 0;
    margin: 0;
    -webkit-text-stroke: 2px white; 
    @media  only screen and (max-width:768px ){     
        font-size: 16vh;
    }    
`
export const Chevron = styled.div`
    position: absolute;
    z-index:100;
    opacity : 0.4;
    height:${({isLargeRow}) => isLargeRow ? '250px;' : '200px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
    background-color:gray;
    @media  only screen and (max-width:768px ){
        height:${({isLargeRow}) => isLargeRow ? '20vh' : '15vh'}; 
        width: 3vh;
    }  
    &:hover{
        opacity:.90;
        -moz-opacity:.50; 
        filter:alpha(opacity=50);         
    }
`
export const StyledImage = styled.img`
    object-fit: contain;
    max-height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '200px')};     
    height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '200px')};   
    margin-left: ${({useRank}) => useRank ? '-35px' : '10px'};   
    transition: transform 700ms;
      &:hover{      
        transform:  ${({isLargeRow}) => (isLargeRow ? 'scale(1.15)' : 'scale(1.25)')};
    }  
    max-width: ${({isLargeRow}) => isLargeRow ? '400px' : '400px'};           
    @media  only screen and (max-width:768px ){
        max-height:  ${({isLargeRow}) => (isLargeRow ? '20vh' : '15vh')};     
        height:  ${({isLargeRow}) => (isLargeRow ? '20vh' : '15vh')};    
        max-width: ${({isLargeRow}) => isLargeRow ? '30vh' : '30vh'};  
        &:hover{      
            transform:  scale(1.25);
        } 
    }           
    `


function RowBanner({title, url, isLargeRow,useRank,activeIndex,setActiveIndex}) {
    const myRef = useRef(null);
    const {isLoading, data, error} = useFetchList(url,useRank);
    const [scrollRight,setScrollRight]= useState(false);
    const [scrollLeft,setScrollLeft]= useState(false);
    const type = url.toString().includes('/tv') ? 'tv' : 'movie';
    const movies = data.map((movie)=>{return { ...movie, id : movie.id+title?.substring(0,3)}});
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    if (error) {
        return <span>Oups something went wrong</span>
    }

    const scrollToLeft = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isMobile ? screenWidth : isLargeRow ? screenWidth / 1.5 : screenWidth / 2;
        myRef.current.scrollLeft += screenWidth ;
    };

    const scrollToRight = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isMobile ? screenWidth : isLargeRow ? screenWidth / 1.5 : screenWidth / 2;
        myRef.current.scrollLeft -= screenWidth;
    };

    return (
        (isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <RowContainer id="RowContainer">
                    <h2>{title}</h2>
                    <Chevron style={{right: '0'}} icon={ChevronRight} onClick={scrollToLeft}  onMouseOver={()=>setScrollRight(true)} onMouseLeave={()=>setScrollRight(false)}  isLargeRow={isLargeRow}/>
                    <Chevron style={{left: '0'}} icon={ChevronLeft} onClick={scrollToRight} onMouseOver={()=>setScrollLeft(true)} onMouseLeave={()=>setScrollLeft(false)}  isLargeRow={isLargeRow}/>
                    <RowPoster id="RowPoster" ref={myRef}  scrollRight={scrollRight} scrollLeft={scrollLeft}>
                        {movies && movies.map((movie, index) => (
                                <div key={index +'_container'} style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {useRank ? <TrendNumber>{index + 1}</TrendNumber> :''}
                                    {!isMobile ?
                                        <Link key={`rows--${index}`} to={`/movieDetails/${movie.id}/${type}`}>
                                            <StyledImage
                                                key={movie.id}
                                                src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                                alt={movie.name}
                                                isLargeRow={isLargeRow}
                                                isActive={activeIndex === movie}
                                                onMouseEnter={() => {setActiveIndex({...movie,url:url})}}
                                                onTouchStart={() => {setActiveIndex({...movie,url:url})}}
                                                // onMouseLeave={() => {setActiveIndex(null)}}
                                                useRank={useRank}

                                            />
                                        </Link> :
                                        <StyledImage
                                            key={movie.id}
                                            src={`${urls.findImagesUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                            alt={movie.name}
                                            isLargeRow={isLargeRow}
                                            isActive={activeIndex === movie}
                                            onMouseEnter={() => {setActiveIndex({...movie,url:url})}}
                                            onTouchStart={() => {setActiveIndex({...movie,url:url})}}
                                            // onMouseLeave={() => {setActiveIndex(null)}}
                                            useRank={useRank}

                                        />
                                    }

                                </div>
                        ))
                        }
                    </RowPoster>
                </RowContainer>)
        ))
}
export default RowBanner;