import { Product } from "@/types/product";
import { getProductsBySearchParams } from "@/types/product-params";

export async function getResults(params: getProductsBySearchParams): Promise<Product[]>{
    const options = {
        method: 'GET',
    };
    const url = `http://localhost:8080/results?search_query=${params.search_query}&sort_by=${params.sort_by}&page=${params.page}`;
    const res = await fetch(url, options);

    if(!res.ok) {
        console.log('erro');
    }

    const data = await res.json(); 

    return data;
}