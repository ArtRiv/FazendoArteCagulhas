"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";
import { useFilter } from "@/hooks/use-filter";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { DialogDemo } from "./teste";

export default function EmbeddedCheckoutButton() {
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const modalRef = useRef<HTMLDialogElement>(null);
    const { items } = useFilter();
    const { getUser } = useKindeBrowserClient();
    const [userID, setUserID] = useState<string>('teste');

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        return fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items, userID }),
        })
            .then((res) => res.json())
            .then((data) => data.client_secret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout" className="my-4">
            <DialogDemo>
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </DialogDemo>
        </div>
    );
}