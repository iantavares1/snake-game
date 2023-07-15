import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
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
    width: 100vw;
    height: 100vh;

    background: #101010;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width:768px) {
      align-items: initial;
      padding-top: 5rem;
    }
    @media (max-width: 350px) {
      padding-top: 3rem;
    }
  }
`
