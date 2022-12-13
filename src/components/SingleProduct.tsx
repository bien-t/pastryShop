import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { BasketProduct } from '../utils/basketContext';
import formatMoney from '../utils/formatMoney';
import useBasket from '../utils/useBasket';

const SingleProductStyles = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr 100px 100px 100px 40px;
    grid-template-rows: 100px;

    box-shadow: 0 0 3px 3px rgba(179, 24, 77, 0.4);
    h3{
        font-size: 2rem;
        align-self: center;
        margin-left:1rem;
    }
    img {
        width: 100%;
        height: 100%;
    }

    @media(max-width:700px){
        grid-template-columns:100px 1fr;
        row-gap: 1rem;
    }
`

const CategoryStyles = styled.div`
display: grid;
grid-template-rows: 30% 1fr;
font-size: 2rem;
text-align: center;
align-items: center;
@media(max-width:700px){
    grid-column: span 2;
    align-self: center;
    }
`
const QuantityWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
align-items: center;
column-gap: 0.5rem;
span {
    display: inline-block;
    justify-self: end;
}
@media(max-width:700px){
    display: flex;
    justify-content: center;
}
`

const ButtonWrapper = styled.div`
display: flex;
flex-direction: column;
row-gap: 0.5rem;
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin: 0;
    padding:0;
    color: #b3184d;
    border: #b3184d solid 1px;
    background-color:white;
    cursor: pointer;
    &:hover{
    color: #551A8B;
    border-color: #551A8B;
    }
}
@media(max-width:700px){
        flex-direction: row-reverse;
        row-gap: 0;
        column-gap: 0.5rem;
        justify-content: flex-end;
    }

`

const RemoveButton = styled.button`
cursor: pointer;
font-size: 4rem;
    background: none;
    border: none;
    margin: 0;
    padding:0;
    grid-row: span 2;
    color: red;
`



function SingleProduct({ product, productIndex }: { product: BasketProduct, productIndex: number }) {
    const { increaseQuantity, decreaseQuantity, removeFromBasket } = useBasket();

    return (
        <SingleProductStyles>
            {
                product.productphoto?.gatsbyImageData &&
                <GatsbyImage alt={`${product.name} photo`} image={product.productphoto.gatsbyImageData} />
            }
            {
                product.productphoto?.responsiveImage?.src &&
                <img src={product.productphoto.responsiveImage.src} alt={`${product.name} photo`} />
            }
            <h3>{product.name}</h3>
            <CategoryStyles className='gridFirst'><span>Price</span><span>{formatMoney(product.price)}</span></CategoryStyles>
            <CategoryStyles><span>Quantity</span>
                <QuantityWrapper>
                    <span>{product.quantity}</span>
                    <ButtonWrapper>
                        <button type='button' title="Increase quantity" onClick={() => increaseQuantity(productIndex)}>+</button>
                        <button type='button' title="Decrease quantity" onClick={() => decreaseQuantity(productIndex)}>-</button>
                    </ButtonWrapper>
                </QuantityWrapper>
            </CategoryStyles>
            <CategoryStyles className='gridSecondToLast'><span>Total</span><span>{formatMoney(product.price * (product.quantity ?? 1))}</span></CategoryStyles>
            <CategoryStyles className='gridLast'><RemoveButton type='button' title='Remove from basket' onClick={() => removeFromBasket(productIndex)}>&times;</RemoveButton></CategoryStyles>
        </SingleProductStyles>
    )
}


export default SingleProduct;