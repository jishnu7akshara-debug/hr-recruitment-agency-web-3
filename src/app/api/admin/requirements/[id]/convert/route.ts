import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const job = DataStore.convertRequirementToJob(params.id);
    if (!job) {
      return NextResponse.json({ error: 'Requirement not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      job,
      message: `Converted requirement to public job ${job.code}`,
    });
  } catch (error) {
    console.error('Convert requirement error:', error);
    return NextResponse.json({ error: 'Failed to convert requirement to job' }, { status: 500 });
  }
}

