"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { useFilter } from "@/hooks/use-filter";
import { getStripeCheckoutSession } from "@/services/checkout";

export default function PaymentStep() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const { items, shippingOptions } = useFilter();
  const [userID] = useState<string>("teste");

  const fetchClientSecret = useCallback(async () => {
    const response = await getStripeCheckoutSession({
      items,
      shippingOptions,
      userID,
    });

    if(!response.data?.client_secret) {
      throw new Error('Failed to retrieve client secret');
    }

    return response.data.client_secret;
  }, [items, userID]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="my-4 flex flex-col">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
