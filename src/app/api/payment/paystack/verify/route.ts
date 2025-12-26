import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { error: 'reference is required' },
        { status: 400 }
      );
    }

    const verification = await verifyPayment({ reference });

    if (!verification.status) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const { data } = verification;

    return NextResponse.json({
      success: true,
      data: {
        reference: data.reference,
        status: data.status,
        amount: data.amount / 100, // Paystack returns kobo, convert to naira
        currency: data.currency,
        customer: data.customer,
        authorization: data.authorization,
      },
    });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Payment verification failed',
      },
      { status: 500 }
    );
  }
}
