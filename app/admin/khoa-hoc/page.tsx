'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import type { Course, Author } from '@/lib/data';

const CATEGORIES = ['Frontend', 'Backend', 'AI/ML', 'DevOps', 'Mobile', 'Security'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

const COVER_COLORS = [
  { label: 'Blue → Indigo', value: 'from-blue-500 to-indigo-600' },
  { label: 'Purple → Pink', value: 'from-purple-500 to-pink-600' },
  { label: 'Cyan → Teal', value: 'from-cyan-500 to-teal-600' },
  { label: 'Emerald → Green', value: 'from-emerald-500 to-green-600' },
  { label: 'Sky → Blue', value: 'from-sky-400 to-blue-500' },
  { label: 'Red → Rose', value: 'from-red-500 to-rose-600' },
  { label: 'Orange → Amber', value: 'from-orange-500 to-amber-600' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-600' },
];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 border-green-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced: 'bg-red-100 text-red-700 border-red-200',
};

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  category: 'Frontend',
  level: 'Beginner' as Course['level'],
  duration: '20 giờ',
  lessons: 40,
  price: 'free' as 'free' | 'paid',
  priceAmount: 0,
  tags: '',
  coverColor: 'from-blue-500 to-indigo-600',
  instructorId: 1,
  students: 0,
  rating: 5.0,
  updatedAt: new Date().toISOString().slice(0, 10),
};

type FormState = typeof emptyForm;

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  async function loadData() {
    const res = await fetch('/api/admin/courses');
    setCourses(await res.json());
  }

  useEffect(() => {
    loadData();
    import('@/lib/data').then(m => setAuthors(m.authors));
  }, []);

  function openNew() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(c: Course) {
    setEditId(c.id);
    setForm({
      title: c.title,
      slug: c.slug,
      description: c.description,
      category: c.category,
      level: c.level,
      duration: c.duration,
      lessons: c.lessons,
      price: c.price,
      priceAmount: c.priceAmount ?? 0,
      tags: c.tags.join(', '),
      coverColor: c.coverColor,
      instructorId: c.instructor.id,
      students: c.students,
      rating: c.rating,
      updatedAt: c.updatedAt,
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
    const instructor = authors.find(a => a.id === Number(form.instructorId)) ?? authors[0];
    const payload = {
      ...form,
      lessons: Number(form.lessons),
      students: Number(form.students),
      rating: Number(form.rating),
      priceAmount: form.price === 'paid' ? Number(form.priceAmount) : undefined,
      instructorId: undefined,
      instructor,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editId != null) {
        await fetch(`/api/admin/courses/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/courses', {
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
    await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
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
          <h1 className="text-2xl font-black text-slate-900">Khóa học</h1>
          <p className="text-slate-500 text-sm mt-1">{courses.length} khóa học</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Thêm khóa học mới
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Tên khóa học</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Danh mục</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Cấp độ</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Học viên</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Đánh giá</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Giá</th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.coverColor} shrink-0`} />
                    <div>
                      <div className="font-semibold text-slate-800 line-clamp-1">{c.title}</div>
                      <div className="text-xs text-slate-400">{c.instructor.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {c.category}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${LEVEL_COLORS[c.level]}`}>
                    {c.level}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">
                  {c.students.toLocaleString('vi-VN')}
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
                    <Star size={12} className="fill-amber-400" />
                    {c.rating}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className={`text-xs font-semibold ${c.price === 'free' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {c.price === 'free' ? 'Miễn phí' : `${((c.priceAmount ?? 0) / 1000).toFixed(0)}k`}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setDeleteConfirm(c.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <div className="text-center py-12 text-slate-400">Chưa có khóa học nào</div>
        )}
      </div>

      {deleteConfirm != null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Xác nhận xóa</h3>
            <p className="text-slate-500 text-sm mb-6">Khóa học sẽ bị xóa vĩnh viễn. Bạn chắc chắn?</p>
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
                {editId != null ? 'Sửa khóa học' : 'Thêm khóa học mới'}
              </h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <Field label="Tên khóa học *">
                <input required value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Tên khóa học" />
              </Field>
              <Field label="Slug *">
                <input required value={form.slug} onChange={e => set('slug', e.target.value)} className={inputCls} placeholder="url-slug-khoa-hoc" />
              </Field>
              <Field label="Mô tả *">
                <textarea required value={form.description} onChange={e => set('description', e.target.value)} className={inputCls + ' resize-none'} rows={3} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Danh mục">
                  <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Cấp độ">
                  <select value={form.level} onChange={e => set('level', e.target.value)} className={inputCls}>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Thời lượng">
                  <input value={form.duration} onChange={e => set('duration', e.target.value)} className={inputCls} placeholder="40 giờ" />
                </Field>
                <Field label="Số bài học">
                  <input type="number" min={1} value={form.lessons} onChange={e => set('lessons', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Giá">
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
                <input value={form.tags} onChange={e => set('tags', e.target.value)} className={inputCls} placeholder="React, TypeScript" />
              </Field>

              <Field label="Cover Color">
                <select value={form.coverColor} onChange={e => set('coverColor', e.target.value)} className={inputCls}>
                  {COVER_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>

              <Field label="Giảng viên">
                <select value={form.instructorId} onChange={e => set('instructorId', Number(e.target.value))} className={inputCls}>
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Số học viên">
                  <input type="number" min={0} value={form.students} onChange={e => set('students', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Đánh giá (1-5)">
                  <input type="number" min={1} max={5} step={0.1} value={form.rating} onChange={e => set('rating', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <Field label="Cập nhật lần cuối">
                <input type="date" value={form.updatedAt} onChange={e => set('updatedAt', e.target.value)} className={inputCls} />
              </Field>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Hủy</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-xl text-sm font-semibold">
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
  'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition';
