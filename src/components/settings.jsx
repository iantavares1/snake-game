import { styled } from 'styled-components'

import { Arrow } from './icons/Arrow'

const Container = styled.div`
  position: absolute;
  z-index: 100;
  width: 70%;
  height: 100%;
  padding: 3rem;

  background: #222;

  display: flex;
  flex-direction: column;
  animation: get-in 0.2s linear;

  @keyframes get-in {
    from {
      left: -40rem;
    }
    to {
      left: 0;
    }
  }
`

const Label = styled.label`
  padding-left: 1rem;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Select = styled.select`
  all: unset;
  width: 50%;
  padding: 1rem;
  font-size: 2rem;
  transition: all 0.1s;
  border: solid 2px white;
  border-radius: 1rem;
  margin-bottom: 3rem;

  &:hover,
  &:focus {
    background: #fff;
    color: #000;
    cursor: pointer;
  }
`

const Header = styled.header`
  width: 100%;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
`

export const Settings = ({ onSelect, isOpen, gameProps }) => {
  const handleIsOpen = () => isOpen((prev) => !prev)

  const handleSelectDifficulty = (e) => {
    onSelect((prev) => {
      return { ...prev, difficulty: e.target.value }
    })
  }

  const handleSelectColor = (e) => {
    onSelect((prev) => {
      const color = e.target.value
      if (e.target.name === 'box_color') {
        return { ...prev, style: { ...prev.style, box_color: color } }
      } else if (e.target.name === 'snake_color') {
        return { ...prev, style: { ...prev.style, snake_color: color } }
      } else if (e.target.name === 'fruit_color') {
        return { ...prev, style: { ...prev.style, fruit_color: color } }
      }
    })
  }

  return (
    <Container>
      <Header>
        <Arrow
          onClick={handleIsOpen}
          style={{
            cursor: 'pointer',
            transform: 'rotate(180deg)',
          }}
        />
        <h1>Settings</h1>
      </Header>
      <Label htmlFor="difficulty">Difficulty</Label>
      <Select
        name="difficulty"
        defaultValue={gameProps.difficulty}
        onChange={(e) => handleSelectDifficulty(e)}
      >
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
        <option value="impossible">Impossible</option>
      </Select>
      <Label htmlFor="box_color">Box Color</Label>
      <Select
        name="box_color"
        defaultValue={gameProps.style.box_color}
        onChange={(e) => handleSelectColor(e)}
      >
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
      </Select>
      <Label htmlFor="snake_color">Snake Color</Label>
      <Select
        name="snake_color"
        defaultValue={gameProps.style.snake_color}
        onChange={(e) => handleSelectColor(e)}
      >
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
      </Select>
      <Label htmlFor="fruit_color">Fruit Color</Label>
      <Select
        name="fruit_color"
        defaultValue={gameProps.style.fruit_color}
        onChange={(e) => handleSelectColor(e)}
      >
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
      </Select>
    </Container>
  )
}
