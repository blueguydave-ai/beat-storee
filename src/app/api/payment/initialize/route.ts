import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/lib/stripe';
import { initializePayment } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      method, // 'stripe' or 'paystack'
      amount,
      currency = 'usd',
      email,
      beatIds = [],
      licenseIds = [],
      orderId,
    } = body;

    if (!method || !amount || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: method, amount, email' },
        { status: 400 }
      );
    }

    let paymentData;

    if (method === 'stripe') {
      // Create Stripe payment intent
      paymentData = await createPaymentIntent(amount, currency, {
        email,
        beatIds: beatIds.join(','),
        licenseIds: licenseIds.join(','),
        orderId,
      });

      return NextResponse.json({
        success: true,
        data: {
          provider: 'stripe',
          clientSecret: paymentData.client_secret,
          paymentIntentId: paymentData.id,
          status: paymentData.status,
        },
      });
    } else if (method === 'paystack') {
      // Initialize Paystack payment
      // Note: Paystack amount is in kobo (1 NGN = 100 kobo)
      // If amount is in USD, multiply by 410 (approx USD to NGN rate) then by 100
      const amountInKobo = Math.round(amount * 100); // Assuming amount is already in base currency

      paymentData = await initializePayment({
        email,
        amount: amountInKobo,
        reference: `ref_${orderId || Date.now()}`,
        metadata: {
          beatIds: beatIds.join(','),
          licenseIds: licenseIds.join(','),
          orderId,
        },
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/paystack/callback`,
      });

      if (!paymentData.status) {
        throw new Error('Failed to initialize Paystack payment');
      }

      return NextResponse.json({
        success: true,
        data: {
          provider: 'paystack',
          authorizationUrl: paymentData.data.authorization_url,
          accessCode: paymentData.data.access_code,
          reference: paymentData.data.reference,
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid payment method. Use "stripe" or "paystack"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Payment initialization failed',
      },
      { status: 500 }
    );
  }
}
