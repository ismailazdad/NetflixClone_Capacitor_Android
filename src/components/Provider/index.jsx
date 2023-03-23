import urls from "../../utils/urls";
import {useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";

function MovieProvider({id, language}) {
    language =language.length > 2 ? language?.split("-")[1] : language.toUpperCase()
    const [isLoading, data] = useFetch(urls.findMoviesProviderById.replace('{id}', id) , false)
    const results = data?.results || []
    let buy = []
    let rent = []
    let flatrate = []
    if(language in results){
        buy = results[language]?.['buy']
        rent = results[language]?.['rent']
        flatrate = results[language]?.['flatrate']
    }
    return (
        <div>
            {isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div>
                    {buy && buy.length > 0 ? <span style={{width:'6vh', float: 'left', marginTop: '1vh',color:'gray'}}>Buy : </span> : ''}
                    <div  className='row' style={{ marginTop: '1vh'}}>
                        {buy && buy?.length > 0 && buy?.map((provider, index) =>
                            (provider?.provider_name ?
                                <div key={`buy---${index}`} style={{width:'auto', float: 'left',paddingLeft:'0',paddingTop:'1vh'}}>
                                    <img title={provider?.provider_name} alt={provider?.provider_name} width='35vh'
                                         height='35vh' src={urls.findImagesUrl + provider?.logo_path}
                                         onError={e => e.target.display = 'none'}/>
                                </div>
                                : '')
                        )}
                    </div>

                    {rent && rent.length > 0 ? <span style={{width:'6vh', float: 'left', marginTop: '1vh',color:'gray'}}>Rent : </span> : ''}
                    <div className='row' style={{ marginTop: '1vh'}}>
                    {rent && rent?.length > 0 && rent?.map((provider, index) =>
                        (provider?.provider_name ?
                            <div key={`rent---${index}`} style={{width:'auto', float: 'left',paddingLeft:'0',paddingTop:'1vh'}}>
                                <img title={provider?.provider_name} alt={provider?.provider_name} width='35vh'
                                     height='35vh' src={urls.findImagesUrl + provider?.logo_path}
                                     onError={e => e.target.display = 'none'}/>
                            </div>
                            : '')
                    )}
                    </div>

                    {flatrate && flatrate.length > 0 ? <span style={{width:'6vh', float: 'left', marginTop: '1vh',color:'gray'}}>Rent : </span> : ''}
                    <div className='row' style={{ marginTop: '1vh'}}>
                        {flatrate && flatrate?.length > 0 && flatrate?.map((provider, index) =>
                            (provider?.provider_name ?
                                <div key={`flat---${index}`} style={{width:'auto', float: 'left',paddingLeft:'0',paddingTop:'1vh'}}>
                                    <img title={provider?.provider_name} alt={provider?.provider_name} width='35vh'
                                         height='35vh' src={urls.findImagesUrl + provider?.logo_path}
                                         onError={e => e.target.display = 'none'}/>
                                </div>
                                : '')
                        )}
                    </div>

                </div>
            )
            }
        </div>
    )
}

export default MovieProvider;