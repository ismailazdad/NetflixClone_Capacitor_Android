import React, {useContext, useEffect, useState} from "react";
import Banner from "../../components/Banner";
import RowBanner from "../../components/RowBanner";
import {getGenres, getInfo,  tvsGenresList, useFetch} from "../../utils/hooks";
import styled from "styled-components";
import {Loader} from "../../utils/style/Atoms";
import {useMediaQuery} from "react-responsive";
import {faMagnifyingGlass, faFilm} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {App} from '@capacitor/app';
import {Dialog} from '@capacitor/dialog';
import "bootstrap/dist/css/bootstrap.css"
import {MoviesContext} from "../../utils/context";
import RenderIfVisible from "react-render-if-visible"
import tvUrls from "../../utils/urls/tv";
import {Link} from "react-router-dom";
import RowList from "../../components/RowList";

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
    } else{
        showConfirm()
    }
    window.screen.orientation.unlock()
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
function TvsBanner() {
    let language =  navigator?.language || navigator?.userLanguage;
    const [isLoading, data, error] = useFetch(tvUrls.findNetflixOriginals+language,true);
    const {currentMovie,saveMovie} = useContext(MoviesContext)
    const myGenres = currentMovie ? getGenres(currentMovie?.genre_ids)?.slice(0,3).join(', '): getGenres(data?.genre_ids)?.slice(0,3)?.join(', ')
    const {adults,year,popularity,imageUrl,title,overview,myId,type,imageUrlPoster} = currentMovie ? getInfo(currentMovie,""):  getInfo(data,tvUrls.findNetflixOriginals)
    const isMobile = useMediaQuery({query: '(orientation: portrait) and (max-width: 768px), (orientation: landscape)  and (max-width: 1000px)'})
    const [focus,setFocus] = useState(false)
    const [inputs, setInputs] = useState({ searchMovie: ''})
    const [showSearch,setShowSearch] = useState(false)
    const [touchState,setTouchState]=useState(false)
    const savedCart = localStorage.getItem('myList')
    const [myList, updateMyList] = useState(savedCart ? JSON.parse(savedCart) : [])
    useEffect(() => {
        if(data &&  Object.keys(data).length > 0 && !currentMovie ){
            saveMovie(data)
        }
        localStorage.setItem('myList', JSON.stringify(myList))
    }, [myList,data,saveMovie,currentMovie])


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

    if (!isMobile) {
        return <div style={{height: '60vh', marginTop: '30vh', position: 'relative'}}>No supported device desktop
            mode, switch to mobile mode...</div>
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
                     imageUrl={imageUrl.replace('original','w500')}
                     imageUrlPoster={imageUrlPoster.replace('original','w780')}
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
                     showType="tv"
                 />
             </div>

            )}
            <RowBannerContainer onTouchStart={handleTouchEvent} >

                {inputs.searchMovie.length > 0 && !focus?
                    <RenderIfVisible>
                        <RowList sort={true} key={'search_container'} title='Search Results'
                                   url={tvUrls.searchMovie.replace('{query}', inputs.searchMovie) + language} isLargeRow/>
                    </RenderIfVisible>:''
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
                <Link to={`/`}>
                    <MovieButton style={{"right":"0","position":"absolute"}}>
                        <FontAwesomeIcon style={{width:'3vh',height:'2vh'}} icon={faFilm}/> Movie page
                        </MovieButton>
                </Link>
                {myList.filter(a=>a.showType === "tv").length > 0 ?
                    <RenderIfVisible stayRendered={true}>
                        <RowList key={'myList_container'} myList={myList.filter(a=>a.showType === "tv")} updateMyList={updateMyList}  title='My List'  isLargeRow/>
                    </RenderIfVisible>: ''
                }

                {tvsGenresList && tvsGenresList.map((movie, index) =>

                    <RenderIfVisible key={index}>
                            {movie.replace ?
                                <RowBanner sort={movie.sort} key={index +movie.title}  title={movie.title} url={movie.url.replaceAll("{lang}",language?.split("").slice(0,2).join("")).replace('original','w185') } isLargeRow={movie.isLargeRow}
                                           useRank={movie.useRank}/>
                                :
                                <RowBanner sort={movie.sort} key={index +movie.title}  title={movie.title} url={movie.url.replace('original','w185') + language} isLargeRow={movie.isLargeRow}
                                           useRank={movie.useRank}/>
                            }
                    </RenderIfVisible>
                )}

            </RowBannerContainer>
        </div>
    )
}
export default TvsBanner