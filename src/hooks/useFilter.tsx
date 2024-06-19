
import { CartContext } from "@/context/cart-context";
import { useContext } from "react";

export function useFilter(){
    return useContext(CartContext)
}