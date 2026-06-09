import Link from 'next/link';
import { ArrowRight, Zap, BookOpen, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80)',
        }}
      />

      {/* Dark navy overlay — giữ màu chủ đạo, để ảnh lộ ra phía dưới */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/92 via-[#0a1628]/80 to-[#0d1f3c]/70" />

      {/* Grid pattern on top */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-800/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex items-center">
        <div className="max-w-3xl">

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

          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
            Học hỏi từ chuyên gia, chia sẻ kiến thức, tham gia sự kiện và cùng nhau xây dựng tương lai công nghệ.
            <span className="text-emerald-400 font-semibold"> Mọi lợi nhuận dành cho từ thiện.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
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
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              <span>4.9 từ cộng đồng</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span>💚</span> Phi lợi nhuận
            </div>
            <div>63 tỉnh thành</div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{height:'80px'}}>
          <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 60C480 40 240 10 0 40L0 80Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}
