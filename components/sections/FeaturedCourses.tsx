import Link from 'next/link';
import { Star, Users, Clock, BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import { getCourses } from '@/lib/store';

const LEVEL_COLORS = {
  Beginner:     'bg-green-100 text-green-700 border-green-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced:     'bg-red-100 text-red-700 border-red-200',
};

export default function FeaturedCourses() {
  const featured = getCourses().slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Khóa học nổi bật</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Học từ chuyên gia thực chiến</h2>
            <p className="text-slate-500 mt-1.5">Khóa học được xây dựng bởi engineers có nhiều năm kinh nghiệm</p>
          </div>
          <Link
            href="/khoa-hoc"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(course => (
            <Link key={course.id} href={`/khoa-hoc/${course.slug}`} className="group block">
              <div className="h-full rounded-2xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 overflow-hidden">
                {/* Cover */}
                <div className={`h-44 bg-gradient-to-br ${course.coverColor} flex items-center justify-center relative`}>
                  <GraduationCap className="w-16 h-16 text-white/80" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${LEVEL_COLORS[course.level]}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${course.price === 'free' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-800'}`}>
                      {course.price === 'free' ? 'Miễn phí' : `${(course.priceAmount! / 1000).toFixed(0)}k`}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description}</p>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                      {course.instructor.avatar}
                    </div>
                    <span className="text-xs text-slate-600 font-medium">{course.instructor.name}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-slate-700">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{course.students.toLocaleString('vi-VN')} học viên</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{course.lessons} bài</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Khám phá tất cả khóa học
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
