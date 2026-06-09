'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Code2, ChevronDown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/bai-viet', label: 'Bài viết' },
  { href: '/su-kien', label: 'Sự kiện' },
  { href: '/khoa-hoc', label: 'Khóa học' },
  { href: '/chia-se', label: 'Chia sẻ' },
  { href: '/ve-chung-toi', label: 'Về chúng tôi' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-200 transition-shadow">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 tracking-tight">V-IT</span>
              <span className="text-xs font-semibold text-indigo-600 hidden sm:block">Community</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === href
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dang-nhap"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/tham-gia"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
            >
              <Zap className="w-3.5 h-3.5" />
              Tham gia ngay
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 pb-1 flex flex-col gap-2">
              <Link
                href="/dang-nhap"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/tham-gia"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Tham gia ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
