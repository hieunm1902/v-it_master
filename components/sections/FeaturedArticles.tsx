import Link from 'next/link';
import { Eye, Heart, Clock, ArrowRight, Flame } from 'lucide-react';
import { articles, articleCategories } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 border-blue-200',
  Backend: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'AI/ML': 'bg-purple-100 text-purple-700 border-purple-200',
  DevOps: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Mobile: 'bg-orange-100 text-orange-700 border-orange-200',
  Security: 'bg-red-100 text-red-700 border-red-200',
};

function ArticleCard({ article, large = false }: { article: typeof articles[0]; large?: boolean }) {
  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-600 border-slate-200';

  if (large) {
    return (
      <Link href={`/bai-viet/${article.slug}`} className="group block">
        <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 h-full">
          {/* Cover */}
          <div className={`h-52 bg-gradient-to-br ${article.coverColor} flex items-center justify-center relative overflow-hidden`}>
            <span className="text-6xl filter drop-shadow-lg">{article.coverIcon}</span>
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 left-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${catColor}`}>
                {article.category}
              </span>
            </div>
            {article.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                <Flame className="w-3 h-3" /> Hot
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug mb-3 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-5">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
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

  return (
    <Link href={`/bai-viet/${article.slug}`} className="group flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md transition-all duration-200">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${article.coverColor} flex items-center justify-center text-2xl shrink-0`}>
        {article.coverIcon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${catColor}`}>
            {article.category}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
          <span>{article.author.name}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}p</span>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{article.likes}</span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedArticles() {
  const featured = articles.filter(a => a.featured).slice(0, 3);
  const rest = articles.filter(a => !a.featured).slice(0, 4);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Bài viết nổi bật</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Kiến thức từ chuyên gia</h2>
            <p className="text-slate-500 mt-1.5">Bài viết chất lượng cao từ cộng đồng IT Việt Nam</p>
          </div>
          <Link
            href="/bai-viet"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {featured.map(article => (
            <ArticleCard key={article.id} article={article} large />
          ))}
        </div>

        {/* Categories chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {articleCategories.map(cat => (
            <Link
              key={cat.name}
              href={`/bai-viet?category=${cat.name}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${cat.color} hover:opacity-80 transition-opacity`}
            >
              {cat.name} <span className="opacity-70">({cat.count})</span>
            </Link>
          ))}
        </div>

        {/* Compact list */}
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {rest.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Xem tất cả bài viết
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
