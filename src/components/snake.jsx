import { styled } from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: white;
  width: 2rem;
  height: 2rem;
`

export const Snake = ({ style }) => {
  return <Container style={style} />
}
