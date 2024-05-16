"use server"

import { db } from "@/firebase-config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export interface ProductTeste {
    created_at: number,
    image: string,
    link: string,
    product_group: string,
    price: number,
    purchase_count: number,
    tag: string,
    title: string,
    type: string,
    description: Array<String>,
    secondary_images: Array<String> | undefined,
}

export async function createProduct(
    prevState: {
        message: string;
    },
    formData: FormData,
) {

    const description1 = formData.get('description1') as string || '';
    const description2 = formData.get('description2') as string || '';

    const secondaryImages: string[] = [];
    formData.forEach((value, key) => {
        if (key.startsWith('secondaryImage')) {
            secondaryImages.push(value as string);
        }
    });

    const FormData: ProductTeste = {
        created_at: formData.get('created_at') ? Number(formData.get('created_at')) : 0,
        image: formData.get('image') as string || '',
        link: formData.get('link') as string || '',
        product_group: formData.get('product_group') as string || '',
        price: formData.get('price') ? Number(formData.get('price')) : 0,
        purchase_count: formData.get('purchase_count') ? Number(formData.get('purchase_count')) : 0,
        tag: formData.get('tag') as string || '',
        title: formData.get('title') as string || '',
        type: formData.get('type') as string || '',
        description: [description1, description2],
        secondary_images: secondaryImages.length > 0 ? secondaryImages : undefined,
    }

    try {
        const docRef = await addDoc(collection(db, "products"), FormData);
        console.log("Document written with ID: ", docRef.id);
        return { message: "Added product" };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { message: "error" };

    }

}

export async function updateProduct(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const productID = formData.get('productID') as string || '';
    const description1 = formData.get('description1') as string || '';
    const description2 = formData.get('description2') as string || '';

    const secondaryImages: string[] = [];
    formData.forEach((value, key) => {
        if (key.startsWith('secondaryImage')) {
            secondaryImages.push(value as string);
        }
    });

    const FormData: Partial<ProductTeste> = {
        created_at: formData.get('created_at') ? Number(formData.get('created_at')) : 0,
        image: formData.get('image') as string || '',
        link: formData.get('link') as string || '',
        product_group: formData.get('product_group') as string || '',
        price: formData.get('price') ? Number(formData.get('price')) : 0,
        purchase_count: formData.get('purchase_count') ? Number(formData.get('purchase_count')) : 0,
        tag: formData.get('tag') as string || '',
        title: formData.get('title') as string || '',
        type: formData.get('type') as string || '',
        description: [description1, description2],
        secondary_images: secondaryImages.length > 0 ? secondaryImages : undefined,
    }

    try {
        const docRef = doc(db, "products", productID);
        await updateDoc(docRef, FormData);
        return { message: "updated" };
    } catch (e) {
        console.error("Error updating document: ", e);
        return { message: "error" };
    }
}


export interface ReviewTeste {
    created_at: number,
    from: string,
    media: Array<string>,
    product_id: string,
    rating: number,
    text: string,
    title: string,
    user: string
}

export async function addProductReview(
    prevState: {
        message: string;
    },
    formData: FormData,
) {

    const media: string[] = [];
    formData.forEach((value, key) => {
        if (key.startsWith('reviewMedia')) {
            media.push(value as string);
        }
    });

    const FormData: ReviewTeste = {
        created_at: formData.get('created_at') ? Number(formData.get('created_at')) : 0,
        from: formData.get('from') as string || '',
        product_id: formData.get('productID') as string || '',
        rating: formData.get('rating') ? Number(formData.get('rating')) : 0,
        media: media,
        text: formData.get('text') as string || '',
        title: formData.get('title') as string || '',
        user: formData.get('user') as string || '',
    }

    try {
        const docRef = await addDoc(collection(db, "products_reviews"), FormData);
        console.log("Document written with ID: ", docRef.id);
        return { message: "Added review" };
      } catch (e) {
        console.error("Error adding document: ", e);
        return { message: "error" };
      }
}
