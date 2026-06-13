import Link from 'next/link';
import { LayoutDashboard, FileText, Calendar, GraduationCap, Heart, LogOut } from 'lucide-react';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/bai-viet', label: 'Bài viết', icon: FileText },
  { href: '/admin/su-kien', label: 'Sự kiện', icon: Calendar },
  { href: '/admin/khoa-hoc', label: 'Khóa học', icon: GraduationCap },
  { href: '/admin/tu-thien', label: 'Từ thiện', icon: Heart },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-slate-900 flex flex-col fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700/60">
          <span className="text-lg font-black text-white tracking-tight">
            V-IT <span className="text-blue-400">Admin</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all group"
            >
              <Icon className="w-4.5 h-4.5 shrink-0 group-hover:text-blue-400 transition-colors" size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-700/60">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
