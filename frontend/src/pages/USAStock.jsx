import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const corporateBonds = [
  {
    company: 'Apple Inc.',
    logo: '🍎',
    yield: 5.17,
    maturity: '08/08/2062',
    rating: 'Unlock',
    liquidity: 85
  },
  {
    company: 'Alphabet Inc.',
    logo: '🔴',
    yield: 5.20,
    maturity: '05/15/2062',
    rating: 'Unlock',
    liquidity: 90
  },
  {
    company: 'Nvidia Corp.',
    logo: '💚',
    yield: 5.22,
    maturity: '03/01/2062',
    rating: 'Unlock',
    liquidity: 88
  },
  {
    company: 'Amazon.com Inc.',
    logo: '📦',
    yield: 5.17,
    maturity: '05/23/2062',
    rating: 'Unlock',
    liquidity: 82
  }
]

function USAStock() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920")'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white"></div>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
              On-chain Blue-Chip Corporate Bonds
            </h1>
            <p className="text-xl text-gray-600">
              Enhanced yield, powered by the world's leading companies.
            </p>
          </motion.div>

          {/* Bond Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {corporateBonds.map((bond, index) => (
              <motion.div
                key={bond.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                      {bond.logo}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Corporate bond</p>
                      <h3 className="text-xl font-bold text-gray-900">{bond.company}</h3>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {bond.yield}% <span className="text-lg text-gray-600">Yield</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bid $</span>
                    <span className="text-gray-900 font-medium">-</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500">Ask $</span>
                    <span className="text-gray-900 font-medium">-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Maturity</span>
                    <span className="text-gray-900 font-medium">{bond.maturity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rating</span>
                    <span className="text-gray-900 font-medium">{bond.rating}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Liquidity score</span>
                    <span className="text-gray-900 font-medium">{bond.liquidity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${bond.liquidity}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default USAStock

