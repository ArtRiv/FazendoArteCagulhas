"use server";

import { AddressProps } from '@/types/address-props';
import { HttpResponse, RequestData, HttpRequest } from '..';

interface getAddressByZipcodeParams {
    zipCode: string,
}

export const getAddressByZipcode = async (p: getAddressByZipcodeParams): Promise<HttpResponse<AddressProps>> => {
    const requestData: RequestData = {
        url: `https://viacep.com.br/ws/${p.zipCode}/json/`,
        method: 'GET',
    };

    return await HttpRequest<AddressProps>(requestData);
}