import React from "react";
import styled from "styled-components"
import Battery from "../../assets/Battery.png"
import Cell from "../../assets/Cellular.png"
import Wifi from "../../assets/Wifi.png"
import Time from "../../assets/Time.png"

const HomeHeader = styled.div`
box-sizing: border-box;
position: absolute;
height: 44px;
left: 0px;
right: 0px;
top: 0px;
background: #000000;
`
const HomeHeaderRight = styled.div`

width: 100px;
height: 10.67px;
background : #000000;
float:right;
`
const HomeHeaderLeft = styled.div`
width: 100px;
height: 10.67px;
background : #000000;
float:left;
display :content;
`

const Illustration = styled.img`
  flex: 1;
  margin : 10px 10px 10px 0;
`
const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

function Header() {
    return (
        <HomeHeader id="header">
            <LeftCol>
                <HomeHeaderLeft>
                    <Illustration src={Time}/>
                </HomeHeaderLeft>
            </LeftCol>
            <HomeHeaderRight>
                <Illustration src={Cell}/><Illustration src={Wifi}/><Illustration src={Battery}/>
            </HomeHeaderRight>
        </HomeHeader>

    );
}

export default Header;