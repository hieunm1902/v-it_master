import { NextResponse } from 'next/server';
import { getEvents, saveEvents } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getEvents());
}

export async function POST(req: Request) {
  const body = await req.json();
  const items = getEvents();
  const newItem = { ...body, id: Date.now() };
  saveEvents([...items, newItem]);
  return NextResponse.json(newItem, { status: 201 });
}
