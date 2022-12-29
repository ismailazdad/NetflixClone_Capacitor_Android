import React, {useState} from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import urls from "../../utils/urls"
import {useFetch, getInfo} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
//first version of movies page , showing poster and trailer inside the poster container
function Movies() {
    const {isLoading, data, error} = useFetch(urls.findNetflixOriginals,true);
    const {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,myId,type} = getInfo(data,urls.findNetflixOriginals);
    const [activeIndex, setActiveIndex] = useState(null);
    if (error) {
        return <span>Oups something went wrong</span>
    }
    return (
        <div style={{background: 'black'}}>
            {isLoading ? (
            <LoaderWrapper data-testid='loader'>
                <Loader/>
            </LoaderWrapper>
            ) : (
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
                isMainMenu={true}
            />
            )}
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Top Trending movie' url={urls.findActionMovies} useRank isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='NETFLIX ORIGINALS' url={urls.findNetflixOriginals} />
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Western Movies' url={urls.findWesternMovies} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='War Movies' url={urls.findWarMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Thriller Movies' url={urls.findThrillerMovies} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='SF Movies' url={urls.findSFMovies} />
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Mystery Movies' url={urls.findMysteryMovies} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Music Movies' url={urls.findMusicMovies} />
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Trending Tv ' url={urls.findTrendingTv} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='History Movies' url={urls.findHistoryMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Fantasy Movies' url={urls.findFantasyMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Top Rated' url={urls.findTopRated} useRank/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Family Movies' url={urls.findFamilyMovies} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Drama Movies' url={urls.findDramaMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Trending Movies' url={urls.findTrending}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Crime Movies' url={urls.findCrimeMovies} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Animation Movies' url={urls.findAnimationMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Adventure Movies' url={urls.findAdventureMovies} isLargeRow/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Comedy Movies' url={urls.findComedyMovies} useRank/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Horror Movies' url={urls.findHorrorMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Romance Movies' url={urls.findRomanceMovies}/>
            <Row activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Documentaries' url={urls.findDocumentaries}  isLargeRow/>
        </div>
    )
}


export default Movies
