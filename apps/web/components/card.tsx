'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@store/game-store';
import { GAME_CONFIG } from '@no-surrender/common';
import clsx from 'clsx';

interface CardProps {
  card: any;
}

export function Card({ card }: CardProps) {
  const { energy, addClick, levelUpCard } = useGameStore();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentVariant = card.variants.find((v: any) => v.level === card.userLevel);
  const isMaxLevel = card.userLevel >= GAME_CONFIG.MAX_LEVEL;
  const canUpgrade = card.userProgress >= 100 && !isMaxLevel;
  const canClick = energy > 0 && !canUpgrade;

  const handleClick = async () => {
    if (canUpgrade) {
      setIsAnimating(true);
      await levelUpCard(card.id);
      setTimeout(() => setIsAnimating(false), 500);
    } else if (canClick) {
      addClick(card.id);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <div className={clsx(
        'bg-surface rounded-md p-4 cursor-pointer transition-all',
        'border-2 border-transparent hover:border-pink/30',
        !canClick && !canUpgrade && 'opacity-50 cursor-not-allowed'
      )}>
        {/* Card Image */}
        <div className="relative aspect-square mb-3 bg-gradient-to-br from-surface to-bg-dark-start rounded">
          <Image
            src={currentVariant.image}
            alt={currentVariant.name}
            fill
            className="object-contain p-4"
          />
          
          {/* Level Badge */}
          <div className="absolute top-2 right-2 bg-pink/20 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-xs font-bold text-pink">
              Seviye {card.userLevel}
            </span>
          </div>
        </div>

        {/* Card Info */}
        <h3 className="text-white font-bold mb-1 truncate">
          {currentVariant.name}
        </h3>
        <p className="text-white/60 text-xs mb-3 line-clamp-2">
          {currentVariant.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/60">İlerleme</span>
            <span className="text-pink font-medium">%{card.userProgress}</span>
          </div>
          <div className="h-2 bg-surface/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink to-peach"
              animate={{ width: `${card.userProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          disabled={!canClick && !canUpgrade}
          className={clsx(
            'w-full py-2 rounded font-medium transition-all',
            canUpgrade && 'bg-gradient-to-r from-glow-green to-peach text-black hover:shadow-lg hover:shadow-glow-green/30',
            canClick && 'bg-gradient-to-r from-pink to-peach text-white hover:shadow-lg hover:shadow-pink/30',
            !canClick && !canUpgrade && 'bg-surface/50 text-white/30 cursor-not-allowed'
          )}
        >
          {canUpgrade ? 'Yükselt' : 'Geliştir'}
        </button>
      </div>

      {/* Level Up Animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-6xl font-bold text-glow-green animate-pulse">
              ⚡
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}