import { NextResponse } from 'next/server';

async function makeToken(): Promise<string> {
  const pw = process.env.ADMIN_PASSWORD ?? 'admin123';
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(pw),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('vit-admin-v1'));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password !== (process.env.ADMIN_PASSWORD ?? 'admin123')) {
    return NextResponse.json({ error: 'Mật khẩu không đúng' }, { status: 401 });
  }
  const token = await makeToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set('vit-admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('vit-admin-session');
  return res;
}
