import Link from 'next/link';
import { Code2, Heart, Mail } from 'lucide-react';

function IconGithub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
  { href: 'https://github.com/v-it-community', Icon: IconGithub, label: 'GitHub' },
  { href: 'https://facebook.com/vitcommunity', Icon: IconFacebook, label: 'Facebook' },
  { href: 'https://youtube.com/@vitcommunity', Icon: IconYoutube, label: 'YouTube' },
  { href: 'https://linkedin.com/company/vitcommunity', Icon: IconLinkedin, label: 'LinkedIn' },
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
