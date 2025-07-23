import { GAME_CONFIG } from '@no-surrender/common';
import redis from '../lib/redis';

export async function calculateEnergy(userId: string, lastUpdate: Date): Promise<number> {
  const cacheKey = `energy:${userId}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return parseInt(cached);
  }

  const now = new Date();
  const minutesPassed = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));
  const energyGained = Math.floor(minutesPassed / GAME_CONFIG.ENERGY_REGEN_MINUTES);
  const currentEnergy = Math.min(GAME_CONFIG.MAX_ENERGY, energyGained);

  await redis.set(cacheKey, currentEnergy, 'EX', 60); // Cache for 1 minute
  
  return currentEnergy;
}

export async function consumeEnergy(userId: string, amount: number): Promise<boolean> {
  const cacheKey = `energy:${userId}`;
  const currentEnergy = await redis.get(cacheKey);
  
  if (!currentEnergy || parseInt(currentEnergy) < amount) {
    return false;
  }

  const newEnergy = parseInt(currentEnergy) - amount;
  await redis.set(cacheKey, newEnergy, 'EX', 60);
  
  return true;
}