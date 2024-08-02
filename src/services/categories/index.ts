import { Categories } from "@/types/categories";

export async function getCategories(): Promise<Categories[]>{
    
    const options = {
        method: 'GET',
    };
    // const url = `http://localhost:8080/category`; // desktop
    const url = `http://192.168.3.13:8080/category`; // mobile
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`HTTP error: Status ${res.status}`);
    }
    const data = await res.json(); 

    return data;
}