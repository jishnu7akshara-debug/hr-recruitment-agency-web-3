import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';
import { placementSchema } from '@/lib/validations';

export async function GET() {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const placements = DataStore.getPlacements();
  return NextResponse.json({ placements });
}

export async function POST(req: NextRequest) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = placementSchema.parse(body);

    const commission_amount = (validated.annual_ctc * validated.commission_percentage) / 100;

    const created = DataStore.createPlacement({
      client_name: validated.client_name,
      candidate_name: validated.candidate_name,
      role_title: validated.role_title,
      annual_ctc: validated.annual_ctc,
      commission_percentage: validated.commission_percentage,
      commission_amount,
      invoice_status: validated.invoice_status,
      joining_date: validated.joining_date,
      replacement_guarantee_end_date: validated.replacement_guarantee_end_date,
      notes: validated.notes,
    });

    return NextResponse.json({ success: true, placement: created });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Placement create error:', error);
    return NextResponse.json({ error: 'Failed to record placement' }, { status: 500 });
  }
}

