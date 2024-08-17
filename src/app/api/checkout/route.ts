import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { getCheckoutSession } from '@/services/checkout';

export async function POST(request: Request) {
    try {
        const { items, shipmentOptions, userID } = await request.json();

        const session = await getCheckoutSession({ items, shipmentOptions, userID })

        return NextResponse.json({ id: session.id, client_secret: session.client_secret });
    } catch (error: any) {
      console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}