import { useEffect, useState } from 'react'

import styled from 'styled-components'

import { Snake } from './components/snake'
import { Button } from './components/button'
import { Modal } from './components/modal'

import { getRandomPosition } from './utils/getRandomPosition'

const Container = styled.div`
  position: relative;
  background: rgb(114, 50, 191);
  width: 64rem;
  height: 64rem;
`

const H1 = styled.h1`
  color: #fff;
  margin-bottom: 2rem;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

function App() {
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [snakePosition, setSnakePosition] = useState({ x: 6, y: 6 })
  const [isOver, setIsOver] = useState(false)

  const getMaxScore = () => window.localStorage.getItem('max_score')

  const handleKeyPress = (key) => {
    setSnakePosition((prevPosition) => {
      switch (key) {
        case 'ArrowUp':
          return { ...prevPosition, y: prevPosition.y - 2 }
        case 'ArrowDown':
          return { ...prevPosition, y: prevPosition.y + 2 }
        case 'ArrowLeft':
          return { ...prevPosition, x: prevPosition.x - 2 }
        case 'ArrowRight':
          return { ...prevPosition, x: prevPosition.x + 2 }
        default:
          return prevPosition
      }
    })
  }

  const handleTryAgain = () => {
    setSnakePosition(getRandomPosition(64))
    setScore(0)
  }

  useEffect(() => {
    setMaxScore(getMaxScore())
  }, [score])

  useEffect(() => {
    if (
      snakePosition.x === 0 ||
      snakePosition.y === 0 ||
      snakePosition.x === 62 ||
      snakePosition.y === 62
    ) {
      !(getMaxScore() > score) &&
        window.localStorage.setItem('max_score', score)
      return
    }
    const handleKeyDown = (e) => {
      handleKeyPress(e.key)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [snakePosition, score])

  useEffect(() => {
    setIsOver(
      snakePosition.x === 0 ||
        snakePosition.y === 0 ||
        snakePosition.x === 62 ||
        snakePosition.y === 62,
    )
  }, [snakePosition])

  return (
    <>
      <Wrapper>
        <H1>Score: {score}</H1>
        <H1>Max: {maxScore}</H1>
      </Wrapper>
      <Container>
        {!isOver && (
          <Snake
            style={{
              top: `${snakePosition.y}rem`,
              left: `${snakePosition.x}rem`,
            }}
          />
        )}
        {isOver && (
          <Modal>
            <h1>Game Over!</h1>
            <Button onClick={handleTryAgain}>Try Again</Button>
          </Modal>
        )}
      </Container>
    </>
  )
}

export default App
