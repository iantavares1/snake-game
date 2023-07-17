import { styled } from 'styled-components'

const Container = styled.button`
  all: unset;
  width: fit-content;
  border-radius: 1rem;
  cursor: pointer;

  ${({ type }) =>
    type === 1 &&
    ` 
    padding: 1rem;
    background: #fff;
    color : #000
  `}

  ${({ type }) =>
    type === 2 &&
    `   
  padding: 1rem;
  background: red; 
  color: #fff;
`}
`

export const Button = ({ children, onClick, style, type }) => {
  return (
    <Container type={type} onClick={onClick} style={style}>
      {children}
    </Container>
  )
}
