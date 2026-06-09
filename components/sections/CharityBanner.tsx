import Link from 'next/link';
import { Heart, Target, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';
import { charityProjects, communityStats } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default function CharityBanner() {
  const active = charityProjects.filter(p => p.status === 'active');
  const completed = charityProjects.filter(p => p.status === 'completed');
  const totalRaised = charityProjects.reduce((s, p) => s + p.raised, 0);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background deco */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-sm font-semibold text-emerald-300 mb-5">
            <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            Từ thiện & Tác động xã hội
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Mọi lợi nhuận{' '}
            <span className="text-emerald-400">vì cộng đồng</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            V-IT không vì lợi nhuận. 100% thu nhập từ khóa học trả phí và sự kiện được dùng để hỗ trợ giáo dục và công nghệ cho những người kém may mắn hơn.
          </p>
        </div>

        {/* Total stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          <div className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-1">{formatCurrency(totalRaised)} VND</div>
            <div className="text-sm text-slate-400">Tổng đã quyên góp</div>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-1">{completed.length}</div>
            <div className="text-sm text-slate-400">Dự án đã hoàn thành</div>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
            <Heart className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-1">850+</div>
            <div className="text-sm text-slate-400">Trẻ em được hỗ trợ</div>
          </div>
        </div>

        {/* Active projects */}
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          Đang quyên góp
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {active.map(project => {
            const pct = Math.round((project.raised / project.target) * 100);
            return (
              <div key={project.id} className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4`}>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Đang quyên góp
                </div>
                <h4 className="text-base font-bold text-white mb-2">{project.title}</h4>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="text-xs text-slate-400 mb-3">👥 {project.beneficiaries}</div>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald-300 font-bold">{formatCurrency(project.raised)} VND</span>
                  <span className="text-slate-400">/ {formatCurrency(project.target)} VND mục tiêu</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-right text-slate-400">{pct}% đạt được</div>
              </div>
            );
          })}
        </div>

        {/* Completed projects */}
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Đã hoàn thành
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {completed.map(project => (
            <div key={project.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">{project.title}</h4>
                <p className="text-xs text-slate-400 mb-1">{project.beneficiaries}</p>
                <p className="text-xs text-emerald-400 font-semibold">✅ {formatCurrency(project.raised)} VND đã quyên góp</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/tu-thien"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-colors shadow-xl shadow-emerald-900/50"
          >
            <Heart className="w-4 h-4" />
            Xem chi tiết quỹ từ thiện
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
