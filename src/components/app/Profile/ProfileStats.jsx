import React from 'react'

export default function ProfileStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-background-secondary border border-tertiary/15 rounded-lg p-4 hover:border-tertiary/40 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={18} className={stat.color} />
              <p className="text-tertiary text-xs sm:text-sm font-medium">{stat.label}</p>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-secondary">
              {stat.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
