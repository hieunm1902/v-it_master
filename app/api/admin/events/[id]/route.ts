import { NextResponse } from 'next/server';
import { getEvents, saveEvents } from '@/lib/store';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const items = getEvents().map(e =>
    e.id === Number(id) ? { ...e, ...body, id: Number(id) } : e,
  );
  saveEvents(items);
  return NextResponse.json(items.find(e => e.id === Number(id)));
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  saveEvents(getEvents().filter(e => e.id !== Number(id)));
  return NextResponse.json({ ok: true });
}
