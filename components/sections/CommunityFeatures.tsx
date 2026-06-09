import Link from 'next/link';
import { PenSquare, BookOpen, Calendar, Users, Trophy, MessageCircle, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: PenSquare,
    title: 'Viết bài chia sẻ',
    description: 'Chia sẻ kiến thức, kinh nghiệm và giải pháp kỹ thuật của bạn với cộng đồng hơn 12,000 lập trình viên Việt Nam.',
    href: '/bai-viet',
    color: 'bg-blue-50 text-blue-600',
    highlight: 'text-blue-600',
    cta: 'Viết bài ngay',
  },
  {
    icon: BookOpen,
    title: 'Xây dựng khóa học',
    description: 'Tạo khóa học chuyên sâu, từ cơ bản đến nâng cao. Giúp thế hệ IT tiếp theo tiến xa hơn trên con đường sự nghiệp.',
    href: '/khoa-hoc',
    color: 'bg-emerald-50 text-emerald-600',
    highlight: 'text-emerald-600',
    cta: 'Tạo khóa học',
  },
  {
    icon: Calendar,
    title: 'Tổ chức sự kiện',
    description: 'Đăng ký tổ chức workshop, meetup, webinar hay hackathon. V-IT hỗ trợ promotion và logistics cho sự kiện của bạn.',
    href: '/su-kien',
    color: 'bg-orange-50 text-orange-600',
    highlight: 'text-orange-600',
    cta: 'Tổ chức sự kiện',
  },
  {
    icon: MessageCircle,
    title: 'Buổi sharing',
    description: 'Tổ chức buổi chia sẻ trực tuyến về kỹ năng, kinh nghiệm, career path hay một công nghệ mới bạn đang research.',
    href: '/chia-se',
    color: 'bg-violet-50 text-violet-600',
    highlight: 'text-violet-600',
    cta: 'Tạo buổi sharing',
  },
  {
    icon: Users,
    title: 'Kết nối chuyên gia',
    description: 'Xây dựng profile kỹ thuật, kết nối với senior developers, tech leaders và mở rộng network trong ngành IT Việt Nam.',
    href: '/chuyen-gia',
    color: 'bg-pink-50 text-pink-600',
    highlight: 'text-pink-600',
    cta: 'Tìm chuyên gia',
  },
  {
    icon: Trophy,
    title: 'Hackathon & Contest',
    description: 'Tham gia các cuộc thi lập trình, hackathon với giải thưởng hấp dẫn và cơ hội gặp gỡ nhà tuyển dụng hàng đầu.',
    href: '/su-kien?type=hackathon',
    color: 'bg-amber-50 text-amber-600',
    highlight: 'text-amber-600',
    cta: 'Đăng ký thi',
  },
];

export default function CommunityFeatures() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-sm font-semibold text-indigo-600 mb-4">
            ✨ Bạn có thể làm gì trên V-IT?
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Nền tảng toàn diện cho<br className="hidden sm:block" />
            <span className="gradient-text"> cộng đồng IT Việt</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Từ việc đọc bài viết, học khóa học đến tham gia sự kiện — V-IT là nơi học hỏi và kết nối của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, href, color, highlight, cta }) => (
            <div key={title} className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 card-hover">
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5`}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className={`text-lg font-bold text-slate-900 mb-2 group-hover:${highlight} transition-colors`}>
                {title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {description}
              </p>

              <Link
                href={href}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${highlight} hover:gap-2.5 transition-all`}
              >
                {cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
