import urls from "../../utils/urls";
import {useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import StarRating from "../StarRating";

function MovieDetails({id, language}) {
    const {isLoading, data, error} = useFetch(urls.findVideoByIdDetails.replace('{id}', id) + language, false)
    return (
        <div>
            {isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div >
                    <div style={{ lineHeight: '1.4rem', marginTop: '1vh'}}>
                        {/*<div><span style={{color: 'gray'}}>Id</span> : {data?.id}</div>*/}
                        <div>
                            {data?.vote_count > 0 ?
                                <div>
                                    <span style={{color: 'gray'}}>Votes</span> :
                                    <StarRating value={Math.floor(data?.vote_average / 2)}/>
                                    {'  '}(note : {data?.vote_average} over {data?.vote_count} rates)
                                </div>
                                :''}
                        </div>
                        {data?.production_countries && data?.production_countries.length > 0 ?
                            <div><span
                                style={{color: 'gray'}}>Country</span> : <span>{data?.production_countries?.map(e => e?.name).slice(0, 3).join(', ')}</span>
                            </div>
                            : ''}

                        {data?.genres && data?.genres.length > 0 ?
                            <div><span
                                style={{color: 'gray'}}>Genres</span> : <span>{data?.genres?.map(e => e?.name).slice(0, 3).join(', ')}</span>
                            </div>
                            : ''}
                        {data?.budget && data?.budget !== 0 ?
                            <div><span style={{color: 'gray'}}>Budget</span> : {data?.budget.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}</div>
                            : ''}
                        <div><span style={{color: 'gray'}}>Original language</span> : {data?.original_language}</div>
                        <div><span style={{color: 'gray'}}>Original title</span> : {data?.original_title}</div>
                        <div><span style={{color: 'gray'}}>Release</span> : {data?.release_date}</div>
                        {data?.production_companies && data?.production_companies.length > 0 ?
                            <div>
                                <span style={{color: 'gray'}}>Company</span> :<span> {data?.production_companies?.map(e => e?.name).slice(0, 3).join(', ')}</span>
                            </div>
                            : ''}
                        <div>
                            <span style={{color: 'gray'}}>Duration</span> : {Math.floor(data?.runtime / 60).toString() + 'h' + data?.runtime % 60 + 'm'}
                        </div>

                    </div>
                </div>

            )
            }
        </div>
    )
}

export default MovieDetails;