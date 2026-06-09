import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { courses, authors } from '@/lib/data';
import { Star, Users, BookOpen, Clock, Search, GraduationCap, ArrowRight, TrendingUp, Filter } from 'lucide-react';

export const metadata = {
  title: 'Khóa học',
  description: 'Học lập trình, AI/ML, DevOps và nhiều hơn nữa từ các chuyên gia Việt Nam',
};

const LEVEL_CONFIG = {
  Beginner:     { label: 'Cơ bản',       color: 'bg-green-100 text-green-700 border-green-200' },
  Intermediate: { label: 'Trung cấp',    color: 'bg-amber-100 text-amber-700 border-amber-200' },
  Advanced:     { label: 'Nâng cao',     color: 'bg-red-100 text-red-700 border-red-200' },
};

const CATEGORY_FILTERS = ['Tất cả', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Mobile', 'Security'];

export default function CoursesPage() {
  const totalStudents = courses.reduce((s, c) => s + c.students, 0);
  const freeCount = courses.filter(c => c.price === 'free').length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">

        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">Học từ chuyên gia thực chiến</span>
              </div>
              <h1 className="text-4xl font-black mb-4 leading-tight">
                Khóa học IT<br />
                <span className="text-emerald-400">từ cộng đồng</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8">
                {courses.length} khóa học được xây dựng bởi engineers có kinh nghiệm thực chiến.
                Nhiều khóa hoàn toàn <strong className="text-emerald-300">miễn phí</strong>.
              </p>

              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white">{courses.length}</strong> khóa học</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white">{totalStudents.toLocaleString('vi-VN')}+</strong> học viên</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span><strong className="text-white">4.8/5</strong> đánh giá trung bình</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">🎁</span>
                <span><strong className="text-white">{freeCount}/{courses.length}</strong> khóa miễn phí</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map(f => (
                <button
                  key={f}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    f === 'Tất cả'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <select className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                <option>Trình độ: Tất cả</option>
                <option>Cơ bản</option>
                <option>Trung cấp</option>
                <option>Nâng cao</option>
              </select>
              <select className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                <option>Giá: Tất cả</option>
                <option>Miễn phí</option>
                <option>Trả phí</option>
              </select>
            </div>
          </div>

          {/* Courses grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map(course => {
              const lc = LEVEL_CONFIG[course.level];
              return (
                <Link key={course.id} href={`/khoa-hoc/${course.slug}`} className="group block">
                  <div className="h-full bg-white rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 overflow-hidden">

                    {/* Cover */}
                    <div className={`h-44 bg-gradient-to-br ${course.coverColor} relative flex items-center justify-center`}>
                      <GraduationCap className="w-16 h-16 text-white/60" />
                      <div className="absolute inset-0 bg-black/10" />

                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${lc.color} bg-white/90`}>
                          {lc.label}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${course.price === 'free' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-800'}`}>
                          {course.price === 'free' ? 'Miễn phí' : `${(course.priceAmount! / 1000).toFixed(0)}k`}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Category */}
                      <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{course.category}</span>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1 mb-2 line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                          {course.instructor.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{course.instructor.name}</p>
                          <p className="text-[10px] text-slate-400">{course.instructor.role}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-slate-700">{course.rating}</span>
                          <span className="text-slate-400">({course.students.toLocaleString('vi-VN')})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {course.lessons} bài học
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Become instructor CTA */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-10 text-white text-center">
            <GraduationCap className="w-14 h-14 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-3">Trở thành giảng viên</h2>
            <p className="text-emerald-100 max-w-xl mx-auto mb-6 text-base">
              Chia sẻ kiến thức và kinh nghiệm của bạn. Xây dựng khóa học và giúp hàng nghìn lập trình viên Việt Nam phát triển sự nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tao-khoa-hoc"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <GraduationCap className="w-4 h-4" />
                Tạo khóa học ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/huong-dan-giang-vien"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                Hướng dẫn chi tiết
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
