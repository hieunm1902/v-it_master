'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Plus, Pencil, Trash2, X, Globe } from 'lucide-react';
import type { Event } from '@/lib/data';

const EVENT_TYPES = ['conference', 'workshop', 'meetup', 'hackathon', 'webinar', 'sharing'] as const;
const EVENT_TYPE_LABELS: Record<string, string> = {
  conference: 'Hội nghị',
  workshop: 'Workshop',
  meetup: 'Meetup',
  hackathon: 'Hackathon',
  webinar: 'Webinar',
  sharing: 'Sharing',
};

const COVER_COLORS = [
  { label: 'Indigo → Purple', value: 'from-indigo-600 to-purple-700' },
  { label: 'Emerald → Teal', value: 'from-emerald-500 to-teal-600' },
  { label: 'Orange → Amber', value: 'from-orange-500 to-amber-600' },
  { label: 'Red → Rose', value: 'from-red-500 to-rose-600' },
  { label: 'Yellow → Orange', value: 'from-yellow-500 to-orange-500' },
  { label: 'Sky → Blue', value: 'from-sky-500 to-blue-600' },
  { label: 'Blue → Indigo', value: 'from-blue-500 to-indigo-600' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-600' },
];

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  type: 'meetup' as Event['type'],
  date: new Date().toISOString().slice(0, 10),
  endDate: '',
  time: '18:00',
  location: '',
  venue: '',
  isOnline: false,
  capacity: 100,
  price: 'free' as 'free' | 'paid',
  priceAmount: 0,
  tags: '',
  coverColor: 'from-indigo-600 to-purple-700',
  organizer: 'Vietnam IT Community',
  speakers: [] as { name: string; role: string; avatar: string }[],
  registeredCount: 0,
};

type FormState = typeof emptyForm;

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadData() {
    const res = await fetch('/api/admin/events');
    setEvents(await res.json());
  }

  useEffect(() => { loadData(); }, []);

  function openNew() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(ev: Event) {
    setEditId(ev.id);
    setForm({
      title: ev.title,
      slug: ev.slug,
      description: ev.description,
      type: ev.type,
      date: ev.date,
      endDate: ev.endDate ?? '',
      time: ev.time,
      location: ev.location,
      venue: ev.venue ?? '',
      isOnline: ev.isOnline,
      capacity: ev.capacity,
      price: ev.price,
      priceAmount: ev.priceAmount ?? 0,
      tags: ev.tags.join(', '),
      coverColor: ev.coverColor,
      organizer: ev.organizer,
      speakers: ev.speakers,
      registeredCount: ev.registeredCount,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      capacity: Number(form.capacity),
      priceAmount: form.price === 'paid' ? Number(form.priceAmount) : undefined,
      registeredCount: Number(form.registeredCount),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      endDate: form.endDate || undefined,
      venue: form.venue || undefined,
    };
    try {
      if (editId != null) {
        await fetch(`/api/admin/events/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      await loadData();
      closeForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    await loadData();
  }

  function set(k: keyof FormState, v: unknown) {
    setForm(f => ({ ...f, [k]: v }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Sự kiện</h1>
          <p className="text-slate-500 text-sm mt-1">{events.length} sự kiện</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Thêm sự kiện mới
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Tên sự kiện</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Loại</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Ngày</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Địa điểm</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Giá</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Đăng ký</th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map(ev => (
              <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${ev.coverColor} shrink-0`} />
                    <div>
                      <div className="font-semibold text-slate-800 line-clamp-1">{ev.title}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        {ev.isOnline && <Globe size={10} />}
                        {ev.isOnline ? 'Online' : ev.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {EVENT_TYPE_LABELS[ev.type] ?? ev.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">{ev.date}</td>
                <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell truncate max-w-[180px]">
                  {ev.venue ?? ev.location}
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className={`text-xs font-semibold ${ev.price === 'free' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {ev.price === 'free' ? 'Miễn phí' : `${((ev.priceAmount ?? 0) / 1000).toFixed(0)}k`}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">
                  {ev.registeredCount}/{ev.capacity}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => openEdit(ev)}
                      className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(ev.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="text-center py-12 text-slate-400">Chưa có sự kiện nào</div>
        )}
      </div>

      {deleteConfirm != null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Xác nhận xóa</h3>
            <p className="text-slate-500 text-sm mb-6">Sự kiện sẽ bị xóa vĩnh viễn. Bạn chắc chắn?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Xóa</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-slate-900 text-lg">
                {editId != null ? 'Sửa sự kiện' : 'Thêm sự kiện mới'}
              </h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <Field label="Tên sự kiện *">
                <input required value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Tên sự kiện" />
              </Field>
              <Field label="Slug *">
                <input required value={form.slug} onChange={e => set('slug', e.target.value)} className={inputCls} placeholder="url-slug-su-kien" />
              </Field>
              <Field label="Mô tả *">
                <textarea required value={form.description} onChange={e => set('description', e.target.value)} className={inputCls + ' resize-none'} rows={3} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Loại sự kiện">
                  <select value={form.type} onChange={e => set('type', e.target.value)} className={inputCls}>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{EVENT_TYPE_LABELS[t]}</option>)}
                  </select>
                </Field>
                <Field label="Ngày bắt đầu">
                  <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Ngày kết thúc (tuỳ chọn)">
                  <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Giờ">
                  <input type="time" value={form.time} onChange={e => set('time', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <Field label="Địa điểm / Thành phố">
                <input value={form.location} onChange={e => set('location', e.target.value)} className={inputCls} placeholder="TP. Hồ Chí Minh" />
              </Field>
              <Field label="Venue (tuỳ chọn)">
                <input value={form.venue} onChange={e => set('venue', e.target.value)} className={inputCls} placeholder="Tên tòa nhà, địa chỉ..." />
              </Field>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="isOnline" checked={form.isOnline} onChange={e => set('isOnline', e.target.checked)} className="w-4 h-4 rounded accent-indigo-600" />
                <label htmlFor="isOnline" className="text-sm font-medium text-slate-700">Sự kiện Online</label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Sức chứa">
                  <input type="number" min={1} value={form.capacity} onChange={e => set('capacity', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Đã đăng ký">
                  <input type="number" min={0} value={form.registeredCount} onChange={e => set('registeredCount', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Giá vé">
                  <select value={form.price} onChange={e => set('price', e.target.value)} className={inputCls}>
                    <option value="free">Miễn phí</option>
                    <option value="paid">Trả phí</option>
                  </select>
                </Field>
                {form.price === 'paid' && (
                  <Field label="Giá (VND)">
                    <input type="number" min={0} value={form.priceAmount} onChange={e => set('priceAmount', e.target.value)} className={inputCls} />
                  </Field>
                )}
              </div>

              <Field label="Tags (phân cách bằng dấu phẩy)">
                <input value={form.tags} onChange={e => set('tags', e.target.value)} className={inputCls} placeholder="AI, Workshop, Online" />
              </Field>

              <Field label="Cover Color">
                <select value={form.coverColor} onChange={e => set('coverColor', e.target.value)} className={inputCls}>
                  {COVER_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>

              <Field label="Ban tổ chức">
                <input value={form.organizer} onChange={e => set('organizer', e.target.value)} className={inputCls} />
              </Field>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Hủy</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white rounded-xl text-sm font-semibold">
                  {saving ? 'Đang lưu...' : editId != null ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition';
