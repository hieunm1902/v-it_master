import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCourses } from '@/lib/store';

export async function GET() {
  return NextResponse.json(await getCourses());
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const tags = Array.isArray(body.tags)
      ? body.tags
      : String(body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const course = await prisma.course.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: body.title,
        description: body.description || '',
        instructorId: Number(body.instructorId) || 1,
        category: body.category || 'Frontend',
        level: body.level || 'Beginner',
        duration: body.duration || '10 giờ',
        lessons: Number(body.lessons) || 0,
        students: 0,
        rating: Number(body.rating) || 0,
        price: body.price || 'free',
        priceAmount: body.priceAmount ? Number(body.priceAmount) : null,
        tags,
        coverColor: body.coverColor || 'from-blue-500 to-indigo-600',
        updatedAt: new Date().toISOString().slice(0, 10),
      },
      include: { instructor: true },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
