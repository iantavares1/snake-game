import { styled } from 'styled-components'

const Container = styled.div`
  position: absolute;
  background: yellow;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
`

export const Fruit = ({ style }) => {
  return <Container style={style} />
}
