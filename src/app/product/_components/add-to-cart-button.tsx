'use client'

import { useFilter } from "@/hooks/useFilter";
import { Product, ProductCart } from "@/types/product";
import { productToCart } from "@/utils/productToCart";

type Props = {
    productData: Product;
};

export const AddToCartButton = ({ productData }: Props) => {
    const { items, setItems } = useFilter();

    const addToCart = () => {
        const cartItem: ProductCart = productToCart(productData);
        const existingProduct = items.find(product => product.id === cartItem.id);

        if (existingProduct) {
            const updatedItems = items.map((product) => {
                if (product.id === cartItem.id && product.quantity < 5) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            });
            setItems(updatedItems);
        } else {
            setItems([...items, cartItem]);
        }
    };


    return (
        <button
            onClick={addToCart}
            className="w-full inline-flex items-center justify-center relative px-3 py-2 bg-background border-2 border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
        [box-shadow:0_2px_14px_0_rgba(0,_0,_0,_0.183)]
        [transition:transform_0.5s_ease,_box-shadow_0.5s_ease]
        hover:origin-center hover:[transform:box-shadow_0.5s_ease]
        cardButton">
            <span className="text-small text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                Adicionar ao carrinho
            </span>
        </button>
    )
}