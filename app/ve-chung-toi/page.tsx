import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { authors, communityStats, charityProjects } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import {
  Heart, Code2, Users, Target, Globe,
  Mail, ArrowRight,
  CheckCircle2, TrendingUp, BookOpen, Calendar,
  Lightbulb, Shield, Handshake,
} from 'lucide-react';

function IconGithub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export const metadata = {
  title: 'Về chúng tôi',
  description: 'Tìm hiểu về cộng đồng V-IT và sứ mệnh vì Việt Nam số',
};

const CORE_VALUES = [
  {
    icon: Lightbulb,
    title: 'Học hỏi không ngừng',
    description: 'Chúng tôi tin rằng kiến thức là nền tảng của mọi sự phát triển. V-IT tạo ra môi trường để mọi người liên tục học hỏi và chia sẻ.',
    color: 'text-yellow-600 bg-yellow-50',
  },
  {
    icon: Handshake,
    title: 'Kết nối & Hỗ trợ',
    description: 'IT Việt Nam mạnh hơn khi chúng ta hỗ trợ nhau. Không có sự cạnh tranh, chỉ có sự hợp tác cùng phát triển.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Minh bạch & Trung thực',
    description: 'Mọi hoạt động, thu chi, và quyết định đều được công khai minh bạch với cộng đồng. Chúng tôi không có gì để giấu.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Heart,
    title: 'Phi lợi nhuận',
    description: '100% lợi nhuận từ hoạt động của V-IT được dùng cho từ thiện và giáo dục. Đây không phải slogan — đây là cam kết.',
    color: 'text-red-600 bg-red-50',
  },
];

const MILESTONES = [
  { year: '2023', title: 'Thành lập V-IT', desc: 'Ra mắt platform với 50 thành viên sáng lập từ khắp Việt Nam.' },
  { year: '2024', title: '1,000 thành viên', desc: 'Cộng đồng phát triển nhanh chóng, tổ chức sự kiện đầu tiên tại Hà Nội.' },
  { year: '2024', title: 'Quỹ từ thiện đầu tiên', desc: 'Tặng 50 laptop cho sinh viên nghèo có năng lực học IT.' },
  { year: '2025', title: '5,000 thành viên', desc: 'Mở rộng sang 10 tỉnh thành, ra mắt nền tảng khóa học.' },
  { year: '2025', title: '100 triệu VND từ thiện', desc: 'Hoàn thành mục tiêu quyên góp và hỗ trợ đầu tiên.' },
  { year: '2026', title: '12,000+ thành viên', desc: 'Nền tảng cộng đồng lớn nhất Việt Nam về IT.' },
];

export default function AboutPage() {
  const totalRaised = charityProjects.reduce((s, p) => s + p.raised, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 mx-auto">
              <Code2 className="w-8 h-8 text-indigo-300" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight">
              Về{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                V-IT Community
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Chúng tôi là một cộng đồng phi lợi nhuận gồm những lập trình viên, kỹ sư và người đam mê công nghệ từ khắp Việt Nam — cùng nhau học hỏi, chia sẻ và làm cho IT Việt Nam mạnh hơn.
            </p>
            <div className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 font-semibold text-sm mx-auto w-fit">
              <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              Phi lợi nhuận · 100% lợi nhuận cho từ thiện
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-3">Sứ mệnh</h2>
              <p className="text-slate-600 leading-relaxed">
                Xây dựng nền tảng cộng đồng IT lớn mạnh nhất Việt Nam — nơi mọi lập trình viên, từ người mới bắt đầu đến senior engineer, đều có thể học hỏi, chia sẻ và phát triển. Đồng thời, dùng sức mạnh của cộng đồng để tạo ra tác động xã hội tích cực thông qua các chương trình từ thiện và giáo dục.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-3">Tầm nhìn</h2>
              <p className="text-slate-600 leading-relaxed">
                Đến năm 2030, V-IT sẽ trở thành trung tâm kết nối IT hàng đầu Đông Nam Á, với 100,000+ thành viên và tác động trực tiếp đến việc nâng cao chất lượng kỹ sư IT Việt Nam. Chúng tôi tin vào một Việt Nam số — nơi mọi người dân đều có cơ hội tiếp cận với công nghệ và giáo dục chất lượng.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {[
              { value: communityStats.members.toLocaleString('vi-VN') + '+', label: 'Thành viên', icon: '👥' },
              { value: communityStats.articles + '+', label: 'Bài viết', icon: '📝' },
              { value: communityStats.events + '+', label: 'Sự kiện', icon: '📅' },
              { value: communityStats.courses + '+', label: 'Khóa học', icon: '🎓' },
              { value: communityStats.cities + '', label: 'Tỉnh thành', icon: '🗺️' },
              { value: formatCurrency(totalRaised), label: 'VND từ thiện', icon: '💚' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Core values */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Giá trị cốt lõi</h2>
              <p className="text-slate-500">Những nguyên tắc định hướng mọi hoạt động của V-IT</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CORE_VALUES.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Đội ngũ cốt lõi</h2>
              <p className="text-slate-500">Những người tâm huyết đằng sau V-IT Community</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {authors.map(author => (
                <div key={author.id} className="bg-white rounded-2xl border border-slate-200 p-5 text-center hover:shadow-lg hover:border-indigo-200 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-lg font-black text-white mx-auto mb-3 group-hover:scale-105 transition-transform">
                    {author.avatar}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight mb-0.5">{author.name}</h4>
                  <p className="text-xs text-indigo-600 font-medium mb-1">{author.role}</p>
                  <p className="text-xs text-slate-400 mb-3">{author.company}</p>
                  <div className="flex justify-center gap-2">
                    {author.github && (
                      <a href={`https://github.com/${author.github}`} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <IconGithub className="w-3.5 h-3.5 text-slate-600" />
                      </a>
                    )}
                    {author.linkedin && (
                      <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <IconLinkedin className="w-3.5 h-3.5 text-slate-600" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Hành trình của V-IT</h2>
              <p className="text-slate-500">Từ một nhóm nhỏ đến cộng đồng IT lớn nhất Việt Nam</p>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
              <div className="space-y-8">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="relative flex gap-6 pl-16">
                    <div className="absolute left-5 top-1.5 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow-md flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-slate-200 p-5">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{m.year}</span>
                        <h4 className="font-bold text-slate-900">{m.title}</h4>
                      </div>
                      <p className="text-sm text-slate-500">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Join */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white">
              <Users className="w-10 h-10 text-indigo-200 mb-4" />
              <h3 className="text-xl font-black mb-3">Tham gia cộng đồng</h3>
              <p className="text-indigo-200 mb-6 text-sm leading-relaxed">
                Tham gia V-IT miễn phí. Viết bài, tạo khóa học, tổ chức sự kiện và kết nối với hàng nghìn lập trình viên Việt Nam.
              </p>
              <Link href="/tham-gia" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-sm">
                Tham gia ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <Mail className="w-10 h-10 text-slate-400 mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-3">Liên hệ với chúng tôi</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Có câu hỏi, muốn hợp tác hoặc đóng góp cho quỹ từ thiện? Chúng tôi luôn sẵn sàng lắng nghe.
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <p>📧 hello@v-it.vn</p>
                <p>💬 Facebook: facebook.com/vitcommunity</p>
                <p>🐙 GitHub: github.com/v-it-community</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
