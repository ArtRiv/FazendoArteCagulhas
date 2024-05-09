import { db } from "@/firebase-config";
import { Product, ProductReview } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";

export const getProductsRating = async (productsData: Product[]) => {
    try {
        const productsReviewsCollectionRef = collection(db, "products_reviews");
        const productsReviewsSnapshot = await getDocs(productsReviewsCollectionRef);
        const productsReviewsData = productsReviewsSnapshot.docs
            .map((doc) => ({
                ...doc.data() as ProductReview,
                review_id: doc.id
            }));

        const productsWithAvarageRating: Product[] = productsData.map((product) => {
            const productReviews = productsReviewsData.filter((review) => review.product_id === product.id);
            const totalRating = productReviews.reduce((total, review) => total + review.rating, 0);
            const avarageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;
            return { ...product, rating: avarageRating };
        });

        return productsWithAvarageRating;

    } catch (error) {
        console.error("Error", error);
        return null;
    }

}