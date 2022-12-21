import React, {useEffect, useState} from 'react'
import urls from "../urls";

export const MovieGenres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
export const TvGenres = [{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}]
export const playerOptions = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1,
        mute: 1
    },
}
export function getInfo(data,url){
    let genres = data?.genres;
    let productions = data?.production_companies;
    let languages = data?.spoken_languages;
    let adults = data?.adult;
    let year = data?.release_date ? data?.release_date : data?.first_air_date;
    let popularity = Math.ceil(data?.vote_average * 10);
    let imageUrl = data?.backdrop_path ? urls.findImagesUrl + data.backdrop_path : '';
    let title = data?.title || data?.name || data?.original_name;
    let overview = data?.overview;
    let myId = data?.id;
    let type = url.toString().includes('/tv') ? 'tv' : 'movie';
    year = year?.toString().substring(0, 4);
    genres = genres?.map((e) => e?.name).join(', ');
    productions = productions?.map((e) => e?.name).join(', ');
    languages = languages?.map((e) => Object.values(e)).flat().join(', ');
    return {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,myId,type}
}

export function useFetch(url,random=false) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if(random){
                    setData(
                        jsonResponse.results[Math.floor(Math.random() * jsonResponse.results.length)],
                    );
                }else {
                    setData(jsonResponse);
                }

            })
            .catch(e => {
                console.log(e)
                setError(true)
            })
            .finally( e =>{
                    setLoading(false)
                }
            )
    }, [url])
    return {isLoading, data,error}
}


export function useFetchList(url) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                setData(
                    jsonResponse.results
                );
            })
            .catch(e => {
                console.log(e)
                setError(true)
            })
            .finally( e =>{
                    setLoading(false)
                }
            )
    }, [url])
    return {isLoading, data,error}
}

const STATE = {
    NO : undefined,
    NO_DATA : 'no_data',
    ENTERING : 'entering',
    ENTERED : 'entered',
    EXITING : 'exiting',
    EXITED : 'exited',
    FINISH : 'finish',
}
function useTransitionState(duration = 1000) {
    const [state, setState] = useState();
    useEffect(() => {
        let timerId;
        if (state === STATE.NO) {
            timerId = setTimeout(() => setState(STATE.FINISH), duration)
        } else if (state === STATE.ENTERING) {
            timerId = setTimeout(() => setState(STATE.ENTERED), duration)
        }else if (state === STATE.EXITING) {
            timerId = setTimeout(() => setState(STATE.EXITED), duration)
        } else if (state === STATE.EXITED) {
            timerId = setTimeout(() => setState(STATE.FINISH), duration)
        }
        return () => {
            timerId && clearTimeout(timerId);
        };
    });
    return [state, setState];
}

export function useTransitionControl(duration){
    const [state, setState] = useTransitionState(duration);
    const enter = () =>{
        // exited();
        if(state === STATE.ENTERED ){
            setState(STATE.EXITED);
        }
        if(state !== STATE.EXITING ){
            setState(STATE.ENTERING);
        }
    };
    const exited = ()=>{
        setState(STATE.EXITED);
    };

    return [state,enter,exited]
}

