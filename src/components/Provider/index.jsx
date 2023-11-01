import urls from "../../utils/urls";
import {useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import tvUrls from "../../utils/urls/tv";

function MovieProvider({id, language, showType}) {
    language =language.length > 2 ? language?.split("-")[1] : language.toUpperCase()
    const url = (showType && showType === "tv" ? tvUrls.findMoviesProviderById.replace('{id}', id)  : urls.findMoviesProviderById.replace('{id}', id) )
    const [isLoading, data] = useFetch(url , false)
    const results = data?.results || []
    let buy = []
    let link=""
    let rent = []
    let flatrate = []
    if(language in results){
        buy = results[language]?.['buy']
        rent = results[language]?.['rent']
        flatrate = results[language]?.['flatrate']
        link=results[language]?.['link']
    }
    return (
        <div>
            {isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div>
                    {((buy && buy.length > 0) || (rent && rent.length > 0) || (flatrate && flatrate.length > 0)) && (
                        <>
                            <h3 style={{marginTop: '1vh'}}> Provider </h3>
                        </>
                    )}
                    {buy && buy.length > 0 ? <span style={{width:'8vh', float: 'left', marginTop: '1vh',color:'gray'}}>Buy : </span> : ''}
                    <a href={`${link}`} target="_blank">
                        <div  className='row' style={{ marginTop: '1vh'}}>
                            {buy && buy?.length > 0 && buy?.map((provider, index) =>
                                (provider?.provider_name ?
                                    <div key={`buy---${index}`} style={{width:'auto', float: 'left',paddingLeft:'0',paddingTop:'1vh'}}>
                                        <img title={provider?.provider_name} alt={provider?.provider_name} width='20vh'
                                             height='20vh' src={urls.findImagesUrl + provider?.logo_path}
                                             onError={e => e.target.display = 'none'}/>
                                    </div>
                                    : '')
                            )}
                        </div>
                    </a>

                    {rent && rent.length > 0 ? <span style={{width:'8vh', float: 'left', marginTop: '1vh',color:'gray'}}>Rent : </span> : ''}
                    <a href={`${link}`} target="_blank">
                        <div className='row' style={{ marginTop: '1vh'}}>
                        {rent && rent?.length > 0 && rent?.map((provider, index) =>
                            (provider?.provider_name ?
                                <div key={`rent---${index}`} style={{width:'auto', float: 'left',paddingLeft:'0',paddingTop:'1vh'}}>
                                    <img title={provider?.provider_name} alt={provider?.provider_name} width='20vh'
                                         height='20vh' src={urls.findImagesUrl + provider?.logo_path}
                                         onError={e => e.target.display = 'none'}/>
                                </div>
                                : '')
                        )}
                        </div>
                    </a>

                    {flatrate && flatrate.length > 0 ? <span style={{width:'8vh', float: 'left', marginTop: '1vh',color:'gray'}}>Rent : </span> : ''}
                    <a href={`${link}`} target="_blank">
                        <div className='row' style={{ marginTop: '1vh'}}>
                            {flatrate && flatrate?.length > 0 && flatrate?.map((provider, index) =>
                                (provider?.provider_name ?
                                    <div key={`flat---${index}`} style={{width:'auto', float: 'left',paddingLeft:'0',paddingTop:'1vh'}}>
                                        <img title={provider?.provider_name} alt={provider?.provider_name} width='20vh'
                                             height='20vh' src={urls.findImagesUrl + provider?.logo_path}
                                             onError={e => e.target.display = 'none'}/>
                                    </div>
                                    : '')
                            )}
                        </div>
                    </a>

                </div>
            )
            }
        </div>
    )
}

export default MovieProvider;