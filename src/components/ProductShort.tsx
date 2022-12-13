import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { CmsProduct } from '../pages/menu';
import { BsFillBasketFill } from 'react-icons/bs';
import formatMoney from '../utils/formatMoney';
const ProductStyles = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    box-shadow: 0 0 3px 3px rgba(179, 24, 77, 0.4);
    position: relative;
    font-family: FrenchFont;
    transform: scale(0.95);
    &:hover {
        transform: translateZ(0) scale(1);
        cursor: pointer;
        transition: ease-in-out;
        transition-duration: 300ms;
    }

    h3 {
        font-size: 2rem;
        text-align: center;
        padding:1rem;
        margin: 0;
    }

    .flipWrapper {
    perspective: 1000;
    width: 100%;
    height: 100%;
    position: relative;

    .flip-front , .flip-back{
        transform-style: preserve-3d;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        transition: 1000ms;
    }

    .flip-back {
        transform: rotateY(180deg);
        background-color: white;
        text-align: center;
        font-size:2rem;
    }

    .flip-front.active{
        transform: rotateY(180deg);
    }

    .flip-back.active {
        transform: rotateY(360deg);

    }
}
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
        font-size: 1.5rem;
        font-family: FrenchFont;
        display: flex;
        justify-content: space-evenly;
        flex-grow: 0.1;
        background-color: white;
        border: 1px solid #b3184d;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        &:nth-child(1){
            margin-left: 0.5rem;
        }

        &:nth-last-child(1){
            margin-right: 0.5rem;
            &:hover {
                color: #b3184d;
                cursor: pointer;
            }

        }
    }

`


function ProductShort({ product,addToBasket }: { product: CmsProduct,addToBasket:(product:CmsProduct)=>void }) {
    const productPrice = formatMoney(product.price);
    const [flipFrontClass, setFlipClass] = React.useState('')
    const [flipBackClass, setActiveFlip] = React.useState('')
    const startFlip = () => {
        if (flipFrontClass === 'active') {
            setFlipClass('')
        } else {
            setFlipClass('active')
        }
        if (flipBackClass === 'active') {
            setActiveFlip('')
        } else {
            setActiveFlip('active')

        }
    }
    return (
        <ProductStyles>
            <h3>{product.name}</h3>
            <div onClick={startFlip}>
                <div className={`flipWrapper`}>
                    {
                        product.productphoto?.gatsbyImageData &&
                        <GatsbyImage alt={`${product.name} photo`} image={product.productphoto.gatsbyImageData} objectPosition="center" className={`flip-front ${flipFrontClass}`} />
                    }
                    {
                        product.productphoto?.responsiveImage?.src &&
                        <img src={product.productphoto.responsiveImage.src} alt={`${product.name} photo`}  className={`flip-front ${flipFrontClass}`}/>
                    }
                    <span className={`flip-back ${flipBackClass}`}>{product.description}</span>
                </div>
            </div>
            <ButtonWrapper>
                <button type='button' title='product price'>{productPrice}</button>
                <button type='button' title='add to basket' onClick={()=>addToBasket(product)}><span>Add to</span> <BsFillBasketFill /></button>
            </ButtonWrapper>
        </ProductStyles>
    )
}

export default ProductShort;