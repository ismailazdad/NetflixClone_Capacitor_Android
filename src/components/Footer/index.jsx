import styled from "styled-components"
import React from "react";

const FooterStyle = styled.footer`
    justify-content: center;
    padding-top:2vh;
    background: #000000;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    position: relative;
`
const BarStyle = styled.div`
    position: absolute;
    width: 121.38px;
    height: 4.53px;
    left: calc(50% - 121.38px/2 - 0px);
    bottom: 22px;
    background: #FFFFFF;
    border-radius: 90.5797px;
`
function Footer() {
    return (
       <FooterStyle id='footer'>
           <BarStyle />
       </FooterStyle>
    )
}

export default Footer;