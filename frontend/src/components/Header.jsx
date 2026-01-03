import { motion } from 'framer-motion'
import { Wallet, LogOut } from 'lucide-react'

function Header({ account, isConnected, onConnect, onDisconnect }) {
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">F</span>
          </div>
          <span className="text-2xl font-bold gradient-text">Fusions</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <div className="glass-effect px-4 py-2 rounded-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono">{formatAddress(account)}</span>
              </div>
              <button
                onClick={onDisconnect}
                className="glass-effect px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>断开连接</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="glass-effect px-6 py-3 rounded-lg hover:bg-white/10 transition-all flex items-center space-x-2 glow-border hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
            >
              <Wallet size={20} />
              <span>连接钱包</span>
            </button>
          )}
        </motion.div>
      </nav>
    </header>
  )
}

export default Header

