import { stripe } from '@/utils/stripe';
import Stripe from 'stripe';

export interface sessionData {
    id: string;
    payment_status: Stripe.Checkout.Session.PaymentStatus;
    customer_email: string | null;
    line_items: Stripe.ApiList<Stripe.LineItem> | undefined;
}

export async function POST(request: Request): Promise<Stripe.Response<Stripe.Checkout.Session> | Response> {
    try {
        const { session_id } = await request.json();
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items', 'customer'],
        });

        const line_items = await stripe.checkout.sessions.listLineItems(session_id)
        
        if (!session.customer_details) {
            return new Response(JSON.stringify({ message: 'Customer not found' }), { status: 404 });
        }

        const sessionData = {
            id: session.id,
            payment_status: session.payment_status,
            customer_email: session.customer_details.email, 
            line_items,
        }

        return new Response(JSON.stringify(sessionData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
