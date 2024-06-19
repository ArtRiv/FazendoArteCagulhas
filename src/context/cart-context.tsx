import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProductCart } from "@/types/product";

interface CartContextType {
    items: ProductCart[];
    setItems: (value: ProductCart[]) => void;
}

export const CartContext = createContext<CartContextType>({
    items: [],
    setItems: () => {},
});

interface ProviderProps {
    children: ReactNode;
}

export function CartContextProvider({ children }: ProviderProps) {
    const [items, setItems] = useState<ProductCart[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Load cart items from localStorage when the component mounts
        const localStorageCartItems = localStorage.getItem('cart-items');
        if (localStorageCartItems) {
            setItems(JSON.parse(localStorageCartItems));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        // Only save to localStorage if initialization is complete
        if (isInitialized) {
            localStorage.setItem('cart-items', JSON.stringify(items));
        }
    }, [items, isInitialized]);

    return (
        <CartContext.Provider
            value={{
                items,
                setItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
