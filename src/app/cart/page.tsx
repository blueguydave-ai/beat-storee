'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeItem, updateItem, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-6">Your Cart is Empty</h1>
          <p className="text-xl text-gray-400 mb-8">Start adding beats to your cart to get started</p>
          <Link
            href="/beats"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Browse Beats
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              {cart.items.map((item) => (
                <div key={item.id} className="border-b border-gray-800 p-6 flex gap-6 last:border-b-0">
                  {/* Beat Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-4xl">
                    🎵
                  </div>

                  {/* Beat Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{item.beat.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{item.beat.genre} • {item.beat.bpm} BPM</p>
                    <div className="text-sm text-purple-400 mb-3">
                      License: <span className="font-semibold capitalize">{item.license.licenseType.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-4">${item.license.price}</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-red-400 hover:text-red-300 transition"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b border-gray-800 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discount</span>
                  <span className="text-green-400">-${cart.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-6">
                <span>Total:</span>
                <span className="text-purple-400">${cart.total.toFixed(2)}</span>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                />
                <button className="w-full mt-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition">
                  Apply Code
                </button>
              </div>

              <Link
                href="/checkout"
                className="w-full block text-center bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/beats"
                className="w-full block text-center mt-3 border border-purple-500 hover:bg-purple-500/10 px-6 py-3 rounded-lg transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
