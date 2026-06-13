import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getArticles } from '@/lib/store';

export async function GET() {
  return NextResponse.json(await getArticles());
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const tags = Array.isArray(body.tags)
      ? body.tags
      : String(body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const article = await prisma.article.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: body.title,
        excerpt: body.excerpt || '',
        content: body.content || null,
        authorId: Number(body.authorId) || 1,
        category: body.category || 'Frontend',
        tags,
        readTime: Number(body.readTime) || 5,
        date: body.date || new Date().toISOString().slice(0, 10),
        views: 0,
        likes: 0,
        featured: Boolean(body.featured),
        coverColor: body.coverColor || 'from-blue-500 to-indigo-600',
        coverIcon: body.coverIcon || '📝',
      },
      include: { author: true },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
