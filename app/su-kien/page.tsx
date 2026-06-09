import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { events } from '@/lib/data';
import { formatDate, formatDateLong } from '@/lib/utils';
import {
  Calendar, MapPin, Users, Globe, Clock,
  Plus, Search, Filter, Zap, CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Sự kiện IT',
  description: 'Hội nghị, workshop, meetup và hackathon IT tại Việt Nam',
};

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  conference: { label: 'Hội nghị',  color: 'text-indigo-700', bg: 'bg-indigo-100 border-indigo-200' },
  workshop:   { label: 'Workshop',  color: 'text-emerald-700', bg: 'bg-emerald-100 border-emerald-200' },
  meetup:     { label: 'Meetup',    color: 'text-orange-700',  bg: 'bg-orange-100 border-orange-200' },
  hackathon:  { label: 'Hackathon', color: 'text-red-700',    bg: 'bg-red-100 border-red-200' },
  webinar:    { label: 'Webinar',   color: 'text-sky-700',    bg: 'bg-sky-100 border-sky-200' },
  sharing:    { label: 'Sharing',   color: 'text-violet-700', bg: 'bg-violet-100 border-violet-200' },
};

const EVENT_FILTERS = ['Tất cả', 'Hội nghị', 'Workshop', 'Meetup', 'Hackathon', 'Webinar', 'Sharing'];

export default function EventsPage() {
  const upcoming = events.filter(e => new Date(e.date) >= new Date());
  const total = events.length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">

        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Sự kiện IT Việt Nam</h1>
                <p className="text-slate-500">
                  {total} sự kiện — hội nghị, workshop, hackathon và nhiều hơn nữa
                </p>
              </div>
              <Link
                href="/su-kien/tao-moi"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                <Plus className="w-4 h-4" />
                Tạo sự kiện
              </Link>
            </div>

            {/* Search + filter */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                Lọc theo địa điểm
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Event type filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {EVENT_FILTERS.map(f => (
              <button
                key={f}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  f === 'Tất cả'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Sự kiện sắp diễn ra', value: upcoming.length, icon: '📅' },
              { label: 'Sự kiện Online', value: events.filter(e => e.isOnline).length, icon: '🌐' },
              { label: 'Miễn phí', value: events.filter(e => e.price === 'free').length, icon: '🎁' },
              { label: 'Tổng đăng ký', value: events.reduce((s, e) => s + e.registeredCount, 0).toLocaleString('vi-VN'), icon: '👥' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {events.map(event => {
              const tc = TYPE_CONFIG[event.type] ?? { label: event.type, color: 'text-slate-700', bg: 'bg-slate-100 border-slate-200' };
              const fillPct = Math.round((event.registeredCount / event.capacity) * 100);
              const isAlmostFull = fillPct >= 80 && fillPct < 100;
              const isFull = fillPct >= 100;

              return (
                <div key={event.id} className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden flex flex-col">

                  {/* Top gradient */}
                  <div className={`h-1.5 bg-gradient-to-r ${event.coverColor}`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${tc.bg} ${tc.color}`}>
                        {tc.label}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${event.price === 'free' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {event.price === 'free' ? '🎁 Miễn phí' : `💰 ${(event.priceAmount! / 1000).toFixed(0)}k VND`}
                      </span>
                      {event.isOnline && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-sky-50 text-sky-600 border border-sky-200">
                          <Globe className="w-3 h-3" /> Online
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link href={`/su-kien/${event.slug}`}>
                      <h3 className={`text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2 leading-snug line-clamp-2 ${tc.color}`}>
                        {event.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event info */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{formatDate(event.date)} · {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="truncate">
                          {event.isOnline ? 'Online' : event.location}
                          {!event.isOnline && event.venue && ` · ${event.venue}`}
                        </span>
                      </div>
                    </div>

                    {/* Speakers */}
                    {event.speakers.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          {event.speakers.slice(0, 3).map(s => (
                            <div key={s.name} title={s.name} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                              {s.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">{event.speakers.length} diễn giả</span>
                        {event.speakers.length > 0 && (
                          <span className="text-xs text-slate-400">· {event.speakers[0].name}</span>
                        )}
                      </div>
                    )}

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {event.registeredCount.toLocaleString('vi-VN')} / {event.capacity.toLocaleString('vi-VN')}
                        </span>
                        {isAlmostFull && <span className="text-orange-600 font-semibold flex items-center gap-1"><Zap className="w-3 h-3" /> Sắp đầy!</span>}
                        {isFull && <span className="text-red-600 font-semibold">Hết chỗ</span>}
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isFull ? 'bg-red-500' : isAlmostFull ? 'bg-orange-500' : 'bg-indigo-500'}`}
                          style={{ width: `${Math.min(fillPct, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Register button */}
                    <Link
                      href={`/su-kien/${event.slug}`}
                      className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isFull
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isFull ? 'Hết chỗ' : event.price === 'free' ? 'Đăng ký miễn phí' : 'Đăng ký tham gia'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
