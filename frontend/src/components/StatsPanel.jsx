import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react'

function StatsPanel({ data }) {
  const stats = [
    {
      label: '总质押量',
      value: `$${data.totalStaked.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: '总奖励',
      value: `$${data.totalRewards.toLocaleString()}`,
      icon: Award,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: '年化收益率',
      value: `${data.apy}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: '质押用户',
      value: '1,234',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass-effect rounded-xl p-6 glow-border hover:scale-105 transition-transform"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-4`}>
            <stat.icon size={24} />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsPanel

