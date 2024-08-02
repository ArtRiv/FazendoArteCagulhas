import { ProductCart } from "@/types/product";

interface CheckoutResponse {
    url: string
}

interface CheckoutSessionParams {
    items: ProductCart[],
    userID: string,
}

export async function getCheckoutSession({ items, userID }: CheckoutSessionParams): Promise<CheckoutResponse> {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, userID }),
    };
    const url = `http://localhost:8080/checkout`;
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`HTTP error: Status ${res.status}`);
    }
    const data = await res.json();

    return data;
}
