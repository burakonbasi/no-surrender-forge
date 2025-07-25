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
        className="grid grid-cols-2 gap-4 px-2 pb-10"
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
          // Buton rengi: Geliştir ise #F4BC79, Yükselt ise #EE39A8
          const buttonBg = canUpgrade ? 'bg-[#EE39A8]' : 'bg-[#F4BC79]';
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="relative"
            >
              <div className="rounded-[6px] aspect-[166/139] min-h-[139px] shadow-[0_0_4px_#fff] overflow-hidden flex flex-col justify-between relative bg-black">
                {/* Weapon image as full card background */}
                <Image
                  src={`/images/weapons/${card.id}_lvl${card.userLevel}.png`}
                  alt={currentVariant.name}
                  fill
                  className="object-cover w-full h-full absolute inset-0 z-0"
                  style={{ opacity: 1 }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
                {/* Seviye Rozeti */}
                <div className="absolute top-2 right-2 z-20">
                  <div className="rounded-[6px] px-2 py-0.5 min-w-[37px] flex items-center justify-center">
                    <span className="text-[#23222B] text-[9px] font-semibold leading-[11px] text-right text-white">Seviye {card.userLevel}</span>
                  </div>
                </div>
                {/* Alt içerik */}
                <div className="flex-1 flex flex-col justify-end relative z-20">
                  <div className="px-3 pb-2 pt-1 flex flex-col items-start w-full">
                    <h3 className="text-white font-semibold text-[9px] leading-[11px] mb-0.5 font-galano">{currentVariant.name}</h3>
                    <p className="text-white text-[8px] font-galano mb-1 leading-[10px]">{currentVariant.description}</p>
                    <div className="flex items-center w-full">
                      {/* Progress Bar */}
                      <div className="relative flex items-center h-[16px] w-[72px] bg-[#23222F] rounded-[8px] shadow-[0_0_4px_#F8B0DC] mr-1">
                        <div
                          className="absolute left-0 top-[2px] h-[12px] rounded-[8px] bg-[#EE39A8] shadow-[0_0_2px_#EE39A8]"
                          style={{ width: `${Math.min(card.userProgress, 100)}%`, boxShadow: 'inset 0 0 3px #fff' }}
                        />
                        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-semibold text-white w-[22px] text-center">%{card.userProgress}</span>
                      </div>
                      {/* Buton */}
                      <button
                        onClick={() => {
                          if (canUpgrade) levelUpCard(card.id);
                          else if (canClick) addClick(card.id);
                        }}
                        disabled={!canClick && !canUpgrade}
                        className={
                          buttonBg +
                          ' h-[16px] w-[74px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center ml-2 font-semibold text-[9px] text-white transition-all whitespace-nowrap' +
                          (!canClick && !canUpgrade ? ' opacity-60 cursor-not-allowed' : '')
                        }
                        style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25), inset -1px -1px 2px #5D536B, inset 1px 2px 3px #F8F8F8', textShadow: '0px 0px 3px #000' }}
                      >
                        {canUpgrade ? (
                          <span className="text-[#23222B] text-[9px] font-semibold leading-[11px] text-right text-white">Yükselt</span>
                        ) : (
                          <>
                            <Image src="/images/weapons/case-energy 1.png" alt="energy" width={10} height={10} />
                            <span className="text-[#23222B] text-[9px] font-semibold leading-[11px] text-right text-white">-1 Geliştir</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}