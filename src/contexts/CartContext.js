import { createContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = React.useState([]);
    const [isOpen, setCartOpen] = React.useState(false);
    return (
        <CartContext.Provider value={{ items, setItems, isOpen, setCartOpen }}>
            {children}
        </CartContext.Provider>
    );

}
