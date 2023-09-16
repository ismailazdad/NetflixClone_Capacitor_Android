import  {useEffect, useState} from 'react'
import urls from "../urls";
import tvUrls from "../urls/tv";

const MovieGenres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
const TvGenres = [{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}]
export const playerOptions = {
    height: "390",
    width: "100%",
    playerVars: {
        autoplay: 1,
        mute: 1,
        rel:0,
        showinfo:0,
        fs :1,
        controls:0,
        // controls:2,
        start:3,
        color:'white',
        enablejsapi:1,
        modestbranding:1
    }
}
export const moviesGenresList=[
    {title: "Popular Movies", url: urls.findPopular, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Now Playing", url: urls.findNowPlaying, isLargeRow: false, useRank: false,replace:false,sort:true},
    {title: "Top Trending movie", url: urls.findActionMovies, isLargeRow: true, useRank: true,replace:false,sort:false},
    {title: "NETFLIX ORIGINALS", url: urls.findNetflixOriginals, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Family Movies", url: urls.findFamilyMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "UpComing", url: urls.findUpcoming, isLargeRow: true, useRank: false,replace:true,sort:true},
    {title: "Western Movies", url: urls.findWesternMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "War Movies", url: urls.findWarMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Thriller Movies", url: urls.findThrillerMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "SF Movies", url: urls.findSFMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Mystery Movies", url: urls.findMysteryMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Music Movies", url: urls.findMusicMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "History Movies", url: urls.findHistoryMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Fantasy Movies", url: urls.findFantasyMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Top Rated", url: urls.findTopRated, isLargeRow: true, useRank: true,replace:false,sort:false},
    {title: "Drama Movies", url: urls.findDramaMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Trending Movies", url: urls.findTrending, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Crime Movies", url: urls.findCrimeMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Animation Movies", url: urls.findAnimationMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Comedy Movies", url: urls.findComedyMovies, isLargeRow: true, useRank: true,replace:false,sort:false},
    {title: "Horror Movies", url: urls.findHorrorMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Romance Movie", url: urls.findRomanceMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Documentaries", url: urls.findDocumentaries, isLargeRow: true, useRank: false,replace:false,sort:false},
]

export const tvsGenresList=[
    {title: "Trending Tv", url: tvUrls.findTrending, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Popular Tv show", url: tvUrls.findPopular, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Top Rated", url: tvUrls.findTopRated, isLargeRow: true, useRank: true,replace:false,sort:false},
    {title: "Now Playing", url: tvUrls.findNowPlaying, isLargeRow: false, useRank: false,replace:false,sort:true},
    {title: "NETFLIX ORIGINALS", url: tvUrls.findNetflixOriginals, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Family Tv", url: tvUrls.findFamilyMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "UpComing", url: tvUrls.findUpcoming, isLargeRow: true, useRank: false,replace:true,sort:true},
    {title: "War & Politics Tv", url: tvUrls.findWarMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Western Tv", url: tvUrls.findWesternMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Soap Tv", url: tvUrls.findSoapMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "History Tv", url: tvUrls.findHistoryMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Fantasy Tv", url: tvUrls.findFantasyMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Drama Tv", url: tvUrls.findDramaMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Crime Tv", url: tvUrls.findCrimeMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Animation Tv", url: tvUrls.findAnimationMovies, isLargeRow: true, useRank: false,replace:false,sort:false},
    {title: "Comedy Tv", url: tvUrls.findComedyMovies, isLargeRow: true, useRank: true,replace:false,sort:false},
    {title: "Romance Tv", url: tvUrls.findRomanceMovies, isLargeRow: false, useRank: false,replace:false,sort:false},
    {title: "Documentaries", url: tvUrls.findDocumentaries, isLargeRow: true, useRank: false,replace:false,sort:false},
]

export function getInfo(data,url){
    const genres = typeof data?.genres ==='string' ? data.genres : data.genres?.map((e) => e?.name).join(', ');
    const productions = data?.production_companies?.map((e) => e?.name).join(', ');
    const languages = data?.spoken_languages?.map((e) => Object.values(e)).flat().join(', ');
    const adults = data?.adults ? data.adults : data?.adult ? data.adult : false;
    const year = data?.release_date ? data?.release_date?.toString().substring(0, 4) : data?.first_air_date?.toString().substring(0, 4);
    let popularity = !data?.vote_average  ?  data.popularity : Math.ceil(data?.vote_average * 10).toFixed(0);
    popularity = Math.round(popularity) > 100 ? 100 : Math.round(popularity);
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
    const title = data?.title || data?.name || data?.original_title;
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