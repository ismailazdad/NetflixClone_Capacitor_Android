const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

const urls = {
    findTrending: API_URL+`/trending/movie/week?api_key=`+API_KEY+`&language=en-US`,
    findNetflixOriginals: API_URL+`/discover/tv?api_key=`+API_KEY+`&with_networks=213`,
    findTopRated: API_URL+`/movie/top_rated?api_key=`+API_KEY+`&language=en-US`,
    findActionMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=28`,
    findComedyMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=35`,
    findHorrorMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=27`,
    findRomanceMovies: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=10749`,
    findDocumentaries: API_URL+`/discover/movie?api_key=`+API_KEY+`&with_genres=99`,
    findImagesUrl : 'https://image.tmdb.org/t/p/original/',
    findById : API_URL+'/{type}/{id}?api_key='+API_KEY,
};

export default urls;