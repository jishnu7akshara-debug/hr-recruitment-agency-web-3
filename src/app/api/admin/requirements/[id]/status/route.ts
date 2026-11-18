import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';
import { RequirementStatus } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await req.json();
    const updated = DataStore.updateRequirementStatus(params.id, status as RequirementStatus);
    if (!updated) {
      return NextResponse.json({ error: 'Requirement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, requirement: updated });
  } catch (error) {
    console.error('Update requirement status error:', error);
    return NextResponse.json({ error: 'Failed to update requirement status' }, { status: 500 });
  }
}

