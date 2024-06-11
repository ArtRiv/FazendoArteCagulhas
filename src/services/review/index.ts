import { ProductReview } from "@/types/product";

export async function getReviewsByID(id: string): Promise<ProductReview[]>{
    const options = {
        method: 'GET',
    };
    const url = `http://localhost:8080/review/${id}`;
    const res = await fetch(url, options);

    if(!res.ok) {
        console.log('erro');
    }

    const data = await res.json(); 

    return data;
}