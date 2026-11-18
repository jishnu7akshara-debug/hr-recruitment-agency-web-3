import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';

export async function GET() {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const candidates = DataStore.getCandidates();
  return NextResponse.json({ candidates });
}

export async function POST(req: NextRequest) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const candidate = DataStore.createCandidate(body);
    return NextResponse.json({ success: true, candidate });
  } catch (error) {
    console.error('Candidate create error:', error);
    return NextResponse.json({ error: 'Failed to create candidate' }, { status: 500 });
  }
}

