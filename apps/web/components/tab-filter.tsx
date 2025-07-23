'use client';

import { useGameStore } from '@store/game-store';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'all', label: 'Tümü', icon: '⚔️' },
  { id: 'swords', label: 'Kılıçlar', icon: '🗡️' },
  { id: 'axes', label: 'Baltalar', icon: '🪓' },
  { id: 'magic', label: 'Büyü', icon: '✨' },
  { id: 'shields', label: 'Kalkanlar', icon: '🛡️' },
];

export function TabFilter() {
  const { selectedTab, setSelectedTab } = useGameStore();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedTab(tab.id)}
          className={clsx(
            'px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2',
            selectedTab === tab.id
              ? 'bg-gradient-to-r from-pink to-peach text-white shadow-lg shadow-pink/30'
              : 'bg-surface/50 text-white/70 hover:bg-surface hover:text-white'
          )}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
}