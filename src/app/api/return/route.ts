import { stripe } from '@/utils/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    try {
        const { session_id } = await request.json();
        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        if(!session.customer_details) {
            return NextResponse.json({ message: 'Customer not found'}, { status: 404 });
        }

        return NextResponse.json({
            status: session.status,
            payment_status: session.payment_status,
            customer_email: session.customer_details.email,
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}