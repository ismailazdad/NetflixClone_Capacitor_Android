import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import urls from "../../utils/urls"


function Movies() {

    return (
        <div style={{background:'black'}}>
        <Banner />
        <Row title='NETFLIX ORIGINALS' url={urls.findNetflixOriginals} isLargeRow/>
        <Row title='Trending Now' url={urls.findTrending} />
        <Row title='Top Rated' url={urls.findTopRated} />
        <Row title='Action Movies' url={urls.findActionMovies} />
        <Row title='Comedy Movies' url={urls.findComedyMovies} isLargeRow/>
        <Row title='Horror Movies' url={urls.findHorrorMovies} />
        <Row title='Romance Movies' url={urls.findRomanceMovies} />
        <Row title='Documentaries' url={urls.findDocumentaries} isLargeRow/>
        </div>

    )
}


export default Movies
