import { NextResponse } from 'next/server';
import { getCourses, saveCourses } from '@/lib/store';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const items = getCourses().map(c =>
    c.id === Number(id) ? { ...c, ...body, id: Number(id) } : c,
  );
  saveCourses(items);
  return NextResponse.json(items.find(c => c.id === Number(id)));
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  saveCourses(getCourses().filter(c => c.id !== Number(id)));
  return NextResponse.json({ ok: true });
}
