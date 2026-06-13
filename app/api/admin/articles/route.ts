import { NextResponse } from 'next/server';
import { getArticles, saveArticles } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getArticles());
}

export async function POST(req: Request) {
  const body = await req.json();
  const items = getArticles();
  const newItem = { ...body, id: Date.now() };
  saveArticles([...items, newItem]);
  return NextResponse.json(newItem, { status: 201 });
}
