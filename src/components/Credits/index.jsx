import urls from "../../utils/urls";
import {useFetch} from "../../utils/hooks";
import {Loader} from "../../utils/style/Atoms";
import React from "react";
import {LoaderWrapper} from "../RowBanner";
import styled from "styled-components";

export const StyledImage = styled.img`
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

function Credits({id}) {
    const {isLoading, data, error} = useFetch(urls.findCreditsById.replace('{id}', id), false)
    let crew = data?.crew?.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
    crew = crew?.filter((v,i)=>
        v?.known_for_department !=='Acting' &&
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
                    {data && data?.cast.length >0 ?
                        <h2 style={{marginTop:'1vh'}}>Casting</h2> :''
                    }
                    <RowCasting>
                        {data && data?.cast.length >0 && data?.cast.map((catsing, index) =>
                            <div className="flex-row" key={index + '_container'} >
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width:'15vh',
                                    maxHeight:'2.3vh',
                                    overflow:'hidden'
                                }}>
                                    <h5 style={{overflow:'hidden', fontWeight: 500, fontSize:'initial'}}>{catsing.name}</h5>
                                </div>
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: 'small',
                                    marginLeft: '1.5vh',
                                    width:'15vh',
                                    overflow:'hidden'
                                }}>
                                    <span >"{catsing?.character.replace(' (voice)','')}"</span>
                                </div>
                                <StyledImage
                                    key={catsing.id}
                                    src={`${urls.findImagesUrl}${catsing.profile_path}`}
                                    alt={catsing.name}
                                    onError = {e => e.target.parentNode.style.display = 'none'}
                                    style={{border:'solid 1px gray'}}
                                />
                            </div>
                        )
                        }
                    </RowCasting>
                    {crew && crew.length >1 ?
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
                                    overflow:'hidden'
                                }}>
                                    <span>{crew.known_for_department}</span>
                                </div>
                                <StyledImage
                                    key={crew.id}
                                    src={`${urls.findImagesUrl}${crew.profile_path}`}
                                    alt={crew.name}
                                    onError = {e => e.target.parentNode.style.display = 'none'}
                                    style={{border:'solid 1px gray'}}
                                />
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