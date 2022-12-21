import React, {useRef, useState} from "react";
import {playerOptions, useFetchList} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import ChevronLeft from "../../assets/chevronLeft.png"
import ChevronRight from "../../assets/chevronRight.png"
import {RowContainer,RowPoster,LoaderWrapper,Chevron} from "./style"
import VidePlayer from "../VideoPlayer";

function Row({title, url, isLargeRow}) {
    const myRef = useRef(null);
    const {isLoading, data, error} = useFetchList(url);
    const [scroll,setScroll]= useState(false);
    const [scrollLeft,setScrollLeft]= useState(false);
    const type = url.toString().includes('/tv') ? 'tv' : 'movie';
    const [activeIndex, setActiveIndex] = useState(null);
    playerOptions.height = '350';
    playerOptions.playerVars.mute = 1;
    const movies = data;
    // const movies = data.slice(4,8);

    if (error) {
        return <span>Oups something went wrong</span>
    }

    return (
        (isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <RowContainer id="RowContainer">
                    <h2>{title}</h2>
                    <Chevron  style={{right: '0'}} icon={ChevronRight} onMouseOver={()=>setScroll(true)} onMouseLeave={()=>setScroll(false)} isLargeRow={isLargeRow}/>
                    <Chevron  style={{left: '0'}} icon={ChevronLeft} onMouseOver={()=>setScrollLeft(true)} onMouseLeave={()=>setScrollLeft(false)}  isLargeRow={isLargeRow}/>
                    <RowPoster id="RowPoster" ref={myRef}  scroll={scroll} scrollL={scrollLeft}>
                        {/*activeIndex : {activeIndex}*/}
                        {movies && movies.map((movie, index) => (
                            <VidePlayer         isActive={ activeIndex === movie.id}
                                                onShow={() =>{setActiveIndex(movie.id);}}
                                                onLeave={()=>{setActiveIndex(null);}}
                                                isLargeRow={isLargeRow} movie={movie}
                                                scroll={scroll}
                                                scrollLeft={scrollLeft}
                                                index={index}
                                                type={type}>
                            </VidePlayer>
                        ))}
                    </RowPoster>
                </RowContainer>)
        ))
}
export default Row;