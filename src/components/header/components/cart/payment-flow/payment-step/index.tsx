"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { useFilter } from "@/hooks/use-filter";

export default function PaymentStep() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const { items, shipmentOptions } = useFilter();
  const [userID] = useState<string>("teste");

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, shipmentOptions, userID }),
    });
    const data = await res.json();
    return data.client_secret;
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
