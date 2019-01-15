import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Container } from './Framework'
import logo from '../assets/reddit.svg'

function random(arr) {
  return arr[Math.floor(Math.random() * TEXT_NODES.length)]
}

const flicker1 = keyframes`
  0% { opacity: 0.8; }
  20% { opacity: 1; }
  21% { opacity: 0; }
  21.5% { opacity: 0.8; }
  49% { opacity: 0.8; }
  50% { opacity: 0.7; }
  60% { opacity: 0.8; }
  80% { opacity: 0.8; }
  80.5% { opacity: 0; }
  81.4% { opacity: 0.7; }
  83% { opacity: 1; }
  100% { opacity: 0.8; }
`

const flicker2 = keyframes`
  0% { opacity: 0.8; }
  15% { opacity: 0.8; }
  16% { opacity: 0.7; }
  20% { opacity: 0.8; }
  49.5% { opacity: 0.8; }
  50% { opacity: 0; }
  51% { opacity: 0.7; }
  52% { opacity: 1; }
  54% { opacity: 0.1; }
  56% { opacity: 0.8; }
  90% { opacity: 1; }
  90.5% { opacity: 0; }
  91% { opacity: 0.8; }
  94% { opacity: 0.5; }
  94.5% { opacity: 1; }
`

const TextNodeBase = styled.span`
  text-shadow: 0 0 12px rgba(200, 200, 255, 0.7), 0 15px 12px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  color: white;
`
const TextNode1 = styled(TextNodeBase)`
  animation: ${flicker2} 12s linear infinite forwards;
`
const TextNode2 = styled(TextNodeBase)`
  animation: ${flicker1} 15s linear infinite forwards;
  animation-delay: 0.2s;
`
const TextNode3 = styled(TextNodeBase)`
  animation: ${flicker1} 13s linear infinite forwards;
  animation-delay: 0.3s;
`
const TextNode4 = styled(TextNodeBase)`
  animation: ${flicker2} 16s linear infinite forwards;
  animation-delay: 0.6s;
`

const TEXT_NODES = [TextNode1, TextNode2, TextNode3, TextNode4]

const textNodes = [...'Reddit User Analyser'].map((char, index) => {
  const Node = random(TEXT_NODES)
  return <Node key={index}>{char}</Node>
})

const HeaderStyled = styled.header`
  padding: 20px 0;
  background: radial-gradient(circle at 50% 50%, #383b62, #222743) no-repeat;
  border-bottom: 1px solid rgba(0, 8, 16, 0.2);
`

const Heading = styled.h1`
  font-size: 42px;
  text-align: center;
  margin-top: 5px;
`

const RedditLogo = styled.img`
  display: block;
  margin: 0 auto;
  height: 200px;
  user-select: none;
`

function Header({ children }) {
  return (
    <HeaderStyled>
      <RedditLogo src={logo} draggable="false" />
      <Container>
        <Heading>{textNodes}</Heading>
      </Container>
      {children}
    </HeaderStyled>
  )
}

export default Header
