import { useTheme } from 'styled-components'

export const Pause = ({ onClick, style }) => {
  const theme = useTheme()
  return (
    <>
      <svg
        onClick={onClick}
        style={{ ...style }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 34.0469V5.94531C17.5 5.42187 17.0781 5 16.5469 5H10.9531C10.4219 5 10 5.42187 10 5.94531V34.0469C10 34.5703 10.4219 35 10.9531 35H16.5469C17.0781 35 17.5 34.5781 17.5 34.0469Z"
          fill={theme.text.primary}
        />
        <path
          d="M29.0469 5H23.4531C22.9297 5 22.5 5.42187 22.5 5.94531V34.0469C22.5 34.5703 22.9219 35 23.4531 35H29.0469C29.5703 35 30 34.5781 30 34.0469V5.94531C30 5.42187 29.5781 5 29.0469 5Z"
          fill={theme.text.primary}
        />
      </svg>
    </>
  )
}
