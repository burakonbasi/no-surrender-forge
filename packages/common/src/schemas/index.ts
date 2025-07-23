import { z } from 'zod';

export const progressBatchSchema = z.object({
  cardId: z.string().min(1),
  increment: z.number().min(1).max(100)
});

export const levelUpSchema = z.object({
  cardId: z.string().min(1)
});

export const cardSchema = z.object({
  id: z.string(),
  maxLevel: z.number(),
  variants: z.array(z.object({
    level: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string()
  }))
});

export const userCardSchema = z.object({
  userId: z.string(),
  cardId: z.string(),
  level: z.number().min(1).max(3),
  progress: z.number().min(0).max(100)
});

export type ProgressBatchInput = z.infer<typeof progressBatchSchema>;
export type LevelUpInput = z.infer<typeof levelUpSchema>;
export type Card = z.infer<typeof cardSchema>;
export type UserCard = z.infer<typeof userCardSchema>;