import { NextRequest, NextResponse } from 'next/server';

export function corsMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }
  
  return res;
}