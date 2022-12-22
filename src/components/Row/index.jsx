import React, {useRef, useState} from "react";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import {Chevron, LoaderWrapper, RowContainer, RowPoster, TrendNumber} from "./style"
import VidePlayer from "../VideoPlayer";
import {useFetchList} from "../../utils/hooks";

function Row({title, url, isLargeRow,useRank,activeIndex,setActiveIndex}) {
    const myRef = useRef(null);
    const {isLoading, data, error} = useFetchList(url,useRank);
    const [scroll,setScroll]= useState(false);
    const [scrollLeft,setScrollLeft]= useState(false);
    const type = url.toString().includes('/tv') ? 'tv' : 'movie';
    const suffix = title.substring(0,3);
    const movies = data.map((movie)=>{return { ...movie, id : movie.id+suffix}});
    if (error) {
        return <span>Oups something went wrong</span>
    }

    const scrollToLeft = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isLargeRow ? screenWidth/1.5 : screenWidth/2;
        myRef.current.scrollLeft += screenWidth ;
    };

    const scrollToRight = function () {
        let screenWidth = window.innerWidth;
        screenWidth = isLargeRow ? screenWidth/1.5 : screenWidth/2;
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
                    <Chevron style={{right: '0'}} icon={ChevronRight} onClick={scrollToLeft}  onMouseOver={()=>setScroll(true)} onMouseLeave={()=>setScroll(false)}  isLargeRow={isLargeRow}/>
                    <Chevron style={{left: '0'}} icon={ChevronLeft} onClick={scrollToRight} onMouseOver={()=>setScrollLeft(true)} onMouseLeave={()=>setScrollLeft(false)}  isLargeRow={isLargeRow}/>
                    <RowPoster id="RowPoster" ref={myRef}  scroll={scroll} scrollL={scrollLeft}>
                        {movies && movies.map((movie, index) => (
                            useRank ?
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <TrendNumber>{index + 1}</TrendNumber>
                                    <VidePlayer isActive={activeIndex === movie.id}
                                                onShow={() => {setActiveIndex(movie.id)}}
                                                onLeave={() => {setActiveIndex(null)}}
                                                isLargeRow={isLargeRow}
                                                movie={movie}
                                                scroll={scroll}
                                                scrollLeft={scrollLeft}
                                                index={index}
                                                type={type}
                                                key={index + '_vid'}
                                                useRank={useRank}
                                    />
                                </div>
                                :
                                <VidePlayer isActive={ activeIndex === movie.id}
                                            onShow={() =>{setActiveIndex(movie.id)}}
                                            onLeave={()=>{setActiveIndex(null)}}
                                            isLargeRow={isLargeRow}
                                            movie={movie}
                                            scroll={scroll}
                                            scrollLeft={scrollLeft}
                                            index={index}
                                            type={type}
                                            key={index+'_vid'}
                                />

                        ))
                        }
                    </RowPoster>
                </RowContainer>)
        ))
}
export default Row;