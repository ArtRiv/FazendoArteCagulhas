"use server";

import { ShippingOption } from '@/types/shipping-option';
import { HttpResponse, RequestData, HttpRequest } from '..';

interface getShippingOptionsParams {
    zipCode: string
}

export const getShippingOptions = async (p: getShippingOptionsParams): Promise<HttpResponse<ShippingOption[]>> => {
    const requestData: RequestData = {
        url: `http://localhost:8080/shipping/${p.zipCode.replace('-','')}`,
        method: 'GET',
    };

    return await HttpRequest<ShippingOption[]>(requestData);
}