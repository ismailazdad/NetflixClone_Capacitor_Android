import styled from "styled-components";

export const Card = styled.div`
        cursor:pointer;
        object-fit: contain;
        margin-left: 10px;
    `
export const LoaderContainer = styled.div`
        position:relative;
        text-align: center;
        width: ${({isLargeRow}) => isLargeRow ? '400px' : '400px'};
        height: ${({isLargeRow}) => isLargeRow ? '300px' : '150px'};
        z-index:1000;
        // display: ${({isVideoLoading}) => isVideoLoading ? 'block' : 'none'};   
        display: ${({stateVideo,isVideoLoading}) => isVideoLoading  || stateVideo ==='entering'? 'block' : 'none'};   
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
    `
export const VideoContainer = styled.div`
        margin-top:  ${({isLargeRow}) => (isLargeRow ? '-5rem' : '-6rem')}; 
        z-index:100;
        position:initial;
        top:0;
        overflow: hidden;
        // display: ${({isVideoLoading}) => isVideoLoading ? 'none' : 'block'}; 
        display: ${({stateVideo,isVideoLoading}) => ( stateVideo === 'exiting' || stateVideo ==='exited'  || stateVideo === 'entered') && !isVideoLoading  ? 'block' : 'none'};   
    `