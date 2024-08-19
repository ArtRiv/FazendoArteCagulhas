"use server";

import { Product } from "@/types/product";
import { HttpRequest, HttpResponse, RequestData } from "..";

interface getProductByIdParams {
    id: string,
}

interface getSimilarProductsParams {
    id: string,
}

export const getProductByID = async (p: getProductByIdParams): Promise<HttpResponse<Product>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/product/${p.id}`,
        method: 'GET',
    };

    return await HttpRequest<Product>(requestData);
}

export const getSimilarProducts = async (p: getSimilarProductsParams): Promise<HttpResponse<Product[]>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/product/${p.id}/similar`,
        method: 'GET',
    };

    return await HttpRequest<Product[]>(requestData);
}