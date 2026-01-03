import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

function About() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
            More Investment Options with FUSIONS
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-gray-600 mb-4">
                Invest with USDT/USDC,
              </p>
              <p className="text-xl text-gray-600 mb-8">
                Institutional-grade custody via licensed HK broker
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Licensed custody and transparent audits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">On-chain transparency with full asset backing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">AI-powered yield optimization</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Flexible redemption and trading options</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Partners & Custodians</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="text-center text-gray-600 font-medium">TDATA</div>
            <div className="text-center text-gray-600 font-medium">CHAIN CATCHER</div>
            <div className="text-center text-gray-600 text-sm">RICHE BRIGHT SECURITIES LIMITED</div>
            <div className="text-center text-gray-600 font-medium">HABIT TRADE</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

