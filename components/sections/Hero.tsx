import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Calendar, BookOpen, Users, Star } from 'lucide-react';

/* ── Floating mock cards ────────────────────────────────────────────────── */

function ArticleCard() {
  return (
    <div className="glass-light rounded-2xl p-4 shadow-2xl w-72 animate-float">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm">⚛️</div>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Frontend</span>
      </div>
      <p className="text-sm font-bold text-slate-800 leading-snug mb-3">
        React Server Components: Tương lai của React đã đến
      </p>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[9px] font-bold text-white">NM</div>
        <span className="text-xs text-slate-500">Nguyễn Minh Khôi</span>
        <span className="text-xs text-slate-400 ml-auto">8 phút đọc</span>
      </div>
    </div>
  );
}

function EventCard() {
  return (
    <div className="glass-light rounded-2xl p-4 shadow-2xl w-64 animate-float-delay">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-orange-500" />
        <span className="text-xs font-semibold text-orange-600">Sự kiện sắp diễn ra</span>
      </div>
      <p className="text-sm font-bold text-slate-800 mb-1">Vietnam Tech Summit 2026</p>
      <p className="text-xs text-slate-500 mb-3">15–16 Tháng 7 · Hà Nội</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {['NM','TL','LQ'].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">{i}</div>
          ))}
        </div>
        <span className="text-xs font-semibold text-emerald-600">1,243 đã đăng ký</span>
      </div>
    </div>
  );
}

function NotifCard() {
  return (
    <div className="glass-light rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 w-64 animate-float-slow">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-sm shrink-0">💚</div>
      <div>
        <p className="text-xs font-bold text-slate-800">Quyên góp thành công</p>
        <p className="text-xs text-slate-500">127.5 triệu / 150 triệu VND</p>
      </div>
    </div>
  );
}

function MemberBadge() {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 w-56">
      <div className="flex -space-x-2 shrink-0">
        {['NM','TL','LQ','PT','HT'].map(i => (
          <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-slate-900 flex items-center justify-center text-[9px] font-bold text-white">{i}</div>
        ))}
      </div>
      <div>
        <p className="text-xs font-bold text-white">12,453+</p>
        <p className="text-[10px] text-blue-300">thành viên</p>
      </div>
    </div>
  );
}

/* ── Decorative code block ───────────────────────────────────────────────── */

function CodeDecor() {
  return (
    <div className="glass rounded-xl p-4 font-mono text-xs w-64 leading-relaxed">
      <div className="flex gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
      </div>
      <p><span className="text-blue-400">const</span> <span className="text-white">community</span> <span className="text-slate-400">=</span> <span className="text-slate-400">{'{'}</span></p>
      <p className="pl-3"><span className="text-blue-300">members</span><span className="text-slate-400">:</span> <span className="text-emerald-400">12453</span><span className="text-slate-400">,</span></p>
      <p className="pl-3"><span className="text-blue-300">mission</span><span className="text-slate-400">:</span> <span className="text-orange-300">&apos;charity&apos;</span><span className="text-slate-400">,</span></p>
      <p className="pl-3"><span className="text-blue-300">isOpen</span><span className="text-slate-400">:</span> <span className="text-purple-400">true</span></p>
      <p><span className="text-slate-400">{'}'}</span></p>
    </div>
  );
}

/* ── Main Hero ───────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a1628] overflow-hidden flex flex-col">

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Glow blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-800/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-blue-300 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Cộng đồng IT Việt Nam đang phát triển 🚀
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-white text-glow">
              Nơi kết nối<br />
              <span className="gradient-text-blue">cộng đồng IT</span><br />
              <span className="text-white/90">Việt Nam</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
              Học hỏi từ chuyên gia, chia sẻ kiến thức, tham gia sự kiện và cùng nhau xây dựng tương lai công nghệ.
              <span className="text-emerald-400 font-semibold"> Mọi lợi nhuận dành cho từ thiện.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/tham-gia"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] text-base"
              >
                <Zap className="w-5 h-5" />
                Tham gia miễn phí
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/bai-viet"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all text-base"
              >
                <BookOpen className="w-4 h-4" />
                Khám phá bài viết
              </Link>
            </div>

            {/* Micro stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="text-slate-400">4.9 từ cộng đồng</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span>💚</span> Phi lợi nhuận
              </div>
              <div className="text-slate-500">63 tỉnh thành</div>
            </div>
          </div>

          {/* Right: Floating UI mockup */}
          <div className="relative hidden lg:flex items-center justify-center h-[560px]">

            {/* Center glow */}
            <div className="absolute w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />

            {/* Article card - top left */}
            <div className="absolute top-0 left-0 drop-shadow-2xl">
              <ArticleCard />
            </div>

            {/* Code decor - top right */}
            <div className="absolute top-12 right-0 drop-shadow-2xl">
              <CodeDecor />
            </div>

            {/* Event card - middle left */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] drop-shadow-2xl">
              <EventCard />
            </div>

            {/* Members badge - center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <MemberBadge />
            </div>

            {/* Notif card - bottom right */}
            <div className="absolute bottom-16 right-0 drop-shadow-2xl">
              <NotifCard />
            </div>

            {/* Stats pill - bottom left */}
            <div className="absolute bottom-0 left-8 glass rounded-xl px-4 py-3 flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">847 bài viết</p>
                <p className="text-[10px] text-slate-400">từ cộng đồng</p>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute w-80 h-80 rounded-full border border-blue-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{height:'80px'}}>
          <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 60C480 40 240 10 0 40L0 80Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}
