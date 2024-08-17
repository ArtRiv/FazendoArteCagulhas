import { ProductCart } from "@/types/product";
import { PartialShipmentOption } from "@/types/shipping-option";
import Stripe from "stripe";

interface CheckoutSessionParams {
    items: ProductCart[],
    shipmentOptions: PartialShipmentOption[],
    userID: string,
}

export async function getCheckoutSession({ items, shipmentOptions, userID }: CheckoutSessionParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, shipmentOptions, userID }),
    };
    const url = `http://localhost:8080/checkout`;
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`HTTP error: Status ${res.status}`);
    }

    return await res.json();
}
