import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

html, body, #__next {
    height: 100%;
}

body {
    background: url('/background.svg') no-repeat center center fixed;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font: 400 16px Roboto, sans-serif
}
`

export { GlobalStyle }
