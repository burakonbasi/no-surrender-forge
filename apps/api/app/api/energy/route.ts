import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import User from '@/models/user';
import { authenticateRequest } from '@/middleware/auth';
import { calculateEnergy } from '@/utils/energy';
import { GAME_CONFIG } from '@no-surrender/common';

export async function GET(req: NextRequest) {
  const authUser = await authenticateRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    
    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const currentEnergy = await calculateEnergy(authUser.userId, user.lastEnergyUpdate);
    
    // Enerji tam dolmuşsa lastEnergyUpdate'i güncelle
    if (currentEnergy >= GAME_CONFIG.MAX_ENERGY) {
      user.lastEnergyUpdate = new Date();
      await user.save();
    }
    
    return NextResponse.json({
      energy: currentEnergy,
      maxEnergy: GAME_CONFIG.MAX_ENERGY,
      regenMinutes: GAME_CONFIG.ENERGY_REGEN_MINUTES
    });
    
  } catch (error) {
    console.error('Energy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}