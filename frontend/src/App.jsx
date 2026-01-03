import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import WalletConnect from './components/WalletConnect'
import StakingPanel from './components/StakingPanel'
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
    // 这里可以添加获取质押数据的逻辑
    if (isConnected && account) {
      // 从智能合约获取用户质押数据
      fetchUserStakingData(account)
    }
  }, [isConnected, account])

  const fetchUserStakingData = async (userAddress) => {
    // TODO: 实现从智能合约获取数据的逻辑
    console.log('Fetching staking data for:', userAddress)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* 背景动画效果 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Header 
          account={account}
          isConnected={isConnected}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">Fusions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-2">
              BSC 链上 USDT 质押平台
            </p>
            <p className="text-lg text-gray-500">
              安全、高效、透明的去中心化质押服务
            </p>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <StatsPanel data={stakingData} />
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Wallet Connect Card */}
            {!isConnected && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <WalletConnect onConnect={connectWallet} />
              </motion.div>
            )}

            {/* Staking Panel */}
            <motion.div
              initial={{ opacity: 0, x: isConnected ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: isConnected ? 0.3 : 0.4 }}
              className={isConnected ? 'lg:col-span-2' : ''}
            >
              <StakingPanel
                account={account}
                isConnected={isConnected}
                stakingData={stakingData}
                onStakeUpdate={setStakingData}
              />
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 text-center text-gray-500">
          <p>© 2024 Fusions. All rights reserved.</p>
          <p className="text-sm mt-2">fusions.cc</p>
        </footer>
      </div>
    </div>
  )
}

export default App

