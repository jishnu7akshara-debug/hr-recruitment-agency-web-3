import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';
import { ApplicationStatus } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized staff session' }, { status: 401 });
  }

  try {
    const { status } = await req.json();
    const updated = DataStore.updateApplicationStatus(
      params.id,
      status as ApplicationStatus,
      staff.name
    );

    if (!updated) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error('Update application status error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

