import styled from "styled-components";

export const RowContainer = styled.div`
        color: white;
        margin-left: 20px;
        overflow-y: hidden;
        overflow-x: hidden;           
    `
export const RowPoster = styled.div`
        display: flex;
        overflow-y: hidden;
        scroll-behavior:smooth;
        padding: 20px;
        width: fit-content;
        ::-webkit-scrollbar {
            display: none;
            float :right;
        }
        animation: slide 3s linear infinite;  
        animation-iteration-count : infinite;
        animation-direction  :  alternate-reverse;
        ${({scrollL, scroll}) => (!scrollL && !scroll ? 'animation-play-state :paused ;' : 'animation-play-state:running;')}     
        @keyframes slide { 
             0% {
            transform: translate3d(-50%, 0, 0);
             }
             100% {
              
              transform: translate3d(0, 0, 0);
                 }
         }
    `
export const Card = styled.div`
        cursor:pointer;
        object-fit: contain;
        margin-left: 10px;
    `
export const LoaderWrapper = styled.div`
        display: flex;
        justify-content: center;
    `
export const StyledImage = styled.img`
        object-fit: contain;
        max-height:  ${({isLargeRow}) => (isLargeRow ? '250px' : '150px')};        
    `
export const VideoContainer = styled.div`
        margin-top:  ${({isLargeRow}) => (isLargeRow ? '-5rem' : '-9.5rem')}; 
        z-index:100;
        position:initial;
        top:0;
        overflow: hidden;
        // display: ${({isVideoLoading}) => isVideoLoading ? 'none' : 'block'}; 
        display: ${({stateVideo,isVideoLoading}) => stateVideo === 'entered' && !isVideoLoading  ? 'block' : 'none'};   

    `
export const LoaderContainer = styled.div`
        position:relative;
        text-align: center;
        width: ${({isLargeRow}) => isLargeRow ? '300px' : '300px'};
        height: ${({isLargeRow}) => isLargeRow ? '300px' : '150px'};
        z-index:1000;
        // display: ${({isVideoLoading}) => isVideoLoading ? 'block' : 'none'};   
        display: ${({stateVideo,isVideoLoading}) => isVideoLoading || stateVideo === 'exiting' || stateVideo ==='exited' || stateVideo ==='entering' ? 'block' : 'none'};   

    `

export const Chevron = styled.div`
        position: absolute;
        z-index:100;
        opacity : 0.4;
        height:${({isLargeRow}) => isLargeRow ? '260px;' : '160px'}; 
        width: 38px;
        margin-top: 17px;
        background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
        background-position: center;
        background-size: contain;
        background-color:gray;
         &:hover{
              opacity:.90;
              -moz-opacity:.50; 
              filter:alpha(opacity=50);         
        }
    `
