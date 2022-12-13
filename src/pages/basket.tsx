import React from 'react';
import styled from 'styled-components';
import SingleProduct from '../components/SingleProduct';
import useBasket from '../utils/useBasket';
import formatMoney from '../utils/formatMoney';
import { HeadFC } from 'gatsby';
const HeadingStyles = styled.h2`
    font-size: 5rem;
    color: #b3184d;
    text-align: center;
`

const BasketStyles = styled.div`
    margin: 0 auto;
    display: grid;
    font-family: FrenchFont;
    row-gap: 1.5rem;
    justify-content: center;



`
const TotalStyles = styled.div`
    display: flex;
    box-shadow: 0 0 3px 3px rgba(179, 24, 77, 0.4);
    font-size: 3rem;
    justify-content: end;
    padding-right: 40px;
    @media(max-width:700px){
        padding-right: 0;
        justify-content: center;
    }
    

`
const Message = styled.p`
        justify-self: center;
        width: 70%;
        font-size: 3rem;
        text-align: center;
`

const OrderButton = styled.button`
    font-family: ButterFont;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #b3184d;
    border: #b3184d solid 1px;
    background-color:white;
    cursor: pointer;
    &:hover{
    color: #551A8B;
    border-color: #551A8B;
    }
`
const Error = styled.span`
    font-family: FrenchFont;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    color: red;
`
const OrderMessage = styled.span`
    font-family: FrenchFont;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    color: green;
`
function Basket() {
    const { basket, countOrder, submitOrder, error, message } = useBasket();
    return (
        <>
            <HeadingStyles>Your Basket</HeadingStyles>
            {
                error &&
                <Error>{error}</Error>
            }

            {
                message &&
                <OrderMessage>{message}</OrderMessage>

            }
            <BasketStyles>
                {
                    basket &&
                    basket.map((product, index) => {
                        return <SingleProduct product={product} key={product.slug} productIndex={index} />


                    })
                }
                {
                    basket.length > 0 &&
                    <TotalStyles>Order sum: {formatMoney(countOrder())}</TotalStyles>
                }
                {
                    basket.length === 0 &&

                    <Message>You haven't put anything in your basket yet. Please check our menu section.</Message>
                }
                {basket.length > 0 &&
                    <OrderButton type='submit' onClick={submitOrder}>Place order </OrderButton>
                }
            </BasketStyles>
        </>
    )
}


export default Basket;
export const Head: HeadFC = () => <title>Basket page</title>
