import { motion } from 'framer-motion'
import { Wallet, LogOut } from 'lucide-react'

function Header({ account, isConnected, onConnect, onDisconnect }) {
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Fusions</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 border border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-gray-700">{formatAddress(account)}</span>
                </div>
                <button
                  onClick={onDisconnect}
                  className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-gray-700"
                >
                  <LogOut size={18} />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Wallet size={20} />
                <span>Connect Wallet</span>
              </button>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  )
}

export default Header

