import React, {useState} from "react";
import Banner from "../../components/Banner";
import RowBanner from "../../components/RowBanner";
import urls from "../../utils/urls"
import {getGenres, getInfo, useFetch} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import {useMediaQuery} from "react-responsive";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {App} from '@capacitor/app';
import {Dialog} from '@capacitor/dialog';

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const RowBannerContainer = styled.div`
    padding-top: 50vh;
    position: relative;
    @media  only screen and (max-width:768px ){
        padding-top: 30vh;
    }  
`
const MovieButton = styled.button`
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    background-color: rgba(51, 51, 51, 0.5);
    @media  only screen and (max-width:768px ){
        margin-left:1vh;   
    }    
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`
App.addListener('backButton', ({canGoBack}) => {
    if (!!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
        document.exitFullscreen();
    } else {
        if (!canGoBack) {
            showConfirm()
        }
    }
});

const showConfirm = async () => {
    const {value} = await Dialog.confirm({
        title: 'Confirm',
        message: `Are you sure you'd like to quit?`,
    });
    if (value) {
        App.exitApp();
    }
};

//second version of movies page , showing poster and trailer in header
function MoviesBanner() {
    const language =  navigator?.language || navigator?.userLanguage;
    const {isLoading, data, error} = useFetch(urls.findNetflixOriginals+language,true);
    const [activeIndex, setActiveIndex] = useState(null);
    const myGenres = activeIndex ? getGenres(activeIndex?.genre_ids)?.slice(0,3).join(', '): getGenres(data?.genre_ids)?.slice(0,3)?.join(', ')
    const {genres,productions,languages,adults,year,popularity,imageUrl,title,overview,myId,type} = activeIndex ? getInfo(activeIndex,activeIndex.url):  getInfo(data,urls.findNetflixOriginals);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const [focus,setFocus] = useState(false)
    const [inputs, setInputs] = useState({ searchMovie: ''})
    const [showSearch,setShowSearch] = useState(false)
    const [touchState,setTouchState]=useState(false)
    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if(focus){
            setInputs(values => ({...values, [name]: value}))
        }
    }

    const handleInputFocus = () => {
        setFocus(true)
    }

    const handleInputBlur = () => {
        setFocus(false)
    }

    const handleTouchEvent = (e)=>{
        e.preventDefault();
        let className = e.target.className.split(' ').includes('chevron')
        e.target.nodeName === 'H2' || className ? setTouchState(true) : setTouchState(false)
    }

    if (error) {
        return <span>Oups something went wrong</span>
    }
    return (
        <div style={{background: 'black',color:'white'}}>
            {isLoading ? (
            <LoaderWrapper >
                <Loader />
            </LoaderWrapper>
            ) : (
             <div className="fixed-top" >
                 <Banner
                     imageUrl={imageUrl}
                     title={title}
                     adults={adults}
                     popularity={popularity}
                     year={year}
                     genres={myGenres}
                     productions={productions}
                     languages={languages}
                     overview={overview}
                     id={myId}
                     type={type}
                     isMainMenu={false}
                     showDescription={false}
                     isMobile={isMobile}
                     focus={focus}
                     touchState={touchState}
                 />
             </div>

            )}
            <RowBannerContainer onTouchStart={handleTouchEvent} >
                {!isLoading ?
                    <div style={{width: '100%', display: 'flex', margin: '1vh'}}>
                    <div onClick={e => setShowSearch(!showSearch)}>
                        <FontAwesomeIcon style={{width:'3vh',height:'3vh'}} icon={faMagnifyingGlass}/>
                    </div>
                    {showSearch ?
                        <div>
                            <input
                                style={{marginLeft: '3vh'}}
                                type="text"
                                name="searchMovie"
                                value={inputs.searchMovie || ""}
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                            <MovieButton>Search</MovieButton>
                        </div>
                        : ''}
                </div>
                :''}
                {inputs.searchMovie.length > 0 && !focus?
                    <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Search Results' url={urls.searchMovie.replace('{query}', inputs.searchMovie)+ language}  isLargeRow/>:''
                }
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Top Trending movie' url={urls.findActionMovies+language} useRank isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='NETFLIX ORIGINALS' url={urls.findNetflixOriginals+language} />
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Western Movies' url={urls.findWesternMovies+language} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='War Movies' url={urls.findWarMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Thriller Movies' url={urls.findThrillerMovies+language} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='SF Movies' url={urls.findSFMovies+language} />
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Mystery Movies' url={urls.findMysteryMovies+language} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Music Movies' url={urls.findMusicMovies+language} />
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Trending Tv ' url={urls.findTrendingTv} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='History Movies' url={urls.findHistoryMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Fantasy Movies' url={urls.findFantasyMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Top Rated' url={urls.findTopRated+language} useRank/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Family Movies' url={urls.findFamilyMovies+language} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Drama Movies' url={urls.findDramaMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Trending Movies' url={urls.findTrending+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Crime Movies' url={urls.findCrimeMovies+language} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Animation Movies' url={urls.findAnimationMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Adventure Movies' url={urls.findAdventureMovies+language} isLargeRow/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Comedy Movies' url={urls.findComedyMovies+language} useRank/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Horror Movies' url={urls.findHorrorMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Romance Movies' url={urls.findRomanceMovies+language}/>
                <RowBanner activeIndex={activeIndex} setActiveIndex={setActiveIndex} title='Documentaries' url={urls.findDocumentaries+language}  isLargeRow/>
            </RowBannerContainer>
        </div>
    )
}
export default MoviesBanner