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
    return withCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  }

  try {
    const body = await req.json();
    const validation = progressBatchSchema.safeParse(body);
    
    if (!validation.success) {
      return withCORS(NextResponse.json({ error: validation.error.errors }, { status: 400 }));
    }
    
    const { cardId, increment } = validation.data;
    
    // Rate limiting
    const rateLimitOk = await checkRateLimit(authUser.userId, 1000, 3600);
    if (!rateLimitOk) {
      return withCORS(NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 }));
    }
    
    await dbConnect();
    // Transaction kodlarını kaldır
    try {
      // Kullanıcının mevcut enerjisini bul
      const user = await User.findById(authUser.userId);
      if (!user) {
        return withCORS(NextResponse.json({ error: 'User not found' }, { status: 404 }));
      }
      // Enerji hesapla (ör: regen ile güncel enerji)
      const now = new Date();
      const minutesPassed = Math.floor((now.getTime() - user.lastEnergyUpdate.getTime()) / (1000 * 60));
      const energyGained = Math.floor(minutesPassed / GAME_CONFIG.ENERGY_REGEN_MINUTES);
      let currentEnergy = Math.min(user.energy + energyGained, GAME_CONFIG.MAX_ENERGY);
      // Harcanacak enerji miktarı
      const energyToUse = Math.min(currentEnergy, increment);
      if (energyToUse <= 0) {
        return withCORS(NextResponse.json({ error: 'Insufficient energy' }, { status: 400 }));
      }
      // Enerji güncelle
      currentEnergy -= energyToUse;
      user.energy = currentEnergy;
      user.lastEnergyUpdate = now;
      await user.save();
      // UserCard güncelleme veya oluşturma
      let userCard = await UserCard.findOne({ 
        userId: authUser.userId, 
        cardId 
      });
      if (!userCard) {
        userCard = await UserCard.create({
          userId: authUser.userId,
          cardId,
          level: 1,
          progress: 0
        });
      }
      // Progress güncelleme
      const progressToAdd = energyToUse * GAME_CONFIG.PROGRESS_STEP;
      const newProgress = Math.min(
        userCard.progress + progressToAdd,
        GAME_CONFIG.PROGRESS_STOP_AT
      );
      userCard.progress = newProgress;
      await userCard.save();
      return withCORS(NextResponse.json({
        cardId,
        progress: newProgress,
        level: userCard.level,
        usedEnergy: energyToUse,
        requestedIncrement: increment,
        actualIncrement: progressToAdd
      }));
    } catch (error) {
      console.error('Progress batch error:', error);
      return withCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
    }
    
  } catch (error) {
    console.error('Progress batch error:', error);
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

// Tüm NextResponse.json(...) dönüşlerini withCORS ile wrap et
// Örnek: return withCORS(NextResponse.json(...));
// Tüm response'ları güncelle:
// return NextResponse.json(...) -> return withCORS(NextResponse.json(...))