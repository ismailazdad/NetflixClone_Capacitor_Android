import styled from "styled-components";

export const Card = styled.div`
    cursor:pointer;
    object-fit: contain;
    margin-left: ${({useRank}) => useRank ? '-35px' : '10px'};   
    @media  only screen and (max-width:768px ){
        margin-left: ${({useRank}) => useRank ? '-3vh' : '2vh'};   
    } 
    `
export const LoaderParentContainer = styled.div`
    position:inherit;
    border:solid 1px transparent;
    width: 400px;
    height: ${({isLargeRow}) => isLargeRow ? '260px' : '200px'};
    @media  only screen and (max-width:768px ){
        width: ${({isLargeRow}) => isLargeRow ? '30vh' : '30vh'};
        height: ${({isLargeRow}) => isLargeRow ? '25vh' : '15vh'};
    } 
`
export const LoaderContainer = styled.div`
    position:relative;
    text-align: center;
    width: ${({isLargeRow}) => isLargeRow ? '400px' : '400px'};
    height: ${({isLargeRow}) => isLargeRow ? '300px' : '150px'};
    z-index:1000; 
    display: ${({stateVideo,isVideoLoading}) => isVideoLoading  || stateVideo !== 'entered'? 'block' : 'none'}; 
    @media  only screen and (max-width:768px ){
        width: ${({isLargeRow}) => isLargeRow ? '30vh' : '30vh'};
        height: ${({isLargeRow}) => isLargeRow ? '20vh' : '15vh'};
    } 
`
export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
export const StyledImage = styled.img`
    object-fit: contain;
    max-height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '200px')};     
    height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '200px')};  
    max-width: ${({isLargeRow}) => isLargeRow ? '400px' : '400px'};           
    @media  only screen and (max-width:768px ){
        max-height:  ${({isLargeRow}) => (isLargeRow ? '20vh' : '15vh')};     
        height:  ${({isLargeRow}) => (isLargeRow ? '20vh' : '15vh')};    
        max-width: ${({isLargeRow}) => isLargeRow ? '30vh' : '30vh'};  
    } 
`
export const VideoContainer = styled.div`
    margin-top:  ${({isLargeRow}) => (isLargeRow ? '-5rem' : '-6rem')}; 
    z-index:100;
    position:initial;
    top:0;
    overflow: hidden;
    display: ${({stateVideo,isVideoLoading}) =>  stateVideo === 'entered' && !isVideoLoading  ? 'block' : 'none'};   
    @media  only screen and (max-width:768px ){
        margin-top:  ${({isLargeRow}) => (isLargeRow ? '-8rem' : '-11rem')};  
        iframe{
            padding-top:${({isLargeRow}) => (isLargeRow ? '1vh' : '10vh')};  ;
        }
    } 
`
export const GenresTypes = styled.div`
    display:initial;
    color:lightgreen;
    float:right;
    padding-right:1%;
    font-size: 1rem;
`
export const PlayModalMenuButton = styled.button`       
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 0.7rem ;
    height:  35px;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 20px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    background-color: #c4c4c4;
    width :35px ;  
    margin-left: 6px;
    &:hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
}
`
export const SoundContainer = styled.div`
    position:absolute;
    right:1vh;
    z-index:1000;
    top:0;
    @media only screen and (max-width:768px ){
        position: fixed;
    }
`
export const Expand = styled.div`
    position:absolute;
    right:1vh;
    z-index:1100;
    bottom: 4vh;
    @media only screen and (max-width:768px ){
        position: fixed;
        z-index: 2000;
        right: 1vh;
    }
`