import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, Info, TrendingUp, Lock, Zap } from 'lucide-react'
import { ethers } from 'ethers'

// USDT 合约地址 (BSC 主网)
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'
// 质押合约地址 (需要部署后更新)
const STAKING_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'

// USDT ABI (简化版，只包含必要的方法)
const USDT_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)'
]

function Presale({ account, isConnected, stakingData, onStakeUpdate }) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('stake')

  const handleStake = async () => {
    if (!isConnected || !account) {
      alert('请先连接钱包')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('请输入有效的质押金额')
      return
    }

    setIsLoading(true)
    try {
      if (!window.ethereum) {
        throw new Error('请安装 MetaMask')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer)
      const amountWei = ethers.parseUnits(amount, 6)
      
      const balance = await usdtContract.balanceOf(account)
      if (balance < amountWei) {
        throw new Error('USDT 余额不足')
      }

      const allowance = await usdtContract.allowance(account, STAKING_CONTRACT_ADDRESS)
      if (allowance < amountWei) {
        const approveTx = await usdtContract.approve(STAKING_CONTRACT_ADDRESS, ethers.MaxUint256)
        await approveTx.wait()
      }

      // TODO: 调用质押合约的 stake 方法
      alert('质押成功！')
      setAmount('')
    } catch (error) {
      console.error('Stake error:', error)
      alert('质押失败: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnstake = async () => {
    if (!isConnected || !account) {
      alert('请先连接钱包')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('请输入有效的提取金额')
      return
    }

    setIsLoading(true)
    try {
      // TODO: 实现提取逻辑
      alert('提取功能待实现')
      setAmount('')
    } catch (error) {
      console.error('Unstake error:', error)
      alert('提取失败: ' + error.message)
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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Presale</h2>
            <p className="text-gray-600">Stake USDT to earn stable yields on BSC</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">APY</div>
              <div className="text-2xl font-bold text-red-600">{stakingData.apy}%</div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-8 py-6 grid grid-cols-2 gap-4 border-b border-gray-100">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-1">Total Staked</div>
          <div className="text-xl font-bold text-gray-900">${stakingData.totalStaked.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-1">Your Staked</div>
          <div className="text-xl font-bold text-gray-900">${stakingData.userStaked.toLocaleString()}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {!isConnected ? (
          <div className="text-center py-12">
            <Lock className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 mb-4">Please connect your wallet to participate in presale</p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('stake')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'stake'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowUpCircle className="inline mr-2" size={20} />
                Stake
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'unstake'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowDownCircle className="inline mr-2" size={20} />
                Unstake
              </button>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount (USDT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                  disabled={isLoading}
                />
                <button
                  onClick={handleMax}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
                  disabled={isLoading}
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={activeTab === 'stake' ? handleStake : handleUnstake}
              disabled={isLoading || !amount}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {activeTab === 'stake' ? (
                    <>
                      <ArrowUpCircle size={20} />
                      <span>Stake USDT</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownCircle size={20} />
                      <span>Unstake USDT</span>
                    </>
                  )}
                </>
              )}
            </button>

            {/* Info Section */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="mb-1">• APY: {stakingData.apy}%</p>
                  <p className="mb-1">• Minimum stake: 10 USDT</p>
                  <p>• Rewards are calculated in real-time and can be withdrawn anytime</p>
                </div>
              </div>
            </div>

            {/* User Rewards */}
            {stakingData.userRewards > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Your Rewards</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${stakingData.userRewards.toLocaleString()}
                    </div>
                  </div>
                  <Zap className="text-green-600" size={32} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Presale

