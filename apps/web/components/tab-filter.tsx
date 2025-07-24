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
    <div className="bg-[#18171F] rounded-2xl p-1.5 mb-4 border border-[#23222B] shadow">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id;
          const isFirst = tab.id === 'all';
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={clsx(
                'flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200',
                'relative overflow-hidden',
                isActive && isFirst && [
                  'bg-gradient-to-r from-[#FF1E67] via-[#FF6B35] to-[#FFB84D]',
                  'text-white shadow-lg',
                  'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-60'
                ],
                isActive && !isFirst && [
                  'bg-[#252430] border border-[#FFB84D]',
                  'text-white shadow'
                ],
                !isActive && 'bg-transparent text-[#5A596B] hover:bg-[#23222B] hover:text-white'
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