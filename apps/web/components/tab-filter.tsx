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
    <div className="bg-[#1A1922] rounded-2xl p-1.5 mb-4">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id;
          const isFirst = tab.id === 'all';
          
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={clsx(
                'flex-1 py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-200',
                'relative overflow-hidden',
                isActive && isFirst && [
                  'bg-gradient-to-r from-[#FF6B1A] to-[#FFB84D]',
                  'text-white',
                  'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-60'
                ],
                isActive && !isFirst && [
                  'bg-[#252430]',
                  'text-white'
                ],
                !isActive && 'bg-transparent text-[#5A596B]'
              )}
            >
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}