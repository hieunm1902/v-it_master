import { NextResponse } from 'next/server';
import { getCharityProjects, saveCharityProjects } from '@/lib/store';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const items = getCharityProjects().map(p =>
    p.id === Number(id) ? { ...p, ...body, id: Number(id) } : p,
  );
  saveCharityProjects(items);
  return NextResponse.json(items.find(p => p.id === Number(id)));
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  saveCharityProjects(getCharityProjects().filter(p => p.id !== Number(id)));
  return NextResponse.json({ ok: true });
}
