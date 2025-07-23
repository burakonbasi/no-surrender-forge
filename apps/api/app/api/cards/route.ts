import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import Card from '@/models/card';
import UserCard from '@/models/userCard';
import { authenticateRequest } from '@/middleware/auth';

export async function GET(req: NextRequest) {
  const authUser = await authenticateRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    
    const cards = await Card.find({});
    const userCards = await UserCard.find({ userId: authUser.userId });
    
    const userCardsMap = new Map(
      userCards.map(uc => [uc.cardId, { level: uc.level, progress: uc.progress }])
    );
    
    const cardsWithProgress = cards.map(card => ({
      ...card.toObject(),
      userLevel: userCardsMap.get(card.id)?.level || 1,
      userProgress: userCardsMap.get(card.id)?.progress || 0
    }));
    
    return NextResponse.json({ cards: cardsWithProgress });
    
  } catch (error) {
    console.error('Cards error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}