import { useEffect, useState } from 'react'

import styled from 'styled-components'

import { Snake } from './components/snake'
import { Fruit } from './components/fruit'
import { Button } from './components/button'
import { Modal } from './components/modal'
import { Joystick } from './components/joystick'

import { getRandomPosition } from './utils/getRandomPosition'
import { SettingsIcon } from './components/common/settingsIcon'
import { Settings } from './components/settings'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    zoom: 0.8;
    display: flex;
  }
  @media (max-width: 580px) {
    zoom: 0.6;
  }
  @media (max-width: 425px) {
    zoom: 0.5;
  }
  @media (max-width: 350px) {
    zoom: 0.4;
  }

  @media (max-height: 770px) and (min-width: 768px) {
    zoom: 0.8;
    display: grid;
    grid-template: auto auto / auto auto;
    column-gap: 8rem;
  }
`

const Box = styled.div`
  grid-column: 1;
  grid-row: 2;
  position: relative;
  background: rgb(114, 50, 191);
  width: 64rem;
  height: 64rem;

  @media (max-width: 768px) {
    margin-bottom: 5rem;
  }
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [difficulty, setDifficulty] = useState('normal')
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const [snakePosition, setSnakePosition] = useState(getRandomPosition(60))
  const [fruitPosition, setFruitPosition] = useState(getRandomPosition(60))
  const [direction, setDirection] = useState('')
  const [tail, setTail] = useState([])

  const [isOver, setIsOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [settingsPage, setSettingsPage] = useState(false)

  const [onClick, setOnclick] = useState('')

  const getMaxScore = () => window.localStorage.getItem('max_score')

  const handleSettignsPage = () => {
    setSettingsPage((prev) => !prev)
    !isOver && setIsPaused(true)
  }

  const handleKeyDown = (key) => {
    setDirection((prevDirection) => {
      if (key === 'ArrowUp') {
        if (prevDirection !== 'ArrowDown') {
          return key
        } else {
          return prevDirection
        }
      } else if (key === 'ArrowDown') {
        if (prevDirection !== 'ArrowUp') {
          return key
        } else {
          return prevDirection
        }
      } else if (key === 'ArrowLeft') {
        if (prevDirection !== 'ArrowRight') {
          return key
        } else {
          return prevDirection
        }
      } else {
        if (prevDirection !== 'ArrowLeft') {
          return key
        } else {
          return prevDirection
        }
      }
    })
  }

  const handleResume = () => {
    if (!isOver) {
      setIsPaused((prev) => !prev)
    }
  }

  const handleTryAgain = () => {
    handleResume()
    setDirection('')
    setSnakePosition(getRandomPosition(60))
    setTail([])
    setScore(0)
  }

  useEffect(() => {
    if (getMaxScore() < score) {
      window.localStorage.setItem('max_score', score)
    }
    setMaxScore(getMaxScore())
  }, [score])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyDown(e.key))

    return () => {
      document.removeEventListener('keydown', (e) => handleKeyDown(e.key))
    }
  }, [])

  useEffect(() => {
    handleKeyDown(onClick)
  }, [onClick])

  useEffect(() => {
    const isCollisionSelf =
      tail.length > 1 &&
      tail
        .slice(0, -1)
        .some(
          (position) =>
            position.x === snakePosition.x && position.y === snakePosition.y,
        )

    setIsOver(
      snakePosition.x === 0 ||
        snakePosition.y === 0 ||
        snakePosition.x === 62 ||
        snakePosition.y === 62 ||
        isCollisionSelf,
    )
  }, [snakePosition, tail])

  useEffect(() => {
    if (!isOver && !isPaused) {
      const handleInterval = setInterval(() => {
        const getPositions = () => {
          const newHead = { ...snakePosition }
          if (direction === 'ArrowUp') {
            newHead.y = newHead.y - 2
          } else if (direction === 'ArrowDown') {
            newHead.y = newHead.y + 2
          } else if (direction === 'ArrowLeft') {
            newHead.x = newHead.x - 2
          } else {
            newHead.x = newHead.x + 2
          }

          if (newHead.x === fruitPosition.x && newHead.y === fruitPosition.y) {
            setScore((prev) => prev + 1)
            setTail((prevTail) => [...prevTail, newHead])
            setFruitPosition(getRandomPosition(60))
          } else {
            setTail((prev) => {
              const newArray = [...prev]
              newArray.shift()
              return [...newArray, newHead]
            })
          }

          setSnakePosition({ ...newHead })
        }

        getPositions()
      }, difficulty)

      return () => {
        clearInterval(handleInterval)
      }
    }
  }, [isOver, isPaused, direction, snakePosition, fruitPosition, difficulty])

  useEffect(() => console.log(difficulty), [difficulty])

  return (
    <Container>
      <Wrapper style={{ paddingLeft: '5rem' }}>
        <SettingsIcon onClick={handleSettignsPage} />
        <h1>Max: {maxScore}</h1>
        <h1>{score}</h1>
      </Wrapper>
      {settingsPage && (
        <Settings onSelect={setDifficulty} isOpen={setSettingsPage} />
      )}
      <Box
        onClick={() => {
          !isPaused && handleResume()
        }}
      >
        {!isOver && (
          <>
            <Snake
              style={{
                top: `${snakePosition.y}rem`,
                left: `${snakePosition.x}rem`,
              }}
            />
            {tail.map((position, index) => (
              <Snake
                key={index}
                style={{
                  top: `${position.y}rem`,
                  left: `${position.x}rem`,
                }}
              />
            ))}
            <Fruit
              style={{
                top: `${fruitPosition.y}rem`,
                left: `${fruitPosition.x}rem`,
              }}
            />
          </>
        )}
        {isPaused && (
          <Modal>
            <h1>Paused</h1>
            <Button onClick={handleResume}>Resume</Button>
            <Button
              onClick={handleTryAgain}
              style={{ background: '#df3535', color: 'white' }}
            >
              Try Again
            </Button>
          </Modal>
        )}
        {isOver && (
          <Modal>
            <h1>Game Over</h1>
            <Button onClick={handleTryAgain}>Try Again</Button>
          </Modal>
        )}
      </Box>
      {(windowSize.width < 768 || windowSize.height < 770) && (
        <Joystick onClick={setOnclick} />
      )}
    </Container>
  )
}

export default App
