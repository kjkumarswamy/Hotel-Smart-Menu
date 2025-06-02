import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [submittedOrders, setSubmittedOrders] = useState([]);

    const updateCart = (newCart) => {
        setCart(newCart);
    };

    const submitOrder = (orderItems) => {
        // Create a new order with timestamp and ID
        const newOrder = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            items: orderItems?.map(item => ({
                ...item,
                // Add preparation end time based on current time and prep time
                prepEndTime: new Date(Date.now() + parsePrepTimeToMs(item.prepTime)).toISOString()
            })),
            total: orderItems?.reduce((total, item) => total + (item.price * item.quantity), 0)
        };
        
        // Add the new order to submitted orders
        setSubmittedOrders(prevOrders => [newOrder, ...prevOrders]);
        
        // Clear the active cart
        setCart([]);
        
        return newOrder;
    };

    const clearSubmittedOrders = () => {
        setSubmittedOrders([]);
    };

    // Helper function to convert prep time string to milliseconds
    const parsePrepTimeToMs = (prepTime) => {
        if (!prepTime) return 0;
        
        const match = prepTime.match(/(\d+)\s*(\w+)/);
        if (!match) return 0;
        
        const [, amount, unit] = match;
        const numAmount = parseInt(amount, 10);
        
        switch (unit.toLowerCase()) {
            case 'min':
            case 'mins':
            case 'minute':
            case 'minutes':
                return numAmount * 60 * 1000;
            case 'hr':
            case 'hrs':
            case 'hour':
            case 'hours':
                return numAmount * 60 * 60 * 1000;
            default:
                return 0;
        }
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            updateCart, 
            submittedOrders, 
            submitOrder,
            clearSubmittedOrders
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 