interface PaystackInitializePaymentParams {
  email: string;
  amount: number; // in kobo (divide naira by 100)
  reference?: string;
  metadata?: Record<string, any>;
  callbackUrl?: string;
}

interface PaystackVerifyPaymentParams {
  reference: string;
}

interface PaystackListBanksParams {
  country?: string; // country code, e.g., 'NG' for Nigeria
}

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

async function paystackRequest(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  data?: any
) {
  const headers: HeadersInit = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        `Paystack API error: ${result.message || response.statusText}`
      );
    }

    return result;
  } catch (error) {
    console.error('Paystack API error:', error);
    throw error;
  }
}

export async function initializePayment(
  params: PaystackInitializePaymentParams
) {
  const reference =
    params.reference || `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const payload = {
    email: params.email,
    amount: params.amount,
    reference,
    metadata: params.metadata || {},
    callback_url: params.callbackUrl,
  };

  return paystackRequest('/transaction/initialize', 'POST', payload);
}

export async function verifyPayment(params: PaystackVerifyPaymentParams) {
  return paystackRequest(`/transaction/verify/${params.reference}`);
}

export async function getAvailableBanks(params?: PaystackListBanksParams) {
  const country = params?.country || 'NG';
  return paystackRequest(`/bank?country=${country}`);
}

export async function resolveAccountNumber(
  accountNumber: string,
  bankCode: string
) {
  return paystackRequest(
    `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
  );
}

export async function createTransferRecipient(
  accountNumber: string,
  bankCode: string,
  name: string,
  currency: string = 'NGN'
) {
  const payload = {
    type: 'nuban',
    account_number: accountNumber,
    bank_code: bankCode,
    name,
    currency,
  };

  return paystackRequest('/transferrecipient', 'POST', payload);
}

export async function initiateTransfer(
  recipientCode: string,
  amount: number,
  reason?: string,
  reference?: string
) {
  const payload = {
    source: 'balance',
    recipient: recipientCode,
    amount,
    reason,
    reference: reference || `txn_${Date.now()}`,
  };

  return paystackRequest('/transfer', 'POST', payload);
}

export async function getTransactionDetails(transactionId: number) {
  return paystackRequest(`/transaction/${transactionId}`);
}

export async function refundTransaction(transactionReference: string) {
  const payload = {
    transaction: transactionReference,
  };

  return paystackRequest('/refund', 'POST', payload);
}

export function verifyPaystackWebhook(
  body: string,
  signature: string
): boolean {
  const hash = require('crypto')
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(body)
    .digest('hex');

  return hash === signature;
}
