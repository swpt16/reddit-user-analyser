import React, { useState } from 'react'
import styled from 'styled-components'
import clamp from 'lodash/clamp'
import { Row, Col } from './Framework'
import Checkbox from './Checkbox'
import STOP_WORDS from '../data/stop-words.json'

const Bar = styled.div`
  width: ${props => Math.round(props.width)}%;
  background: ${props => getBarBackground(props.width)};
  color: ${props => getBarColor(props.width)};
  padding: 10px;
  white-space: nowrap;
  margin-bottom: 2px;
  border-radius: 0 8px 8px 0;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function getBarColor(value) {
  return value >= 60 ? '#333' : 'white'
}

function getBarBackground(value) {
  function h(x) {
    const value = Math.round(
      570 + (249.101 - 570) / (1 + (x / 88.10628) ** 1.014657),
    )
    return value > 360 ? value - 360 : value
  }

  function s(x) {
    return x > 50 ? 100 : clamp(Math.round(25 * Math.log(x + 5)), 0, 80)
  }

  function l(x) {
    return clamp(Math.round(0.7 * x + 20), 0, 85)
  }

  return `hsl(${h(value)}, ${s(value)}%, ${l(value)}%)`
}

function BarLists({ data }) {
  const [filterStopWords, setFilterStopWords] = useState(true)
  const [numberToDisplay, setNumberToDisplay] = useState(15)

  const topSubreddits = data.topSubreddits.slice(0, numberToDisplay)
  const frequentWords = filterStopWords
    ? data.frequentWords
        .filter(([word]) => !STOP_WORDS.includes(word))
        .slice(0, numberToDisplay)
    : data.frequentWords.slice(0, numberToDisplay)

  return (
    <Row>
      <Col base={12} md={6}>
        <h3>Top Subreddits</h3>
        {topSubreddits.map(([subreddit, count]) => (
          <Bar key={subreddit} width={(100 * count) / topSubreddits[0][1]}>
            <strong>{subreddit}</strong> {count}
          </Bar>
        ))}
      </Col>
      <Col base={12} md={6}>
        <TitleWrapper>
          <h3>Frequently Used Words</h3>
          <Checkbox
            label="Filter stop words"
            onChange={() => setFilterStopWords(value => !value)}
            checked={filterStopWords}
            style={{ marginLeft: 15 }}
          />
        </TitleWrapper>
        {frequentWords.map(([word, count]) => (
          <Bar key={word} width={(100 * count) / frequentWords[0][1]}>
            <strong>{word}</strong> {count}
          </Bar>
        ))}
      </Col>
    </Row>
  )
}

export default BarLists
