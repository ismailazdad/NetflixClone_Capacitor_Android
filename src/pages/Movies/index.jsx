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
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

function Movies() {
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setLoading] = useState(false)


    const trendsTitles = [
        "star wars",
        "pulp fiction",
        "adams",
        "mon frere",
        "athena",
        "footloose",
    ];

    async function getData(title) {
        await axios.get("http://www.omdbapi.com/?apikey=2e1e970c&t=" + title)
            .then(res => {
                setMoviesList(prevTrends => [...prevTrends,res.data])
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
    useEffect( () => {
            const asyncRes =  Promise.all(trendsTitles.map((title) => {
                getData(title)
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

            <CardsContainer>
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

        )
    )
}

export default Movies
