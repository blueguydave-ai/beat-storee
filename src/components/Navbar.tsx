'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              🎵 David Jayy Beats
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/beats" className="hover:text-purple-400 transition">
              Browse Beats
            </Link>
            <Link href="/packs" className="hover:text-purple-400 transition">
              Packs
            </Link>
            <Link href="/blog" className="hover:text-purple-400 transition">
              Blog
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center bg-gray-900 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search beats..."
                className="bg-transparent text-white placeholder-gray-500 outline-none w-32"
              />
              <span className="text-gray-500">🔍</span>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative hover:text-purple-400 transition">
              <span className="text-2xl">🛒</span>
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <Link href="/account" className="hover:text-purple-400 transition">
                  👤 {user.fullName}
                </Link>
                <button
                  onClick={logout}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="hover:text-purple-400 transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Admin Link */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 transition">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
