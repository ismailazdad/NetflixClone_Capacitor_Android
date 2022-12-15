import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import urls from "../../utils/urls"
import {useFetch, getInfo, useFetchTmp} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

function Movies() {
    const {isLoading, data, error} = useFetch(urls.findNetflixOriginals,true);
    const {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,myId,type} = getInfo(data,urls.findNetflixOriginals);

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
            <Row title='NETFLIX ORIGINALS' url={urls.findTrending} isLargeRow/>
            <Row title='Trending tv Now' url={urls.findActionMovies} />
            <Row title='Top Rated' url={urls.findTopRated} isLargeRow/>
            <Row title='Action Movies' url={urls.findTrendingTv }/>
            <Row title='Comedy Movies' url={urls.findComedyMovies} isLargeRow/>
            <Row title='Horror Movies' url={urls.findHorrorMovies}/>
            <Row title='Romance Movies' url={urls.findRomanceMovies}/>
            <Row title='Documentaries' url={urls.findDocumentaries} isLargeRow/>
        </div>

    )
}


export default Movies
