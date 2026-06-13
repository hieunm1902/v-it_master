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

    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
        ...(body.content !== undefined && { content: body.content || null }),
        ...(body.authorId !== undefined && { authorId: Number(body.authorId) }),
        ...(body.category !== undefined && { category: body.category }),
        ...(tags !== undefined && { tags }),
        ...(body.readTime !== undefined && { readTime: Number(body.readTime) }),
        ...(body.date !== undefined && { date: body.date }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
        ...(body.coverColor !== undefined && { coverColor: body.coverColor }),
        ...(body.coverIcon !== undefined && { coverIcon: body.coverIcon }),
      },
      include: { author: true },
    });
    return NextResponse.json(article);
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
    await prisma.article.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
