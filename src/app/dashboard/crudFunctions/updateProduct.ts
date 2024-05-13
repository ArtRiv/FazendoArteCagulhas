import { Firestore, doc, updateDoc } from "firebase/firestore";
import { ProductTeste } from "./addProduct";

export const updateProduct = async (db: Firestore, docId: string | undefined, updatedProduct: Partial<ProductTeste>) => {
  try {
    if(!docId) return;
    const docRef = doc(db, "products", docId);
    await updateDoc(docRef, updatedProduct);
    console.log("Document updated with ID: ", docId);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
