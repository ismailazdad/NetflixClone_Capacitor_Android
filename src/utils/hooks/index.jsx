import  {useEffect, useState} from 'react'
import urls from "../urls";

const MovieGenres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
const TvGenres = [{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}]
export const playerOptions = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1,
        mute: 1
    }
}
export function getInfo(data,url){
    const genres = typeof data?.genres ==='string' ? data.genres : data.genres?.map((e) => e?.name).join(', ');
    const productions = data?.production_companies?.map((e) => e?.name).join(', ');
    const languages = data?.spoken_languages?.map((e) => Object.values(e)).flat().join(', ');
    const adults = data?.adults ? data.adults : data?.adult ? data.adult : false;
    const year = data?.release_date ? data?.release_date?.toString().substring(0, 4) : data?.first_air_date?.toString().substring(0, 4);
    const popularity = !data?.vote_average  ?  data.popularity : Math.ceil(data?.vote_average * 10).toFixed(0);
    const imageUrl = data?.backdrop_path ? urls.findImagesUrl + data.backdrop_path : '';
    const imageUrlPoster = data?.poster_path ? urls.findImagesUrl + data.poster_path : '';
    const title = data?.title || data?.name || data?.original_name;
    const overview = data?.overview;
    const myId = data?.id;
    const imdbId = data?.imdb_id;
    const type = url?.toString().includes('/tv') ? 'tv' : 'movie';
    return {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,myId,type,imageUrlPoster,imdbId}
}

export function getActorMovieInfo(data){
    const genres =typeof data?.genres === "string" ? data?.genres :data?.genres?.map((e) => e?.name).join(', ');
    const adults = data?.adults ? data.adults : data?.adult ? data.adult : false;
    const imdbId = data?.imdb_id;
    const year = data?.release_date ? data.release_date.toString().substring(0, 4) : data?.first_air_date?.toString().substring(0, 4);
    const popularity = Math.ceil(data?.vote_average * 10).toFixed(0);
    const imageUrl = data?.backdrop_path ? urls.findImagesUrl + data.backdrop_path : '';
    const imageUrlPoster = data?.poster_path ? urls.findImagesUrl + data.poster_path : '';
    const title = data?.title || data?.original_title;
    const character = data?.character ;
    const overview = data?.overview;
    const myId = data?.id;
    return {genres,adults,year,popularity,imageUrl,title,overview,myId,character,imageUrlPoster,imdbId}
}


export function getGenres(genre_ids){
    const genresMovies = genre_ids?.map((item) => MovieGenres.find(x => x.id === item)?.name)
    const  genresTv = genre_ids?.map((item) => TvGenres.find(x => x.id === item)?.name)
    return  genresMovies?.concat(genresTv).filter((item, index) => genresMovies.indexOf(item) === index);
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
                    if(jsonResponse?.results)
                        setData(jsonResponse.results[Math.floor(Math.random() * jsonResponse.results.length)]);
                    if(jsonResponse?.cast)
                        setData(jsonResponse.cast[Math.floor(Math.random() * jsonResponse.cast.length)]);
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
    }, [url,random ])
    return [isLoading, data,error]
}


export function useFetchList(url,useRank = false) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if(useRank){
                    setData(jsonResponse?.results.slice(0,9));
                }else{
                    setData((jsonResponse?.results || jsonResponse?.cast)
                        .map((item) => ({ sort: Math.random(), value: item }))
                        .sort((a, b) => a.sort - b.sort)
                        .map((item) => item.value)
                    );
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
    }, [url,useRank])
    return {isLoading, data,error}
}


export function useFetchListWithFallBack(url,url2) {
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        const urls = [url, url2];
        Promise.all(urls.map(url => fetch(url).then(r => r.json())))
            .then(([res, res2]) => {
                setData(res?.results.concat(res2?.results))
            })
            .catch(error => setError(true))
            .finally(e =>{ setIsLoading(false)})
        }, [setIsLoading,setData,url,url2]);
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

export const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: '...show more',
    expandText: 'show less...',
    minHeight: 70,
    maxHeight: 300,
    textStyle: {
        color: 'gray',
        fontSize: '1rem',
    },
}