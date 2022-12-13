import { HeadFC } from 'gatsby';
import React from 'react';
import styled from 'styled-components';


const AboutStyles = styled.section`
margin: 0 auto;
width: 70%;
text-align: center;
h2 {
    font-size: 5rem;
    color: #b3184d;

}

p {
    font-size: 3rem;
    text-align: center;
    font-family: FrenchFont;
}

@media (max-width:800px){
    width:90%;
}


`

function About(){
return(
    <AboutStyles>
        <h2>Our little story</h2>
        <p>We are a family-owned bakery whose mission is to bring people to the world of pastries. Since 1980 we’ve been perfecting our art. We insist on using fresh, high-quality ingredients, which is why we work with local suppliers to source them in everything we make. It’s all because we think you should feel good about dessert and make your tastebuds happy.</p>
    </AboutStyles>
)

}


export default About

export const Head: HeadFC = () => <title>About us page</title>
