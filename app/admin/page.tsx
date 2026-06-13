import { getArticles, getEvents, getCourses, getCharityProjects } from '@/lib/store';
import { FileText, Calendar, GraduationCap, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [articles, events, courses, charity] = await Promise.all([
    getArticles(),
    getEvents(),
    getCourses(),
    getCharityProjects(),
  ]);

  const totalRaised = charity.reduce((s, p) => s + p.raised, 0);
  const activeCharity = charity.filter(p => p.status === 'active').length;

  const stats = [
    {
      label: 'Bài viết',
      value: articles.length,
      sub: `${articles.filter(a => a.featured).length} nổi bật`,
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      href: '/admin/bai-viet',
    },
    {
      label: 'Sự kiện',
      value: events.length,
      sub: `${events.filter(e => e.price === 'free').length} miễn phí`,
      icon: Calendar,
      color: 'from-indigo-500 to-violet-600',
      href: '/admin/su-kien',
    },
    {
      label: 'Khóa học',
      value: courses.length,
      sub: `${courses.filter(c => c.price === 'free').length} miễn phí`,
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      href: '/admin/khoa-hoc',
    },
    {
      label: 'Từ thiện',
      value: charity.length,
      sub: `${activeCharity} đang hoạt động`,
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      href: '/admin/tu-thien',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1 text-sm">Tổng quan nội dung V-IT Community</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, sub, icon: Icon, color, href }) => (
          <Link key={label} href={href}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${color} mb-4 shadow-sm`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
              <div className="text-sm font-semibold text-slate-600">{label}</div>
              <div className="text-xs text-slate-400 mt-1">{sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charity total raised */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white mb-10 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold text-emerald-200">Tổng đã quyên góp</span>
        </div>
        <div className="text-4xl font-black">
          {totalRaised.toLocaleString('vi-VN')} VND
        </div>
        <div className="text-sm text-emerald-300 mt-1">
          Từ {charity.length} dự án — {charity.filter(p => p.status === 'completed').length} đã hoàn thành
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Truy cập nhanh</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Quản lý {label}
              </span>
              <span className="ml-auto text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
