import React, { createContext, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [isOpen, setCartOpen] = React.useState(false);
    const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))?.items : [];

    return (
        <CartContext.Provider value={{ items: cartItems, isOpen, setCartOpen }}>
            {children}
        </CartContext.Provider>
    );

}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error(
            "useCart must be used within a CartProvider"
        );
    }
    return context;
};

