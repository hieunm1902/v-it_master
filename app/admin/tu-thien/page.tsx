'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Plus, Pencil, Trash2, X, CheckCircle2, Clock } from 'lucide-react';
import type { CharityProject } from '@/lib/data';

const COVER_COLORS = [
  { label: 'Emerald → Teal', value: 'from-emerald-500 to-teal-600' },
  { label: 'Blue → Indigo', value: 'from-blue-500 to-indigo-600' },
  { label: 'Orange → Amber', value: 'from-orange-500 to-amber-600' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-600' },
  { label: 'Red → Rose', value: 'from-red-500 to-rose-600' },
  { label: 'Yellow → Orange', value: 'from-yellow-500 to-orange-500' },
  { label: 'Cyan → Blue', value: 'from-cyan-500 to-blue-600' },
  { label: 'Pink → Rose', value: 'from-pink-500 to-rose-500' },
];

const emptyForm = {
  title: '',
  description: '',
  target: 100_000_000,
  raised: 0,
  beneficiaries: '',
  status: 'active' as CharityProject['status'],
  coverColor: 'from-emerald-500 to-teal-600',
};

type FormState = typeof emptyForm;

function formatVND(n: number) {
  return n.toLocaleString('vi-VN');
}

export default function AdminCharityPage() {
  const [projects, setProjects] = useState<CharityProject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadData() {
    const res = await fetch('/api/admin/charity');
    setProjects(await res.json());
  }

  useEffect(() => { loadData(); }, []);

  function openNew() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(p: CharityProject) {
    setEditId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      target: p.target,
      raised: p.raised,
      beneficiaries: p.beneficiaries,
      status: p.status,
      coverColor: p.coverColor,
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
      target: Number(form.target),
      raised: Number(form.raised),
    };
    try {
      if (editId != null) {
        await fetch(`/api/admin/charity/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/charity', {
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
    await fetch(`/api/admin/charity/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    await loadData();
  }

  function set(k: keyof FormState, v: unknown) {
    setForm(f => ({ ...f, [k]: v }));
  }

  const totalRaised = projects.reduce((s, p) => s + p.raised, 0);
  const totalTarget = projects.reduce((s, p) => s + p.target, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Từ thiện</h1>
          <p className="text-slate-500 text-sm mt-1">{projects.length} dự án — {formatVND(totalRaised)} / {formatVND(totalTarget)} VND</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Thêm dự án mới
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Dự án</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Đã quyên</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Mục tiêu</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Tiến độ</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Trạng thái</th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map(p => {
              const pct = Math.round((p.raised / p.target) * 100);
              return (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${p.coverColor} shrink-0`} />
                      <div>
                        <div className="font-semibold text-slate-800 line-clamp-1">{p.title}</div>
                        <div className="text-xs text-slate-400 line-clamp-1">{p.beneficiaries}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-emerald-600 font-semibold hidden md:table-cell">
                    {formatVND(p.raised)}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">
                    {formatVND(p.target)}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    {p.status === 'active' ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={11} />
                        Hoàn thành
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center py-12 text-slate-400">Chưa có dự án từ thiện nào</div>
        )}
      </div>

      {deleteConfirm != null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Xác nhận xóa</h3>
            <p className="text-slate-500 text-sm mb-6">Dự án sẽ bị xóa vĩnh viễn. Bạn chắc chắn?</p>
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
                {editId != null ? 'Sửa dự án từ thiện' : 'Thêm dự án từ thiện'}
              </h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <Field label="Tên dự án *">
                <input required value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Tên dự án từ thiện" />
              </Field>
              <Field label="Mô tả *">
                <textarea required value={form.description} onChange={e => set('description', e.target.value)} className={inputCls + ' resize-none'} rows={4} />
              </Field>
              <Field label="Đối tượng thụ hưởng">
                <input value={form.beneficiaries} onChange={e => set('beneficiaries', e.target.value)} className={inputCls} placeholder="50 sinh viên tại 5 tỉnh..." />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Mục tiêu (VND)">
                  <input type="number" min={0} value={form.target} onChange={e => set('target', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Đã quyên góp (VND)">
                  <input type="number" min={0} value={form.raised} onChange={e => set('raised', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <Field label="Trạng thái">
                <select value={form.status} onChange={e => set('status', e.target.value)} className={inputCls}>
                  <option value="active">Đang hoạt động</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              </Field>

              <Field label="Cover Color">
                <select value={form.coverColor} onChange={e => set('coverColor', e.target.value)} className={inputCls}>
                  {COVER_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Hủy</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-400 text-white rounded-xl text-sm font-semibold">
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
  'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition';
