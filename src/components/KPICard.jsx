import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function KPICard({ title, value, subtitle, icon: Icon, color = 'blue', trend, trendValue, trendLabel }) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'bg-[#0D5C8F] text-white', text: 'text-[#0D5C8F]' },
    green: { bg: 'bg-green-50', icon: 'bg-green-600 text-white', text: 'text-green-600' },
    amber: { bg: 'bg-amber-50', icon: 'bg-amber-500 text-white', text: 'text-amber-600' },
    red: { bg: 'bg-red-50', icon: 'bg-red-500 text-white', text: 'text-red-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-600 text-white', text: 'text-purple-600' },
    teal: { bg: 'bg-teal-50', icon: 'bg-teal-600 text-white', text: 'text-teal-600' },
  }
  const c = colorMap[color] || colorMap.blue

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'

  return (
    <div className="kpi-card flex items-start gap-4">
      <div className={`${c.icon} p-3 rounded-xl flex-shrink-0`}>
        {Icon && <Icon size={22} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium mb-1 truncate">{title}</p>
        <p className={`text-2xl font-bold ${c.text} leading-tight`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>}
        {trendValue !== undefined && (
          <div className={`flex items-center gap-1 mt-1.5 ${trendColor}`}>
            <TrendIcon size={13} />
            <span className="text-xs font-medium">{trendValue}</span>
            {trendLabel && <span className="text-xs text-gray-400">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
