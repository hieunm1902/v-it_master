import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SPEAKERS = [
  {
    name: 'Nguyễn Minh Khôi',
    title: 'Senior Frontend Engineer',
    company: 'Shopee Vietnam',
    topic: 'React & Performance',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Trần Lê Hữu',
    title: 'DevOps Lead',
    company: 'VNG Corporation',
    topic: 'Kubernetes & Cloud',
    img: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    name: 'Lê Thị Mai Anh',
    title: 'AI/ML Researcher',
    company: 'FPT AI Center',
    topic: 'LLM & NLP tiếng Việt',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Phạm Quốc Tuấn',
    title: 'Backend Architect',
    company: 'Tiki',
    topic: 'Microservices & Go',
    img: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    name: 'Nguyễn Thu Hương',
    title: 'Engineering Manager',
    company: 'MoMo',
    topic: 'Tech Leadership',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Đặng Hoàng Long',
    title: 'CTO & Co-founder',
    company: 'Base.vn',
    topic: 'Khởi nghiệp công nghệ',
    img: 'https://randomuser.me/api/portraits/men/71.jpg',
  },
  {
    name: 'Võ Thị Lan Anh',
    title: 'Security Engineer',
    company: 'ViettelCyber',
    topic: 'AppSec & Pentest',
    img: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    name: 'Bùi Thanh Tùng',
    title: 'Mobile Lead',
    company: 'Grab Vietnam',
    topic: 'React Native & Flutter',
    img: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
];

export default function Speakers() {
  return (
    <section className="py-20 bg-[#0a1628] relative overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-2">Đồng hành cùng V-IT</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Diễn giả & Chuyên gia</h2>
            <p className="text-slate-400 mt-2 text-sm max-w-lg">
              Những chuyên gia hàng đầu từ các công ty công nghệ lớn nhất Việt Nam đang chia sẻ kiến thức tại V-IT.
            </p>
          </div>
          <Link href="/chuyen-gia" className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0">
            Xem tất cả
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Speaker grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPEAKERS.map((s) => (
            <div
              key={s.name}
              className="group relative bg-white/5 border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:bg-white/8 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full aspect-square object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient overlay on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/30 to-transparent" />

                {/* Topic badge on photo */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-blue-600/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                    {s.topic}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-bold text-white leading-snug">{s.name}</p>
                <p className="text-xs text-blue-300 mt-0.5">{s.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Bạn là chuyên gia và muốn chia sẻ kiến thức với cộng đồng?
          </p>
          <Link
            href="/tham-gia"
            className="inline-flex items-center gap-2 px-6 py-3 border border-blue-500/50 text-blue-300 hover:bg-blue-600/20 hover:border-blue-400 font-semibold rounded-xl text-sm transition-all"
          >
            Trở thành diễn giả V-IT
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
