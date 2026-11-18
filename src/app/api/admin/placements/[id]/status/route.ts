import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';
import { InvoiceStatus } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { invoice_status } = await req.json();
    const updated = DataStore.updatePlacement(params.id, {
      invoice_status: invoice_status as InvoiceStatus,
      invoice_date: invoice_status === 'Paid' || invoice_status === 'Invoiced' ? new Date().toISOString().split('T')[0] : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Placement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, placement: updated });
  } catch (error) {
    console.error('Update placement status error:', error);
    return NextResponse.json({ error: 'Failed to update invoice status' }, { status: 500 });
  }
}

