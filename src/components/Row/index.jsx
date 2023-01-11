import React, {useRef, useState} from "react";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import {Chevron, LoaderWrapper, RowContainer, RowPoster, TrendNumber} from "./style"
import VideoPlayer from "../VideoPlayer";
import {useFetchList} from "../../utils/hooks";
import {useMediaQuery} from "react-responsive";

function Row({title, url, isLargeRow,useRank,activeIndex,setActiveIndex}) {
    const myRef = useRef(null);
    const {isLoading, data, error} = useFetchList(url,useRank);
    const [scrollRight,setScrollRight]= useState(false);
    const [scrollLeft,setScrollLeft]= useState(false);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    const type = url.toString().includes('/tv') ? 'tv' : 'movie';
    const movies = data.map((movie)=>{return { ...movie, id : movie.id+title?.substring(0,3)}});
    if (error) {
        return <span>Oups something went wrong</span>
    }

    const scrollToLeft = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isMobile ? screenWidth  : isLargeRow ? screenWidth/1.5 : screenWidth/2;
        myRef.current.scrollLeft += screenWidth ;
    };

    const scrollToRight = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isMobile ? screenWidth  : isLargeRow ? screenWidth/1.5 : screenWidth/2;
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
                                    <VideoPlayer isActive={activeIndex === movie.id}
                                                onShow={() => {setActiveIndex(movie.id)}}
                                                onLeave={() => {setActiveIndex(null)}}
                                                isLargeRow={isLargeRow}
                                                movie={movie}
                                                scrollRight={scrollRight}
                                                scrollLeft={scrollLeft}
                                                index={index}
                                                type={type}
                                                key={index + '_vid'}
                                                useRank={useRank}
                                    />
                                </div>
                        ))
                        }
                    </RowPoster>
                </RowContainer>)
        ))
}
export default Row;