"use server";

import { Product } from "@/types/product";
import { HttpRequest, HttpResponse, RequestData } from "..";
import { SortByTypes } from "@/types/product-params";

interface getProductsBySearchParams {
    page: number;
    search_query: string;
    sort_by: SortByTypes;
}

export const getResults = async (p: getProductsBySearchParams): Promise<HttpResponse<Product[]>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/results?search_query=${p.search_query}&sort_by=${p.sort_by}&page=${p.page}`,
        method: 'GET',
    };

    return await HttpRequest<Product[]>(requestData);
}