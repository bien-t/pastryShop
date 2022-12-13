import { Link, } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { BsFillBasketFill } from 'react-icons/bs';
import useBasket from '../utils/useBasket';

const NavigationStyle = styled.nav`
font-size: 3rem;
position: relative;

ul {
    list-style-type: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem 3rem;
    flex-wrap: wrap;
    transform: translateY(10rem);
    margin-left: 15rem;

    @media(max-width:700px){
        flex-direction: column;
    transform: translateY(0);
    align-items: flex-end;
        
    }
}
li {
    text-transform: uppercase;
    position: relative;
}    

a {
    color: #b3184d;
    text-decoration: none;
    &:hover {
        color:#551A8B;
    }
    &[aria-current='page']{
    color:#551A8B;
    }
}

.logoImage {
    position: absolute;
    left: -3rem;
    @media(max-width:700px){
        top:110px;
    }
}

`
const BasketCounter = styled.div`
font-family: FrenchFont;
margin-right: .5rem;
position: absolute;
top: -10px;
left: 5px;
font-size: 1.5rem;
color: white;
background-color:#b3184d ;
border-radius: 50vh;
width: 2rem;
height: 2rem;
display: flex;
justify-content: center;
align-items: center;
`

function Navigation() {
    const { basket } = useBasket()
    return (
        <NavigationStyle>
            <StaticImage class='logoImage' src="../images/logo.png" width={150} alt="Logo image" />
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/menu'>Menu</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/basket'><BsFillBasketFill /><BasketCounter>{basket.length}</BasketCounter></Link></li>
            </ul>
        </NavigationStyle>
    )
}

export default Navigation

