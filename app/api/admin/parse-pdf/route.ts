import { NextResponse } from 'next/server';
import { createRequire } from 'module';

const _require = createRequire(import.meta.url);

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Vui lòng chọn file PDF' }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Chỉ hỗ trợ file PDF' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Import from internal path to avoid Next.js test-file loading error in pdf-parse
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfParse = _require('pdf-parse/lib/pdf-parse.js') as (buf: Buffer) => Promise<{ text: string; numpages: number }>;
    const data = await pdfParse(buffer);

    return NextResponse.json({ text: data.text.trim(), pages: data.numpages });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Lỗi đọc PDF: ${msg}` }, { status: 500 });
  }
}
