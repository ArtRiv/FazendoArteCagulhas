import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProductCart } from "@/types/product";
import { PartialShippingOption } from "@/types/shipping-option"; // Your new type

interface CheckoutContextType {
    items: ProductCart[];
    shippingOptions: PartialShippingOption[];
    setItems: (value: ProductCart[]) => void;
    setshippingOptions: (value: PartialShippingOption[]) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    items: [],
    shippingOptions: [],
    setItems: () => {},
    setshippingOptions: () => {},
});

interface ProviderProps {
    children: ReactNode;
}

export function CheckoutContextProvider({ children }: ProviderProps) {
    const [items, setItems] = useState<ProductCart[]>([]);
    const [shippingOptions, setshippingOptions] = useState<PartialShippingOption[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Load cart items and shipment options from localStorage when the component mounts
        const localStorageCartItems = localStorage.getItem("cart-items");
        const localStorageshippingOptions = localStorage.getItem("shipping-options");

        if (localStorageCartItems) {
            setItems(JSON.parse(localStorageCartItems));
        }
        if (localStorageshippingOptions) {
            setshippingOptions(JSON.parse(localStorageshippingOptions));
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        // Only save to localStorage if initialization is complete
        if (isInitialized) {
            localStorage.setItem("cart-items", JSON.stringify(items));
            localStorage.setItem("shipping-options", JSON.stringify(shippingOptions));
        }
    }, [items, shippingOptions, isInitialized]);

    return (
        <CheckoutContext.Provider
            value={{
                items,
                shippingOptions,
                setItems,
                setshippingOptions,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
