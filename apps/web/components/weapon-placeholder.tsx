'use client'

interface WeaponPlaceholderProps {
  type: 'sword' | 'axe' | 'staff' | 'shield' | 'hammer' | 'curved' | 'dagger' | 'book'
  level: number
}

export function WeaponPlaceholder({ type, level }: WeaponPlaceholderProps) {
  const getColor = () => {
    switch (level) {
      case 1: return 'from-gray-400 to-gray-500' // Silver
      case 2: return 'from-emerald-400 to-emerald-500' // Emerald
      case 3: return 'from-yellow-400 to-yellow-500' // Gold
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'sword': return '⚔️'
      case 'axe': return '🪓'
      case 'staff': return '🔱'
      case 'shield': return '🛡️'
      case 'hammer': return '🔨'
      case 'curved': return '🗡️'
      case 'dagger': return '🔪'
      case 'book': return '📖'
      default: return '⚔️'
    }
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${getColor()} rounded-lg flex items-center justify-center`}>
      <span className="text-4xl filter drop-shadow-lg">{getIcon()}</span>
    </div>
  )
}