import React from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components"
import LogoImg from "../../assets/Logo.svg"

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;
  overflow:hidden;
`

const HomerContainer = styled.div`
  position: relative;
  top:30vh;
  left: 80vh;
  width : 100%;
  height : 100vh;  
  @media  only screen and (max-width:768px ){
      left: 3vh;
  }
`
const LogoContainer = styled.img`
    position:relative;
    padding-top:5vh;
`
function Home() {
    return (
        <HomeWrapper id="homewraper">
            <HomerContainer id="homecontainer">
                <div>
                    <Link to="/movies">
                        <LogoContainer src={LogoImg}/>
                    </Link>
                </div>
                <div>
                    <Link to="/movies2">
                        <LogoContainer src={LogoImg}/>
                    </Link>
                </div>
            </HomerContainer>
        </HomeWrapper>
    );
}

export default Home;