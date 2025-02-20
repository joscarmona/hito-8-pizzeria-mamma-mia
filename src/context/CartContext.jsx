/* Context - Provider */

import { createContext, useState } from "react";

/* Context */
export const CartContext = createContext()

/* Proveer el context */
const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider