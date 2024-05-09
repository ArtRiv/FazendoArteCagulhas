import { db } from "@/firebase-config";
import { Product } from "@/types/product";
import { getProductsBySearchParams } from "@/types/productParams";
import { collection, Query, DocumentData, query, getDocs, limit } from "firebase/firestore";
import { filterBySort } from "../filterProducts";

export const getProductsBySearch = async (params: getProductsBySearchParams) => {
    try {
        const productsCollectionRef = collection(db, "products");

        let productsQuery: Query<DocumentData, DocumentData> = query(
            productsCollectionRef,
            limit(params.pageSize)
        )

        productsQuery = filterBySort(productsQuery, params.sortBy);

        const productsSnapshot = await getDocs(productsQuery);
        let productsData: Product[] = productsSnapshot.docs
            .map((doc) => ({ ...doc.data() as Product }))
            .filter((product) => product.tag.toLowerCase().includes(params.searchQuery.toLowerCase()));

        productsData = productsData.slice((params.page - 1) * params.pageSize, params.page * params.pageSize);
        return productsData;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
};