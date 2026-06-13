import { NextResponse } from 'next/server';
import { getArticles, saveArticles } from '@/lib/store';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const items = getArticles().map(a =>
    a.id === Number(id) ? { ...a, ...body, id: Number(id) } : a,
  );
  saveArticles(items);
  return NextResponse.json(items.find(a => a.id === Number(id)));
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  saveArticles(getArticles().filter(a => a.id !== Number(id)));
  return NextResponse.json({ ok: true });
}
