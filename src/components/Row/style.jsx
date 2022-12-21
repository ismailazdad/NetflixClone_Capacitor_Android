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
export const LoaderWrapper = styled.div`
        display: flex;
        justify-content: center;
    `

export const Chevron = styled.div`
        position: absolute;
        z-index:100;
        opacity : 0.4;
        height:${({isLargeRow}) => isLargeRow ? '260px;' : '200px'}; 
        width: 38px;
        margin-top: 20px;
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
