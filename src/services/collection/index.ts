"use server";

import { HttpRequest, HttpResponse, RequestData } from "..";
import { SortByTypes } from "@/types/product-params";
import { Product } from "@/types/product";

interface getAllCollectionParams {
    category_id: number,
    sort_by: SortByTypes,
    page: number,
}

export const getAllCollections = async (p: getAllCollectionParams): Promise<HttpResponse<Product[]>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/collection?category_id=${p.category_id}&sort_by=${p.sort_by}&page=${p.page}`,
        method: 'GET',
    };

    return await HttpRequest<Product[]>(requestData);
}