import { styled } from 'styled-components'

import { BackIcon } from './common/backIcon.jsx'

const Container = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;

  padding: 5rem;
  background: #3e3e3e;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Select = styled.select`
  all: unset;
  display: flex;
  flex-direction: column;

  option {
    padding: 2rem;
  }
`

export const Settings = ({ onSelect, isOpen }) => {
  const handleSelectDifficulty = (e) => {
    onSelect(
      e.target.value === 'easy'
        ? 60
        : e.target.value === 'normal'
        ? 45
        : e.target.value === 'hard'
        ? 30
        : 18,
    )
  }
  const handleIsOpen = () => isOpen((prev) => !prev)

  return (
    <Container>
      <BackIcon
        onClick={handleIsOpen}
        style={{
          position: 'absolute',
          top: '5rem',
          left: '5rem',
          cursor: 'pointer',
        }}
      />
      <h1>Settings</h1>
      <Select name="Difficulty" onChange={handleSelectDifficulty}>
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
        <option value="impossible">Impossible</option>
      </Select>
    </Container>
  )
}
