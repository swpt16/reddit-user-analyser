import React from 'react'
import styled from 'styled-components'
import Tippy from './Tippy'

const Bar = styled.div`
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
`

const Inner = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  line-height: 32px;
  font-weight: bold;
`

const Positive = styled(Inner)`
  background: linear-gradient(90deg, #4edbad, #56c684);
  padding-left: 10px;
  color: #1c2238;
`

const Negative = styled(Inner)`
  background: linear-gradient(90deg, #ed4e4e, #e72b64);
  padding-right: 10px;
  text-align: right;
  background-size: 105%;
`

function Tooltip({ children, content, ...rest }) {
  return (
    <Tippy
      content={content}
      placement="bottom-start"
      animation="fade"
      theme="light"
      duration={100}
      animateFill={false}
      followCursor={true}
      hideOnClick={false}
      {...rest}
    >
      {children}
    </Tippy>
  )
}

function Sentiment({ ratio }) {
  const positive = Math.round(100 * ratio)
  const negative = 100 - positive
  return (
    <Bar>
      <Tooltip content={`Positive (${positive}%)`}>
        <Positive style={{ width: positive + '%' }} />
      </Tooltip>
      <Tooltip content={`Negative (${negative}%)`}>
        <Negative style={{ width: negative + '%' }} />
      </Tooltip>
    </Bar>
  )
}

export default Sentiment
