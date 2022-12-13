import React from "react";
import cupcake from '../images/cupcake.png';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import 'normalize.css';
import Navigation from "./Navigation";

const SiteBorderStyles = styled.div`
  border-image-source: url(${cupcake});
  border-image-slice: 33%;
  border-image-repeat: round;
  border-image-width: 25px;
  border-style: solid;
  margin-top: 10rem;
  margin-bottom: 5rem;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.04);

  @media(max-width:700px){
    margin-top: 0;   
    }
`;

const ContentStyles = styled.div`
  padding: 3rem;
`;
export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <GlobalStyles />
      <Navigation />
      <SiteBorderStyles>
        <ContentStyles>
          <main>
            {children}
          </main>
        </ContentStyles>
      </SiteBorderStyles>
    </>
  )

}