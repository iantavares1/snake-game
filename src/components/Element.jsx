import { styled } from 'styled-components'

import { ELEMENT_SIZE } from '../settings/constants'

const Container = styled.div`
  position: absolute;
  top: ${({ top }) => top}rem;
  left: ${({ left }) => left}rem;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  background: ${({ color }) => color};
`

export const Element = ({ props }) => {
  return (
    <Container
      size={ELEMENT_SIZE}
      style={{ top: `${props.position.y}rem`, left: `${props.position.x}rem` }}
      color={props.color}
    />
  )
}
