import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BeatsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">Browse Beats</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Genre</h3>
                <div className="space-y-2">
                  {['Trap', 'Hip Hop', 'R&B', 'Drill', 'Afrobeats', 'Pop'].map((genre) => (
                    <label key={genre} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-3 w-4 h-4 rounded" />
                      <span>{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BPM Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">BPM Range</h3>
                <input type="range" min="60" max="200" className="w-full" />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>60</span>
                  <span>200</span>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price</h3>
                <input type="range" min="0" max="500" className="w-full" />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>

              {/* Key Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Musical Key</h3>
                <div className="space-y-2">
                  {['C', 'D', 'E', 'F#', 'G', 'A'].map((key) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="mr-3 w-4 h-4 rounded" />
                      <span>{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold transition">
                Clear Filters
              </button>
            </div>
          </div>

          {/* Beat Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">Showing 24 beats</p>
              <select className="bg-gray-900/50 border border-gray-800 rounded px-4 py-2 text-white outline-none hover:border-purple-500 transition">
                <option>Sort by: Newest</option>
                <option>Trending</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <Link
                  key={index}
                  href={`/beat/${index + 1}`}
                  className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500 transition"
                >
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 aspect-square flex items-center justify-center relative group">
                    <span className="text-6xl">🎵</span>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-4xl">▶️</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition">
                      Professional Trap Beat #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">David Jayy</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-400">{140 + index} BPM • {['C', 'D', 'E', 'F#'][index % 4]}</span>
                      <span className="text-purple-400 font-semibold">$29</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                        ♥️
                      </button>
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm transition">
                        Preview
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button className="border border-purple-500 hover:bg-purple-500/10 px-8 py-3 rounded font-semibold transition">
                Load More Beats
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
