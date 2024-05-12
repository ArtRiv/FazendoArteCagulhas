import { collection, addDoc, Firestore } from "firebase/firestore";

export interface ReviewTeste {
    created_at: number,
    product_id: string,
    rating: number,
    media: Array<string>,
    text: string,
    title: string,
    user: string
}

export const addProductReview = async (db: Firestore, review: ReviewTeste) => {
  try {
    const docRef = await addDoc(collection(db, "products_reviews"), review);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
