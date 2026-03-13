import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/formatPrice';
import Toaster from "react-hot-toast";
import toast from 'react-hot-toast';
import axios from 'axios';

export function CartDrawer() {
    const { items, isOpen, setCartOpen } = useCart();
    console.log("cart items", items)
    const user = localStorage.getItem("user")
    const parsedUser = user ? JSON.parse(user) : null
    const removeItem = () => {

    }
    const updateQuantity = () => {
    }
    const clearCart = () => {
        localStorage.removeItem("cart");
    }
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const navigate = useNavigate();

    if (!isOpen) return null;
    if (!parsedUser) {
        // setCartOpen(false);
        navigate('/login');
    }


    // const handleCheckout = () => {
    //     setCartOpen(false);
    //     navigate('/checkout');
    // };

    const handleCheckout = () => {
        console.log("parsedUser", parsedUser)
        const payload = {
            products: items.map((itm, idx) => itm?._id),
            buyerId: parsedUser?._id,
            totalAmount: totalPrice
        }
        const response = axios.post("http://localhost:3001/order", payload)
        if (response?.data?.success === true) {
            toast.success("Order placed successfully!");
            clearCart();
            setCartOpen(false);
            window.location.href = '/dashboard';
            // navigate('/dashboard');
        } else {
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <Toaster />
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-foreground/20 z-[99999] transition-opacity"
                onClick={() => setCartOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-[999999] shadow-lg animate-slide-in-right">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            <h2 className="font-display text-lg font-medium">Your Cart</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCartOpen(false)}
                            aria-label="Close cart"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Your cart is empty</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setCartOpen(false);
                                        navigate('/products');
                                    }}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item._id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-secondary overflow-hidden flex-shrink-0">
                                            <img
                                                src={item?.image}
                                                alt={item?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium truncate">{item?.name}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {formatPrice(item?.price)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <button
                                                    // onClick={() => updateQuantity(item.? _id, item?.quantity - 1)}
                                                    className="p-1 hover:bg-secondary rounded transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-secondary rounded transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="p-1 hover:bg-secondary rounded transition-colors self-start"
                                            aria-label="Remove item"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-border space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{formatPrice(totalPrice)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <Button className="w-full" size="lg" onClick={handleCheckout}>
                                Checkout
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full text-muted-foreground"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
