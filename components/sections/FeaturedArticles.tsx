import Link from 'next/link';
import { Eye, Heart, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { getArticles } from '@/lib/store';
import { articleCategories, type Article } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700',
  Backend:  'bg-emerald-100 text-emerald-700',
  'AI/ML':  'bg-purple-100 text-purple-700',
  DevOps:   'bg-cyan-100 text-cyan-700',
  Mobile:   'bg-orange-100 text-orange-700',
  Security: 'bg-red-100 text-red-700',
};

function BigArticleCard({ article }: { article: Article }) {
  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <Link href={`/bai-viet/${article.slug}`} className="group block">
      <div className="h-full rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xl transition-all duration-300">
        {/* Visual header */}
        <div className={`relative h-52 bg-gradient-to-br ${article.coverColor} flex items-end p-6 overflow-hidden`}>
          {/* Background texture */}
          <div className="absolute inset-0 bg-dot-pattern opacity-30" />
          {/* Big emoji */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20 select-none">{article.coverIcon}</span>
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Category & trending */}
          <div className="relative z-10 flex items-center gap-2 w-full">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${catColor} bg-white/90`}>
              {article.category}
            </span>
            {article.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
                <TrendingUp className="w-3 h-3" /> Hot
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-3 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {article.author.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{article.author.name}</p>
              <p className="text-xs text-slate-400">{formatDate(article.date)}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}p</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{(article.views / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SmallArticleCard({ article }: { article: Article }) {
  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <Link href={`/bai-viet/${article.slug}`} className="group flex gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${article.coverColor} flex items-center justify-center text-2xl shrink-0 shadow-md`}>
        {article.coverIcon}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${catColor} mb-1.5 inline-block`}>
          {article.category}
        </span>
        <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <div className="flex items-center gap-2.5 mt-2 text-xs text-slate-400">
          <span className="font-medium text-slate-500">{article.author.name.split(' ').slice(-1)[0]}</span>
          <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{article.readTime}p</span>
          <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{article.likes}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function FeaturedArticles() {
  const articles = await getArticles();
  const featured = articles.filter(a => a.featured).slice(0, 3);
  const rest = articles.filter(a => !a.featured).slice(0, 6);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-dot-light opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">Kiến thức từ chuyên gia</p>
            <h2 className="text-4xl font-black text-slate-900">Bài viết nổi bật</h2>
          </div>
          <Link href="/bai-viet" className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Xem tất cả bài viết
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-900 text-white">Tất cả</button>
          {articleCategories.map(cat => (
            <button key={cat.name} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${cat.color} hover:opacity-80 transition-opacity`}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featured.map(article => <BigArticleCard key={article.id} article={article} />)}
        </div>

        {/* More articles grid */}
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <p className="font-bold text-slate-900">Bài viết mới nhất</p>
            <span className="text-xs text-slate-400">{rest.length} bài</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="divide-y divide-slate-100">
              {rest.slice(0, 3).map(a => <SmallArticleCard key={a.id} article={a} />)}
            </div>
            <div className="divide-y divide-slate-100">
              {rest.slice(3, 6).map(a => <SmallArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/bai-viet"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-colors shadow-lg">
            Khám phá tất cả bài viết
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
