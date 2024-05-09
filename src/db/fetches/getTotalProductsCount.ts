import { db } from "@/firebase-config";
import { ProductTypes } from "@/types/productParams";
import { collection, Query, DocumentData, query, getDocs } from "firebase/firestore";
import { filterByProductType } from "../filterProducts";

export const getTotalProductsCount = async (type: ProductTypes) => {
    try {
        const productsCollectionRef = collection(db, "products");
        let countQuery: Query<DocumentData> = query(productsCollectionRef);

        countQuery = filterByProductType(countQuery, type);

        const querySnapshot = await getDocs(countQuery);
        const totalProducts = querySnapshot.size;
        return totalProducts;
    } catch (error) {
        console.error("Error", error);
        return 0;
    }
};
