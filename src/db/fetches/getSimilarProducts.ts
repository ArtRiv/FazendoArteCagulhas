import { db } from "@/firebase-config";
import { Product } from "@/types/product";
import { getSimilarProductsParams } from "@/types/productParams";
import { collection, Query, DocumentData, query, getDocs, limit } from "firebase/firestore";
import { getProductsRating } from "./getProductsRating";

export const getSimilarProducts = async (params: getSimilarProductsParams) => {
    try {
        const productsCollectionRef = collection(db, "products");

        let productsQuery: Query<DocumentData, DocumentData> = query(
            productsCollectionRef,
            limit(8)
        )

        const productsSnapshot = await getDocs(productsQuery);

        let productsData: Product[] = productsSnapshot.docs
            .map((doc) => ({ ...doc.data() as Product, id: doc.id }))
            .filter((product) => {
                return product.product_group.toLowerCase().includes(params.productGroup.toLowerCase()) 
                && product.title !== params.currentProduct.title;
            });

        const productsWithAvarageRating = getProductsRating(productsData);

        return productsWithAvarageRating;

    } catch (error) {
        console.error("Error in getSimilarProducts: ", error);
        return null;
    }
}