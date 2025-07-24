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

  // Seviye border rengi
  const borderColor = card.userLevel === 2 ? 'border-4 border-[#4ADE80]' : card.userLevel >= 3 ? 'border-4 border-[#FFD600]' : 'border-2 border-[#23222B]';
  return (
    <div className={`bg-[#18162A]/90 rounded-[22px] overflow-hidden relative shadow-2xl transition-transform hover:scale-[1.04] ${borderColor} p-3`}> 
      {/* Level Badge - Sağ Üst */}
      <div className="absolute top-2 right-2 z-10">
        <div className="bg-gradient-to-r from-[#FFB84D] to-[#FF6B1A] rounded-lg px-2 py-1 border border-[#FFB84D] shadow-md min-w-[60px] flex items-center justify-center">
          <span className="text-[10px] font-extrabold text-[#23222B] drop-shadow">Seviye {card.userLevel}</span>
        </div>
      </div>
      {/* Card Image Container */}
      <div className="relative h-28 bg-gradient-to-b from-[#23222B] to-[#18162A] p-2 flex items-center justify-center rounded-xl">
        <div className="relative w-full h-full">
          {!imageError ? (
            <Image
              src={`/images/weapons/${card.id}_lvl${card.userLevel}.png`}
              alt={currentVariant.name}
              fill
              className="object-contain drop-shadow-lg"
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
      <div className="p-2 pt-2 space-y-1">
        {/* Title */}
        <h3 className="text-white text-base font-extrabold leading-tight mb-0 truncate">
          {currentVariant.name}
        </h3>
        {/* Description */}
        <p className="text-[#9B9AA2] text-xs leading-relaxed line-clamp-2 min-h-[32px] mb-1">
          {currentVariant.description}
        </p>
        {/* Progress & Button yan yana */}
        <div className="flex items-center gap-2 mt-2">
          {/* Progress Bar */}
          <div className="flex-1 flex flex-col items-start">
            <div className="w-full h-6 bg-[#23222B] rounded-full overflow-hidden flex items-center relative">
              <div
                className="h-full bg-[#FF6BCB] rounded-full"
                style={{ width: `${card.userProgress}%` }}
              />
              <span className="absolute left-3 text-xs font-bold text-white/90 z-10">
                %{card.userProgress}
              </span>
            </div>
          </div>
          {/* Action Button */}
          <button
            onClick={handleClick}
            disabled={!canClick && !canUpgrade}
            className={clsx(
              'flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-extrabold transition-all transform active:scale-[0.98]',
              'relative overflow-hidden shadow-md',
              canUpgrade && [
                'bg-gradient-to-r from-[#FFB84D] to-[#FF6B1A]',
                'text-[#23222B]',
                'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-60'
              ],
              canClick && !canUpgrade && [
                'bg-gradient-to-r from-[#FF6BCB] to-[#FF6B1A]',
                'text-white',
                'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-60'
              ],
              !canClick && !canUpgrade && [
                'bg-[#252430]',
                'text-[#5A596B] cursor-not-allowed'
              ],
              'hover:scale-105 hover:shadow-lg'
            )}
          >
            {/* Enerji ikonu ve -1 */}
            <span className="relative z-10 flex items-center gap-1">
              <Image src="/images/weapons/case-energy 1.png" alt="energy" width={18} height={18} className="inline-block" />
              -1
              <span>{canUpgrade ? ' Yükselt' : ' Geliştir'}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}