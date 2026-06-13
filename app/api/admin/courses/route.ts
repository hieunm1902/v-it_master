import { NextResponse } from 'next/server';
import { getCourses, saveCourses } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getCourses());
}

export async function POST(req: Request) {
  const body = await req.json();
  const items = getCourses();
  const newItem = { ...body, id: Date.now() };
  saveCourses([...items, newItem]);
  return NextResponse.json(newItem, { status: 201 });
}
