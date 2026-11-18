import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const entityType = searchParams.get('entity_type');
  const entityId = searchParams.get('entity_id');

  if (!entityType || !entityId) {
    return NextResponse.json({ error: 'Missing entity_type or entity_id' }, { status: 400 });
  }

  const notes = DataStore.getNotes(entityType, entityId);
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { entity_type, entity_id, text } = await req.json();
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Note text cannot be empty' }, { status: 400 });
    }

    const note = DataStore.addNote(entity_type, entity_id, staff.name, text.trim());
    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error('Note add error:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

