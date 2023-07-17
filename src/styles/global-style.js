import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  :root {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    height: 100vh;
    width: 100vw;
    background: ${({ theme }) => theme.bg.primary};
    display: grid;
    place-content: center;
    overflow: hidden;

    @media (max-width: 1060px) {
    display: flex;
    padding-top: 6rem;
  }
  }
`
