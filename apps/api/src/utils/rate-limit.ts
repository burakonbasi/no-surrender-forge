import redis from '../lib/redis';

export async function checkRateLimit(identifier: string, limit: number = 100, window: number = 3600): Promise<boolean> {
  const key = `rate_limit:${identifier}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  return current <= limit;
}