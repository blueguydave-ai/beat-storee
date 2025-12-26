'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/beat/AudioPlayer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import { Beat, License, CartItem } from '@/types';

// Mock beat data - In production, fetch from API based on [id]
const mockBeat: Beat = {
  id: '1',
  title: 'Trap Wave',
  slug: 'trap-wave',
  producerId: '1',
  description:
    'A hard-hitting trap beat with modern sound design. Features heavy bass, crisp drums, and atmospheric synths. Perfect for trap rap, SoundCloud rap, or cloud rap. Inspired by current trends in hip-hop production.',
  bpm: 140,
  musicalKey: 'Cm',
  duration: 150,
  genre: 'Trap',
  moodTags: ['Dark', 'Energetic', 'Modern'],
  instrumentTags: ['Drums', '808 Bass', 'Synths', 'Hi-Hats'],
  artworkUrl: '/beats/trap-wave.jpg',
  audioPreviewUrl: '/audio/trap-wave-preview.mp3',
  status: 'active',
  isTrending: true,
  isFeatured: true,
  playCount: 1250,
  favoriteCount: 89,
  createdAt: new Date('2025-12-15'),
  updatedAt: new Date('2025-12-15'),
};

const mockLicenses: License[] = [
  {
    id: 'lic-1',
    beatId: '1',
    licenseType: 'basic_lease',
    price: 29,
    isAvailable: true,
    distributionLimit: 2000,
    includeStems: false,
    includeMidi: false,
    audioFormats: ['mp3'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lic-2',
    beatId: '1',
    licenseType: 'premium_lease',
    price: 49,
    isAvailable: true,
    distributionLimit: 5000,
    includeStems: false,
    includeMidi: true,
    audioFormats: ['mp3', 'wav'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lic-3',
    beatId: '1',
    licenseType: 'unlimited_lease',
    price: 149,
    isAvailable: true,
    distributionLimit: undefined,
    includeStems: true,
    includeMidi: true,
    audioFormats: ['mp3', 'wav'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lic-4',
    beatId: '1',
    licenseType: 'exclusive',
    price: 499,
    isAvailable: true,
    includeStems: true,
    includeMidi: true,
    audioFormats: ['mp3', 'wav'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function BeatDetailPage() {
  const { addItem } = useCart();
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (license: License) => {
    const cartItem: CartItem = {
      id: `cart-${Math.random()}`,
      beatId: mockBeat.id,
      licenseId: license.id,
      beat: mockBeat,
      license,
      quantity: 1,
      addedAt: new Date(),
    };

    addItem(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/beats" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
          ← Back to Beats
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Artwork & Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Beat Artwork */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 aspect-square rounded-lg flex items-center justify-center text-9xl overflow-hidden">
              🎵
            </div>

            {/* Audio Player */}
            <AudioPlayer audioUrl={mockBeat.audioPreviewUrl} beatTitle={mockBeat.title} duration={mockBeat.duration} />
          </div>

          {/* Right: Info & Licensing */}
          <div className="space-y-6">
            {/* Beat Info */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{mockBeat.title}</h1>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-800">
                <p className="text-sm text-gray-400">Producer: David Jayy</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>{mockBeat.bpm} BPM</span>
                  <span>•</span>
                  <span>{mockBeat.musicalKey}</span>
                  <span>•</span>
                  <span>{Math.floor(mockBeat.duration / 60)}:{(mockBeat.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockBeat.moodTags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-400">{mockBeat.playCount}</p>
                  <p className="text-xs text-gray-400">Plays</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-400">{mockBeat.favoriteCount}</p>
                  <p className="text-xs text-gray-400">Favorites</p>
                </div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`w-full mt-6 px-4 py-2 rounded font-semibold transition ${
                  isFavorited ? 'bg-pink-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
              </button>
            </div>

            {/* License Selection */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold mb-4">Choose License</h2>

              <div className="space-y-3">
                {mockLicenses.map((license) => (
                  <button
                    key={license.id}
                    onClick={() => setSelectedLicense(license)}
                    className={`w-full p-4 rounded-lg border transition text-left ${
                      selectedLicense?.id === license.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold capitalize">{license.licenseType.replace('_', ' ')}</span>
                      <span className="text-xl font-bold text-purple-400">${license.price}</span>
                    </div>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• {license.audioFormats.join(', ').toUpperCase()}</li>
                      {license.includeMidi && <li>• MIDI included</li>}
                      {license.includeStems && <li>• Stems included</li>}
                      {license.distributionLimit && <li>• {license.distributionLimit} sales limit</li>}
                      {!license.distributionLimit && <li>• Unlimited distribution</li>}
                    </ul>
                  </button>
                ))}
              </div>

              {selectedLicense && (
                <div className="space-y-3 pt-4 border-t border-gray-800">
                  {addedToCart && (
                    <div className="bg-green-500/20 border border-green-500 text-green-400 px-3 py-2 rounded text-sm text-center">
                      ✓ Added to cart!
                    </div>
                  )}

                  <button
                    onClick={() => handleAddToCart(selectedLicense)}
                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-semibold transition"
                  >
                    Add to Cart
                  </button>

                  <Link
                    href="/checkout"
                    className="w-full block text-center bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-semibold transition"
                  >
                    Buy Now
                  </Link>
                </div>
              )}
            </div>

            {/* Share */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Share</h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                  🐦
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                  📘
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                  📧
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                  🔗
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Beat Description */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">About This Beat</h2>
          <p className="text-gray-300 leading-relaxed mb-6">{mockBeat.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Genre</p>
              <p className="font-semibold">{mockBeat.genre}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">BPM</p>
              <p className="font-semibold">{mockBeat.bpm}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Key</p>
              <p className="font-semibold">{mockBeat.musicalKey}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Duration</p>
              <p className="font-semibold">
                {Math.floor(mockBeat.duration / 60)}:{(mockBeat.duration % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Beats */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Beats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((beat) => (
              <Link
                key={beat}
                href={`/beat/${beat}`}
                className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500 transition"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 aspect-square flex items-center justify-center text-6xl relative group">
                  🎵
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-4xl">▶️</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition">Similar Beat #{beat}</h3>
                  <p className="text-sm text-gray-400 mb-3">David Jayy</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">140 BPM • Cm</span>
                    <span className="text-purple-400 font-semibold">$29</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
