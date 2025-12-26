'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated || user?.role !== 'admin') {
    router.push('/login');
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { id: 'beats', label: '🎵 Beats', icon: '🎵' },
              { id: 'orders', label: '📦 Orders', icon: '📦' },
              { id: 'customers', label: '👥 Customers', icon: '👥' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'coupons', label: '🏷️ Coupons', icon: '🏷️' },
              { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded transition ${
                  activeTab === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-300 transition text-sm"
            >
              ← Back to Store
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome to your admin dashboard</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Revenue', value: '$12,450', change: '+12.5%', icon: '💰' },
                  { label: 'Total Sales', value: '456', change: '+8.2%', icon: '📦' },
                  { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', icon: '📊' },
                  { label: 'Avg Order Value', value: '$27.30', change: '+2.1%', icon: '💳' },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{metric.icon}</span>
                      <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Revenue (Last 30 Days)</h2>
                  <div className="h-64 bg-gray-800/30 rounded flex items-center justify-center text-gray-500">
                    Chart placeholder - Use Chart.js or Recharts
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Top Selling Beats</h2>
                  <div className="space-y-4">
                    {[
                      { beat: 'Trap Wave', sales: 145, revenue: '$4,205' },
                      { beat: 'Summer Vibes', sales: 98, revenue: '$2,842' },
                      { beat: 'Dark Drill', sales: 87, revenue: '$2,522' },
                    ].map((item) => (
                      <div key={item.beat} className="flex items-center justify-between pb-4 border-b border-gray-800 last:border-b-0">
                        <div>
                          <p className="font-semibold">{item.beat}</p>
                          <p className="text-sm text-gray-400">{item.sales} sales</p>
                        </div>
                        <span className="text-green-400 font-bold">{item.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: '#001', customer: 'John Doe', amount: '$49', status: 'Completed', date: '2025-12-23' },
                        { id: '#002', customer: 'Jane Smith', amount: '$99', status: 'Completed', date: '2025-12-23' },
                        { id: '#003', customer: 'Mike Johnson', amount: '$29', status: 'Pending', date: '2025-12-23' },
                      ].map((order) => (
                        <tr key={order.id} className="border-b border-gray-800 last:border-b-0">
                          <td className="py-3 px-4 font-semibold">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'Completed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'beats' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Beat Management</h1>
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition">
                  + Add New Beat
                </button>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">BPM</th>
                        <th className="text-left py-3 px-4">Genre</th>
                        <th className="text-left py-3 px-4">Sales</th>
                        <th className="text-left py-3 px-4">Revenue</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { title: 'Trap Wave', bpm: 140, genre: 'Trap', sales: 145, revenue: '$4,205' },
                        { title: 'Summer Vibes', bpm: 95, genre: 'Hip Hop', sales: 98, revenue: '$2,842' },
                        { title: 'Dark Drill', bpm: 180, genre: 'Drill', sales: 87, revenue: '$2,522' },
                      ].map((beat) => (
                        <tr key={beat.title} className="border-b border-gray-800 last:border-b-0">
                          <td className="py-3 px-4 font-semibold">{beat.title}</td>
                          <td className="py-3 px-4">{beat.bpm}</td>
                          <td className="py-3 px-4">{beat.genre}</td>
                          <td className="py-3 px-4">{beat.sales}</td>
                          <td className="py-3 px-4 text-green-400 font-bold">{beat.revenue}</td>
                          <td className="py-3 px-4">
                            <button className="text-purple-400 hover:text-purple-300 transition mr-3">Edit</button>
                            <button className="text-red-400 hover:text-red-300 transition">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Orders</h1>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center py-12">
                <p className="text-gray-400">Orders management - Coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Customers</h1>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center py-12">
                <p className="text-gray-400">Customer management - Coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Analytics</h1>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center py-12">
                <p className="text-gray-400">Advanced analytics - Coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Coupon Codes</h1>
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition">
                  + Create Coupon
                </button>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center py-12">
                <p className="text-gray-400">No coupons created yet</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Settings</h1>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Store Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Store Name</label>
                    <input
                      type="text"
                      defaultValue="David Jayy Beats"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Currency</label>
                    <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>NGN</option>
                    </select>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-semibold transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
