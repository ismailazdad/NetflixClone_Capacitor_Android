import React from "react";
import urls from "../../utils/urls"
import styled from "styled-components";
import {useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";

const BannerHeader = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
    background-size: cover;
    // background: ${({image}) => 'url(' + image + ') no-repeat;'};
    background: ${({image}) => 'url(' + image + ') ;'};
    background-position: "center center",
`
const BannerContent = styled.div`
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
`
const BannerTitle = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
`
const BannerDescription = styled.h1`
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
`

const BannerButton = styled.button`
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`

const BannerFadeBottom = styled.div`
    height: 7.4rem;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37, 37, 37, 0.61),
        #111  
    );
`

const ErrorLoader = styled.div`
margin-top: 185px;
top: 50px;
left: 41%;
position: absolute;
color: black;
height:440px;
`
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Banner() {
    const {isLoading, data, error} = useFetch(urls.findNetflixOriginals, true)
    if (error) {
        return <BannerHeader><ErrorLoader><span>Oups something went wrong</span></ErrorLoader></BannerHeader>
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (

        (isLoading ? (
            <LoaderWrapper data-testid='loader'>
                <Loader/>
            </LoaderWrapper>
        ) : (
            <BannerHeader image={data?.backdrop_path ? urls.findImagesUrl + data.backdrop_path : ''}>
                <BannerContent>
                    <BannerTitle>
                        {data?.title || data?.name || data?.original_name}
                    </BannerTitle>
                    <div>
                        <BannerButton>Play</BannerButton>
                        <BannerButton>My List</BannerButton>
                    </div>
                    <BannerDescription>
                        {truncate(data?.overview, 150)}
                    </BannerDescription>
                </BannerContent>
                <BannerFadeBottom/>
            </BannerHeader>
        ))
    );
}

export default Banner;
