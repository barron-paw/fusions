import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Presale from './components/Presale'
import StatsPanel from './components/StatsPanel'
import { useWallet } from './hooks/useWallet'

function App() {
  const { account, connectWallet, disconnectWallet, isConnected } = useWallet()
  const [stakingData, setStakingData] = useState({
    totalStaked: 0,
    totalRewards: 0,
    apy: 12.5,
    userStaked: 0,
    userRewards: 0
  })

  useEffect(() => {
    if (isConnected && account) {
      fetchUserStakingData(account)
    }
  }, [isConnected, account])

  const fetchUserStakingData = async (userAddress) => {
    // TODO: 实现从智能合约获取数据的逻辑
    console.log('Fetching staking data for:', userAddress)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 科技感背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10">
        <Header 
          account={account}
          isConnected={isConnected}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        <main className="container mx-auto px-4 py-12 md:py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Welcome to the World of
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Stable Yield
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              On-chain Gateway to Fixed Income
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Invest with USDT/USDC on BSC. Institutional-grade custody via licensed broker.
            </p>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <StatsPanel data={stakingData} />
          </motion.div>

          {/* Presale Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Presale
              account={account}
              isConnected={isConnected}
              stakingData={stakingData}
              onStakeUpdate={setStakingData}
            />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-20 py-12 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Fusions</span>
              </div>
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Ecosystem</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Partners</a>
              </div>
              <div className="text-gray-500 text-sm">
                © 2025 Fusions. All rights reserved.
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400 text-sm">
              fusions.cc
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

