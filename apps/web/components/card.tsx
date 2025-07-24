'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useGameStore } from '@store/game-store';
import { GAME_CONFIG } from '@no-surrender/common';
import clsx from 'clsx';

interface CardProps {
  card: any;
}

export function Card({ card }: CardProps) {
  const { energy, addClick, levelUpCard } = useGameStore();
  const [imageError, setImageError] = useState(false);
  
  const currentVariant = card.variants.find((v: any) => v.level === card.userLevel);
  const isMaxLevel = card.userLevel >= GAME_CONFIG.MAX_LEVEL;
  const canUpgrade = card.userProgress >= 100 && !isMaxLevel;
  const canClick = energy > 0 && !canUpgrade;

  const handleClick = async () => {
    if (canUpgrade) {
      await levelUpCard(card.id);
    } else if (canClick) {
      addClick(card.id);
    }
  };

  return (
    <div className="bg-[#1A1922] rounded-2xl overflow-hidden relative">
      {/* Level Badge - Sağ Üst */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-[#252430] rounded-lg px-3 py-1.5 border border-[#2A2938]">
          <span className="text-[11px] font-semibold text-white/90">
            Seviye {card.userLevel}
          </span>
        </div>
      </div>

      {/* Card Image Container */}
      <div className="relative h-40 bg-gradient-to-b from-[#2A2938] to-[#1A1922] p-4">
        <div className="relative w-full h-full">
          {!imageError ? (
            <Image
              src={`/images/weapons/${card.id}_lvl${card.userLevel}.png`}
              alt={currentVariant.name}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl opacity-20">⚔️</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-white text-sm font-bold leading-tight">
          {currentVariant.name}
        </h3>
        
        {/* Description */}
        <p className="text-[#9B9AA2] text-xs leading-relaxed line-clamp-2 min-h-[32px]">
          {currentVariant.description}
        </p>

        {/* Progress Section - Sadece geliştirilebilir ve max level değilse göster */}
        {!canUpgrade && !isMaxLevel && (
          <div className="text-xs text-[#9B9AA2]">
            <span>İlerleme: </span>
            <span className="text-white font-semibold">%{card.userProgress}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleClick}
          disabled={!canClick && !canUpgrade}
          className={clsx(
            'w-full py-3.5 rounded-xl text-[13px] font-bold transition-all transform active:scale-[0.98]',
            'relative overflow-hidden',
            canUpgrade && [
              'bg-gradient-to-r from-[#FF6B1A] to-[#FFB84D]',
              'text-white shadow-lg',
              'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-60'
            ],
            canClick && !canUpgrade && [
              'bg-gradient-to-r from-[#FF1E67] to-[#FF5E3A]',
              'text-white shadow-lg',
              'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-60'
            ],
            !canClick && !canUpgrade && [
              'bg-[#252430]',
              'text-[#5A596B] cursor-not-allowed'
            ]
          )}
        >
          <span className="relative z-10">
            {canUpgrade ? 'Geliştir' : canClick ? 'Geliştir' : 'Geliştir'}
          </span>
        </button>
      </div>
    </div>
  );
}