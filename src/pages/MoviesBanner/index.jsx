import React, {useState} from "react";
import Banner from "../../components/Banner";
import RowBanner from "../../components/RowBanner";
import urls from "../../utils/urls"
import {getInfo, useFetch} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import {useMediaQuery} from "react-responsive";

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const RowBannerContainer = styled.div`
    padding-top: 50vh;
    position: relative;
    @media  only screen and (max-width:768px ){
        padding-top: 30vh;
    }  
`
//second version of movies page , showing poster and trailer in header
function MoviesBanner() {
    const {isLoading, data, error} = useFetch(urls.findNetflixOriginals,true);
    const [activeIndex, setActiveIndex] = useState(null);
    const {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,myId,type} = activeIndex ? getInfo(activeIndex,activeIndex.url):  getInfo(data,urls.findNetflixOriginals);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    if (error) {
        return <span>Oups something went wrong</span>
    }
    return (
        <div style={{background: 'black',color:'white'}}>
            {isLoading ? (
            <LoaderWrapper data-testid='loader'>
                <Loader/>
            </LoaderWrapper>
            ) : (
             <div className="fixed-top" >
                 <Banner
                     imageUrl={imageUrl}
                     title={title}
                     adults={adults}
                     popularity={popularity}
                     year={year}
                     genres={genres}
                     productions={productions}
                     languages={languages}
                     overview={overview}
                     id={myId}
                     type={type}
                     isMainMenu={false}
                     showDescription={false}
                     isMobile={isMobile}
                 />
             </div>

            )}
            <RowBannerContainer>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Top Trending movie' url={urls.findActionMovies} useRank isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='NETFLIX ORIGINALS' url={urls.findNetflixOriginals} />
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Western Movies' url={urls.findWesternMovies} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='War Movies' url={urls.findWarMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Thriller Movies' url={urls.findThrillerMovies} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='SF Movies' url={urls.findSFMovies} />
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Mystery Movies' url={urls.findMysteryMovies} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Music Movies' url={urls.findMusicMovies} />
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Trending Tv ' url={urls.findTrendingTv} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='History Movies' url={urls.findHistoryMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Fantasy Movies' url={urls.findFantasyMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Top Rated' url={urls.findTopRated} useRank/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Family Movies' url={urls.findFamilyMovies} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Drama Movies' url={urls.findDramaMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Trending Movies' url={urls.findTrending}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Crime Movies' url={urls.findCrimeMovies} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Animation Movies' url={urls.findAnimationMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Adventure Movies' url={urls.findAdventureMovies} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Comedy Movies' url={urls.findComedyMovies} useRank/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Horror Movies' url={urls.findHorrorMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Romance Movies' url={urls.findRomanceMovies}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Documentaries' url={urls.findDocumentaries}  isLargeRow/>
            </RowBannerContainer>
        </div>
    )
}
export default MoviesBanner