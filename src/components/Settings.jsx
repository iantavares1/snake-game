import { styled } from 'styled-components'

const Container = styled.div`
  position: absolute;
  z-index: 11;
  width: 60%;
  height: 100%;
  padding: 2rem 4rem;

  background: ${({ theme }) => theme.bg.alternative};
  color: ${({ theme }) => theme.text.primary};
  text-transform: capitalize;
`

const Header = styled.header`
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSelect = styled.select`
  all: unset;
  width: 50%;
  margin-bottom: 1.2rem;
  margin-top: 0.2rem;
  padding: 1rem;

  border: solid 0.2rem ${({ theme }) => theme.text.primary};
  border-radius: 1rem;
  font-size: 1.6rem;

  display: flex;
  flex-direction: column;
  transition: all 0.1s;

  option {
    padding: 2rem;
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.bg.secondary};
    color: ${({ theme }) => theme.text.secondary};
    cursor: pointer;
  }
`

export const Settings = ({ onSelect, gameProps }) => {
  return (
    <Container>
      <Header>
        <h1>Settings</h1>
      </Header>
      <Select
        info={{ id: 1, name: 'theme', default: gameProps.theme }}
        options={['dark', 'light']}
        onChange={(value) => onSelect((prev) => ({ ...prev, theme: value }))}
      />
      <Select
        info={{ id: 2, name: 'difficulty', default: gameProps.difficulty }}
        options={['easy', 'normal', 'hard', 'impossible']}
        onChange={(value) =>
          onSelect((prev) => ({
            ...prev,
            difficulty: value,
          }))
        }
      />
      <Select
        info={{
          id: 3,
          name: 'element-shape',
          default: gameProps.style.element_shape,
        }}
        options={['circle', 'square']}
        onChange={(value) =>
          onSelect((prev) => ({
            ...prev,
            style: { ...prev.style, element_shape: value },
          }))
        }
      />
      <Select
        info={{ id: 4, name: 'box-color', default: gameProps.style.box_color }}
        onChange={(value) =>
          onSelect((prev) => ({
            ...prev,
            style: { ...prev.style, box_color: value },
          }))
        }
      />
      <Select
        info={{
          id: 5,
          name: 'border-color',
          default: gameProps.style.border_color,
        }}
        onChange={(value) =>
          onSelect((prev) => ({
            ...prev,
            style: { ...prev.style, border_color: value },
          }))
        }
        extraOptions={['none']}
      />
      <Select
        info={{
          id: 6,
          name: 'snake-color',
          default: gameProps.style.snake_color,
        }}
        onChange={(value) =>
          onSelect((prev) => ({
            ...prev,
            style: { ...prev.style, snake_color: value },
          }))
        }
      />
      <Select
        info={{
          id: 7,
          name: 'fruit-color',
          default: gameProps.style.fruit_color,
        }}
        onChange={(value) =>
          onSelect((prev) => ({
            ...prev,
            style: { ...prev.style, fruit_color: value },
          }))
        }
      />
    </Container>
  )
}

const Select = ({
  onChange,
  info,
  options = [
    'black',
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'white',
    'yellow',
  ],
  extraOptions,
}) => {
  const handleSelectOption = (value) => onChange(value)

  const newOptions = extraOptions ? [...extraOptions, ...options] : [...options]
  return (
    <>
      <h3>{info.name.replaceAll('-', ' ')}</h3>
      <StyledSelect
        name={info.name}
        id={info.id}
        defaultValue={info.default}
        onChange={(e) => handleSelectOption(e.target.value)}
      >
        {newOptions &&
          newOptions.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
      </StyledSelect>
    </>
  )
}
