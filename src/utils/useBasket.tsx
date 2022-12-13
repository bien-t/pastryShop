import React from 'react';
import BasketContext, { BasketProduct, Context } from './basketContext';



function useBasket() {
    const { basket, setBasket } = React.useContext(BasketContext) as Context;
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const addToBasket = (product: BasketProduct) => {
        //check if the product is already in the basket
        const filteredBasket = basket.filter((basketProduct, index) => {
            if (basketProduct.slug === product.slug) {
                increaseQuantity(index);
                return basketProduct;
            }
        })
        //  // if not add a new product
        if (filteredBasket.length === 0) {
            setBasket([...basket, { ...product, quantity: 1 }]);
        }
        countOrder();
    }

    const removeFromBasket = (index: number) => {
        setBasket([...basket.slice(0, index), ...basket.slice(index + 1)]);

    }

    const increaseQuantity = (index: number,) => {
        const getProduct = basket[index]; //get single basket item
        getProduct.quantity = getProduct.quantity ? getProduct.quantity + 1 : 1;
        setBasket([...basket.slice(0, index), getProduct, ...basket.slice(index + 1)]);
        countOrder();

    }

    const decreaseQuantity = (index: number,) => {
        const getProduct = basket[index]; //get single basket item
        getProduct.quantity = getProduct.quantity ? getProduct.quantity === 0 ? 0 : getProduct.quantity - 1 : 0;
        setBasket([...basket.slice(0, index), getProduct, ...basket.slice(index + 1)]);
        countOrder();

    }

    const countOrder = () => {
        return basket.reduce((total, product) => {
            return total + (product.price * (product.quantity ?? 1));
        }, 0);
    }

    const submitOrder = async (event:React.FormEvent)=>{
        event.preventDefault();
        setLoading(true);
        setError('');
        const body = {
            basket:basket,
            total: countOrder()
        }

        const res = await fetch(
            `https://pastry-s.netlify.app/.netlify/functions/sendOrder/`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        )

        const text = JSON.parse(await res.text());
        if (res.status >= 400 && res.status < 600) {
            setLoading(false);
            setError(text.message);

        } else {
            setLoading(false);
            setMessage(text.message);
            setBasket([])
            setTimeout(()=>{
                setMessage('');
            },3000)
        }
    }

    return {
        basket,
        addToBasket,
        removeFromBasket,
        increaseQuantity,
        decreaseQuantity,
        countOrder,
        submitOrder,
        error,
        message
    }
}


export default useBasket;