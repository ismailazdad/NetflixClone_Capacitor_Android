import React, {useContext, useEffect, useState} from "react";
import Banner from "../../components/Banner";
import urls from "../../utils/urls"
import { getActorMovieInfo, getGenres, useFetch} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import {useMediaQuery} from "react-responsive";
import {useParams} from "react-router";
import ActorBio from "../../components/ActorBio";
import {MoviesContext} from "../../utils/context";
import tvUrls from "../../utils/urls/tv";
import RowList from "../../components/RowList";

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const RowBannerContainer = styled.div`
    padding-top: 50vh;
    position: relative;
    @media  only screen and (max-width:768px ){
        padding-top: 30vh;
        height:auto;
    }  
`
//second version of movies page , showing poster and trailer in header
function Actor() {
    const {id,language,showType: urlShowType } = useParams()
    const url = (urlShowType && urlShowType === "tv" ? tvUrls.findActorById.replace("{id}",id) : urls.findActorById.replace("{id}",id))+language
    const [isLoadingActor, actor] = useFetch(url,false)
    const url2 = (urlShowType && urlShowType === "tv" ? tvUrls.findMoviesByActorId.replace("{id}",id) : urls.findMoviesByActorId.replace("{id}",id))+language
    const [isLoading, data, error] = useFetch(url2,true)
    const {currentMovie} = useContext(MoviesContext)
    const myGenres = currentMovie ? getGenres(data?.genre_ids)?.slice(0,3).join(', '): getGenres(currentMovie?.genre_ids)?.slice(0,3)?.join(', ')
    const {adults,year,popularity,imageUrl,title,overview,myId,character,imageUrlPoster} =  currentMovie ? getActorMovieInfo(currentMovie) :  getActorMovieInfo(data)
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const savedCart = localStorage.getItem('myList')
    const [myList, updateMyList] = useState(savedCart ? JSON.parse(savedCart) : [])
    const [showType, setShowType] = useState(urlShowType || "tv");
    useEffect(() => {
        localStorage.setItem('myList', JSON.stringify(myList))
    }, [myList])

    if (error && myList.length ===0) {
        return <span>Oups something went wrong</span>
    }

    const handleShowTypeChange = (newShowType) => {
        setShowType(newShowType);
    };

    return (
        <div style={{background: 'black',color:'white'}}>
            {isLoading ? (
                <LoaderWrapper >
                    <Loader />
                </LoaderWrapper>
            ) : (
                <div className="fixed-top" >
                    <Banner
                        imageUrl={imageUrl}
                        imageUrlPoster={imageUrlPoster}
                        title={title}
                        adults={adults}
                        popularity={popularity}
                        year={year}
                        genres={myGenres}
                        overview={overview}
                        id={myId}
                        isMainMenu={true}
                        showDescription={false}
                        isMobile={isMobile}
                        focus={false}
                        touchState={false}
                        language={language}
                        character={actor?.name +' role : '+character}
                        showSimilar={false}
                        myList={myList}
                        updateMyList={updateMyList}
                        showType={showType}
                    />
                </div>

            )}
            <RowBannerContainer>
                {isLoadingActor ?
                    <LoaderWrapper >
                        <Loader />
                    </LoaderWrapper>
                :
                    <ActorBio id={id}  imageUrl={urls.findImagesUrl + actor?.profile_path} name={actor?.name}  place_of_birth={actor?.place_of_birth} biography={actor?.biography} birthday={actor?.birthday} gender={actor?.gender} profession={actor?.known_for_department}  />
                }
                <RowList sort={true} title={actor?.name+' Filmography'} url={
                    urls.findMoviesByActorId.replace("{id}",id).replace('original','w185')+language
                } onClick={()=>handleShowTypeChange("movie")} isLargeRow/>
                <RowList sort={true} title={actor?.name+' Tv Filmography'} url={
                    tvUrls.findMoviesByActorId.replace("{id}",id).replace('original','w185')+language
                } onClick={()=>handleShowTypeChange("tv")} isLargeRow/>
            </RowBannerContainer>
        </div>
    )
}
export default Actor