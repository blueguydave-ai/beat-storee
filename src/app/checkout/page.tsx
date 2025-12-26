'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.fullName || '',
    country: user?.country || '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-6">Checkout</h1>
          <p className="text-xl text-gray-400 mb-8">Your cart is empty</p>
          <Link
            href="/beats"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOrderError('');

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          totalAmount: cart.total,
          customerEmail: formData.email,
          customerName: formData.fullName,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        clearCart();
        router.push(`/order-confirmation/${data.data.id}`);
      } else {
        setOrderError('Failed to create order. Please try again.');
      }
    } catch (error) {
      setOrderError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition ${
                        step >= s
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition ${
                          step > s ? 'bg-purple-600' : 'bg-gray-800'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Customer Information</h2>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 transition"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="NG">Nigeria</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: Review Order */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                    <div className="space-y-3 border-b border-gray-800 pb-6">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex justify-between py-2">
                          <div>
                            <p className="font-semibold">{item.beat.title}</p>
                            <p className="text-sm text-gray-400">{item.license.licenseType}</p>
                          </div>
                          <p className="font-semibold">${item.license.price}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal:</span>
                        <span>${cart.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax:</span>
                        <span>${cart.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-800">
                        <span>Total:</span>
                        <span className="text-purple-400">${cart.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                    <div className="space-y-3">
                      {['card', 'paypal', 'mobile'].map((method) => (
                        <label
                          key={method}
                          className={`border rounded-lg p-4 cursor-pointer transition ${
                            formData.paymentMethod === method
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span className="font-semibold capitalize">
                            {method === 'card' ? '💳 Credit Card' : method === 'paypal' ? '📘 PayPal' : '📱 Mobile Money'}
                          </span>
                        </label>
                      ))}
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 mt-6 pt-6 border-t border-gray-800">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 transition"
                            required={formData.paymentMethod === 'card'}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Expiry</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 transition"
                              required={formData.paymentMethod === 'card'}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">CVC</label>
                            <input
                              type="text"
                              name="cardCVC"
                              placeholder="123"
                              value={formData.cardCVC}
                              onChange={handleInputChange}
                              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 transition"
                              required={formData.paymentMethod === 'card'}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div className="space-y-4 text-center py-8">
                    <h2 className="text-2xl font-bold mb-6">Confirm Your Purchase</h2>
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-gray-400 mb-6">
                      You're about to purchase {cart.items.length} {cart.items.length === 1 ? 'beat' : 'beats'}
                    </p>
                    <p className="text-3xl font-bold text-purple-400 mb-6">
                      ${cart.total.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm">
                      You will receive instant delivery of all your beats after purchase.
                    </p>
                  </div>
                )}

                {orderError && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-300">
                    {orderError}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="flex-1 border border-gray-700 hover:border-purple-500 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Back
                  </button>

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
                    >
                      {loading ? 'Processing...' : 'Complete Purchase'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b border-gray-800 pb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.beat.title}</span>
                    <span className="font-semibold">${item.license.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-400">
                    <span>Discount</span>
                    <span>-${cart.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-800 pt-6 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-purple-400">${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
