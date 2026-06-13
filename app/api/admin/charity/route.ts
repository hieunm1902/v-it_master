import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCharityProjects } from '@/lib/store';

export async function GET() {
  return NextResponse.json(await getCharityProjects());
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const project = await prisma.charityProject.create({
      data: {
        title: body.title,
        description: body.description || '',
        target: Number(body.target) || 0,
        raised: Number(body.raised) || 0,
        beneficiaries: body.beneficiaries || '',
        completedAt: body.completedAt || null,
        status: body.status || 'active',
        coverColor: body.coverColor || 'from-emerald-500 to-teal-600',
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
