import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set('talenty_staff_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return NextResponse.json({ success: true });
}

