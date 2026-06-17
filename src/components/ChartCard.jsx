import React from 'react'
import { Download, Maximize2 } from 'lucide-react'

export default function ChartCard({ title, subtitle, children, actions, className = '' }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="ดาวน์โหลด"
          >
            <Download size={14} />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="ขยาย"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
