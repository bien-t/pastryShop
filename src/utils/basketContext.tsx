import React from 'react';
import { CmsProduct } from '../pages/menu';

export interface BasketProduct extends CmsProduct {
    quantity?: number
}

export type Context = {
    basket: BasketProduct[],
    setBasket: (param: BasketProduct[]) => void
}


const BasketContext = React.createContext<Context | undefined>(undefined);

export function BasketProvider({ children }: React.PropsWithChildren) {
    const [basket, setBasket] = React.useState<BasketProduct[]>([]);

    return (
        <BasketContext.Provider value={{ basket, setBasket }}>
            {children}
        </BasketContext.Provider>
    )

}

export default BasketContext;