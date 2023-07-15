import { styled } from 'styled-components'

const Container = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 2rem;
  color: white;
`

export const Modal = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  )
}
