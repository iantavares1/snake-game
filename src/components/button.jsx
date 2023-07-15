import { styled } from 'styled-components'

const Container = styled.button`
  all: unset;
  width: fit-content;
  padding: 1rem;
  background: #fff;
  color: #000;
  font-weight: 500;
  border-radius: 1rem;
  cursor: pointer;
`

export const Button = ({ children, onClick, style }) => {
  return (
    <>
      <Container style={style} onClick={onClick}>
        {children}
      </Container>
    </>
  )
}
