import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components"
import {Loader} from "../../utils/style/Atoms";
import Card from "../../components/Card";

export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;  
`
const CardsContainer = styled.div`
    display: inline-flex;
    gap: 18px;
    align-items: center;
    justify-items: center;
    height : 380px;
    // overflow:hidden;
    display: -webkit-box;
    flex-direction: row-reverse;
    flex: 1;
`
const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: #000000;
    overflow:hidden;
`


const HomerContainer = styled.div`
    display: flex;
    width : 100%;
    // height : 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top:16%;
    // border:solid 1px red;
`


function Movies() {
    const [moviesList, setMoviesList] = useState([]);
    const [moviesList2, setMoviesList2] = useState([]);
    const [moviesList3, setMoviesList3] = useState([]);
    const [isLoading, setLoading] = useState(false)


    const trendsTitles = [
        "star wars",
        "pulp fiction",
        "adams",
        "mon frere",
        "athena",
        "footloose",
        "malefique",
        "indiana",
        "indiana",
    ];
    const trendsTitles2 = [
        "garfield",
        "ring",
        "bad taste",
        "Apocalypto",
        "dogville",
        "underground",
        "marathon man",
        "spider man"
    ];
    const trendsTitles3 = [
        "garfield",
        "ring",
        "bad taste",
        "Apocalypto",
        "dogville",
        "underground",
        "marathon man",
        "spider man"
    ];

    async function getData(title, setMoviesList) {
        await axios.get("http://www.omdbapi.com/?apikey=2e1e970c&t=" + title)
            .then(res => {
                setMoviesList(prevTrends => [...prevTrends, res.data])
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(e => {
                console.log(moviesList)
                setLoading(false)
            })
    }


    /**************************************************************************/
    useEffect(() => {
        const asyncRes = Promise.all(trendsTitles.map((title) => {
            getData(title, setMoviesList)
        }))
        const asyncRes2 = Promise.all(trendsTitles2.map((title) => {
            getData(title, setMoviesList2)
        }))
        const asyncRes3 = Promise.all(trendsTitles3.map((title) => {
            getData(title, setMoviesList3)
        }))
        setLoading(false)
    }, []);
    /**************************************************************************/


    if (moviesList.length === 0) return <div>No results...</div>;
    return (
        isLoading ? (
            <LoaderWrapper data-testid='loader'>
                <Loader/>
            </LoaderWrapper>
        ) : (
            <HomeWrapper id="homewraper">
                <HomerContainer id="homecontainer">
                    <label style={{color: 'white', position: 'relative', marginTop: '26px'}}>Film primee</label>
                    <CardsContainer id="one">
                        {moviesList.map((movie, index) => (
                            <Card
                                key={`${movie['imdbID']}-${index}`}
                                // type={movie['type']}
                                // title={movie['Title']}
                                // year={movie['Year']}
                                picture={movie['Poster']}
                            />
                        ))}
                    </CardsContainer>
                    <label style={{color: 'white', position: 'relative', marginTop: '26px'}}>Film Culte</label>
                    <CardsContainer id="two">
                        {moviesList2.map((movie, index) => (
                            <Card
                                key={`${movie['imdbID']}-${index}`}
                                // type={movie['type']}
                                // title={movie['Title']}
                                // year={movie['Year']}
                                picture={movie['Poster']}
                            />
                        ))}
                    </CardsContainer>

                    <label style={{color: 'white', position: 'relative', marginTop: '26px'}}>Vous pourriez aimez</label>
                    <CardsContainer id="two">
                        {moviesList3.map((movie, index) => (
                            <Card
                                key={`${movie['imdbID']}-${index}`}
                                // type={movie['type']}
                                // title={movie['Title']}
                                // year={movie['Year']}
                                picture={movie['Poster']}
                            />
                        ))}
                    </CardsContainer>
                </HomerContainer>
            </HomeWrapper>

        )
    )
}

export default Movies
