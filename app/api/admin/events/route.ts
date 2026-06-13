import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getEvents } from '@/lib/store';

export async function GET() {
  return NextResponse.json(await getEvents());
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const tags = Array.isArray(body.tags)
      ? body.tags
      : String(body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const event = await prisma.event.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: body.title,
        description: body.description || '',
        type: body.type || 'meetup',
        date: body.date || new Date().toISOString().slice(0, 10),
        endDate: body.endDate || null,
        time: body.time || '09:00',
        location: body.location || '',
        venue: body.venue || null,
        isOnline: Boolean(body.isOnline),
        speakers: body.speakers || [],
        registeredCount: 0,
        capacity: Number(body.capacity) || 100,
        price: body.price || 'free',
        priceAmount: body.priceAmount ? Number(body.priceAmount) : null,
        tags,
        coverColor: body.coverColor || 'from-indigo-600 to-purple-700',
        organizer: body.organizer || 'Vietnam IT Community',
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
