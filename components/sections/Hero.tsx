import Link from 'next/link';
import { ArrowRight, Zap, BookOpen, Star } from 'lucide-react';

/* ── App Screenshot Mockup ──────────────────────────────────────────────── */

function AppMockup() {
  return (
    <div
      className="relative w-full max-w-[580px] rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-white/10"
      style={{ transform: 'perspective(1200px) rotateY(-6deg) rotateX(3deg)' }}
    >
      {/* Browser chrome */}
      <div className="bg-[#1a2540] px-4 py-3 flex items-center gap-3 border-b border-white/8">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-white/8 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono">
          v-it.community
        </div>
      </div>

      {/* App UI */}
      <div className="bg-[#f8fafc]">

        {/* Navbar */}
        <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700" />
            <span className="text-sm font-black text-slate-900">V-IT</span>
          </div>
          <div className="flex gap-4 ml-4">
            {['Bài viết','Sự kiện','Khóa học'].map(n => (
              <span key={n} className="text-xs text-slate-500">{n}</span>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">Tham gia</div>
          </div>
        </div>

        {/* Hero banner inside app */}
        <div className="bg-gradient-to-br from-[#0a1628] to-[#0f2040] px-5 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-[10px] text-blue-300 font-semibold">12,453 thành viên</span>
            </div>
            <h2 className="text-white font-black text-xl leading-tight mb-2">Nơi kết nối cộng đồng<br/>IT Việt Nam 🇻🇳</h2>
            <p className="text-slate-400 text-xs mb-4 max-w-xs">Học hỏi · Chia sẻ · Phát triển</p>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 bg-blue-600 rounded-lg text-[10px] text-white font-bold">Tham gia ngay</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-[10px] text-white">Khám phá</div>
            </div>
          </div>
        </div>

        {/* Article feed */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700">Bài viết nổi bật</span>
            <span className="text-[10px] text-blue-500">Xem tất cả →</span>
          </div>

          {/* Article row 1 */}
          <div className="flex gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm mb-2 hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg shrink-0">⚛️</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Frontend</span>
                <span className="text-[9px] text-orange-500 font-bold bg-orange-50 px-1.5 py-0.5 rounded">🔥 Hot</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">React Server Components: Tương lai của React</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[7px] font-bold text-white">NM</div>
                <span className="text-[9px] text-slate-400">Nguyễn Minh Khôi · 8 phút đọc · 2.4k lượt xem</span>
              </div>
            </div>
          </div>

          {/* Article row 2 */}
          <div className="flex gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg shrink-0">🐳</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">DevOps</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">Docker & Kubernetes: Production-ready setup</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[7px] font-bold text-white">TL</div>
                <span className="text-[9px] text-slate-400">Trần Lê Hữu · 12 phút đọc · 1.8k lượt xem</span>
              </div>
            </div>
          </div>

          {/* Article row 3 */}
          <div className="flex gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-lg shrink-0">🤖</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">AI/ML</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">LLM Fine-tuning với dữ liệu tiếng Việt</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-[7px] font-bold text-white">LQ</div>
                <span className="text-[9px] text-slate-400">Lê Quang Hưng · 15 phút đọc · 3.1k lượt xem</span>
              </div>
            </div>
          </div>

          {/* Upcoming event strip */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 rounded-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex flex-col items-center justify-center text-white shrink-0">
              <span className="text-[8px] font-bold">T7</span>
              <span className="text-xs font-black">15</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Vietnam Tech Summit 2026</p>
              <p className="text-[9px] text-slate-500">Hà Nội · 1,243 đã đăng ký</p>
            </div>
            <span className="text-[9px] text-orange-600 font-bold bg-orange-100 px-2 py-0.5 rounded-full shrink-0">Sắp diễn ra</span>
          </div>
        </div>
      </div>

      {/* Overlay shimmer */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/4 via-transparent to-transparent" />
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
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

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

          {/* Right: App screenshot mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Glow behind mockup */}
            <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <AppMockup />
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
