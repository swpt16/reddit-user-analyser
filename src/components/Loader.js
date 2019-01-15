import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../theme/colors'

const loaderAnimation = keyframes`
  from {
    transform: translate3d(0, 4px, 0);
  }
  to {
    transform: translate3d(0, -6px, 0);
  }
`

const LoaderStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};

  div {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(200, 200, 255, 0.5);
    margin: 0 3px;
    animation: ${loaderAnimation} 0.5s ease infinite alternate;

    &:nth-child(1) {
      background: ${colors[0]};
    }

    &:nth-child(2) {
      background: ${colors[1]};
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      background: ${colors[2]};
      animation-delay: 0.4s;
    }

    &:nth-child(4) {
      background: ${colors[3]};
      animation-delay: 0.6s;
    }
  }
`

function Loader({ isVisible }) {
  return (
    <LoaderStyled isVisible={isVisible}>
      <div />
      <div />
      <div />
      <div />
    </LoaderStyled>
  )
}

export default Loader
