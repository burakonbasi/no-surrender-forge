'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@store/game-store';
import { GAME_CONFIG } from '@no-surrender/common';
import Image from 'next/image';

export function EnergyBar() {
  const { energy, maxEnergy, fetchEnergy } = useGameStore();
  const [timeToNext, setTimeToNext] = useState<number>(119);

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
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-1.5">
          <Image src="/images/weapons/case-energy 1.png" alt="energy" width={20} height={20} />
          <span className="text-white text-sm font-bold">Enerji</span>
        </div>
        <span className="text-white/60 text-xs">Yenilenme: {formatTime(timeToNext)}</span>
      </div>
      <div className="relative h-6 bg-[#1A1A2E] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B1A] to-[#FF9A4D]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-3">
          <span className="text-white text-sm font-bold">%{Math.round(percentage)}</span>
        </div>
      </div>
    </div>
  );
}