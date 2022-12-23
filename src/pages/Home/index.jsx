import React from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components"
import LogoImg from "../../assets/Logo.svg"

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;
`

const HomerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width : 100%;
  height : 100vh
`
const LogoContainer = styled.img`
    position: fixed;
    left: 40%;
    right: 40%;
    top: 40%;
    bottom: 40%;
`
function Home() {

    return (
        <HomeWrapper id="homewraper">
            <HomerContainer id="homecontainer">
                <Link to="/movies">
                    <LogoContainer id="imgd" src={LogoImg}/>
                </Link>
            </HomerContainer>a
        </HomeWrapper>
    );
}

export default Home;