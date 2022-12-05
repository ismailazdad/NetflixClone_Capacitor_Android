import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components"
import {Loader} from "../../utils/style/Atoms";
import Card from "../../components/Card";
import Banner from "../../components/Banner";
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


const HomeContainer = styled.div`
    display: flex;
    width : 100%;
    // height : 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // margin-top:20%;
    // border:solid 1px red;
    background-color: #000000;
    // position:absolute;
`

const HeaderContainer = styled.div`
    // border:solid 1px green;
    width : 100%;
    height: 70vh;
    background-color:red;
    background: ${({ image }) => 'url('+image+') no-repeat;' };
    background-size : cover;
    // background-position: center;
    background-position: bottom;
    // background-position: top;
`


function Movies() {
    const [moviesList, setMoviesList] = useState([]);
    const [moviesList2, setMoviesList2] = useState([]);
    const [moviesList3, setMoviesList3] = useState([]);
    const [mainMovie, setMainMovie] = useState({})
    const [isLoading, setLoading] = useState(false)
    const url = process.env.REACT_APP_API_URL;

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
        "squid game",
        "lord of ",
        "braindead",
        "ip man",
        "recall",
        "blonde",
        "burton",
        "ant-man"
    ];

    async function getData(url, setMoviesList) {
        await axios.get(url)
            .then(res => {
                setMoviesList(prevTrends => [...prevTrends, res.data])
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(e => {
                // console.log(moviesList)
                setLoading(false)
            })
    }

    async function getMainData(url) {
        await axios.get(url)
            .then(res => {
                setMainMovie(res ? res : undefined)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(e => {
                // console.log(moviesList)
                setLoading(false)
            })
    }

    /**************************************************************************/
    useEffect(() => {
        const fetchData = async () => {
            await getMainData("http://www.omdbapi.com/?apikey=2e1e970c&y=2022&plot=full&t=godfather")
            // await getMainData("http://www.omdbapi.com/?apikey=2e1e970c&y=2022&plot=full&t=rocky")
        };

        fetchData()
        const asyncRes = Promise.all(trendsTitles.map((title) => {
            getData("http://www.omdbapi.com/?apikey=2e1e970c&t=" + title, setMoviesList)
        }))
        const asyncRes2 = Promise.all(trendsTitles2.map((title) => {
            getData("http://www.omdbapi.com/?apikey=2e1e970c&t=" + title, setMoviesList2)
        }))
        const asyncRes3 = Promise.all(trendsTitles3.map((title) => {
            getData("http://www.omdbapi.com/?apikey=2e1e970c&t=" + title, setMoviesList3)
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
            <div>
                {/*<div id={"test"}>{JSON.stringify(mainMovie)}</div>*/}
                {/*<HeaderContainer image={mainMovie.data.Poster}>*/}
                {/*</HeaderContainer>*/}
                <Banner />
                <HomeWrapper id="homewraper">

                    <HomeContainer id="homecontainer">
                        <label style={{color: 'white', position: 'relative'}}>Film primee</label>
                        <CardsContainer id="one">
                            {moviesList.map((movie, index) => (
                                <Card
                                    key={`${movie['imdbID']}-${index}`}
                                    type={movie['type']}
                                    title={movie['Title']}
                                    year={movie['Year']}
                                    picture={movie['Poster']}
                                />
                            ))}
                        </CardsContainer>
                        <label style={{color: 'white', position: 'relative'}}>Film Culte</label>
                        <CardsContainer id="two">
                            {moviesList2.map((movie, index) => (
                                <Card
                                    key={`${movie['imdbID']}-${index}`}
                                    type={movie['type']}
                                    title={movie['Title']}
                                    year={movie['Year']}
                                    picture={movie['Poster']}
                                />
                            ))}
                        </CardsContainer>

                        <label style={{color: 'white', position: 'relative'}}>Vous pourriez
                            aimez</label>
                        <CardsContainer id="three">
                            {moviesList3.map((movie, index) => (
                                <Card
                                    key={`${movie['imdbID']}-${index}`}
                                    type={movie['type']}
                                    title={movie['Title']}
                                    year={movie['Year']}
                                    picture={movie['Poster']}
                                />
                            ))}
                        </CardsContainer>
                    </HomeContainer>
                </HomeWrapper>
            </div>

        )
    )
}

export default Movies
