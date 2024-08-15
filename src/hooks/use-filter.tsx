
import { CheckoutContext } from "@/context/checkout-context";
import { useContext } from "react";

export function useFilter(){
    return useContext(CheckoutContext)
}