'use client'

import { useRouter } from 'next/navigation'

const weaponCategories = [
  {
    name: 'Uzun Kılıç',
    description: 'Sade, keskin bir savaş kılıcı.',
    items: [
      { level: 1, image: '/images/weapons/longsword_lvl1.png', name: 'Gümüş Diş' },
      { level: 2, image: '/images/weapons/longsword_lvl2.png', name: 'Zümrüt Yürek' },
      { level: 3, image: '/images/weapons/longsword_lvl3.png', name: 'Altın Pençe' }
    ]
  },
  {
    name: 'Savaş Baltası',
    description: 'Hafif ve ölümcül bir balta.',
    items: [
      { level: 1, image: '/images/weapons/battleaxe_lvl1.png', name: 'Ay Parçası' },
      { level: 2, image: '/images/weapons/battleaxe_lvl2.png', name: 'Zümrüt Kesik' },
      { level: 3, image: '/images/weapons/battleaxe_lvl3.png', name: 'Altın Baltası' }
    ]
  },
  {
    name: 'Büyü Asası',
    description: 'Temel büyü asası.',
    items: [
      { level: 1, image: '/images/weapons/staff_lvl1.png', name: 'Gölge Dalı' },
      { level: 2, image: '/images/weapons/staff_lvl2.png', name: 'Zümrüt Kök' },
      { level: 3, image: '/images/weapons/staff_lvl3.png', name: 'Altın Kök' }
    ]
  },
  {
    name: 'Kalkan',
    description: 'Basit bir koruma aracı.',
    items: [
      { level: 1, image: '/images/weapons/shield_lvl1.png', name: 'Gümüş Siperi' },
      { level: 2, image: '/images/weapons/shield_lvl2.png', name: 'Zümrüt Zırh' },
      { level: 3, image: '/images/weapons/shield_lvl3.png', name: 'Altın Duvar' }
    ]
  },
  {
    name: 'Savaş Çekici',
    description: 'Ağır ve yıkıcı.',
    items: [
      { level: 1, image: '/images/weapons/warhammer_lvl1.png', name: 'Taş Parçalayıcı' },
      { level: 2, image: '/images/weapons/warhammer_lvl2.png', name: 'Zümrüt Ezici' },
      { level: 3, image: '/images/weapons/warhammer_lvl3.png', name: 'Altın Hüküm' }
    ]
  },
  {
    name: 'Eğri Kılıç',
    description: 'Hafif ve çevik bir bıçak.',
    items: [
      { level: 1, image: '/images/weapons/scimitar_lvl1.png', name: 'Gümüş Pençe' },
      { level: 2, image: '/images/weapons/scimitar_lvl2.png', name: 'Zümrüt Gengel' },
      { level: 3, image: '/images/weapons/scimitar_lvl3.png', name: 'Altın Yılan' }
    ]
  },
  {
    name: 'Kısa Kılıç',
    description: 'Hızlı saldırılar için ideal.',
    items: [
      { level: 1, image: '/images/weapons/dagger_lvl1.png', name: 'Gölge Kesik' },
      { level: 2, image: '/images/weapons/dagger_lvl2.png', name: 'Zümrüt Fısıltı' },
      { level: 3, image: '/images/weapons/dagger_lvl3.png', name: 'Altın Dilin' }
    ]
  },
  {
    name: 'Büyü Kitabı',
    description: 'Temel büyüleri içerir.',
    items: [
      { level: 1, image: '/images/weapons/spellbook_lvl1.png', name: 'Gümüş Sayfalar' },
      { level: 2, image: '/images/weapons/spellbook_lvl2.png', name: 'Zümrüt Kehanet' },
      { level: 3, image: '/images/weapons/spellbook_lvl3.png', name: 'Altın Kitabe' }
    ]
  }
]

export default function ItemsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#18171F] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span>Geri</span>
        </button>
        <h1 className="text-xl font-bold">Items</h1>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-8">
        {weaponCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            {/* Category Header */}
            <div>
              <h2 className="text-lg font-bold mb-1">{category.name}</h2>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>

            {/* Items Grid - Horizontal */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex-shrink-0 bg-[#1C1B23] rounded-2xl p-3 w-[120px]"
                >
                  {/* Level Badge */}
                  <div className="text-xs text-gray-400 mb-2 font-medium">
                    Seviye {item.level}
                  </div>

                  {/* Item Image - Basit img tag */}
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item Name */}
                  <div className="text-xs text-center text-gray-300 truncate font-medium">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}