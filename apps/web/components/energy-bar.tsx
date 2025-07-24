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
    <div className="bg-[#1A1922] rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-4">
        {/* Energy Icon */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#FF1E67] to-[#E91E63] p-3 shadow-lg">
            <Image
              src="/images/weapons/case-energy 1.png"
              alt="Energy"
              width={32}
              height={32}
              className="w-full h-full object-contain"
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
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-semibold">Enerji</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#9B9AA2]">Yenilenmesine Kalan:</span>
              <span className="text-white font-semibold">{formatTime(timeToNext)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-8 bg-[#252430] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="h-full bg-gradient-to-r from-[#FF1E67] to-[#FF6B35] relative">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              </div>
            </motion.div>
            
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white drop-shadow-md">
                %{Math.round(percentage)}
              </span>
            </div>
          </div>
          
          {/* Bottom Text */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-[#9B9AA2]">
              %{Math.round(100 - percentage)}
            </span>
            <span className="text-[10px] text-[#9B9AA2]">
              %{Math.round(percentage)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}