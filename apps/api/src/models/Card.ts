import mongoose, { Schema, model, models } from 'mongoose';
import type { Card } from '@no-surrender/common';

const CardSchema = new Schema<Card>({
  id: { type: String, required: true, unique: true },
  maxLevel: { type: Number, required: true },
  variants: [{
    level: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
  }]
}, { timestamps: true });

export default models.Card || model<Card>('Card', CardSchema);