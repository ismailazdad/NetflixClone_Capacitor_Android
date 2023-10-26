import urls from "../../utils/urls";
import {TEXT_COLLAPSE_OPTIONS, useFetch, useFetchListWithFallBack} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import ReactTextCollapse from "react-text-collapse"
import StarRating from "../StarRating";
import imdbImage from "../../assets/imdb.png";
import rotten from "../../assets/rotten.svg";
import metaCritic from "../../assets/metacritic.png";
import tvUrls from "../../utils/urls/tv";


function MovieReviews({id, language,imdbId,showComment, showType}) {
    const url = (showType && showType === "tv" ? tvUrls.findReviewsById.replace('{id}', id) + language.split("").slice(0,2).join("") : urls.findReviewsById.replace('{id}', id) + language.split("").slice(0,2).join(""))
    const fallBackUrl = (showType && showType === "tv" ? tvUrls.findReviewsById.replace('{id}', id).replace("&language=", ""): urls.findReviewsById.replace('{id}', id).replace("&language=", ""))
    const {isLoading, data,error} = useFetchListWithFallBack(url, fallBackUrl)
    const [isLoadingOmdbApi, dataOmdbApi] = useFetch( showType && showType === "tv" ? tvUrls.findReviewByImbId.replace('{tmdb_id}',imdbId) :urls.findReviewByImbId.replace('{tmdb_id}',imdbId), false)
    return (
        <div>
            <div>
                {isLoadingOmdbApi ? (
                    <LoaderWrapper data-testid='loader'>
                        <Loader style={{marginTop: '0vh'}}/>
                    </LoaderWrapper>
                ) :
                    <div style={{lineHeight: '1.4rem',display:'flex',justifyContent: "space-around"}}>
                        {dataOmdbApi && dataOmdbApi?.Ratings?.length > 0 && dataOmdbApi?.Ratings?.map((source, index) =>
                            <div key={index + '_container'} style={{display: "inline-block", marginTop: '2vh'}}>
                                {source['Source'] === "Internet Movie Database" ?
                                    <div>
                                        <a href={`https://m.imdb.com/title/${imdbId}`} target="_blank">
                                            <img alt={`${dataOmdbApi["Title"]}`}  style={{height: '4vh',width: '4vh'}}  src={imdbImage} />
                                        </a>
                                        <StarRating value={Math.floor(Number(source['Value'].split("/")[0]) / 2)}/>
                                    </div>
                                    : ""}
                                {source['Source'] === "Metacritic" ?
                                    <div>
                                        <a href={`https://www.metacritic.com/movie/${dataOmdbApi["Title"]?.replaceAll(" ", "-").replaceAll(":", "").replaceAll(".", "").replaceAll("'", "").toLowerCase()}`} target="_blank">
                                            <img alt={`${dataOmdbApi["Title"]}`} style={{height: '4vh',width: '4vh'}}  src={metaCritic} />
                                        </a>
                                        <StarRating value={Math.floor(Number(source['Value'].split("/")[0]) / 20)}/>
                                    </div>
                                    : ""}

                                {source['Source'] === "Rotten Tomatoes" ?
                                    <div>
                                        <a href={`https://www.rottentomatoes.com/m/${dataOmdbApi["Title"]?.replaceAll(" ", "_").replaceAll(":", "").replaceAll(".", "").replaceAll("'", "").toLowerCase()}`} target="_blank">
                                            <img alt={`${dataOmdbApi["Title"]}`} style={{height: '4vh',width: '4vh'}}  src={rotten} />
                                        </a>
                                        <StarRating value={Math.floor(Number(source['Value'].replace("%", "") / 20))}/>
                                    </div>
                                    : ""}
                            </div>
                        )}
                    </div>
                }

            </div>
            {showComment ?
            <div>
                {error ? <span style={{color: 'white'}}>Oups something went wrong</span> : ''}
                {isLoading ? (
                    <LoaderWrapper data-testid='loader'>
                        <Loader style={{marginTop: '0vh'}}/>
                    </LoaderWrapper>
                ) : ''}
                <div style={{lineHeight: '1.4rem'}}>
                    {data && data?.length > 0 && data?.map((review, index) =>
                        <div key={index + '_container'} style={{display: "inline-block", marginTop: '2vh'}}>
                            <div>
                                <span style={{color: 'gray'}}>author</span> : <span>{review?.author}</span>
                            </div>
                            {review.content.length > 200 ?
                                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                    <div style={{
                                        color: 'beige',
                                        textTransform: 'inherit',
                                        fontStyle: 'italic',
                                        position: 'relative'
                                    }}
                                         dangerouslySetInnerHTML={{__html: review.content}}/>
                                </ReactTextCollapse> :
                                <div style={{
                                    color: 'beige',
                                    textTransform: 'inherit',
                                    fontStyle: 'italic',
                                    position: 'relative'
                                }}
                                     dangerouslySetInnerHTML={{__html: review.content}}/>
                            }
                        </div>
                    )
                    }
                </div>
            </div>:''}
        </div>
    )
}

export default MovieReviews;