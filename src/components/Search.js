import React, { useState } from 'react'
import styled from 'styled-components'
import Tippy from './Tippy'
import Loader from './Loader'
import { MEDIA } from './Framework'

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`

const Input = styled.input`
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  font-size: 19px;
  line-height: 2.5;
  color: inherit;
  padding: 0 15px;
  transition: background 0.2s, border-color 0.2s;
  max-width: 100%;
  width: 100%;
  font-family: inherit;
  height: 50px;

  ${MEDIA.sm} {
    width: 400px;
  }

  &:focus {
    background: rgba(0, 0, 0, 0.4);
    border-color: #5794ff;
  }
`

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  background: radial-gradient(circle at 0% 20%, #595e85, #2a325d);
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-right: none;
  font-weight: bold;
  font-size: 19px;
  border-radius: 5px 0 0 5px;
  padding: 0 15px;
`

const InputButton = styled.button`
  position: relative;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-left: none;
  font-size: 16px;
  font-weight: 700;
  height: 100%;
  padding: 8px 16px;
  text-transform: uppercase;
  border-radius: 0 5px 5px 0;
  color: #6e91ff;
  transition: 0.2s color, 0.2s background;
  margin: 0;
  cursor: pointer;

  &:hover {
    background: rgba(200, 200, 255, 0.1);
    color: #00ffc9;
  }

  &:active {
    background: rgba(0, 0, 0, 0.5);
  }

  &[disabled] {
    pointer-events: none;
    cursor: not-allowed;
  }
`

function getStatusString(status) {
  if (status.isFetching) {
    return 'Fetching data...'
  }
  if (status.isCalculating) {
    return 'Calculating data...'
  }
  return ''
}

function Search({ username, setUsername, isLoading, status, onSubmit }) {
  const [showEmptyUsernameWarning, setShowEmptyUsernameWarning] = useState(
    false,
  )

  function onValidatedSubmit(e) {
    if (username === '') {
      setShowEmptyUsernameWarning(true)
    } else {
      onSubmit(e)
    }
  }

  function handleChange(e) {
    setUsername(e.target.value)
    setShowEmptyUsernameWarning(false)
  }

  return (
    <InputWrapper>
      <InputLabel htmlFor="username">u/</InputLabel>
      <Tippy
        content="Please enter a username"
        trigger="manual"
        isVisible={showEmptyUsernameWarning}
        placement="top-start"
        theme="dark left-arrow"
        animation="fade"
        arrow
      >
        <Input
          id="faaggg0gr"
          type="text"
          maxLength="20"
          aria-label="Enter Reddit username"
          value={username}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && onValidatedSubmit(e)}
        />
      </Tippy>
      <Tippy
        content={getStatusString(status)}
        placement="bottom"
        trigger="manual"
        isVisible={isLoading}
        hideOnClick={false}
        animation="fade"
        updateDuration={0}
        flip={false}
        duration={[null, 0]}
        arrow
        sticky
      >
        <div>
          <InputButton disabled={isLoading} onClick={onValidatedSubmit}>
            <Loader isVisible={isLoading} />
            <span style={{ visibility: isLoading ? 'hidden' : '' }}>
              Analyse
            </span>
          </InputButton>
        </div>
      </Tippy>
    </InputWrapper>
  )
}

export default Search
