import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: "Pretendard";
    vertical-align: baseline;
    box-sizing: border-box;

    &:focus {
    outline: none;
    }
    
  }

  html,body {
    width: 100vw;
    min-height: 100vh;
    margin: 0px;
    padding: 0px;
  }

  #__next { 
    height: 100%;
  }

  main {
    height: 100%;
  }

  button {
    border: none;
  }

  a {
    text-decoration: none;
  }


  li {
    list-style-type: none;
  }

`;

export default GlobalStyle;
