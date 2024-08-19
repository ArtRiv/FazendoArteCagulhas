"use server";

import { ProductReview } from "@/types/product";
import { HttpResponse, RequestData, HttpRequest } from "..";

interface getReviewsByIDParams {
    id: string,
}

export const getReviewsByID = async (p: getReviewsByIDParams): Promise<HttpResponse<ProductReview[]>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/review/${p.id}`,
        method: 'GET',
    };

    return await HttpRequest<ProductReview[]>(requestData);
}