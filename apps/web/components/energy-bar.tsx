'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@store/game-store';
import { GAME_CONFIG } from '@no-surrender/common';

export function EnergyBar() {
  const { energy, maxEnergy, fetchEnergy } = useGameStore();
  const [timeToNext, setTimeToNext] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEnergy();
    }, 10000); // Her 10 saniyede bir kontrol et

    return () => clearInterval(interval);
  }, [fetchEnergy]);

  useEffect(() => {
    if (energy < maxEnergy) {
      const timer = setInterval(() => {
        const energyNeeded = maxEnergy - energy;
        const minutesNeeded = energyNeeded * GAME_CONFIG.ENERGY_REGEN_MINUTES;
        const secondsLeft = minutesNeeded * 60;
        setTimeToNext(secondsLeft);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [energy, maxEnergy]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (energy / maxEnergy) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">Enerji</span>
        <span className="text-pink font-bold">
          {energy}/{maxEnergy}
        </span>
      </div>
      
      <div className="relative h-8 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink to-peach"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {energy < maxEnergy && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-white/70">
              Sonraki: {formatTime(timeToNext)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}