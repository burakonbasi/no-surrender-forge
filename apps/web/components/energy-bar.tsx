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
    <div className="w-full flex flex-col gap-1 mb-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Image src="/images/weapons/case-energy 1.png" alt="energy" width={28} height={28} className="inline-block -mt-1" />
          <span className="text-[#FFD6FB] text-[15px] font-bold">Enerji</span>
        </div>
        <span className="text-[#FFD6FB] text-xs font-bold">%1 Yenilenmesine Kalan: {formatTime(timeToNext)}</span>
      </div>
      <div className="relative h-7 bg-[#2A002E] rounded-full overflow-hidden border-2 border-[#FFD6FB] w-full">
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
  );
}