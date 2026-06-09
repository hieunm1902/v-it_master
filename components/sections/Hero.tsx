import Link from 'next/link';
import { ArrowRight, Star, Users, BookOpen, Calendar, Zap } from 'lucide-react';
import { communityStats } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

const QUICK_STATS = [
  { icon: Users, value: communityStats.members.toLocaleString('vi-VN') + '+', label: 'Thành viên' },
  { icon: BookOpen, value: communityStats.articles + '+', label: 'Bài viết' },
  { icon: Calendar, value: communityStats.events + '+', label: 'Sự kiện' },
  { icon: Star, value: formatCurrency(communityStats.charityRaised), label: 'Từ thiện' },
];

export default function Hero() {
  return (
    <section className="gradient-hero text-white overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Cộng đồng IT Việt Nam đang phát triển 🚀
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
            Nơi kết nối{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                cộng đồng IT
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
            {' '}Việt Nam
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            Học hỏi từ chuyên gia, chia sẻ kiến thức, tham gia sự kiện và cùng nhau xây dựng tương lai công nghệ Việt Nam.
            {' '}<strong className="text-emerald-300">Mọi lợi nhuận dành cho từ thiện.</strong>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/tham-gia"
              className="group flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl shadow-black/20 text-base"
            >
              <Zap className="w-4 h-4" />
              Tham gia miễn phí
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/bai-viet"
              className="flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm text-base"
            >
              <BookOpen className="w-4 h-4" />
              Đọc bài viết
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400 mb-16">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['NM', 'TL', 'LQ', 'PT', 'HT'].map((initials) => (
                  <div key={initials} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-slate-900 flex items-center justify-center text-[9px] font-bold text-white">
                    {initials}
                  </div>
                ))}
              </div>
              <span>+12,000 thành viên đang tham gia</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span>Được đánh giá 4.9/5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">💚</span>
              <span>Phi lợi nhuận, vì cộng đồng</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {QUICK_STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center p-5 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/15 transition-colors"
            >
              <Icon className="w-6 h-6 text-indigo-300 mb-2" />
              <span className="text-2xl font-black text-white">{value}</span>
              <span className="text-xs text-slate-400 mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="relative h-12 mt-4">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 48L1440 48L1440 0C1440 0 1080 48 720 48C360 48 0 0 0 0L0 48Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  );
}
