import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProductCart } from "@/types/product";
import { PartialShipmentOption } from "@/types/shipping-option"; // Your new type

interface CheckoutContextType {
    items: ProductCart[];
    shipmentOptions: PartialShipmentOption[];
    setItems: (value: ProductCart[]) => void;
    setShipmentOptions: (value: PartialShipmentOption[]) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    items: [],
    shipmentOptions: [],
    setItems: () => {},
    setShipmentOptions: () => {},
});

interface ProviderProps {
    children: ReactNode;
}

export function CheckoutContextProvider({ children }: ProviderProps) {
    const [items, setItems] = useState<ProductCart[]>([]);
    const [shipmentOptions, setShipmentOptions] = useState<PartialShipmentOption[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Load cart items and shipment options from localStorage when the component mounts
        const localStorageCartItems = localStorage.getItem("cart-items");
        const localStorageShipmentOptions = localStorage.getItem("shipment-options");

        if (localStorageCartItems) {
            setItems(JSON.parse(localStorageCartItems));
        }
        if (localStorageShipmentOptions) {
            setShipmentOptions(JSON.parse(localStorageShipmentOptions));
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        // Only save to localStorage if initialization is complete
        if (isInitialized) {
            localStorage.setItem("cart-items", JSON.stringify(items));
            localStorage.setItem("shipment-options", JSON.stringify(shipmentOptions));
        }
    }, [items, shipmentOptions, isInitialized]);

    return (
        <CheckoutContext.Provider
            value={{
                items,
                shipmentOptions,
                setItems,
                setShipmentOptions,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
