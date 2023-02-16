const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

const urls = {
    findTrending: API_URL+`/trending/movie/week?api_key=`+API_KEY+`&language=`,
    findTrendingTv: API_URL+`/trending/tv/week?api_key=`+API_KEY+`&language=`,
    findNetflixOriginals: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_networks=213&language=`,
    findTopRated: API_URL+`/movie/top_rated?api_key=`+API_KEY+`&language=`,
    findActionMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=28&language=`,
    findAnimationMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=16&language=`,
    findAdventureMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=12&language=`,
    findCrimeMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=80&language=`,
    findDramaMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=18&language=`,
    findFamilyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10751&language=`,
    findFantasyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=14&language=`,
    findHistoryMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=36&language=`,
    findMusicMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10402&language=`,
    findMysteryMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=9648&language=`,
    findSFMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=878&language=`,
    findThrillerMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=53&language=`,
    findWarMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10752&language=`,
    findWesternMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=37&language=`,
    findComedyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=35&language=`,
    findHorrorMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=27&language=`,
    findRomanceMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10749&language=`,
    findDocumentaries: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=99&language=`,
    findImagesUrl : 'https://image.tmdb.org/t/p/original/',
    findById : API_URL+'/{type}/{id}?api_key='+API_KEY+'&language=',
    findCreditsById : API_URL+'/movie/{id}/credits?api_key='+API_KEY+'',
    searchMovie : API_URL+'/search/movie?api_key='+API_KEY+'&query={query}&language={language}',
};
export default urls;