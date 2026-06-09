const SPEAKERS = [
  {
    name: 'Nguyễn Minh Khôi',
    title: 'Senior Frontend Engineer',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Trần Lê Hữu',
    title: 'DevOps Lead',
    img: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    name: 'Lê Thị Mai Anh',
    title: 'AI/ML Researcher',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Phạm Quốc Tuấn',
    title: 'Backend Architect',
    img: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    name: 'Nguyễn Thu Hương',
    title: 'Engineering Manager',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Đặng Hoàng Long',
    title: 'CTO & Co-founder',
    img: 'https://randomuser.me/api/portraits/men/71.jpg',
  },
  {
    name: 'Võ Thị Lan Anh',
    title: 'Security Engineer',
    img: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    name: 'Bùi Thanh Tùng',
    title: 'Mobile Lead',
    img: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    name: 'Trịnh Văn Đức',
    title: 'Data Engineer',
    img: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    name: 'Phan Thị Ngọc',
    title: 'UX/Product Designer',
    img: 'https://randomuser.me/api/portraits/women/15.jpg',
  },
];

function SpeakerCard({ name, title, img }: { name: string; title: string; img: string }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0 w-32 px-2">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 hover:border-blue-400/60 transition-colors shadow-lg shadow-black/30">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <p className="text-white text-xs font-semibold leading-snug">{name}</p>
        <p className="text-blue-400 text-[10px] mt-0.5 leading-snug">{title}</p>
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <section className="py-16 bg-[#0a1628] relative overflow-hidden">
      {/* Border glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Header */}
      <div className="text-center mb-10 px-4">
        <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-2">Đồng hành cùng V-IT</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Diễn giả & Chuyên gia</h2>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a1628] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a1628] to-transparent z-10 pointer-events-none" />

        {/* Scrolling row — duplicated for seamless loop */}
        <div className="flex animate-marquee gap-6 py-2">
          {[...SPEAKERS, ...SPEAKERS].map((s, i) => (
            <SpeakerCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
