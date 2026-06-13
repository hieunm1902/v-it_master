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

    const course = await prisma.course.update({
      where: { id: Number(id) },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.instructorId !== undefined && { instructorId: Number(body.instructorId) }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.level !== undefined && { level: body.level }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.lessons !== undefined && { lessons: Number(body.lessons) }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.priceAmount !== undefined && { priceAmount: body.priceAmount ? Number(body.priceAmount) : null }),
        ...(tags !== undefined && { tags }),
        ...(body.coverColor !== undefined && { coverColor: body.coverColor }),
        updatedAt: new Date().toISOString().slice(0, 10),
      },
      include: { instructor: true },
    });
    return NextResponse.json(course);
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
    await prisma.course.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
