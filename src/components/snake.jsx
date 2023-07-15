import { styled } from 'styled-components'

const Container = styled.div`
  position: absolute;
  background: white;
  width: 2rem;
  height: 2rem;
`

export const Snake = ({ style }) => {
  return <Container style={style} />
}
