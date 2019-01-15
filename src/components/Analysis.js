import React from 'react'
import styled from 'styled-components'
import { Row, Col, Card, Flex, Faded } from './Framework'
import { capitalize } from '../analysis/utils'
import Sentiment from './Sentiment'
import BarLists from './BarLists'
import { colors } from '../theme/colors'

const TraitStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #58618b;
  font-weight: 600;
  font-size: 24px;

  &::after {
    content: attr(aria-label);
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    background: #58618b;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 0.2px;
    font-weight: bold;
    color: #181c31;
  }
`

const Traits = colors.map(
  color => styled(TraitStyled)`
    border-color: ${color};
    &::after {
      background: ${color};
    }
  `,
)

const PostDataStyled = styled.div`
  padding: 25px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Name = styled.h4`
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 0;
`

const Value = styled.div`
  font-size: 30px;
  font-weight: bold;
`

const Title = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-top: 15px;
`

const TopText = styled.div`
  font-size: 20px;
  text-align: center;
  opacity: 0.8;
`

const MiniCard = styled(Card)`
  padding: 5px 10px;
`

const MiniCardValue = styled.span`
  font-size: 14px;
  opacity: 0.85;
`

function Trait({ name, data, index }) {
  const isUnknown = data.value === 'Unknown'
  const date = isUnknown ? null : data.post.created_utc
  const capitalizedName = capitalize(name)
  const Comp = Traits[index]
  return (
    <Comp aria-label={capitalizedName}>
      <Faded
        opacity={isUnknown ? 0.7 : 1}
        style={{
          marginTop: -4,
          fontSize: isUnknown ? 13 : undefined,
        }}
      >
        {String(data.value)}
      </Faded>
    </Comp>
  )
}

function PostData({ name, value }) {
  return (
    <PostDataStyled>
      <div>
        <Value>{String(value)}</Value>
        <Name>{name}</Name>
      </div>
    </PostDataStyled>
  )
}

function Analysis({ data }) {
  return (
    <div style={{ padding: '40px 0' }}>
      <TopText>Analysis</TopText>
      <Title>
        <Faded>u/</Faded>
        {data.username}
      </Title>
      <Row>
        <Col base={12} md={6}>
          <h3>Posts</h3>
          <Row spacing={8}>
            {Object.entries(data.posts.card).map(([key, value]) => (
              <Col key={key} base={6} spacing={8} style={{ marginBottom: 16 }}>
                <Card>
                  <PostData name={key} value={value} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col base={12} md={6}>
          <h3>Physical Traits</h3>
          <Flex>
            {Object.entries(data.traits.physical).map(([key, trait], index) => (
              <Trait key={key} index={index} name={key} data={trait} />
            ))}
          </Flex>
          <h3>Other Traits</h3>
          <Flex justify="flex-start">
            {Object.entries(data.traits.other).map(([key, trait]) => (
              <MiniCard key={key}>
                <strong>{key}</strong>{' '}
                <MiniCardValue>{trait.value}</MiniCardValue>
              </MiniCard>
            ))}
          </Flex>
          <h3>Sentiment Analysis</h3>
          <Sentiment ratio={data.posts.sentiment.binary.comments} />
        </Col>
      </Row>
      <BarLists data={data.posts.barLists} />
    </div>
  )
}

export default Analysis
