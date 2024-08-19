"use server";

import Stripe from "stripe";
import { HttpResponse, RequestData, HttpRequest } from "..";
import { ProductCart } from "@/types/product";
import { PartialShippingOption } from "@/types/shipping-option";

interface CheckoutSessionParams {
    items: ProductCart[],
    shippingOptions: PartialShippingOption[],
    userID: string,
}

export const getStripeCheckoutSession = async ({ items, shippingOptions, userID }: CheckoutSessionParams): Promise<HttpResponse<Stripe.Response<Stripe.Checkout.Session>>> => {
    const requestData: RequestData = {
        url: 'http://localhost:8080/checkout',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items,
            shippingOptions,
            userID,
        }),
    };

    return await HttpRequest<Stripe.Response<Stripe.Checkout.Session>>(requestData);
}