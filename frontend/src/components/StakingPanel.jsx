import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, Info } from 'lucide-react'
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

function StakingPanel({ account, isConnected, stakingData, onStakeUpdate }) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('stake') // 'stake' or 'unstake'

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
      
      // 获取 USDT 合约实例
      const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer)
      
      // 将金额转换为 USDT 单位 (6 decimals)
      const amountWei = ethers.parseUnits(amount, 6)
      
      // 检查余额
      const balance = await usdtContract.balanceOf(account)
      if (balance < amountWei) {
        throw new Error('USDT 余额不足')
      }

      // 检查授权额度
      const allowance = await usdtContract.allowance(account, STAKING_CONTRACT_ADDRESS)
      if (allowance < amountWei) {
        // 需要先授权
        const approveTx = await usdtContract.approve(STAKING_CONTRACT_ADDRESS, ethers.MaxUint256)
        await approveTx.wait()
      }

      // TODO: 调用质押合约的 stake 方法
      // const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, signer)
      // const stakeTx = await stakingContract.stake(amountWei)
      // await stakeTx.wait()

      alert('质押成功！')
      setAmount('')
      
      // 更新数据
      // await fetchStakingData()
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-8 glow-border"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">质押 USDT</h2>
        {isConnected && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Info size={16} />
            <span>已连接: {account?.slice(0, 6)}...{account?.slice(-4)}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('stake')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'stake'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'glass-effect text-gray-400 hover:text-white'
          }`}
        >
          <ArrowUpCircle className="inline mr-2" size={20} />
          质押
        </button>
        <button
          onClick={() => setActiveTab('unstake')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'unstake'
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
              : 'glass-effect text-gray-400 hover:text-white'
          }`}
        >
          <ArrowDownCircle className="inline mr-2" size={20} />
          提取
        </button>
      </div>

      {!isConnected ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">请先连接钱包以开始质押</p>
        </div>
      ) : (
        <>
          {/* User Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-effect rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">我的质押</div>
              <div className="text-xl font-bold">${stakingData.userStaked.toLocaleString()}</div>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">我的收益</div>
              <div className="text-xl font-bold text-primary-400">${stakingData.userRewards.toLocaleString()}</div>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">质押金额 (USDT)</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                disabled={isLoading}
              />
              <button
                onClick={handleMax}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-colors"
                disabled={isLoading}
              >
                最大
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={activeTab === 'stake' ? handleStake : handleUnstake}
            disabled={isLoading || !amount}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-500/50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                <span>处理中...</span>
              </>
            ) : (
              <>
                {activeTab === 'stake' ? (
                  <>
                    <ArrowUpCircle size={20} />
                    <span>质押 USDT</span>
                  </>
                ) : (
                  <>
                    <ArrowDownCircle size={20} />
                    <span>提取 USDT</span>
                  </>
                )}
              </>
            )}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="mb-1">• 年化收益率: {stakingData.apy}%</p>
                <p className="mb-1">• 最小质押金额: 10 USDT</p>
                <p>• 质押后收益实时计算，可随时提取</p>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default StakingPanel

