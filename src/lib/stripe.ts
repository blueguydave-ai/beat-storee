import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-15.acacia' as any,
});

export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, any>
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    throw error;
  }
}

export async function confirmPayment(
  paymentIntentId: string,
  paymentMethodId: string
) {
  try {
    const confirmed = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    return confirmed;
  } catch (error) {
    console.error('Stripe payment confirmation error:', error);
    throw error;
  }
}

export async function createCheckoutSession(
  items: Array<{ beatId: string; licenseId: string; price: number }>,
  customerEmail: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Beat License - ${item.beatId}`,
            metadata: {
              beatId: item.beatId,
              licenseId: item.licenseId,
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      })),
      mode: 'payment',
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return session;
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    throw error;
  }
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
}

export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
) {
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw error;
  }
}
