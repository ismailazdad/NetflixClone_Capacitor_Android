import React from "react";
import urls from "../../utils/urls"
import styled from "styled-components";
import {getInfo, useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import {useParams} from "react-router";
import BannerVideo from "../../components/BannerVideo";

const MovieHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    background: ${({image}) => 'url(' + image + ') ;'}
    background-position: center ;
`

const MovieErrorLoader = styled.div`
    margin-top: 185px;
    top: 50px;
    left: 41%;
    position: absolute;
    color: black;
    height:440px;
`
const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

function Movie() {
    const {id: myId, type: myType} = useParams()
    let url = urls.findById.replace('{type}', myType).replace('{id}', myId);
    const {isLoading, data, error} = useFetch(url,false)
    const {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,id,type} = getInfo(data,url);
    if (error ) {
        return <MovieHeader><MovieErrorLoader><span>Oups something went wrong</span></MovieErrorLoader></MovieHeader>
    }

    return (
        (isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div key={`${id}--bannerVideo`} style={{background: 'black',height:'100vh',    overflowX: 'hidden'}}>
                    <BannerVideo
                        imageUrl = {imageUrl}
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
                    />
                </div>
            )
        )
    );
}

export default Movie;
