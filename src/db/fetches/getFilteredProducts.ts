import { db } from "@/firebase-config";
import { Product } from "@/types/product";
import { getProductsParams } from "@/types/productParams";
import { collection, Query, DocumentData, query, limit, getDocs } from "firebase/firestore";
import { filterBySort, filterByProductType, filterByPage } from "../filterProducts";
import { getProductsRating } from "./getProductsRating";

export const getFilteredProducts = async (params: getProductsParams) => {
    try {
        const productsCollectionRef = collection(db, "products");

        let productsQuery: Query<DocumentData, DocumentData> = query(
            productsCollectionRef,
            limit(params.pageSize)
        )

        productsQuery = filterBySort(productsQuery, params.sortBy);
        productsQuery = filterByProductType(productsQuery, params.productType);
        if (params.page > 1) productsQuery = await filterByPage(productsQuery, params.page);

        const productsSnapshot = await getDocs(productsQuery);
        const productsData: Product[] = productsSnapshot.docs
            .map((doc) => ({
                ...doc.data() as Product,
                id: doc.id
            }));

        const productsWithAvarageRating = getProductsRating(productsData);

        return productsWithAvarageRating;

    } catch (error) {
        console.error("Error in function getAllProducts", error);
        return null;
    }
};


