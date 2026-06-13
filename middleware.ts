import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function getToken(): Promise<string> {
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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  const token = req.cookies.get('vit-admin-session')?.value;
  if (!token || token !== (await getToken())) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
