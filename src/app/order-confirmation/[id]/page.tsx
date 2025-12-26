'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.id as string;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center">
          {/* Success Icon */}
          <div className="text-7xl mb-6">✅</div>

          <h1 className="text-4xl font-bold mb-4">Purchase Successful!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Thank you for your purchase. Your beats are ready to download.
          </p>

          {/* Order Details */}
          <div className="bg-gray-800/50 rounded-lg p-6 text-left mb-8">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-mono font-bold">ORD-{Date.now()}</span>
              </div>
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-3 text-white font-semibold">
                <span>Total Amount:</span>
                <span className="text-purple-400">$XX.XX</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-purple-600/20 border border-purple-500 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-bold mb-4">🎵 What's Next?</h2>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">1.</span>
                <span>A confirmation email has been sent to your email address with download links</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">2.</span>
                <span>Download links are valid for 48 hours from purchase</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">3.</span>
                <span>You can access your beats anytime from your account dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">4.</span>
                <span>License documents are included with your download</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account?tab=downloads"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              Go to Downloads
            </Link>
            <Link
              href="/beats"
              className="border-2 border-purple-400 hover:bg-purple-400/10 px-8 py-3 rounded-lg font-semibold transition"
            >
              Browse More Beats
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-4">
              Having issues? We're here to help!
            </p>
            <Link
              href="/contact"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
