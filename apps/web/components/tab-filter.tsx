'use client';

import { useGameStore } from '@store/game-store';
import clsx from 'clsx';

const tabs = [
  { id: 'all', label: 'Tüm Seviyeler' },
  { id: 'swords', label: 'Sv1' },
  { id: 'axes', label: 'Sv2' },
  { id: 'magic', label: 'Max Sv' },
];

export function TabFilter() {
  const { selectedTab, setSelectedTab } = useGameStore();

  return (
    <div className="bg-[#0A0A0F] rounded-2xl p-1.5 mb-3 flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setSelectedTab(tab.id)}
          className={clsx(
            'flex-1 py-2 rounded-xl text-xs font-bold transition-all',
            selectedTab === tab.id 
              ? 'bg-gradient-to-r from-[#FF6B1A] to-[#FF9A4D] text-white' 
              : 'text-gray-400 hover:text-white'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}