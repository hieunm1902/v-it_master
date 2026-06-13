import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getArticleBySlug } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Clock, Eye, Heart, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Không tìm thấy bài viết' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 border-blue-200',
  Backend: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'AI/ML': 'bg-purple-100 text-purple-700 border-purple-200',
  DevOps: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Mobile: 'bg-orange-100 text-orange-700 border-orange-200',
  Security: 'bg-red-100 text-red-700 border-red-200',
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">

        {/* Top bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/bai-viet"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium"
            >
              <ArrowLeft size={15} />
              Tất cả bài viết
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <article>
            {/* Cover banner */}
            <div className={`w-full h-52 sm:h-64 rounded-2xl bg-gradient-to-br ${article.coverColor} flex items-center justify-center mb-8 shadow-lg`}>
              <span className="text-7xl sm:text-8xl">{article.coverIcon}</span>
            </div>

            {/* Article header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
              {/* Category + badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${catColor}`}>
                  {article.category}
                </span>
                {article.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 flex items-center gap-1">
                    <TrendingUp size={11} /> Trending
                  </span>
                )}
                {article.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-slate-100 text-slate-500 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug mb-4">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base text-slate-500 leading-relaxed mb-6 border-l-4 border-indigo-300 pl-4 italic">
                {article.excerpt}
              </p>

              {/* Author + meta */}
              <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-slate-100 text-sm text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {article.author.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{article.author.name}</p>
                    <p className="text-xs text-slate-400">{article.author.role} · {article.author.company}</p>
                  </div>
                </div>
                <span className="hidden sm:block text-slate-300">|</span>
                <span>{formatDate(article.date)}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readTime} phút đọc</span>
                <span className="flex items-center gap-1.5"><Eye size={13} /> {article.views.toLocaleString('vi-VN')} lượt xem</span>
                <span className="flex items-center gap-1.5"><Heart size={13} /> {article.likes} thích</span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              {article.content ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="text-4xl mb-4">📝</span>
                  <p className="text-slate-500 font-medium">Bài viết này chưa có nội dung chi tiết.</p>
                  <p className="text-slate-400 text-sm mt-1">Admin có thể thêm nội dung trong trang quản trị.</p>
                </div>
              )}
            </div>

            {/* Back link */}
            <div className="mt-8 text-center">
              <Link
                href="/bai-viet"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm text-sm"
              >
                <ArrowLeft size={15} />
                Xem tất cả bài viết
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
