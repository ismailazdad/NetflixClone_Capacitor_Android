import React, {useContext, useEffect, useState} from "react";
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
import "bootstrap/dist/css/bootstrap.css"
import {MoviesContext} from "../../utils/context";

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
        window.screen.orientation.lock('portrait');
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
    let language =  navigator?.language || navigator?.userLanguage;
    const [isLoading, data, error] = useFetch(urls.findNetflixOriginals+language,true);
    const {currentMovie} = useContext(MoviesContext)
    const myGenres = currentMovie ? getGenres(currentMovie?.genre_ids)?.slice(0,3).join(', '): getGenres(data?.genre_ids)?.slice(0,3)?.join(', ')
    const {adults,year,popularity,imageUrl,title,overview,myId,type,imageUrlPoster} = currentMovie ? getInfo(currentMovie,""):  getInfo(data,urls.findNetflixOriginals)
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const [focus,setFocus] = useState(false)
    const [inputs, setInputs] = useState({ searchMovie: ''})
    const [showSearch,setShowSearch] = useState(false)
    const [touchState,setTouchState]=useState(false)
    const savedCart = localStorage.getItem('myList')
    const [myList, updateMyList] = useState(savedCart ? JSON.parse(savedCart) : [])
    useEffect(() => {
        localStorage.setItem('myList', JSON.stringify(myList))
    }, [myList])


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
        let className
        if(e.target?.className?.length > 0)
            className = e.target.className.split(' ').includes('chevron')
        e.target.nodeName === 'H2' || e.target.nodeName === 'div' || e.target.nodeName === 'svg' || className ? setTouchState(true) : setTouchState(false)
    }

    if (error) {
        return <span>Oups something went wrong</span>
    }

    //include this line to prevent portrait mode for web mobile
    // if (!isMobile) {
    //     return <div style={{height:'60vh',marginTop:'30vh',position:'relative'}}>No supported device desktop mode, switch to mobile mode...</div>
    // }

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
                     imageUrlPoster={imageUrlPoster}
                     title={title}
                     adults={adults}
                     popularity={popularity}
                     year={year}
                     genres={myGenres}
                     overview={overview}
                     id={myId}
                     type={type}
                     isMainMenu={false}
                     focus={focus}
                     touchState={touchState}
                     language={language}
                     showSimilar={true}
                     myList={myList}
                     updateMyList={updateMyList}
                 />
             </div>

            )}
            <RowBannerContainer onTouchStart={handleTouchEvent} >
                {inputs.searchMovie.length > 0 && !focus?
                    <RowBanner title='Search Results' url={urls.searchMovie.replace('{query}', inputs.searchMovie)+ language}  isLargeRow/>:''
                }
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
                {myList.length > 0 ?
                    <RowBanner myList={myList} updateMyList={updateMyList}  title='My List'  isLargeRow/> : ''
                }
                <RowBanner title='Popular Movies' url={urls.findPopular+language} isLargeRow/>
                <RowBanner title='Now Playing' url={urls.findNowPlaying+language} />
                <RowBanner title='Top Trending movie' url={urls.findActionMovies+language} useRank isLargeRow/>
                <RowBanner title='UpComing' url={urls.findUpcoming.toString().replaceAll("{lang}",language?.split("").slice(0,2).join(""))} isLargeRow/>
                <RowBanner title='NETFLIX ORIGINALS' url={urls.findNetflixOriginals+language} />
                <RowBanner title='Western Movies' url={urls.findWesternMovies+language} isLargeRow/>
                <RowBanner title='War Movies' url={urls.findWarMovies+language}/>
                <RowBanner title='Thriller Movies' url={urls.findThrillerMovies+language} isLargeRow/>
                <RowBanner title='SF Movies' url={urls.findSFMovies+language} />
                <RowBanner title='Mystery Movies' url={urls.findMysteryMovies+language} isLargeRow/>
                <RowBanner title='Music Movies' url={urls.findMusicMovies+language} />
                <RowBanner title='History Movies' url={urls.findHistoryMovies+language}/>
                <RowBanner title='Fantasy Movies' url={urls.findFantasyMovies+language}/>
                <RowBanner title='Top Rated' url={urls.findTopRated+language} useRank/>
                <RowBanner title='Family Movies' url={urls.findFamilyMovies+language} isLargeRow/>
                <RowBanner title='Drama Movies' url={urls.findDramaMovies+language}/>
                <RowBanner title='Trending Movies' url={urls.findTrending+language}/>
                <RowBanner title='Crime Movies' url={urls.findCrimeMovies+language} isLargeRow/>
                <RowBanner title='Animation Movies' url={urls.findAnimationMovies+language}/>
                <RowBanner title='Adventure Movies' url={urls.findAdventureMovies+language} isLargeRow/>
                <RowBanner title='Comedy Movies' url={urls.findComedyMovies+language} useRank/>
                <RowBanner title='Horror Movies' url={urls.findHorrorMovies+language}/>
                <RowBanner title='Romance Movies' url={urls.findRomanceMovies+language}/>
                <RowBanner title='Documentaries' url={urls.findDocumentaries+language}  isLargeRow/>
            </RowBannerContainer>
        </div>
    )
}
export default MoviesBanner