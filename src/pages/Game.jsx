import { useState, useEffect } from 'react'

import { styled } from 'styled-components'

import { BOX_SIZE } from '../settings/constants'
import { getRandomPosition } from '../utils/getRandomPosition'

import {
  Element as Snake,
  Element as Tail,
  Element as Fruit,
} from '../components/Element'

import { Modal } from '../components/Modal'
import { Settings } from '../components/Settings'
import { Pause } from '../components/icons/Pause'
import { Gear } from '../components/icons/Gear'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: #fff;
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
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  background: ${({ color }) => color};
`

const Button = styled.button`
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

export const Game = () => {
  const getGameProps = () =>
    JSON.parse(window.localStorage.getItem('game_props'))

  const getMaxScore = () => window.localStorage.getItem('max_score')

  const initialGameProps = getGameProps() || {
    style: { box_color: 'purple', snake_color: 'white', fruit_color: 'yellow' },
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
  const [settingsPage, setSettingsPage] = useState(false)

  const handleUpdateGameProps = (updatedProps) => {
    const updatedStoredProps = { ...updatedProps }

    window.localStorage.setItem(
      'game_props',
      JSON.stringify(updatedStoredProps),
    )
  }

  const handleIsPaused = () => setIsPaused((prev) => !prev)

  const handleTryAgain = () => {
    setSnakeProps((prev) => ({
      ...prev,
      tail: [],
      direction: '',
      position: getRandomPosition(),
    }))
    setFruitProps((prev) => ({ ...prev, position: getRandomPosition() }))
    setIsPaused(false)
    setIsOver(true)
    setScore(0)
  }

  const handleSettings = () => {
    setIsPaused((prev) => (prev === true ? prev : true))
    setSettingsPage((prev) => !prev)
  }

  const handleKeyDown = (key) => {
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

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e.key))

    return () => {
      window.removeEventListener('keydown', (e) => handleKeyDown(e.key))
    }
  }, [])

  useEffect(() => {
    if (score > maxScore) {
      window.localStorage.setItem('max_score', score)
      setMaxScore(score)
    }
  }, [score, maxScore])

  useEffect(() => {
    handleUpdateGameProps(gameProps)
    setSnakeProps((prev) => ({ ...prev, color: gameProps.style.snake_color }))
    setFruitProps((prev) => ({ ...prev, color: gameProps.style.fruit_color }))
  }, [gameProps])

  useEffect(() => {
    if (!isOver && !isPaused && snakeProps.direction !== '') {
      const time =
        gameProps.difficulty === 'easy'
          ? 60
          : gameProps.difficulty === 'normal'
          ? 45
          : gameProps.difficulty === 'hard'
          ? 30
          : 18
      const handleInterval = setInterval(() => {
        const getPositions = () => {
          const newHead = { ...snakeProps.position }
          if (snakeProps.direction === 'up') {
            newHead.y = newHead.y - 2
          } else if (snakeProps.direction === 'down') {
            newHead.y = newHead.y + 2
          } else if (snakeProps.direction === 'left') {
            newHead.x = newHead.x - 2
          } else {
            newHead.x = newHead.x + 2
          }

          if (
            newHead.x === fruitProps.position.x &&
            newHead.y === fruitProps.position.y
          ) {
            setScore((prev) => prev + 1)
            setSnakeProps((prev) => ({
              ...prev,
              tail: [...prev.tail, newHead],
            }))
            setFruitProps((prev) => ({
              ...prev,
              position: getRandomPosition(60),
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
      positionX === 0 ||
        positionY === 0 ||
        positionX === 62 ||
        positionY === 62 ||
        isCollisionSelf,
    )
  }, [snakeProps.tail, snakeProps.position])

  return (
    <Container>
      <Header>
        <div>
          <Button
            onClick={() => handleSettings()}
            style={{ marginRight: '2rem' }}
          >
            <Gear />
          </Button>
          <Button onClick={() => handleIsPaused()}>
            <Pause />
          </Button>
        </div>
        <h1>{score}</h1>
        <h1>Max: {maxScore}</h1>
      </Header>
      <Box size={BOX_SIZE} color={gameProps.style.box_color}>
        {!isOver && (
          <>
            <Snake props={snakeProps} />
            {snakeProps.tail.map((position, i) => (
              <Tail
                key={i}
                props={{
                  position: { ...position },
                  color: snakeProps.color,
                }}
              />
            ))}
            <Fruit props={fruitProps} />
          </>
        )}
        {settingsPage && (
          <Settings
            onSelect={setGameProps}
            isOpen={handleSettings}
            gameProps={gameProps}
          />
        )}
        {isPaused && !isOver && (
          <Modal onClick={() => handleIsPaused()}>
            <h1>Paused</h1>
            <Button onClick={() => handleIsPaused()} type={1}>
              Resume
            </Button>
            <Button onClick={() => handleTryAgain()} type={2}>
              Restart
            </Button>
          </Modal>
        )}
        {isOver && (
          <Modal>
            <h1>Game Over</h1>
            <Button onClick={() => handleTryAgain()} type={1}>
              Restart
            </Button>
          </Modal>
        )}
      </Box>
    </Container>
  )
}
