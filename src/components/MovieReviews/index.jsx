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


function MovieReviews({id, language, showType}) {
    const url = (showType && showType === "tv" ? tvUrls.findReviewsById.replace('{id}', id) + language.split("").slice(0,2).join("") : urls.findReviewsById.replace('{id}', id) + language.split("").slice(0,2).join(""))
    const fallBackUrl = (showType && showType === "tv" ? tvUrls.findReviewsById.replace('{id}', id).replace("&language=", ""): urls.findReviewsById.replace('{id}', id).replace("&language=", ""))
    const {isLoading, data,error} = useFetchListWithFallBack(url, fallBackUrl)

    return (
            <div>
                {error ? <span style={{color: 'white'}}>Oups something went wrong</span> : ''}
                {isLoading ? (
                    <LoaderWrapper data-testid='loader'>
                        <Loader style={{marginTop: '0vh'}}/>
                    </LoaderWrapper>
                ) : ''}
                <div style={{lineHeight: '1.4rem'}}>
                    {(data && data.length > 0) && (
                        <>
                            <br/>
                            <h3 style={{marginTop: '1vh'}}> Review </h3>
                        </>
                    )}
                    {data && data?.length > 0 && data?.map((review, index) =>
                        <div key={index + '_container'} style={{display: "inline-block"}}>
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
            </div>
    )
}

export default MovieReviews;