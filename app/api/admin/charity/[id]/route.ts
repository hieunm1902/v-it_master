import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  try {
    const project = await prisma.charityProject.update({
      where: { id: Number(id) },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.target !== undefined && { target: Number(body.target) }),
        ...(body.raised !== undefined && { raised: Number(body.raised) }),
        ...(body.beneficiaries !== undefined && { beneficiaries: body.beneficiaries }),
        ...(body.completedAt !== undefined && { completedAt: body.completedAt || null }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.coverColor !== undefined && { coverColor: body.coverColor }),
      },
    });
    return NextResponse.json(project);
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
    await prisma.charityProject.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
