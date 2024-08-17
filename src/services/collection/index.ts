import { Product } from "@/types/product";
import { getCollectionParams } from "@/types/product-params";

export async function getCollectionData(params: getCollectionParams): Promise<Product[]>{
    
    const options = {
        method: 'GET',
    };
    const url = `http://localhost:8080/collection?category_id=${params.category_id}&sort_by=${params.sort_by}&page=${params.page}`;
    const res = await fetch(url, options);

    if(!res.ok) {
        console.log('erro');
    }

    const data = await res.json(); 

    return data;
}