import mongoose, { Schema, model, models } from 'mongoose';
import type { UserCard } from '@no-surrender/common';

const UserCardSchema = new Schema<UserCard>({
  userId: { type: String, required: true },
  cardId: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  progress: { type: Number, required: true, default: 0 }
}, { timestamps: true });

UserCardSchema.index({ userId: 1, cardId: 1 }, { unique: true });

export default models.UserCard || model<UserCard>('UserCard', UserCardSchema);