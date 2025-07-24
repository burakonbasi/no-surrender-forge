'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@store/game-store';
import { GAME_CONFIG } from '@no-surrender/common';
import Image from 'next/image';

export function EnergyBar() {
  const { energy, maxEnergy, fetchEnergy } = useGameStore();
  const [timeToNext, setTimeToNext] = useState<number>(119); // 1:59 başlangıç

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEnergy();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchEnergy]);

  useEffect(() => {
    if (energy < maxEnergy) {
      const timer = setInterval(() => {
        setTimeToNext(prev => {
          if (prev <= 0) {
            fetchEnergy();
            return GAME_CONFIG.ENERGY_REGEN_MINUTES * 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [energy, maxEnergy, fetchEnergy]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (energy / maxEnergy) * 100;

  return (
    <div className="bg-transparent rounded-2xl p-0 mb-4">
      <div className="flex items-center gap-2">
        {/* Energy Icon */}
        <div className="relative w-12 h-12 flex-shrink-0 -mt-2">
          <div className="w-full h-full rounded-xl bg-transparent flex items-center justify-center">
            <Image
              src="/images/weapons/case-energy 1.png"
              alt="Energy"
              width={48}
              height={48}
              className="w-full h-full object-contain drop-shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<span class="flex items-center justify-center w-full h-full text-white text-2xl">⚡</span>';
              }}
            />
          </div>
        </div>
        {/* Progress Bar Container */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#FFD6FB] text-base font-bold tracking-wide">Enerji</span>
            <span className="text-[#FFD6FB] text-xs font-bold">%1 Yenilenmesine Kalan: {formatTime(timeToNext)}</span>
          </div>
          <div className="relative h-8 bg-[#2A002E] rounded-full overflow-hidden border-2 border-[#FFD6FB]">
            <motion.div
              className="absolute inset-y-0 left-0"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="h-full bg-[#FF6BCB] relative" />
            </motion.div>
            {/* Percentage Text */}
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-base font-extrabold text-[#FFD6FB] drop-shadow-md">
                %{Math.round(percentage)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}