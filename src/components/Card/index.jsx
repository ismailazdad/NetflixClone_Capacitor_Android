import PropTypes from 'prop-types'
import React, {Component, useState} from "react";
import styled from "styled-components"

const CardLabel = styled.span`
  color: white;
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`
const CardTitle = styled.span`
  color: white;
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
    // height: 100vh;
    width: 100%;
    align-self: center;
    object-fit: cover;
`
const CardImage2 = styled.div`
    width: 75%;
    height: 100vh;
    // background: url('cat.jpeg') no-repeat;
    background: ${({ image }) => 'url('+image+') no-repeat;' };
    background-size: cover; 
    background-position: center; 
    // border: 1px solid red;
`

const CardWrapper = styled.div`
    margin-top : 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    height: 300px;
    transition: 300ms;
    margin-right : -80px;
    &:hover {
        cursor: pointer;
        // box-shadow: 2px 2px 10px #e2e3e9;
        width:340px;
        height: 340px;  
    }
`

function Card({title, type, picture,year,}) {
    return (
        <div>
        <CardWrapper id="CardWrapper" >
            {/*<CardLabel >{title}</CardLabel>*/}
            {/*<CardLabel >{type}</CardLabel>*/}
            {/*<CardImage src={picture} alt="freelance"/>*/}
            <CardImage2 image={picture} alt="freelance"/>
            {/*<CardTitle >{year}</CardTitle>*/}
        </CardWrapper>

        </div>
    )
}

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
}

Card.defaultProps = {
    title: "default title",
    label: "default label",
    picture: "",
}

export default Card