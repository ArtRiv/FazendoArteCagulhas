"use client"

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProductCart } from "@/types/product";
import { PartialShippingOption } from "@/types/shipping-option";
import { Address } from "@/types/address";
import { useBackend } from "@/hooks/use-backend";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface CheckoutContextType {
    items: ProductCart[];
    shippingOptions: PartialShippingOption[];
    selectedShippingOption: PartialShippingOption | null;
    address: Address;
    setItems: (value: ProductCart[]) => void;
    setshippingOptions: (value: PartialShippingOption[]) => void;
    setSelectedShippingOption: (value: PartialShippingOption | null) => void;
    setAddress: (value: Address) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    items: [],
    shippingOptions: [],
    selectedShippingOption: null,
    address: {} as Address,
    setItems: () => { },
    setshippingOptions: () => { },
    setSelectedShippingOption: () => { },
    setAddress: () => { },
});

interface ProviderProps {
    children: ReactNode;
}

export function CheckoutContextProvider({ children }: ProviderProps) {
    const [items, setItems] = useState<ProductCart[]>([]);
    const [shippingOptions, setshippingOptions] = useState<PartialShippingOption[]>([]);
    const [selectedShippingOption, setSelectedShippingOption] = useState<PartialShippingOption | null>(null);
    const [address, setAddress] = useState<Address>({} as Address);
    const [isInitialized, setIsInitialized] = useState(false);

    const { getUser } = useKindeBrowserClient();
    const { handleUserCartUpdate } = useBackend();

    useEffect(() => {
        const localStorageCartItems = localStorage.getItem("cart-items");

        if (localStorageCartItems) {
            setItems(JSON.parse(localStorageCartItems));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        const updateUserCart = async () => {
            const user = await getUser();  
            
            if (user?.email && items.length > 0) {
                handleUserCartUpdate({ email: user.email, id: user.id, cart: items });
            }
        };

        if (isInitialized) {
            localStorage.setItem("cart-items", JSON.stringify(items));
            updateUserCart();  // Call the async function to update the cart
        }
    }, [items, isInitialized, getUser]);

    return (
        <CheckoutContext.Provider
            value={{
                items,
                shippingOptions,
                selectedShippingOption,
                address,
                setItems,
                setshippingOptions,
                setSelectedShippingOption,
                setAddress,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
