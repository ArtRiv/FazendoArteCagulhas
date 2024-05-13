import { collection, addDoc, Firestore } from "firebase/firestore"; 

export interface ProductTeste {
  created_at: number,
  image: string,
  link: string,
  product_group: string,
  price: number,
  purchase_count: number,
  rating: number,
  tag: string,
  title: string,
  type: string,
  description: Array<String>,
  secondary_images: Array<String> | undefined,
}

export const addProduct = async (db: Firestore, product: ProductTeste) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
