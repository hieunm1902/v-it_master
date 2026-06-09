import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { articles, articleCategories, authors } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Eye, Heart, Clock, Search, PenSquare, TrendingUp, Star } from 'lucide-react';

export const metadata = {
  title: 'Bài viết',
  description: 'Bài viết kỹ thuật chất lượng cao từ cộng đồng IT Việt Nam',
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 border-blue-200',
  Backend: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'AI/ML': 'bg-purple-100 text-purple-700 border-purple-200',
  DevOps: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Mobile: 'bg-orange-100 text-orange-700 border-orange-200',
  Security: 'bg-red-100 text-red-700 border-red-200',
  Database: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Career: 'bg-pink-100 text-pink-700 border-pink-200',
};

export default function ArticlesPage() {
  const topAuthors = authors.slice(0, 5);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">

        {/* Page header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Bài viết kỹ thuật</h1>
                <p className="text-slate-500">
                  {articles.length} bài viết từ cộng đồng IT Việt Nam
                </p>
              </div>
              <Link
                href="/viet-bai"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                <PenSquare className="w-4 h-4" />
                Viết bài mới
              </Link>
            </div>

            {/* Search bar */}
            <div className="mt-6 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, chủ đề, tác giả..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Main content */}
            <div className="lg:col-span-3">

              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-600 text-white">
                  Tất cả
                </button>
                {articleCategories.map(cat => (
                  <button
                    key={cat.name}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${cat.color} hover:opacity-80 transition-opacity`}
                  >
                    {cat.name}
                    <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* Articles list */}
              <div className="space-y-4">
                {articles.map(article => {
                  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-600 border-slate-200';
                  return (
                    <Link key={article.id} href={`/bai-viet/${article.slug}`} className="group block">
                      <article className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden">
                        <div className="flex">
                          {/* Cover strip */}
                          <div className={`w-2 bg-gradient-to-b ${article.coverColor} shrink-0`} />

                          <div className="flex-1 p-6">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${article.coverColor} flex items-center justify-center text-2xl shrink-0 hidden sm:flex`}>
                                {article.coverIcon}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${catColor}`}>
                                    {article.category}
                                  </span>
                                  {article.featured && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1">
                                      <TrendingUp className="w-3 h-3" /> Trending
                                    </span>
                                  )}
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2 leading-snug">
                                  {article.title}
                                </h2>

                                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                                  {article.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {article.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-500 font-medium">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-[9px] font-bold text-white">
                                      {article.author.avatar}
                                    </div>
                                    <span className="font-medium text-slate-600">{article.author.name}</span>
                                  </div>
                                  <span>{formatDate(article.date)}</span>
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} phút</span>
                                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString('vi-VN')}</span>
                                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{article.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex items-center justify-center gap-2">
                {[1, 2, 3, '...', 12].map((page, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      page === 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">

              {/* Top authors */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Tác giả nổi bật
                </h3>
                <div className="space-y-4">
                  {topAuthors.map(author => (
                    <div key={author.id} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {author.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{author.name}</p>
                        <p className="text-xs text-slate-400 truncate">{author.role}</p>
                        <p className="text-xs text-slate-400">{author.articles} bài • {author.followers.toLocaleString('vi-VN')} theo dõi</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular tags */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-4">🏷️ Tags phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Python', 'Golang', 'Docker', 'AWS', 'Next.js', 'AI', 'Flutter', 'DevOps', 'PostgreSQL', 'Redis'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-600 font-medium hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Write CTA */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
                <PenSquare className="w-8 h-8 mb-3 text-indigo-200" />
                <h3 className="font-bold mb-2">Chia sẻ kiến thức của bạn</h3>
                <p className="text-sm text-indigo-200 mb-4">Viết bài và truyền cảm hứng cho hàng nghìn lập trình viên Việt Nam.</p>
                <Link href="/viet-bai" className="block w-full text-center py-2.5 bg-white text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                  Viết bài ngay
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
