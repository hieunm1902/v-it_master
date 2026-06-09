import Link from 'next/link';
import { Code2, Heart, Github, Youtube, Facebook, Linkedin, Mail } from 'lucide-react';

const LINKS = {
  platform: [
    { href: '/bai-viet', label: 'Bài viết' },
    { href: '/su-kien', label: 'Sự kiện' },
    { href: '/khoa-hoc', label: 'Khóa học' },
    { href: '/chia-se', label: 'Chia sẻ' },
    { href: '/tu-dien', label: 'Từ điển IT' },
  ],
  community: [
    { href: '/ve-chung-toi', label: 'Về chúng tôi' },
    { href: '/tu-thien', label: 'Từ thiện' },
    { href: '/dien-gia', label: 'Diễn giả' },
    { href: '/doi-tac', label: 'Đối tác' },
    { href: '/tuyen-dung', label: 'Tuyển dụng' },
  ],
  support: [
    { href: '/huong-dan', label: 'Hướng dẫn' },
    { href: '/lien-he', label: 'Liên hệ' },
    { href: '/quy-dinh', label: 'Quy định' },
    { href: '/bao-mat', label: 'Bảo mật' },
    { href: '/cookie', label: 'Cookie Policy' },
  ],
};

const SOCIALS = [
  { href: 'https://github.com', Icon: Github, label: 'GitHub' },
  { href: 'https://facebook.com', Icon: Facebook, label: 'Facebook' },
  { href: 'https://youtube.com', Icon: Youtube, label: 'YouTube' },
  { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">V-IT Community</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Nền tảng cộng đồng IT Việt Nam — nơi chia sẻ kiến thức, kết nối chuyên gia và cùng nhau phát triển. Mọi lợi nhuận dành cho từ thiện.
            </p>

            {/* Charity badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-900/40 border border-emerald-700/50 rounded-lg mb-6">
              <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="text-xs text-emerald-300 font-medium">100% lợi nhuận dành cho từ thiện</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="mailto:hello@v-it.vn"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nền tảng */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Nền tảng</h4>
            <ul className="space-y-2.5">
              {LINKS.platform.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cộng đồng */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Cộng đồng</h4>
            <ul className="space-y-2.5">
              {LINKS.community.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Hỗ trợ</h4>
            <ul className="space-y-2.5">
              {LINKS.support.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © 2026 V-IT Community. Được xây dựng với{' '}
            <Heart className="inline w-3.5 h-3.5 text-red-400 fill-red-400 mx-0.5" />
            bởi cộng đồng IT Việt Nam.
          </p>
          <p className="text-xs">
            Mọi đóng góp đều có ý nghĩa{' '}
            <span className="text-emerald-400 font-medium">💚 Vì một Việt Nam số</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
