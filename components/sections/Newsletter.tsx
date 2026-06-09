'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white text-center overflow-hidden">
          {/* Decorations */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-5 mx-auto">
              <Mail className="w-7 h-7 text-white" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-indigo-200 uppercase tracking-wide">Newsletter hàng tuần</span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Không bỏ lỡ bài viết nào
            </h2>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto">
              Nhận tổng hợp bài viết hay nhất, sự kiện sắp diễn ra và tin tức IT mỗi thứ Hai hàng tuần.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 py-4 px-6 bg-white/20 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                <div className="text-left">
                  <p className="font-bold">Đăng ký thành công! 🎉</p>
                  <p className="text-sm text-indigo-200">Cảm ơn bạn. Chúng tôi sẽ gửi email vào thứ Hai tới.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl font-semibold text-sm transition-colors disabled:opacity-70 shrink-0"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? 'Đang gửi...' : 'Đăng ký'}
                </button>
              </form>
            )}

            <p className="text-xs text-indigo-300 mt-4">
              Miễn phí. Không spam. Hủy đăng ký bất kỳ lúc nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
