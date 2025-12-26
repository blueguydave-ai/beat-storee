'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/utils/helpers';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.errors.join(', '));
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, fullName);
      router.push('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-20">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                At least 8 characters, 1 uppercase, 1 number, 1 special character
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <label className="flex items-start cursor-pointer mb-6">
              <input type="checkbox" className="mr-3 w-4 h-4 rounded mt-1" required />
              <span className="text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900/50 text-gray-400">Or sign up with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              🐦 Twitter
            </button>
            <button className="w-full bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              📘 Google
            </button>
          </div>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
