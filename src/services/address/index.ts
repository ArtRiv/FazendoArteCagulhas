"use server";

import { AddressProps } from '@/types/address-props';
import { HttpResponse, RequestData, HttpRequest } from '..';

interface getAddressByPostalCodeParams {
    postal_code: string,
}

export const getAddressByPostalCode = async (p: getAddressByPostalCodeParams): Promise<HttpResponse<AddressProps>> => {
    const requestData: RequestData = {
        url: `https://viacep.com.br/ws/${p.postal_code}/json/`,
        method: 'GET',
    };

    return await HttpRequest<AddressProps>(requestData);
}