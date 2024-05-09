import { db } from "@/firebase-config";
import { ProductReview } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";

export const getProductReviews = async (product_id: string) => {
    try {
        const productReviewsCollectionRef = collection(db, "products_reviews");
        const productReviewsSnapshot = await getDocs(productReviewsCollectionRef);
        const productReviewsData = productReviewsSnapshot.docs.map((doc) => ({ ...doc.data() as ProductReview, review_id: doc.id }));

        const productReviews = productReviewsData.filter((review) => review.product_id === product_id);

        return productReviews as ProductReview[];

    } catch (error) {
        console.error("Error in function getProductReview", error);
        return null;
    }
}
