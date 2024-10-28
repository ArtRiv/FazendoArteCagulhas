"use server";
import 'server-only'

import axios, { AxiosError, AxiosResponse, HttpStatusCode, Method } from 'axios';

export interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    data?: T;
}

export interface RequestData {
    url: string;
    method: Method;
    headers?: any;
    body?: any;
}

export const HttpRequest = async <T>(data: RequestData): Promise<HttpResponse<T>> => {
    let axiosResponse: AxiosResponse;

    try {
        axiosResponse = await axios.request({
            url: data.url,
            method: data.method,
            data: data.body,
            headers: data.headers,
        })
    } catch (error) {
        console.error(error);
        const _error = error as AxiosError<{message: string}>;
        throw new Error(_error?.message);
    };

    return {
        statusCode: axiosResponse.status,
        data: axiosResponse.data as T,
    };
};