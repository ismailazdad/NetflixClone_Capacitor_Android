import urls from "../../utils/urls";
import {useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import styled from "styled-components";
import Backup from "../../assets/backup3.png";
import {Link} from "react-router-dom";
import tvUrls from "../../utils/urls/tv";

export const StyledImage = styled.div`
    object-fit: contain;
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
    background-size: contain;   
    background-repeat: no-repeat;
    background-position: center;           
    background-image: ${({imageUrl}) => 'url(' + imageUrl + ')'}, ${({backup}) => 'url(' + backup + ')'};      
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
const MovieButton = styled.button`
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    width: 15vh;
    @media  only screen and (max-width:768px ){
        margin-top:1vh;
        margin-left:1vh;
        margin-right:1vh;
        // width: 20vh;
        height:5vh;        
    }    
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`

function Credits({id,language,showType}) {
    const url = showType && showType === "tv" ? tvUrls.findCreditsById.replace('{id}', id) : urls.findCreditsById.replace('{id}', id)
    const [isLoading, data] = useFetch(url, false)
    let crew = data?.crew?.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
    crew = crew?.filter((v,i)=>
        v?.known_for_department !=='Acting' &&
        v?.known_for_department !=='Art' &&
        v?.known_for_department !=='Editing' &&
        v?.known_for_department !=='Lighting' &&
        v?.known_for_department !=='Crew' &&
        v?.known_for_department !=='Sound' &&
        v?.known_for_department !==  'Costume & Make-Up'&&
        v?.known_for_department !==  'Visual Effects'
    )
    return (
        <div>
            {isLoading ? (
                <LoaderWrapper data-testid='loader'>
                    <Loader/>
                </LoaderWrapper>
            ) : (
                <div>
                    {data && data?.cast?.length >0 ?
                        <h2 style={{marginTop:'1vh'}}>Casting</h2> :''
                    }
                    <RowCasting>
                        {data && data?.cast?.length >0 && data?.cast.map((casting, index) =>
                            <div className="flex-row" key={index + '_container'} >
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width:'15vh',
                                    maxHeight:'2.3vh',
                                    overflow:'hidden'
                                }}>
                                    <h5 style={{overflow:'hidden', fontWeight: 500, fontSize:'3.5vw'}}>{casting.name}</h5>
                                </div>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width:'15vh',
                                    overflow:'hidden',
                                    marginBottom:'1vh'
                                }}>
                                    <span style={{overflow:'hidden', fontWeight: 500, fontSize:'3vw'}} >"{casting?.character.replace(' (voice)','')}"</span>
                                </div>
                                <StyledImage
                                    key={casting.id}
                                    imageUrl = {`${urls.findImagesUrl.replace('original','w185')}${casting.profile_path}`}
                                    backup={Backup}
                                    alt={casting.name}
                                    onError = {e => e.target.parentNode.style.display = 'none'}
                                    // style={{border:'solid 1px gray'}}
                                />
                                <Link to={`/actor/${casting?.id}/${language}/${showType}`}>
                                    <MovieButton>discover</MovieButton>
                                </Link>
                            </div>
                        )
                        }
                    </RowCasting>
                    {data && data?.crew?.length >0 ?
                        <h2 style={{marginTop:'1vh'}}>Production</h2> :''
                    }

                    <RowCasting>
                        {crew && crew.map((crew, index) =>
                            <div className="flex-row" key={index + '_container'}>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width:'15vh',
                                    maxHeight:'2.3vh',
                                    overflow:'hidden'
                                }}>
                                    <h5 style={{overflow:'hidden', fontWeight: 500, fontSize:'initial'}}>{crew.name}</h5>
                                </div>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width:'15vh',
                                    overflow:'hidden',
                                    marginBottom:'1vh'
                                }}>
                                    <span style={{overflow:'hidden', fontWeight: 500, fontSize:'3.5vw'}}>{crew.known_for_department}</span>
                                </div>
                                <StyledImage
                                    key={crew.id}
                                    imageUrl = {`${urls.findImagesUrl.replace('original','w185')}${crew.profile_path}`}
                                    backup={Backup}
                                    alt={crew.name}
                                    onError = {e => e.target.parentNode.style.display = 'none'}
                                    // style={{border:'solid 1px gray'}}
                                />
                                {crew?.known_for_department ==="Directing"?
                                    <Link to={`/actor/${crew?.id}/${language}/${showType}`}>
                                        <MovieButton>discover</MovieButton>
                                    </Link>:''
                                }

                            </div>
                        )
                        }
                    </RowCasting>
                </div>
            )
            }
        </div>
    )
}

export default Credits;