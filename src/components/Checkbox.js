import React from 'react'
import styled from 'styled-components'
import Check from 'react-feather/dist/icons/check'

const Label = styled.label`
  position: relative;
  padding-left: 32px;
  user-select: none;
  font-size: 15px;
  height: 22px;
  line-height: 22px;
  white-space: nowrap;
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ [data-box] {
    background-color: #5794ff;

    svg {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Box = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 22px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  transition: background 0.2s;

  svg {
    width: 18px;
    height: 18px;
    opacity: 0;
    transform: scale(0.5);
    transition: transform 0.2s, opacity 0.2s;
  }
`

function Checkbox({ label, checked, onChange, ...rest }) {
  return (
    <Label {...rest}>
      {label}
      <Input type="checkbox" checked={checked} onChange={onChange} />
      <Box data-box>
        <Check />
      </Box>
    </Label>
  )
}

Checkbox.defaultProps = {
  checked: true,
}

export default Checkbox
