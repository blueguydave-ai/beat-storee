'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">David Jayy Beats</h3>
            <p className="text-gray-400">
              Premium beats for producers and artists. Lease or own exclusive tracks.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-purple-400 transition">Twitter</a>
              <a href="#" className="hover:text-purple-400 transition">Instagram</a>
              <a href="#" className="hover:text-purple-400 transition">YouTube</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/beats" className="hover:text-purple-400 transition">Browse Beats</Link></li>
              <li><Link href="/packs" className="hover:text-purple-400 transition">Beat Packs</Link></li>
              <li><Link href="/blog" className="hover:text-purple-400 transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-purple-400 transition">Refund Policy</Link></li>
              <li><Link href="/licensing" className="hover:text-purple-400 transition">Licensing</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-3">Get updates on new beats and promotions</p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 text-white px-3 py-2 rounded placeholder-gray-500 outline-none"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-400">© {currentYear} David Jayy Beats. All rights reserved.</p>
          <div className="flex space-x-4 text-gray-400">
            <span>🔒 Secure Payments</span>
            <span>📦 Instant Delivery</span>
            <span>⭐ 24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
