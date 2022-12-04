import Inform from "../../assets/info.png"
import Play from "../../assets/play.png"
import mList from "../../assets/list.png"
import styled from "styled-components";
import React from "react";
//
// const InfoHeader = styled.div`
// background: #000000;
// position: absolute;
// // justify-content: center;
// // align-items: center;
// margin: 32% 25% 25% 25%;
// // display:flex
// // gap: 18px;
// `
// const Illustration = styled.img`
//   flex: 1;
//   margin : 10px 10px 10px 0;
// `
//
// function Info() {
//     return (
//         <InfoHeader id="info">
//             <Illustration style={{float: 'left'}} src={Inform}/>
//             <Illustration style={{backgroundColor: '#C4C4C4'}} src={Play}/>
//             <Illustration style={{float: 'right'}} src={mList}/>
//         </InfoHeader>)
// }


const InfoHeader = styled.div`
background: transparent;
position: absolute;
// margin: 32% 25% 25% 25%;
margin-left: 40% ;
margin-top:30%;
width:350px;
height:70px;
-moz-box-sizing:    border-box;
-webkit-box-sizing: border-box;
box-sizing:        border-box;
`
const Illustration = styled.div`
-moz-box-sizing:    border-box;
-webkit-box-sizing: border-box;
box-sizing:        border-box;
height:50px;
width: 30%;
display:inline-block;
float: left;
// margin: 0 1% 1% 0;
background: ${({ image }) => 'url('+image+') no-repeat;' };
flex: 1;
margin : 10px 10px 10px 0;
background-position:center;
&:hover {
    cursor: pointer;    
    background-color: black;
    box-shadow: 1px 1px 10px #e2e3e9;  
    // background-color: red;
    border-radius: ${({ activeBorder }) =>activeBorder ?'100px':'' };
}
`

function Info() {
    return (
        <InfoHeader id="info">
            <Illustration className="hideprop1" activeBorder={true} image={Inform}/>
            <Illustration style={{backgroundColor: '#C4C4C4'}} image={Play}/>
            <Illustration className="hideprop1" activeBorder={true} image={mList}/>
        </InfoHeader>)
}

export default Info;