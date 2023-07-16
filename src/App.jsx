import styled from 'styled-components'

import { Game } from './pages/Game'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #222;
  display: grid;
  place-content: center;
`

const App = () => {
  return (
    <Container>
      <Game />
    </Container>
  )
}

export default App
