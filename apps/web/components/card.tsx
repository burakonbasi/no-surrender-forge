'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useGameStore } from '@store/game-store';
import { GAME_CONFIG } from '@no-surrender/common';
import clsx from 'clsx';
import { usePressAndHold } from '@lib/use-press-and-hold';
import { useToastStore } from '../store/toast-store';
import { PressAndHoldButton } from './press-and-hold-button';

interface CardProps {
  card: any;
}

export function Card({ card }: CardProps) {
  const { energy, addSingleClick, addBatchClick, levelUpCard } = useGameStore();
  const [imageError, setImageError] = useState(false);
  const currentVariant = card.variants.find((v: any) => v.level === card.userLevel);
  const isMaxLevel = card.userLevel >= GAME_CONFIG.MAX_LEVEL;
  const canUpgrade = card.userProgress >= 100 && !isMaxLevel;
  const canClick = energy > 0 && !canUpgrade;
  const toast = useToastStore();

  const handleClick = async () => {
    if (canUpgrade) {
      await levelUpCard(card.id);
    } else if (canClick) {
      addSingleClick(card.id);
    } else if (energy <= 0) {
      toast.setToast('Yeterli enerjin yok!');
    } else if (card.userProgress >= 100) {
      toast.setToast('Kart zaten geliştirmeye hazır!');
    }
  };

  const pressAndHoldProps = usePressAndHold({
    onClick: handleClick,
    onHold: () => { if (canClick) addSingleClick(card.id); },
    disabled: !canClick && !canUpgrade
  });

  // Seviye etiketi renkleri
  let badgeBg = 'bg-[#666]';
  let badgeText = 'text-black';
  if (card.userLevel === 2) badgeBg = 'bg-[#4ADE80]';
  if (card.userLevel >= 3) badgeBg = 'bg-[#FFD600]';

  return (
    <div className={clsx(
      'bg-gradient-to-b from-[#0A0A0F] to-[#1A1A2E] rounded-3xl flex flex-col justify-between relative aspect-[1/1.2] p-4 min-h-[200px]'
    )}>
      {/* Seviye Rozeti */}
      <div className="absolute top-4 right-4 z-10">
        <div className={clsx(badgeBg, 'rounded-lg px-3 py-1.5 min-w-[56px] flex items-center justify-center')}>
          <span className={clsx('text-xs font-bold', badgeText)}>Seviye {card.userLevel}</span>
        </div>
      </div>
      {/* Silah Görseli */}
      <div className="h-[45%] relative mb-3 flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#23222B] to-[#18162A]">
        {!imageError ? (
          <Image
            src={`/images/weapons/${card.id}_lvl${card.userLevel}.png`}
            alt={currentVariant.name}
            fill
            className="object-contain drop-shadow-xl"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-20">⚔️</span>
          </div>
        )}
      </div>
      {/* İçerik */}
      <div className="text-center">
        <h3 className="text-white font-bold text-sm mb-1">{currentVariant.name}</h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{currentVariant.description}</p>
        {/* Büyük Yüzde */}
        <div className="text-[#E0E0E0] text-3xl font-bold mb-3">%{card.userProgress}</div>
        {/* Buton */}
        <PressAndHoldButton
          onClick={() => {
            if (canUpgrade) levelUpCard(card.id);
            else if (canClick) addSingleClick(card.id);
            else if (energy <= 0) toast.setToast('Yeterli enerjin yok!');
            else if (card.userProgress >= 100) toast.setToast('Kart zaten geliştirmeye hazır!');
          }}
          onHold={() => {
            if (!canUpgrade && canClick) addBatchClick(card.id);
            else if (energy <= 0) toast.setToast('Yeterli enerjin yok!');
            else if (card.userProgress >= 100) toast.setToast('Kart zaten geliştirmeye hazır!');
          }}
          disabled={!canClick && !canUpgrade}
          className={clsx(
            'w-full py-4 rounded-full font-bold text-sm',
            canUpgrade && 'bg-gradient-to-r from-[#FF1E67] to-[#FF6B96] text-white',
            canClick && !canUpgrade && 'bg-gradient-to-r from-[#EE39A8] to-[#FF6B96] text-white',
            !canClick && !canUpgrade && 'bg-[#252430] text-[#5A596B] cursor-not-allowed'
          )}
        >
          {canUpgrade ? 'Yükselt' : 'Geliştir'}
        </PressAndHoldButton>
      </div>
    </div>
  );
}