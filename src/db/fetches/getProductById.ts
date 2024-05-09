import { db } from "@/firebase-config";
import { Product } from "@/types/product";
import { collection, doc, getDoc } from "firebase/firestore";

export const getProductById = async (id: string) => {
    try {
        const productsCollectionRef = collection(db, "products");
        const productDocRef = doc(productsCollectionRef, id);
        const productSnapshot = await getDoc(productDocRef);
        const productData = productSnapshot.data() as Product;

        return productData;

    } catch (error) {
        console.error("Error in function getProductById", error);
        return null;
    }
};