'use client'

interface WeaponPlaceholderProps {
  type: 'sword' | 'axe' | 'staff' | 'shield' | 'hammer' | 'curved' | 'dagger' | 'book'
  level: number
}

export function WeaponPlaceholder({ type, level }: WeaponPlaceholderProps) {
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
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-5xl opacity-20">{getIcon()}</span>
    </div>
  )
}