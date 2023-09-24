const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL
const OMDBAPI_KEY = process.env.REACT_APP_OMDBAPI_KEY
const OMDBAPI_URL = process.env.REACT_APP_OMDBAPI_URL

const tvUrls = {
    findTrending: API_URL+`/trending/tv/week?api_key=`+API_KEY+`&page=1&language=`,
    findTrendingTv: API_URL+`/trending/tv/week?api_key=`+API_KEY+`&page=1&language=`,
    findNetflixOriginals: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_networks=213&language=`,
    findAmazonOriginals: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_networks=1024&language=`,
    findDisneyOriginals: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_networks=2739&language=`,
    findPopular: API_URL+`/tv/popular?api_key=`+API_KEY+`&page=1&language=`,
    findNowPlaying: API_URL+`/tv/airing_today?api_key=`+API_KEY+`&page=1&language=`,
    findUpcoming: API_URL+`/tv/on_the_air?api_key=`+API_KEY+`&page=1&region={lang}&language={lang}`,
    findTopRated: API_URL+`/tv/top_rated?api_key=`+API_KEY+`&page=1&language=`,
    findAnimationMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=16&language=`,
    findAdventureMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=12&language=`,
    findCrimeMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=80&language=`,
    findDramaMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10759&language=`,
    findFamilyMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10751&language=`,
    findFantasyMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10765&language=`,
    findHistoryMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=36&language=`,
    findMusicMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10402&language=`,
    findSoapMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10766&language=`,
    findSFMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=878&language=`,
    findWarMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10768&language=`,
    findWesternMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=37&language=`,
    findComedyMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=35&language=`,
    findHorrorMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=27&language=`,
    findRomanceMovies: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=10749&language=`,
    findDocumentaries: API_URL+`/discover/tv?api_key=`+API_KEY+`&page=1&with_genres=99&language=`,
    findImagesUrl : 'https://image.tmdb.org/t/p/original/',
    findById : API_URL+'/{type}/{id}?api_key='+API_KEY+'&language=',
    findCreditsById : API_URL+'/tv/{id}/credits?api_key='+API_KEY+'',

    findVideosById : API_URL+'/tv/{id}/videos?api_key='+API_KEY+'&language=',
    findReviewsById : API_URL+'/tv/{id}/reviews?api_key='+API_KEY+'&language=',
    findSimilarById : API_URL+'/tv/{id}/similar?api_key='+API_KEY+'&page=1&language=',
    findRecommendedById : API_URL+'/tv/{id}/recommendations?api_key='+API_KEY+'&page=1&language=',
    findVideoByIdDetails : API_URL+'/tv/{id}?append_to_response=external_ids&api_key='+API_KEY+'&language=',
    searchMovie : API_URL+'/search/tv?api_key='+API_KEY+'&query={query}&language=',
    findActorById : API_URL+'/person/{id}?api_key='+API_KEY+'&language=',
    findMoviesByActorId : API_URL+'/person/{id}/tv_credits?api_key='+API_KEY+'&language=',
    findMoviesProviderById : API_URL+'/tv/{id}/watch/providers?api_key='+API_KEY,
    findReviewByImbId : OMDBAPI_URL+'?i={tmdb_id}&apikey='+OMDBAPI_KEY
};
export default tvUrls;