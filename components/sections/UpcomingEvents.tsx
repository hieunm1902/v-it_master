import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight, Globe, Zap } from 'lucide-react';
import { getEvents } from '@/lib/store';
import { formatDate } from '@/lib/utils';

const EVENT_TYPE_COLORS: Record<string, string> = {
  conference: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  workshop:   'bg-emerald-100 text-emerald-700 border-emerald-200',
  meetup:     'bg-orange-100 text-orange-700 border-orange-200',
  hackathon:  'bg-red-100 text-red-700 border-red-200',
  webinar:    'bg-sky-100 text-sky-700 border-sky-200',
  sharing:    'bg-violet-100 text-violet-700 border-violet-200',
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  conference: 'Hội nghị',
  workshop:   'Workshop',
  meetup:     'Meetup',
  hackathon:  'Hackathon',
  webinar:    'Webinar',
  sharing:    'Sharing',
};

export default function UpcomingEvents() {
  const upcoming = getEvents().slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Sự kiện sắp diễn ra</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Tham gia & Kết nối</h2>
            <p className="text-slate-500 mt-1.5">Sự kiện IT trực tiếp và trực tuyến trên toàn quốc</p>
          </div>
          <Link
            href="/su-kien"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcoming.map((event) => {
            const typeColor = EVENT_TYPE_COLORS[event.type] ?? 'bg-slate-100 text-slate-600 border-slate-200';
            const typeLabel = EVENT_TYPE_LABELS[event.type] ?? event.type;
            const fillPct = Math.round((event.registeredCount / event.capacity) * 100);
            const isFull = fillPct >= 100;
            const isAlmostFull = fillPct >= 80 && !isFull;

            return (
              <Link key={event.id} href={`/su-kien/${event.slug}`} className="group block">
                <div className="h-full rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden">
                  {/* Top color strip */}
                  <div className={`h-2 bg-gradient-to-r ${event.coverColor}`} />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${typeColor}`}>
                          {typeLabel}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${event.price === 'free' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {event.price === 'free' ? 'Miễn phí' : `${(event.priceAmount! / 1000).toFixed(0)}k VND`}
                        </span>
                      </div>
                      {event.isOnline && (
                        <span className="flex items-center gap-1 text-xs text-sky-600 bg-sky-50 border border-sky-200 px-2 py-1 rounded-full shrink-0">
                          <Globe className="w-3 h-3" /> Online
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug mb-3 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-col gap-2 mb-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{formatDate(event.date)} • {event.time}</span>
                        {event.endDate && <span className="text-slate-400">→ {formatDate(event.endDate)}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{event.isOnline ? event.location : `${event.venue ?? ''}, ${event.location}`}</span>
                      </div>
                    </div>

                    {/* Speakers */}
                    {event.speakers.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          {event.speakers.slice(0, 3).map((s) => (
                            <div key={s.name} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white" title={s.name}>
                              {s.avatar}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">
                          {event.speakers.length} diễn giả
                        </span>
                      </div>
                    )}

                    {/* Registration bar */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.registeredCount.toLocaleString('vi-VN')} / {event.capacity.toLocaleString('vi-VN')} đăng ký</span>
                      </div>
                      {isAlmostFull && (
                        <span className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Sắp đầy
                        </span>
                      )}
                      {isFull && (
                        <span className="text-xs text-red-600 font-semibold">Hết chỗ</span>
                      )}
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : isAlmostFull ? 'bg-orange-500' : 'bg-indigo-500'}`}
                        style={{ width: `${Math.min(fillPct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/su-kien"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Xem tất cả sự kiện
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
