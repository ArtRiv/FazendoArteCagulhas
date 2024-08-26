"use server";

import { HttpResponse, RequestData, HttpRequest } from '..';
import { sessionData } from '@/app/api/return/route';

interface getPaymentStatusParams {
    session_id: string,
}

export const getPaymentStatus = async (p: getPaymentStatusParams): Promise<HttpResponse<sessionData>> => {
    const requestData: RequestData = {
        url: '/api/return',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(p.session_id),
    };

    return await HttpRequest<sessionData>(requestData);
}