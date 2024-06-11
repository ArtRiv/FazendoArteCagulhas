import { Product } from "@/types/product";

export async function getProductByID(id: string): Promise<Product>{
    const options = {
        method: 'GET',
    };
    const url = `http://localhost:8080/product/${id}`;
    const res = await fetch(url, options);

    if(!res.ok) {
        console.log('erro');
    }

    const data = await res.json(); 

    return data;
}

export async function getSimilarProducts(id: string): Promise<Product[]>{
    const options = {
        method: 'GET',
    };
    const url = `http://localhost:8080/product/${id}/similar`;
    const res = await fetch(url, options);

    if(!res.ok) {
        console.log('erro');
    }

    const data = await res.json(); 

    return data;
}