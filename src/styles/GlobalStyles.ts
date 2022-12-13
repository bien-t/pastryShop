import { createGlobalStyle } from 'styled-components';
import ButterFont from '../fonts/ButterPastry.ttf';
import FrenchFont from '../fonts/frenchfries.woff';


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: ButterFont;
    src: url(${ButterFont});
  }

  @font-face {
    font-family: FrenchFont;
    src: url(${FrenchFont});
  }

html {
    font-size: 10px;
    font-family: ButterFont, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    min-width: 360px;
}


#gatsby-focus-wrapper{
    max-width: 1000px;
    margin: 0 auto;
    padding:0 3rem;
}
`

export default GlobalStyles