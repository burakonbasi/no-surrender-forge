import mongoose, { Schema, model, models } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  energy: number;
  lastEnergyUpdate: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  energy: { type: Number, default: 100 },
  lastEnergyUpdate: { type: Date, default: Date.now }
}, { timestamps: true });

export default models.User || model<IUser>('User', UserSchema);