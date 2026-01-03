import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react'

function StatsPanel({ data }) {
  const stats = [
    {
      label: 'Total Staked',
      value: `$${data.totalStaked.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Rewards',
      value: `$${data.totalRewards.toLocaleString()}`,
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'APY',
      value: `${data.apy}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Stakers',
      value: '1,234',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-4 shadow-lg`}>
            <stat.icon className="text-white" size={24} />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsPanel

