import { motion } from 'framer-motion'
import { Wallet, LogOut } from 'lucide-react'
import Navigation from './Navigation'

function Header({ account, isConnected, onConnect, onDisconnect, currentPage, onNavigate }) {
  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-8 flex-1"
          >
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">Fusions</span>
            </div>
            <div className="hidden lg:block">
              <Navigation currentPage={currentPage} onNavigate={onNavigate} />
            </div>
          </motion.div>

          {/* Right: Wallet Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
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
                  <span className="hidden md:inline">Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Wallet size={20} />
                <span className="hidden md:inline">Connect Wallet</span>
                <span className="md:hidden">Connect</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
          <Navigation currentPage={currentPage} onNavigate={onNavigate} />
        </div>
      </nav>
    </header>
  )
}

export default Header

