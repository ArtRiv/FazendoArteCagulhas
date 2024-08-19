import { stripe } from '@/utils/stripe';
import Stripe from 'stripe';

export async function POST(request: Request): Promise<Stripe.Response<Stripe.Checkout.Session> | Response> {
    try {
        const { session_id } = await request.json();
        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        if (!session.customer_details) {
            return new Response(JSON.stringify({ message: 'Customer not found' }), { status: 404 });
        }

        return session; 
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
