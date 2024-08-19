"use server";

import { Categories } from "@/types/categories";
import { HttpResponse, RequestData, HttpRequest } from "..";

export const getCategories = async (): Promise<HttpResponse<Categories[]>> => {
    const requestData: RequestData = {
        url: 'http://localhost:8080/category',
        method: 'GET',
    };

    return await HttpRequest<Categories[]>(requestData);
}