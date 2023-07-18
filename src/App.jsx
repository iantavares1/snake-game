import React, { useState, useEffect, useRef } from 'react'
import { styled, ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/global-style'
import dark from './styles/themes/dark'
import light from './styles/themes/light.js'
import { BOX_SIZE, ELEMENT_SIZE } from './settings/constants'
import { getRandomPosition } from './utils/getRandomPosition'

import {
  Element as Snake,
  Element as Tail,
  Element as Fruit,
} from './components/Element'

import { Settings } from './components/Settings'
import { Modal } from './components/Modal'
import { Button } from './components/Button'
import { Pause } from './components/icons/Pause'
import { Gear } from './components/icons/Gear'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 768px) {
    zoom: 0.8;
  }
  @media (min-width: 1920px) {
    zoom: 1.2;
  }
  @media (min-width: 2300px) {
    zoom: 1.4;
  }
  @media (max-height: 2300px) {
    zoom: 0.8;
  }
`

const Header = styled.header`
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Box = styled.div`
  overflow: hidden;
  position: relative;
  width: ${BOX_SIZE}rem;
  height: ${BOX_SIZE}rem;
  background: ${({ color }) => color};
  outline: solid 0.4rem ${({ border }) => border};
`

function App() {
  const getGameProps = () =>
    JSON.parse(window.localStorage.getItem('game_props'))

  const getMaxScore = () => window.localStorage.getItem('max_score')

  const initialGameProps = getGameProps() || {
    theme: 'dark',
    style: {
      box_color: 'purple',
      element_shape: 'square',
      border_color: 'none',
      snake_color: 'white',
      fruit_color: 'yellow',
    },
    difficulty: 'normal',
  }
  const [gameProps, setGameProps] = useState(initialGameProps)

  const [snakeProps, setSnakeProps] = useState({
    position: getRandomPosition(),
    direction: '',
    tail: [],
  })
  const [fruitProps, setFruitProps] = useState({
    position: getRandomPosition(),
  })

  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(getMaxScore() || 0)

  const [isPaused, setIsPaused] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)

  const touchStartRef = useRef({ x: 0, y: 0 })

  const handleUpdateGameProps = (updatedProps) => {
    const updatedStoredProps = { ...updatedProps }

    window.localStorage.setItem(
      'game_props',
      JSON.stringify(updatedStoredProps),
    )
  }

  const handleKeyDown = ({ key }) => {
    setSnakeProps((prev) => {
      if (!key.includes('Arrow')) {
        return prev
      }
      const direction = key.replace('Arrow', '').toLowerCase()
      const oppositeDirections = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
      }
      if (
        direction !== prev.direction &&
        direction !== oppositeDirections[prev.direction]
      ) {
        return { ...prev, direction }
      }
      return prev
    })
  }

  const handleIsPaused = () => setIsPaused((prev) => !prev)

  const handleTryAgain = () => {
    setIsPaused(false)
    setIsOver(false)
    setScore(0)
    setMaxScore(getMaxScore())
    setSnakeProps((prev) => ({
      ...prev,
      tail: [],
      direction: '',
      position: getRandomPosition(),
    }))
    setFruitProps((prev) => ({ ...prev, position: getRandomPosition() }))
  }

  const handleSettingsIsOpen = () => {
    setIsPaused(true)
    setSettingsIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleTouchStart = (e) => {
      const { clientX, clientY } = e.changedTouches[0]
      touchStartRef.current = { x: clientX, y: clientY }
    }

    const handleTouchEnd = (e) => {
      const { clientX, clientY } = e.changedTouches[0]

      const startX = touchStartRef.current.x
      const startY = touchStartRef.current.y

      const deltaX = startX - clientX
      const deltaY = startY - clientY

      const checkGraterDelta = () => {
        const x = deltaX < 0 ? deltaX * -1 : deltaX
        const y = deltaY < 0 ? deltaY * -1 : deltaY

        return x > y ? 'x' : 'y'
      }

      const getNewDirection = () => {
        const delta = checkGraterDelta()
        if (delta === 'x') {
          return deltaX < 0 ? { key: 'ArrowRight' } : { key: 'ArrowLeft' }
        } else {
          return deltaY < 0 ? { key: 'ArrowDown' } : { key: 'ArrowUp' }
        }
      }

      handleKeyDown(getNewDirection())
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const prevMaxScore = getMaxScore()
    if (score > prevMaxScore) {
      window.localStorage.setItem('max_score', score)
    }
  }, [score, maxScore])

  useEffect(() => {
    handleUpdateGameProps(gameProps)
    setSnakeProps((prev) => ({
      ...prev,
      color: gameProps.style.snake_color,
      shape: gameProps.style.element_shape,
    }))
    setFruitProps((prev) => ({
      ...prev,
      color: gameProps.style.fruit_color,
      shape: gameProps.style.element_shape,
    }))
  }, [gameProps])

  useEffect(() => {
    if (!isOver && !isPaused && snakeProps.direction !== '') {
      const time =
        gameProps.difficulty === 'easy'
          ? 100
          : gameProps.difficulty === 'normal'
          ? 70
          : gameProps.difficulty === 'hard'
          ? 50
          : 30
      const handleInterval = setInterval(() => {
        const getPositions = () => {
          const newHead = { ...snakeProps.position }
          if (snakeProps.direction === 'up') {
            newHead.y = newHead.y - ELEMENT_SIZE
          } else if (snakeProps.direction === 'down') {
            newHead.y = newHead.y + ELEMENT_SIZE
          } else if (snakeProps.direction === 'left') {
            newHead.x = newHead.x - ELEMENT_SIZE
          } else {
            newHead.x = newHead.x + ELEMENT_SIZE
          }

          if (
            newHead.x === fruitProps.position.x &&
            newHead.y === fruitProps.position.y
          ) {
            const getFruitPosition = () => {
              let position = getRandomPosition()

              while (
                snakeProps.tail.some(
                  (tailPiece) =>
                    tailPiece.x === position.x && tailPiece.y === position.y,
                )
              ) {
                position = getRandomPosition()
              }

              return position
            }
            setScore((prev) => prev + 1)
            setSnakeProps((prev) => ({
              ...prev,
              tail: [...prev.tail, newHead],
            }))
            setFruitProps((prev) => ({
              ...prev,
              position: getFruitPosition(),
            }))
          } else {
            setSnakeProps((prev) => {
              const newTail = [...prev.tail]
              newTail.shift()
              return { ...prev, tail: [...newTail, newHead] }
            })
          }

          setSnakeProps((prev) => ({ ...prev, position: { ...newHead } }))
        }

        getPositions()
      }, time)

      return () => {
        clearInterval(handleInterval)
      }
    }
  }, [isOver, isPaused, snakeProps, fruitProps.position, gameProps.difficulty])

  useEffect(() => {
    const tail = snakeProps.tail
    const positionX = snakeProps.position.x
    const positionY = snakeProps.position.y

    const isCollisionSelf =
      tail.length > 1 &&
      tail
        .slice(0, -1)
        .some(
          (position) => position.x === positionX && position.y === positionY,
        )

    setIsOver(
      positionX < 0 ||
        positionY < 0 ||
        positionX === BOX_SIZE ||
        positionY === BOX_SIZE ||
        isCollisionSelf,
    )
  }, [snakeProps.tail, snakeProps.position])

  return (
    <>
      <ThemeProvider theme={gameProps.theme === 'dark' ? dark : light}>
        <GlobalStyle />
        <Container>
          <Header>
            <div>
              <Button
                onClick={handleSettingsIsOpen}
                style={{ marginRight: `1rem` }}
              >
                <Gear />
              </Button>
              <Button onClick={handleIsPaused}>
                <Pause />
              </Button>
            </div>
            <h1>{score}</h1>
            <h1>Max: {maxScore}</h1>
          </Header>
          <Box
            color={gameProps.style.box_color}
            border={gameProps.style.border_color}
          >
            {settingsIsOpen && (
              <Settings onSelect={setGameProps} gameProps={gameProps} />
            )}
            {!isOver && (
              <>
                <Snake props={snakeProps} />
                {snakeProps.tail.map((position, i) => (
                  <Tail
                    key={i}
                    props={{
                      position: { ...position },
                      color: snakeProps.color,
                      shape: snakeProps.shape,
                    }}
                  />
                ))}
                <Fruit props={fruitProps} />
              </>
            )}
            {!isOver && isPaused && (
              <Modal
                onClick={() => {
                  if (settingsIsOpen) {
                    handleSettingsIsOpen()
                  }
                }}
              >
                <h1>Paused</h1>
                <Button onClick={handleIsPaused} type={1}>
                  Resume
                </Button>
                <Button onClick={handleTryAgain} type={2}>
                  Restart
                </Button>
              </Modal>
            )}
            {isOver && (
              <Modal
                onClick={() => {
                  if (settingsIsOpen) {
                    handleSettingsIsOpen()
                  }
                }}
              >
                <h1>Game Over</h1>
                <Button onClick={handleTryAgain} type={1}>
                  Restart
                </Button>
              </Modal>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
