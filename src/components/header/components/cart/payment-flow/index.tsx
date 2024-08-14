import { Elements } from '@stripe/react-stripe-js';
import { DialogDemo } from '../teste';
import AddressStep from './address-step';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BreadcrumbResponsive } from './address-step/breadcrumb';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const options = {
    appearance: {
        rules: {
            '.Input': {
                borderColor: '#ff23b6', // Input border color
                boxShadow: 'none', // Remove default shadow
            },
            '.Input--focus': {
                borderColor: '#0070f3', // Border color on focus
            },
        },
    },
};

export const CheckoutFlow = () => {
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckoutClick = () => {
        setShowCheckout(true);
    };

    return (
        <Dialog>
            <DialogTrigger asChild onClick={handleCheckoutClick}>
                <Button variant="outline">Pagar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[1125px] overflow-y-scroll h-[95%]">
                <BreadcrumbResponsive />
                {showCheckout && (
                    <Elements stripe={stripePromise} options={options}>
                        <AddressStep />
                    </Elements>
                )}
            </DialogContent>
        </Dialog>
    );
};
