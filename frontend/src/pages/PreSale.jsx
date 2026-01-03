import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowUpCircle, FileText, Bot, Zap, TrendingUp, Shield } from 'lucide-react'
import { ethers } from 'ethers'

const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'
const STAKING_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'

const USDT_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)'
]

function PreSale({ account, isConnected, onConnect }) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleBuy = async () => {
    if (!isConnected || !account) {
      connectWallet()
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement purchase logic
      alert('Purchase successful!')
      setAmount('')
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Purchase failed: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMax = async () => {
    if (!isConnected || !account) return
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, provider)
      const balance = await usdtContract.balanceOf(account)
      const balanceFormatted = ethers.formatUnits(balance, 6)
      setAmount(balanceFormatted)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Pre-Sale</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Buy Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buy USDF with USDT</h2>
            
            {!isConnected ? (
              <button
                onClick={onConnect}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 mb-6"
              >
                <Wallet size={20} />
                <span>Connect Wallet</span>
              </button>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pay</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      disabled={isLoading}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-gray-600 font-medium">USDT</span>
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Balance:</span>
                    <span>0.00 USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum Amount:</span>
                    <span>120 USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 USDF =</span>
                    <span>$1.003146</span>
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={isLoading || !amount}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all"
                >
                  {isLoading ? 'Processing...' : 'Buy USDF'}
                </button>
              </>
            )}
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">HAVEN – USDF</h3>
                  <p className="text-gray-600">HAVEN US Dollar Yield Token</p>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <FileText className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-2">How it Works</p>
                    <p className="text-gray-600">
                      To ensure compliance with US laws and regulations, you will receive your transferable USDF tokens 40-50 days after depositing funds and can only redeem in USD to a non-US bank account. (Find out more.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How it Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How it Works</h2>
          <p className="text-gray-600 mb-8">
            To ensure compliance with US laws and regulations, you will receive your transferable USDF tokens 40-50 days after depositing funds and can only redeem in USD to a non-US bank account. (Find out more.)
          </p>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Deposit Stablecoins',
                description: 'Users deposit USDT / USDC / USD1. No long compliance lock-up required.',
                icon: Wallet
              },
              {
                step: 2,
                title: 'SPV/Trust Buys Bonds',
                description: 'Funds are custodied and executed by licensed broker. Purchase of U.S. Treasuries (T-Bills) and blue-chip corporate bonds (Apple, Nvidia, Tencent, Xiaomi, etc.)',
                icon: Shield
              },
              {
                step: 3,
                title: 'Mint Tokens 1:1',
                description: 'On-chain issuance of USDF / AppleBond / NvidiaBond / TencentBond. Tokens go directly into user wallets with full transparency.',
                icon: Zap
              },
              {
                step: 4,
                title: 'On-chain AI Smart Yield Distribution',
                description: 'AI agent automatically calculates and distributes yields based on real-time market data. Daily NAV updates with intelligent allocation algorithms. Token value increases over time (4%-9% APY depending on asset class).',
                icon: Bot
              },
              {
                step: 5,
                title: 'Redeem or Trade',
                description: 'Users can redeem anytime (T+3 settlement). Or trade tokens on secondary markets / DEX for liquidity.',
                icon: TrendingUp
              }
            ].map((item, index) => (
              <div key={item.step} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <item.icon className="text-blue-600" size={20} />
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Smart Yield Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">On-chain AI Smart Yield Distribution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Bot className="text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Calculation</h3>
              <p className="text-gray-600 text-sm">AI agent continuously monitors market conditions and calculates optimal yield distribution in real-time</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Zap className="text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Allocation</h3>
              <p className="text-gray-600 text-sm">Intelligent algorithms automatically allocate yields across different asset classes for maximum returns</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <TrendingUp className="text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">Automated Distribution</h3>
              <p className="text-gray-600 text-sm">Yields are automatically distributed to token holders based on their stake, with transparent on-chain verification</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PreSale

