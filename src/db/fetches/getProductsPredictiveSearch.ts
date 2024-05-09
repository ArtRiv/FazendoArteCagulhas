import { db } from "@/firebase-config";
import { Product } from "@/types/product";
import { getProductsByPredictiveSearch } from "@/types/productParams";
import { collection, Query, DocumentData, query, getDocs, limit } from "firebase/firestore";

export const getProductsPredictiveSearch = async (params: getProductsByPredictiveSearch) => {
    try {
        const productsCollectionRef = collection(db, "products");
        
        let productsQuery: Query<DocumentData, DocumentData> = query(
            productsCollectionRef,
            limit(8)
        )

        const productsSnapshot = await getDocs(productsQuery);

        const productsData: Product[] = productsSnapshot.docs
            .map((doc) => ({ ...doc.data() as Product, id: doc.id }))
            .filter((product) => product.tag.toLowerCase().includes(params.inputValue.toLowerCase()));

        return productsData;

    } catch (error) {
        console.error("Error in getProductsPredectiveSearch: ", error);
        return null;
    }
}