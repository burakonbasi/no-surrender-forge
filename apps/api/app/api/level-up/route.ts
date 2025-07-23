import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@lib/mongodb';
import UserCard from '@/models/userCard';
import Card from '@/models/card';
import { authenticateRequest } from '@/middleware/auth';
import { levelUpSchema, GAME_CONFIG } from '@no-surrender/common';

export async function POST(req: NextRequest) {
  const authUser = await authenticateRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = levelUpSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }
    
    const { cardId } = validation.data;
    
    await dbConnect();
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const userCard = await UserCard.findOne({ 
        userId: authUser.userId, 
        cardId 
      }).session(session);
      
      if (!userCard) {
        await session.abortTransaction();
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
      
      if (userCard.progress < 100) {
        await session.abortTransaction();
        return NextResponse.json({ error: 'Insufficient progress' }, { status: 400 });
      }
      
      const card = await Card.findOne({ id: cardId }).session(session);
      if (!card || userCard.level >= card.maxLevel) {
        await session.abortTransaction();
        return NextResponse.json({ error: 'Max level reached' }, { status: 400 });
      }
      
      userCard.level += 1;
      userCard.progress = 0;
      await userCard.save({ session });
      
      await session.commitTransaction();
      
      return NextResponse.json({
        cardId,
        level: userCard.level,
        progress: userCard.progress
      });
      
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
    
  } catch (error) {
    console.error('Level up error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}