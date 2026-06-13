import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  try {
    const tags = body.tags !== undefined
      ? (Array.isArray(body.tags) ? body.tags : String(body.tags).split(',').map((t: string) => t.trim()).filter(Boolean))
      : undefined;

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.date !== undefined && { date: body.date }),
        ...(body.endDate !== undefined && { endDate: body.endDate || null }),
        ...(body.time !== undefined && { time: body.time }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.venue !== undefined && { venue: body.venue || null }),
        ...(body.isOnline !== undefined && { isOnline: Boolean(body.isOnline) }),
        ...(body.speakers !== undefined && { speakers: body.speakers }),
        ...(body.capacity !== undefined && { capacity: Number(body.capacity) }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.priceAmount !== undefined && { priceAmount: body.priceAmount ? Number(body.priceAmount) : null }),
        ...(tags !== undefined && { tags }),
        ...(body.coverColor !== undefined && { coverColor: body.coverColor }),
        ...(body.organizer !== undefined && { organizer: body.organizer }),
      },
    });
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await prisma.event.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
