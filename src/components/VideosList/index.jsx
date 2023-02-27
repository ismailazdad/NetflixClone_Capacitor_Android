import urls from "../../utils/urls";
import {useFetchListWithFallBack} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React, {useState} from "react";
import {LoaderWrapper} from "../RowBanner";
import styled from "styled-components";
import Backup from "../../assets/backup.png";

export const StyledImage = styled.div`
    max-height: 200px;    
    height:  200px; 
    margin-left:  10%; 
    margin-right:  10%;
    transition: transform 700ms;
      &:hover{      
        transform: scale(1.15);
    }  
    max-width:  400px;           
    @media  only screen and (max-width:768px ){
        max-height:  20vh;     
        height:  20vh;    
        max-width: 30vh;  
        &:hover{      
            transform:  scale(1.10);
        } 
    } 
    background-size: cover;   
    background-repeat: no-repeat;
    background-position: center;           
    background-image: ${({imageUrl}) => 'url(' + imageUrl + ')'};   
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
    background-color: ${({index, current}) => current === index ? 'black' : 'gray'}; 
    border-radius: 10px; 
    border : solid 1px black;
    margin : 0.5vh;
    opacity : 0.8;
`

function VideoList({id, language, setTrailerURL}) {
    const {isLoading, otherMovies} = useFetchListWithFallBack(urls.findVideosById.replace('{id}', id) + language, urls.findVideosById.replace('{id}', id).replace("&language=", ""))
    const [current, setCurrent] = useState(0)
    return (
        <div>
            {isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div>
                    {otherMovies && otherMovies?.length > 0 ?
                        <h2 style={{marginTop: '1vh'}}> List of trailer(s)</h2> : ''
                    }
                    <RowCasting>
                        {otherMovies && otherMovies?.length > 0 && otherMovies?.map((movies, index) =>
                            <Trailer className="flex-row" key={index + '_container'} index={index} current={current}>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '0.3vh',
                                    width: '15vh',
                                    maxHeight: '2.3vh',
                                    overflow: 'hidden'
                                }}>
                                    <h5 style={{
                                        overflow: 'hidden',
                                        fontWeight: 500,
                                        fontSize: 'x-small'
                                    }}>{movies.name}</h5>
                                </div>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width: '15vh',
                                    overflow: 'hidden',
                                    marginBottom: '0.5vh'
                                }}>
                                    <span>language {movies?.iso_639_1}</span>
                                </div>
                                <StyledImage
                                    key={movies.id}
                                    imageUrl={Backup}
                                    alt={movies.name}
                                    onError={e => e.target.parentNode.style.display = 'none'}
                                    style={{border: 'solid 1px gray', maxWidth: '14vh'}}
                                    onTouchEnd={() => {
                                        setCurrent(index)
                                        setTrailerURL(movies?.key)
                                    }}
                                />
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