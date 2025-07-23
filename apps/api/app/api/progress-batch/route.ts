import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@lib/mongodb';
import UserCard from '@/models/userCard';
import User from '@/models/user';
import { authenticateRequest } from '@/middleware/auth';
import { progressBatchSchema, GAME_CONFIG } from '@no-surrender/common';
import { consumeEnergy } from '@/utils/energy';
import { checkRateLimit } from '@/utils/rate-limit';

export async function POST(req: NextRequest) {
  const authUser = await authenticateRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = progressBatchSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }
    
    const { cardId, increment } = validation.data;
    
    // Rate limiting
    const rateLimitOk = await checkRateLimit(authUser.userId, 1000, 3600);
    if (!rateLimitOk) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    
    await dbConnect();
    
    // Transaction ile güncelleme
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Enerji kontrolü
      const hasEnergy = await consumeEnergy(authUser.userId, 1);
      if (!hasEnergy) {
        await session.abortTransaction();
        return NextResponse.json({ error: 'Insufficient energy' }, { status: 400 });
      }
      
      // UserCard güncelleme veya oluşturma
      let userCard = await UserCard.findOne({ 
        userId: authUser.userId, 
        cardId 
      }).session(session);
      
      if (!userCard) {
        [userCard] = await UserCard.create([
          {
            userId: authUser.userId,
            cardId,
            level: 1,
            progress: 0
          }
        ], { session });
      }
      
      // Progress güncelleme
      const newProgress = Math.min(
        userCard.progress + increment,
        GAME_CONFIG.PROGRESS_STOP_AT
      );
      
      userCard.progress = newProgress;
      await userCard.save({ session });
      
      await session.commitTransaction();
      
      return NextResponse.json({
        cardId,
        progress: newProgress,
        level: userCard.level
      });
      
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    
  } catch (error) {
    console.error('Progress batch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}