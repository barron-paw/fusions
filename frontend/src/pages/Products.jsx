import { motion } from 'framer-motion'
import { Bot, Zap, Shield, TrendingUp } from 'lucide-react'

function Products() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              HAVEN – USDF
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-4">
              On-chain Stablecoin with AI Agent Auto-Payment
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Backed 1:1 by short-term U.S. Treasuries. AI-powered automatic payment processing for seamless transactions.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Section - Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Backed 1:1 by short-term U.S. Treasuries</h3>
                    <p className="text-gray-600">Full collateralization ensures stability and security</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bot className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI Agent Auto-Payment</h3>
                    <p className="text-gray-600">Intelligent payment processing with automated execution</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Zero-coupon, yield accrues daily in token price</h3>
                    <p className="text-gray-600">Daily NAV updates for transparent yield accumulation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Invest with USDT/USDC, from $100</h3>
                    <p className="text-gray-600">Low entry barrier with flexible investment options</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Yield Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-8 shadow-xl border border-pink-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">U</span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">USDF</h2>
                  <p className="text-gray-600">US Dollar Yield*</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-red-600 mb-2">4.20%</div>
                  <div className="text-gray-500 text-sm">APY²</div>
                </div>
                <div className="mt-6 pt-6 border-t border-pink-200">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• AI-powered payment automation</p>
                    <p>• Real-time yield calculation</p>
                    <p>• Licensed custody & transparent audits</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI Agent Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">AI Agent Auto-Payment Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Bot className="text-blue-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Smart Payment Routing</h3>
                <p className="text-gray-600 text-sm">AI agent automatically routes payments through optimal channels for lowest fees and fastest settlement</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Zap className="text-blue-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Automated Execution</h3>
                <p className="text-gray-600 text-sm">Intelligent contract execution with automatic payment processing based on predefined rules and market conditions</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Shield className="text-blue-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Risk Management</h3>
                <p className="text-gray-600 text-sm">AI-powered risk assessment and automatic payment validation to ensure secure transactions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products

