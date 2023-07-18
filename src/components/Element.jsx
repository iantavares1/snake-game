import { styled } from 'styled-components'

import { ELEMENT_SIZE } from '../settings/constants'

const Container = styled.div`
  position: absolute;
  top: ${({ top }) => top}rem;
  left: ${({ left }) => left}rem;
  width: ${ELEMENT_SIZE}rem;
  height: ${ELEMENT_SIZE}rem;
  background: ${({ color }) => color};
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : 'none')};
`

export const Element = ({ props }) => {
  return (
    <Container
      style={{
        top: `${props.position.y}rem`,
        left: `${props.position.x}rem`,
      }}
      color={props.color}
      shape={props.shape}
    />
  )
}
