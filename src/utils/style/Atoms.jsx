import { Link } from 'react-router-dom'

import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid red;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
  margin-top: 50vh;
  display:  ${({isVideoEnding}) => (!isVideoEnding ? 'flex' : 'none')}; 
`

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
`