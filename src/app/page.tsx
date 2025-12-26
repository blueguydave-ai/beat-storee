import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:40px_40px]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Professional Beats for Your Next Hit
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            High-quality instrumental tracks. Lease or own exclusive beats. Instant delivery. No credit card required to preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/beats"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Browse Beats
            </Link>
            <Link
              href="/beats?free=true"
              className="border-2 border-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Get Free Beat
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Instant Delivery',
              desc: 'Get your beats immediately after purchase. No waiting.',
            },
            {
              icon: '🎵',
              title: 'High Quality',
              desc: 'Professional production. WAV, MP3, Stems, and MIDI included.',
            },
            {
              icon: '🔒',
              title: 'Secure & Legal',
              desc: 'Clear licensing terms. Protect your investment with legal contracts.',
            },
            {
              icon: '💰',
              title: 'Flexible Pricing',
              desc: 'Lease or own. Multiple options for every budget.',
            },
            {
              icon: '🎧',
              title: 'Preview First',
              desc: 'Listen to full beats before buying. No surprises.',
            },
            {
              icon: '👥',
              title: '24/7 Support',
              desc: 'Questions? Our team is always here to help.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-purple-500 transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Beats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Trending Beats</h2>
          <Link href="/beats?sort=trending" className="text-purple-400 hover:text-purple-300 transition">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((beat) => (
            <div
              key={beat}
              className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500 transition"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 aspect-square flex items-center justify-center">
                <span className="text-6xl">🎵</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition">
                  Summer Trap Beat
                </h3>
                <p className="text-sm text-gray-400 mb-3">Producer Name</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm">140 BPM • Cm</span>
                  <span className="text-purple-400 font-semibold">$29</span>
                </div>
                <Link
                  href="/beat/demo"
                  className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-center transition block"
                >
                  Preview
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Start exploring thousands of beats and find the perfect match for your next project.
          </p>
          <Link
            href="/beats"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
          >
            Start Browsing Now
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
