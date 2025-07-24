'use client';

import { useGameStore } from '@store/game-store';
import { Card } from './card';
import { motion, AnimatePresence } from 'framer-motion';

export function CardGrid() {
  const { cards, selectedTab } = useGameStore();

  const filteredCards = cards.filter(card => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'swords') {
      return card.userLevel === 1;
    }
    if (selectedTab === 'axes') {
      return card.userLevel === 2;
    }
    if (selectedTab === 'magic') {
      return card.userLevel >= 3;
    }
    return true;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTab}
        className="grid grid-cols-2 gap-x-6 gap-y-7 pb-8 px-2 bg-[#18162A] rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.2
            }}
            className="drop-shadow-2xl"
          >
            <Card card={card} />
          </motion.div>
        ))}
        {filteredCards.length === 0 && (
          <motion.div
            className="col-span-2 text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4 opacity-10">🔍</div>
            <p className="text-white/60 text-sm font-medium">Bu seviyede kart bulunamadı</p>
            <p className="text-[#5A596B] text-xs mt-2">Farklı bir seviye seçin</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}