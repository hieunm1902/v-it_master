import { NextResponse } from 'next/server';
import { getCharityProjects, saveCharityProjects } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getCharityProjects());
}

export async function POST(req: Request) {
  const body = await req.json();
  const items = getCharityProjects();
  const newItem = { ...body, id: Date.now() };
  saveCharityProjects([...items, newItem]);
  return NextResponse.json(newItem, { status: 201 });
}
