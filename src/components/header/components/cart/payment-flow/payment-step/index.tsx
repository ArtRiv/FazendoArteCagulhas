import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useFilter } from "@/hooks/use-filter";
import { getStripeCheckoutSession } from "@/services/checkout";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default async function PaymentStep() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const { items, shippingOptions } = useFilter();
  const { user } = useKindeBrowserClient()

  if (!user) return;

  const response = await getStripeCheckoutSession({
    items,
    shippingOptions,
    userID: user.id,
  })
  const clientSecret = response.data?.client_secret;

  const options = { clientSecret };

  return (
    <div id="checkout" className="my-4 flex flex-col">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
