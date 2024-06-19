import { Product, ProductCart } from "@/types/product";

export const productToCart = (product: Product): ProductCart => {
    return {
        title: product.title,
        id: product.id,
        image: product.media[0], 
        price: product.price,
        quantity: 1,
        purchase_count: product.purchase_count,
        rating: product.rating,
    };
};