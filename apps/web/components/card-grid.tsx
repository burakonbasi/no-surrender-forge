'use client';

import { useGameStore } from '@store/game-store';
import { Card } from './card';
import { motion } from 'framer-motion';

export function CardGrid() {
  const { cards, selectedTab } = useGameStore();

  const filteredCards = cards.filter(card => {
    if (selectedTab === 'all') return true;
    
    // Tab isimlerine göre filtreleme (weapon türlerine göre)
    if (selectedTab === 'swords') {
      return ['longsword', 'scimitar', 'dagger'].includes(card.id);
    }
    if (selectedTab === 'axes') {
      return ['battleaxe', 'warhammer'].includes(card.id);
    }
    if (selectedTab === 'magic') {
      return ['staff', 'spellbook'].includes(card.id);
    }
    if (selectedTab === 'shields') {
      return ['shield'].includes(card.id);
    }
    
    return true;
  });

  return (
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {filteredCards.map((card, index) => (
        <motion.div
          key={card.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card card={card} />
        </motion.div>
      ))}
    </motion.div>
  );
}