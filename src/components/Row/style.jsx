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
    padding-right:300px;
    ::-webkit-scrollbar {
        display: none;
        float :right;
    }
    //old animation on mouse hover scroll infinite
    // animation: slide 3s linear infinite;  
    // animation-iteration-count : infinite;
    // animation-direction  :  alternate-reverse;
    // ${({scrollLeft, scrollRight}) => (!scrollLeft && !scrollRight ? 'animation-play-state :paused ;' : 'animation-play-state:running;')}     
    // @keyframes slide { 
    //      0% {
    //     transform: translate3d(-50%, 0, 0);
    //      }
    //      100% {
    //      
    //       transform: translate3d(0, 0, 0);
    //          }
    //  }
`
export const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`
export const TrendNumber = styled.h1`
    font-size: 210px;
    height: fit-content;    
    color: black;
    width: fit-content;
    top: 0;
    margin: 0;
    -webkit-text-stroke: 2px white; 
    @media  only screen and (max-width:768px ){     
        font-size: 16vh;
    }            
`
export const Chevron = styled.div`
    position: absolute;
    z-index:100;
    opacity : 0.4;
    height:${({isLargeRow}) => isLargeRow ? '250px;' : '200px'}; 
    width: 38px;
    margin-top: 20px;
    background: ${({icon}) => 'url(' + icon + ') no-repeat center'};
    background-position: center;
    background-size: contain;
    background-color:gray;
    @media  only screen and (max-width:768px ){
        height:${({isLargeRow}) => isLargeRow ? '20vh' : '15vh'}; 
        width: 3vh;
    }    
    
     &:hover{
          opacity:.90;
          -moz-opacity:.50; 
          filter:alpha(opacity=50);         
    }
`
