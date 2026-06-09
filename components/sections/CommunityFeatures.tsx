import Link from 'next/link';
import { PenSquare, BookOpen, Calendar, MessageCircle, Users, Trophy, ArrowRight } from 'lucide-react';

/* Bento grid layout — visual-first */

const MAIN_FEATURES = [
  {
    icon: PenSquare,
    title: 'Viết bài chia sẻ',
    description: 'Chia sẻ kiến thức với cộng đồng hơn 12,000 lập trình viên Việt Nam.',
    href: '/bai-viet',
    cta: 'Viết bài ngay',
    visual: (
      <div className="relative h-36 rounded-xl overflow-hidden bg-[#0a1628] mt-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute top-3 left-3 right-3">
          <div className="h-3 w-2/3 bg-blue-400/40 rounded mb-2" />
          <div className="h-2 w-full bg-white/10 rounded mb-1.5" />
          <div className="h-2 w-4/5 bg-white/10 rounded mb-1.5" />
          <div className="h-2 w-3/4 bg-white/10 rounded" />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {['React','TypeScript','Next.js'].map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-blue-500/30 text-blue-300 border border-blue-500/30">{t}</span>
          ))}
        </div>
      </div>
    ),
    accent: 'blue',
  },
  {
    icon: BookOpen,
    title: 'Xây dựng khóa học',
    description: 'Tạo khóa học chuyên sâu, giúp thế hệ IT tiếp theo tiến xa hơn.',
    href: '/khoa-hoc',
    cta: 'Tạo khóa học',
    visual: (
      <div className="relative h-36 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-900 mt-4">
        <div className="absolute inset-0 flex flex-col gap-2 p-3">
          {[
            { w: '100%', label: '01 · Giới thiệu', done: true },
            { w: '85%',  label: '02 · Cài đặt môi trường', done: true },
            { w: '65%',  label: '03 · Các khái niệm cơ bản', done: false },
            { w: '40%',  label: '04 · Project thực chiến', done: false },
          ].map(({ w, label, done }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${done ? 'bg-emerald-400' : 'border border-white/20'}`} />
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-400/60 rounded-full" style={{ width: w }} />
              </div>
              <span className="text-[8px] text-white/40 truncate w-24 hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    accent: 'emerald',
  },
  {
    icon: Calendar,
    title: 'Tổ chức sự kiện',
    description: 'Workshop, meetup, webinar — V-IT hỗ trợ promotion & logistics.',
    href: '/su-kien',
    cta: 'Tổ chức sự kiện',
    visual: (
      <div className="relative h-36 rounded-xl overflow-hidden bg-gradient-to-br from-orange-900 to-red-900 mt-4">
        <div className="absolute inset-0 p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['T2','T3','T4','T5','T6','T7','CN'].map(d => (
              <div key={d} className="text-center text-[8px] text-white/40 font-semibold">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({length: 28}, (_, i) => {
              const day = i + 1;
              const hasEvent = [5, 12, 18, 22, 25].includes(day);
              const isToday = day === 15;
              return (
                <div key={i} className={`aspect-square rounded flex items-center justify-center text-[9px] font-medium
                  ${isToday ? 'bg-orange-500 text-white' : hasEvent ? 'bg-orange-500/30 text-orange-300' : 'text-white/30'}`}>
                  {day <= 28 ? day : ''}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    accent: 'orange',
  },
];

const SIDE_FEATURES = [
  { icon: MessageCircle, title: 'Buổi Sharing',   desc: 'Chia sẻ kinh nghiệm thực tế', href: '/chia-se', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  { icon: Users,         title: 'Kết nối Expert',  desc: 'Mở rộng network chuyên gia', href: '/chuyen-gia', color: 'text-sky-400',    bg: 'bg-sky-500/10 border-sky-500/20' },
  { icon: Trophy,        title: 'Hackathon',        desc: 'Thi đấu & trúng giải thưởng', href: '/su-kien', color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20' },
];

export default function CommunityFeatures() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Nền tảng toàn diện</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
            Mọi thứ bạn cần để<br />
            <span className="gradient-text-blue">phát triển sự nghiệp IT</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Từ đọc bài viết đến dạy khóa học — V-IT là nền tảng học hỏi và kết nối của bạn.
          </p>
        </div>

        {/* Main 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {MAIN_FEATURES.map(({ icon: Icon, title, description, href, cta, visual, accent }) => {
            const accentMap: Record<string, string> = {
              blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
              emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
              orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
            };
            const hoverBorder: Record<string, string> = {
              blue: 'hover:border-blue-200',
              emerald: 'hover:border-emerald-200',
              orange: 'hover:border-orange-200',
            };
            return (
              <div key={title} className={`group bg-white border border-slate-200 ${hoverBorder[accent]} rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 card-lift flex flex-col`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all ${accentMap[accent]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-2">{description}</p>
                {visual}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors group/link">
                    {cta} <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 3 small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {SIDE_FEATURES.map(({ icon: Icon, title, desc, href, color, bg }) => (
            <Link key={title} href={href}
              className={`group flex items-center gap-4 p-5 rounded-2xl border ${bg} hover:shadow-lg transition-all`}>
              <div className={`w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-bold text-sm ${color}`}>{title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors ml-auto shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
