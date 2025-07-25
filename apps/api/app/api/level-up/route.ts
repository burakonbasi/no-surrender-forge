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
    return withCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  }

  try {
    const body = await req.json();
    const validation = levelUpSchema.safeParse(body);
    
    if (!validation.success) {
      return withCORS(NextResponse.json({ error: validation.error.errors }, { status: 400 }));
    }
    
    const { cardId } = validation.data;
    
    await dbConnect();
    
    try {
      const userCard = await UserCard.findOne({ 
        userId: authUser.userId, 
        cardId 
      });
      
      if (!userCard) {
        return withCORS(NextResponse.json({ error: 'Card not found' }, { status: 404 }));
      }
      
      if (userCard.progress < 100) {
        return withCORS(NextResponse.json({ error: 'Insufficient progress' }, { status: 400 }));
      }
      
      const card = await Card.findOne({ id: cardId });
      if (!card || userCard.level >= card.maxLevel) {
        return withCORS(NextResponse.json({ error: 'Max level reached' }, { status: 400 }));
      }
      
      userCard.level += 1;
      userCard.progress = 0;
      await userCard.save();
      
      return withCORS(NextResponse.json({
        cardId,
        level: userCard.level,
        progress: userCard.progress
      }));
      
    } catch (error) {
      console.error('Level up error:', error);
      return withCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
    }
    
  } catch (error) {
    console.error('Level up error:', error);
    return withCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
  }
}

export async function OPTIONS(req: NextRequest) {
  return withCORS(new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  }));
}

// Her response'a CORS header ekle
function withCORS(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

