const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

const urls = {
    findTrending: API_URL+`/trending/movie/week?api_key=`+API_KEY+`&language=en-US`,
    findTrendingTv: API_URL+`/trending/tv/week?api_key=`+API_KEY+`&language=en-US`,
    findNetflixOriginals: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_networks=213`,
    findTopRated: API_URL+`/movie/top_rated?api_key=`+API_KEY+`&language=en-US`,
    findActionMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=28`,
    findAnimationMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=16`,
    findAdventureMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=12`,
    findCrimeMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=80`,
    findDramaMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=18`,
    findFamilyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10751`,
    findFantasyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=14`,
    findHistoryMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=36`,
    findMusicMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10402`,
    findMysteryMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=9648`,
    findSFMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=878`,
    findThrillerMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=53`,
    findWarMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10752`,
    findWesternMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=37`,
    findComedyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=35`,
    findHorrorMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=27`,
    findRomanceMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10749`,
    findDocumentaries: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=99`,
    findImagesUrl : 'https://image.tmdb.org/t/p/original/',
    findById : API_URL+'/{type}/{id}?api_key='+API_KEY,
};
export default urls;