import { db } from "@/firebase-config";
import { Product } from "@/types/product";
import { collection, Query, DocumentData, query, getDocs } from "firebase/firestore";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('q') as String;

        const productsCollectionRef = collection(db, "products");

        let productsQuery: Query<DocumentData, DocumentData> = query(
            productsCollectionRef,
        )

        const productsSnapshot = await getDocs(productsQuery);

        const productsData: Product[] = productsSnapshot.docs
            .map((doc) => ({ ...doc.data() as Product, id: doc.id }))
            .filter((product) => product.tag.toLowerCase().includes(search.toLowerCase()));

        return Response.json(productsData);

    } catch (error) {
        console.error("Error in getProductsPredectiveSearch: ", error);
        return null;
    }
}