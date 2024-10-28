"use server";

import { Product } from "@/types/product";
import { HttpRequest, HttpResponse, RequestData } from "..";

export const getProductByID = async (id: string): Promise<HttpResponse<Product>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/collection/${id}`,
        method: 'GET',
    };

    return await HttpRequest<Product>(requestData);
}

export const getSimilarProducts = async (id: string): Promise<HttpResponse<Product[]>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/product/${id}/similar`,
        method: 'GET',
    };

    return await HttpRequest<Product[]>(requestData);
}