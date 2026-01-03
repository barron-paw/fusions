import { motion } from 'framer-motion'
import { Wallet, Shield, Zap } from 'lucide-react'

function WalletConnect({ onConnect }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect rounded-2xl p-8 glow-border"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mb-4">
          <Wallet size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">连接钱包</h2>
        <p className="text-gray-400">连接您的钱包以开始质押 USDT</p>
      </div>

      <button
        onClick={onConnect}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
      >
        连接 MetaMask
      </button>

      <div className="mt-8 space-y-4">
        <div className="flex items-start space-x-3">
          <Shield className="text-primary-400 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold mb-1">安全可靠</h3>
            <p className="text-sm text-gray-400">智能合约经过审计，资金安全有保障</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Zap className="text-primary-400 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold mb-1">高收益</h3>
            <p className="text-sm text-gray-400">享受稳定的质押收益，年化收益率高达 12.5%</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WalletConnect

