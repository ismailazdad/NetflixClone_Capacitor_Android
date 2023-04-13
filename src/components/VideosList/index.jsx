import urls from "../../utils/urls";
import {useFetchListWithFallBack} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import styled from "styled-components";
import Backup from "../../assets/backup.png";
import PlayTrailer from "../../assets/play_trailer.png";

export const StyledImage = styled.div`
    max-height: 200px;    
    height:  200px; 
    transition: transform 700ms; 
      &:hover{      
        transform: scale(1.15);
    }  
    max-width:  400px;           
    @media  only screen and (max-width:768px ){
        max-height:  20vh;     
        height:  20vh;    
        max-width: 27vh;
        width: 27vh;
        &:hover{      
            transform:  scale(1.08);
        } 
    } 
    background-size: cover;   
    background-repeat: no-repeat;
    background-position: center;           
    background-image: ${({imageUrl}) => 'url(' + imageUrl + ')'}, ${({backup}) => 'url(' + backup + ')'};     
    border-radius: 10px; 
    border : solid 1px black;
 `
export const RowCasting = styled.div`
    display: flex;
    overflow-y: hidden;
    scroll-behavior:smooth;
    ::-webkit-scrollbar {
        display: none;
        float :right;
    }
`
export const Trailer = styled.div`
    background-color: ${({index, current}) => current === index ? 'black' : 'transparent'}; 
    border-radius: ${({index, current}) => current === index ? '10px' : ''}; 
    border : ${({index, current}) => current === index ? 'solid 1px black' : ''}; 
    margin : 0.5vh;
    opacity : ${({index, current}) => current === index ? '1' : '0.7'}; 
`

export const WaitAnimated = styled.div`
  @media  only screen and (max-width:768px ){
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      width: 2em;
      position:inherit;
      margin-top: 8vh;
      margin-left: 11vh;
  }
`
export const PlayAnimated = styled.div`
  @media  only screen and (max-width:768px ){
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      width: 2em;
      position:inherit;
      margin-top: 6vh;
      margin-left: 10vh;
  }
`

export const WaitSpanAnimated = styled.span`
  display:none;
  @media  only screen and (max-width:768px ){
      display:block;
      width: 0.3em;
      height: 1em;
      background-color: red;      
        &:nth-of-type(1) {
          animation: grow 1s -0.45s ease-in-out infinite;
        }        
        &:nth-of-type(2) {
          animation: grow 1s -0.3s ease-in-out infinite;
        }        
        &:nth-of-type(3) {
          animation: grow 1s -0.15s ease-in-out infinite;
        }        
        &:nth-of-type(4) {
          animation: grow 1s ease-in-out infinite;
        }  
      @keyframes grow {
          0%,100% {
            transform: scaleY(1);
          }        
          50% {
            transform: scaleY(2);
          }
        }
  }
`


function VideoList({id, language, setTrailerURL,isVideoPlaying,trailerURL,updateMenuStatue}) {
    const {isLoading, data,error} = useFetchListWithFallBack(urls.findVideosById.replace('{id}', id) + language, urls.findVideosById.replace('{id}', id).replace("&language=", ""))
    return (
        <div>
            {isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div>
                    {error ? <span style={{color:'white'}}>Oups something went wrong</span>:''}
                    {data && data?.length > 0 ?
                        <h2 style={{marginTop: '1vh'}}> List of trailer(s)</h2> : 'No trailers...'
                    }
                    <RowCasting>
                        {data && data?.length > 0 && data?.map((movie, index) =>
                            <Trailer className="flex-row" key={index + '_container'} index={movie?.key} current={trailerURL}>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '0.3vh',
                                    width: '25vh',
                                    maxHeight: '2.3vh',
                                    overflow: 'hidden'
                                }}>
                                    <h5 style={{
                                        overflow: 'hidden',
                                        fontWeight: 500,
                                        fontSize: 'x-small'
                                    }}>{movie.name}</h5>
                                </div>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width: '15vh',
                                    overflow: 'hidden',
                                    marginBottom: '0.5vh'
                                }}>
                                    <span>language {movie?.iso_639_1}</span>
                                </div>
                                <StyledImage
                                    key={movie.id}
                                    backup={Backup}
                                    imageUrl = {'https://img.youtube.com/vi/'+movie?.key+'/0.jpg'}
                                    alt={movie.name}
                                    onError={e => e.target.parentNode.style.display = 'none'}
                                    onTouchEnd={(e) => {setTrailerURL(movie?.key);e.preventDefault()}}
                                    onClick={() => {setTrailerURL(movie?.key)}}
                                >
                                {isVideoPlaying && movie?.key === trailerURL ?
                                    <WaitAnimated>
                                        <WaitSpanAnimated></WaitSpanAnimated>
                                        <WaitSpanAnimated></WaitSpanAnimated>
                                        <WaitSpanAnimated></WaitSpanAnimated>
                                        <WaitSpanAnimated></WaitSpanAnimated>
                                    </WaitAnimated>
                                    :
                                    <PlayAnimated>
                                        <img alt="Animated"  style={{width:'7vh',height:'7vh'}} src={PlayTrailer}/>
                                    </PlayAnimated>
                                    }
                                </StyledImage>
                            </Trailer>
                        )
                        }
                    </RowCasting>
                </div>
            )
            }
        </div>
    )
}

export default VideoList;