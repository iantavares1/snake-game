import { styled } from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 2rem;
`

export const Modal = ({ children }) => {
  return <Container>{children}</Container>
}
