import { communityStats } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

const STATS = [
  { value: communityStats.members.toLocaleString('vi-VN') + '+', label: 'Thành viên', suffix: '' },
  { value: communityStats.articles + '+',   label: 'Bài viết kỹ thuật', suffix: '' },
  { value: communityStats.events + '+',     label: 'Sự kiện tổ chức', suffix: '' },
  { value: communityStats.courses + '+',    label: 'Khóa học', suffix: '' },
  { value: formatCurrency(communityStats.charityRaised), label: 'VND từ thiện', suffix: '' },
  { value: communityStats.cities + '',      label: 'Tỉnh thành', suffix: '' },
];

export default function StatsStrip() {
  return (
    <section className="bg-[#0a1628] py-20 relative overflow-hidden">

      {/* Subtle top border glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="group relative flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-blue-500/40 hover:bg-blue-600/10 transition-all duration-300 text-center"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/5 blur-sm" />

              <span className="text-3xl font-black text-white mb-1.5 relative z-10">{value}</span>
              <span className="text-xs text-slate-400 relative z-10 leading-snug">{label}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center text-slate-500 text-sm mt-10">
          Và <span className="text-blue-400 font-semibold">100% lợi nhuận</span> được dùng cho từ thiện và giáo dục 💙
        </p>
      </div>
    </section>
  );
}
