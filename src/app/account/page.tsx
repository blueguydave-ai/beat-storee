'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="font-semibold">{user?.fullName}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2 mb-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'orders', label: 'My Orders' },
                  { id: 'downloads', label: 'Downloads' },
                  { id: 'favorites', label: 'Favorites' },
                  { id: 'settings', label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      activeTab === item.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-600 px-4 py-2 rounded font-semibold transition text-red-400"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Welcome, {user?.fullName}!</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Orders', value: '0', icon: '📦' },
                    { label: 'Total Spent', value: '$0.00', icon: '💰' },
                    { label: 'Beats Owned', value: '0', icon: '🎵' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                  <div className="space-y-3">
                    <Link
                      href="/beats"
                      className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 rounded transition"
                    >
                      <span>Browse More Beats</span>
                      <span>→</span>
                    </Link>
                    <Link
                      href="/account?tab=orders"
                      className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 rounded transition"
                    >
                      <span>View My Orders</span>
                      <span>→</span>
                    </Link>
                    <Link
                      href="/account?tab=downloads"
                      className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 rounded transition"
                    >
                      <span>Download Center</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">My Orders</h1>
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No orders yet</p>
                  <Link
                    href="/beats"
                    className="inline-block mt-4 text-purple-400 hover:text-purple-300 transition"
                  >
                    Start shopping now →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Download Center</h1>
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No downloads available</p>
                  <p className="text-sm mt-2">Your purchased beats will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Favorite Beats</h1>
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No favorites yet</p>
                  <Link
                    href="/beats"
                    className="inline-block mt-4 text-purple-400 hover:text-purple-300 transition"
                  >
                    Explore beats →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Account Settings</h1>

                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.fullName}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white opacity-50"
                      />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-semibold transition">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Preferences</h2>
                  <div className="space-y-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-3 w-4 h-4 rounded" defaultChecked />
                      <span>Receive email notifications about new beats</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-3 w-4 h-4 rounded" defaultChecked />
                      <span>Subscribe to promotional offers</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
