import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/hooks";


/* TO-DO
   Handle Pay
    
 */

const ShoppingCartContext = createContext({});

export function useCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", [])

    const cartQuantity = cartItems.length;

    function getCart() {
        return cartItems;
    }
    function getItemQuantity(id) {
        if (cartItems.length === 0) return 0;
        if (id === undefined) return 0;
        const item = cartItems.find((item) => item['id'] === id)
        return item !== undefined ? item['quantity'] : 0

    }

    function getCartTotal(products) {
        if(products === null) return -1;
        if (products.length === 0)return -1;
        var total = 0;
        for (var item of cartItems) {
            var p = products.find(product => product.id === item.id);
            if (p !== undefined) {
                total += p.price * item.quantity;
            }
        }

        return total;

    }

    function increaseCartQuantity(id) {
        if (id === undefined) return;
        const item = cartItems.find((item) => item['id'] === id)
        if (item === undefined) {
            setCartItems(prev => [...prev, { 'id': id, 'quantity': 1 }])
        }
        else {
            setCartItems(prev => cartItems.map((item) => {
                if (item['id'] == id) return { 'id': item['id'], 'quantity': item['quantity'] + 1 }
                else return { 'id': item['id'], 'quantity': item['quantity'] }
            }))
        }

    }
    function decraesCartQuantity(id) {
        if (id === undefined) return;
        const item = cartItems.find((item) => item['id'] === id)
        if (item !== undefined) {

            if (item['quantity'] <= 1) {
                removeItem(id);
            }
            else {
                setCartItems(prev => cartItems.map((item) => {
                    if (item['id'] == id) return { 'id': item['id'], 'quantity': item['quantity'] - 1 }
                    else return { 'id': item['id'], 'quantity': item['quantity'] }
                }))
            }

        }
    }
    function removeItem(id) {
        if (id === undefined) return;
        setCartItems(prev => cartItems.filter((item) => item['id'] !== id))

    }
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decraesCartQuantity, removeItem, cartQuantity, getCart, getCartTotal }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}