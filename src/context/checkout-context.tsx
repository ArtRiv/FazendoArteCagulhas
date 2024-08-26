import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProductCart } from "@/types/product";
import { PartialShippingOption } from "@/types/shipping-option";

interface CheckoutContextType {
    items: ProductCart[];
    shippingOptions: PartialShippingOption[];
    selectedShippingOption: PartialShippingOption | null;
    setItems: (value: ProductCart[]) => void;
    setshippingOptions: (value: PartialShippingOption[]) => void;
    setSelectedShippingOption: (value: PartialShippingOption | null) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    items: [],
    shippingOptions: [],
    selectedShippingOption: null,
    setItems: () => {},
    setshippingOptions: () => {},
    setSelectedShippingOption: () => {},
});

interface ProviderProps {
    children: ReactNode;
}

export function CheckoutContextProvider({ children }: ProviderProps) {
    const [items, setItems] = useState<ProductCart[]>([]);
    const [shippingOptions, setshippingOptions] = useState<PartialShippingOption[]>([]);
    const [selectedShippingOption, setSelectedShippingOption] = useState<PartialShippingOption | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const localStorageCartItems = localStorage.getItem("cart-items");

        if (localStorageCartItems) {
            setItems(JSON.parse(localStorageCartItems));
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cart-items", JSON.stringify(items));
        }
    }, [items, shippingOptions, selectedShippingOption, isInitialized]);

    return (
        <CheckoutContext.Provider
            value={{
                items,
                shippingOptions,
                selectedShippingOption,
                setItems,
                setshippingOptions,
                setSelectedShippingOption,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
