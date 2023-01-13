import React from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components"
import Title from "../../assets/Title.png"
import Title2 from "../../assets/Title2.png"

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;
  overflow:hidden;
  @media  only screen and (max-width:768px ){
        justify-content: inherit;
  }
`

const HomerContainer = styled.div`
  position: relative;
  top:30vh;
  left: 35%;
  width : 100%;
  height : 100vh;  
  @media  only screen and (max-width:768px ){
      left: 0vh;
  }
`
const LogoContainer = styled.img`
    position:relative;
    padding-top:5vh;
    @media  only screen and (max-width:768px ){
      width: 45vh;
  }
         
`
function Home() {
    return (
        <HomeWrapper id="homewraper">
            <HomerContainer id="homecontainer">
                <div>
                    <Link to="/movies">
                        <LogoContainer src={Title}/>
                    </Link>
                </div>
                <div>
                    <Link to="/movies2">
                        <LogoContainer src={Title2}/>
                    </Link>
                </div>
            </HomerContainer>
        </HomeWrapper>
    );
}

export default Home;