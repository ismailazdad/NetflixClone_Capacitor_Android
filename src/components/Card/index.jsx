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
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: black;
  border-radius: 30px;
  width: 300px;
  height: 300px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

function Card({title, type, picture,year,}) {
    return (
        <CardWrapper >
            <CardLabel >{title}</CardLabel>
            <CardLabel >{type}</CardLabel>
            <CardImage src={picture} alt="freelance"/>
            <CardTitle >{year}</CardTitle>
        </CardWrapper>
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