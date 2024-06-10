import { Categories } from "@/types/categories";

export async function getCategories(): Promise<Categories[]>{
    
    const options = {
        method: 'GET',
    };
    const url = `http://localhost:8080/category`;
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`HTTP error: Status ${res.status}`);
    }
    const data = await res.json(); 

    return data;
}