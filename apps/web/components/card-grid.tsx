'use client';

import { useGameStore } from '@store/game-store';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function CardGrid() {
  const { cards, selectedTab, addClick, levelUpCard, energy } = useGameStore();

  const filteredCards = cards.filter(card => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'swords') return card.userLevel === 1;
    if (selectedTab === 'axes') return card.userLevel === 2;
    if (selectedTab === 'magic') return card.userLevel >= 3;
    return true;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTab}
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {filteredCards.map((card, index) => {
          const currentVariant = card.variants.find((v: any) => v.level === card.userLevel);
          const isMaxLevel = card.userLevel >= 3;
          const canUpgrade = card.userProgress >= 100 && !isMaxLevel;
          const canClick = energy > 0 && !canUpgrade;
          let badgeBg = 'bg-[#666]';
          let badgeText = 'text-black';
          if (card.userLevel === 2) badgeBg = 'bg-[#4ADE80]';
          if (card.userLevel >= 3) badgeBg = 'bg-[#FFD600]';
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-b from-[#0A0A0F] to-[#1A1A2E] rounded-3xl flex flex-col justify-between aspect-[1/1.2] p-4 min-h-[200px]">
                {/* Seviye Rozeti */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={badgeBg + ' rounded-lg px-3 py-1.5 min-w-[56px] flex items-center justify-center'}>
                    <span className={badgeText + ' text-xs font-bold'}>Seviye {card.userLevel}</span>
                  </div>
                </div>
                {/* Silah Görseli */}
                <div className="h-[45%] relative mb-3 flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#23222B] to-[#18162A]">
                  <Image
                    src={`/images/weapons/${card.id}_lvl${card.userLevel}.png`}
                    alt={currentVariant.name}
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </div>
                {/* İçerik */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-sm mb-1">{currentVariant.name}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{currentVariant.description}</p>
                  {/* Büyük Yüzde */}
                  <div className="text-[#E0E0E0] text-3xl font-bold mb-3">%{card.userProgress}</div>
                  {/* Buton */}
                  <button
                    onClick={() => {
                      if (canUpgrade) levelUpCard(card.id);
                      else if (canClick) addClick(card.id);
                    }}
                    disabled={!canClick && !canUpgrade}
                    className={
                      (canUpgrade
                        ? 'bg-gradient-to-r from-[#FF1E67] to-[#FF6B96]'
                        : 'bg-gradient-to-r from-[#FF6B1A] to-[#FF9A4D]') +
                      ' w-full py-4 rounded-full font-bold text-sm text-white ' +
                      (!canClick && !canUpgrade ? 'opacity-60 cursor-not-allowed' : '')
                    }
                  >
                    {canUpgrade ? 'Yükselt' : 'Geliştir'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}