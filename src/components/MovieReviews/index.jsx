import urls from "../../utils/urls";
import {useFetchListWithFallBack} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import ReactTextCollapse from "react-text-collapse"
import {TEXT_COLLAPSE_OPTIONS} from "../../utils/hooks";


function MovieReviews({id, language}) {
    const {isLoading, data,error} = useFetchListWithFallBack(urls.findReviewsById.replace('{id}', id) + language.split("").slice(0,2).join(""), urls.findReviewsById.replace('{id}', id).replace("&language=", ""))
    return (
                <div>
                    {error ? <span style={{color:'white'}}>Oups something went wrong</span>:''}
                    {data?.length ===0 ? ' no reviews...':''}
                    {isLoading ? (
                        <LoaderWrapper data-testid='loader'>
                            <Loader style={{marginTop:'0vh'}} />
                        </LoaderWrapper>
                    ) : ''}
                    <div style={{ lineHeight: '1.4rem'}}>
                        {data && data?.length >0 && data?.map((review, index) =>
                            <div key={index + '_container'} style={{display:"inline-block", marginTop: '2vh'}}>
                                <div>
                                    <span style={{color: 'gray'}}>author</span> : <span>{review?.author}</span>
                                </div>
                                {review.content.length > 200 ?
                                    <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                                        <div style={{
                                            color: 'beige',
                                            textTransform: 'inherit',
                                            fontStyle: 'italic',
                                            position:'relative'
                                        }}
                                             dangerouslySetInnerHTML={{__html: review.content}}/>
                                    </ReactTextCollapse> :
                                    <div style={{
                                        color: 'beige',
                                        textTransform: 'inherit',
                                        fontStyle: 'italic',
                                        position:'relative'
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