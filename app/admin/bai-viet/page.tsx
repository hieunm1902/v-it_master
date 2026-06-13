'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Pencil, Trash2, X, Star, StarOff, FileText, Loader2 } from 'lucide-react';
import type { Article, Author } from '@/lib/data';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="border border-slate-300 rounded-xl h-48 bg-slate-50 animate-pulse" />,
});

const CATEGORIES = ['Frontend', 'Backend', 'AI/ML', 'DevOps', 'Mobile', 'Security'];

const COVER_COLORS = [
  { label: 'Blue → Indigo', value: 'from-blue-500 to-indigo-600' },
  { label: 'Purple → Pink', value: 'from-purple-500 to-pink-600' },
  { label: 'Cyan → Blue', value: 'from-cyan-500 to-blue-600' },
  { label: 'Emerald → Teal', value: 'from-emerald-500 to-teal-600' },
  { label: 'Orange → Red', value: 'from-orange-500 to-red-500' },
  { label: 'Red → Rose', value: 'from-red-500 to-rose-600' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-600' },
  { label: 'Blue → Violet', value: 'from-blue-400 to-violet-500' },
  { label: 'Teal → Cyan', value: 'from-teal-500 to-cyan-600' },
  { label: 'Sky → Blue', value: 'from-sky-500 to-blue-600' },
  { label: 'Yellow → Orange', value: 'from-yellow-500 to-orange-500' },
];

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Frontend',
  tags: '',
  readTime: 5,
  date: new Date().toISOString().slice(0, 10),
  featured: false,
  coverIcon: '📝',
  coverColor: 'from-blue-500 to-indigo-600',
  authorId: 1,
  views: 0,
  likes: 0,
};

type FormState = typeof emptyForm;

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const pdfInputRef = useRef<HTMLInputElement>(null);

  async function loadData() {
    const artRes = await fetch('/api/admin/articles');
    setArticles(await artRes.json());
  }

  useEffect(() => {
    loadData();
    import('@/lib/data').then(m => setAuthors(m.authors));
  }, []);

  function openNew() {
    setEditId(null);
    setForm(emptyForm);
    setEditorKey(k => k + 1);
    setPdfError('');
    setShowForm(true);
  }

  function openEdit(a: Article) {
    setEditId(a.id);
    setForm({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      content: a.content ?? '',
      category: a.category,
      tags: a.tags.join(', '),
      readTime: a.readTime,
      date: a.date,
      featured: a.featured,
      coverIcon: a.coverIcon,
      coverColor: a.coverColor,
      authorId: a.author.id,
      views: a.views,
      likes: a.likes,
    });
    setEditorKey(k => k + 1);
    setPdfError('');
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
  }

  async function handlePdfImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setPdfLoading(true);
    setPdfError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/parse-pdf', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định');
      const html = data.text
        .split(/\n{2,}/)
        .map((p: string) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
        .join('');
      set('content', html);
      setEditorKey(k => k + 1);
    } catch (err) {
      setPdfError(String(err instanceof Error ? err.message : err));
    } finally {
      setPdfLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const author = authors.find(au => au.id === Number(form.authorId));
    const contentVal = form.content && form.content !== '<p></p>' ? form.content : null;
    const payload = {
      ...form,
      content: contentVal,
      readTime: Number(form.readTime),
      views: Number(form.views),
      likes: Number(form.likes),
      authorId: undefined,
      author: author ?? authors[0],
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editId != null) {
        await fetch(`/api/admin/articles/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/articles', {
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
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    await loadData();
  }

  function set(k: keyof FormState, v: unknown) {
    setForm(f => ({ ...f, [k]: v }));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Bài viết</h1>
          <p className="text-slate-500 text-sm mt-1">{articles.length} bài viết</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Thêm bài viết mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 w-8">ID</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Tiêu đề</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Danh mục</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Ngày</th>
              <th className="text-center px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Nổi bật</th>
              <th className="text-center px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Nội dung</th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map(a => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{a.id}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.coverColor} flex items-center justify-center text-sm shrink-0`}>
                      {a.coverIcon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 line-clamp-1">{a.title}</div>
                      <div className="text-xs text-slate-400">{a.author.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {a.category}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">{a.date}</td>
                <td className="px-5 py-3.5 text-center hidden md:table-cell">
                  {a.featured
                    ? <Star className="w-4 h-4 fill-amber-400 text-amber-400 mx-auto" />
                    : <StarOff className="w-4 h-4 text-slate-300 mx-auto" />}
                </td>
                <td className="px-5 py-3.5 text-center hidden lg:table-cell">
                  {a.content
                    ? <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-medium">Có nội dung</span>
                    : <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full">Trống</span>}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => openEdit(a)}
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Sửa"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(a.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="text-center py-12 text-slate-400">Chưa có bài viết nào</div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteConfirm != null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Xác nhận xóa</h3>
            <p className="text-slate-500 text-sm mb-6">Bài viết sẽ bị xóa vĩnh viễn. Bạn chắc chắn?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form panel */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end">
          <div className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-slate-900 text-lg">
                {editId != null ? 'Sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <Field label="Tiêu đề *">
                <input
                  required
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  className={inputCls}
                  placeholder="Tiêu đề bài viết"
                />
              </Field>

              <Field label="Slug *">
                <input
                  required
                  value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  className={inputCls}
                  placeholder="url-slug-bai-viet"
                />
              </Field>

              <Field label="Tóm tắt *">
                <textarea
                  required
                  value={form.excerpt}
                  onChange={e => set('excerpt', e.target.value)}
                  className={inputCls + ' resize-none'}
                  rows={3}
                  placeholder="Mô tả ngắn về bài viết..."
                />
              </Field>

              {/* Content editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Nội dung bài viết</label>
                  <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${pdfLoading ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'}`}>
                    {pdfLoading
                      ? <><Loader2 size={13} className="animate-spin" /> Đang đọc PDF...</>
                      : <><FileText size={13} /> Import từ PDF</>}
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={handlePdfImport}
                      disabled={pdfLoading}
                    />
                  </label>
                </div>
                {pdfError && (
                  <p className="text-xs text-red-600 mb-2 bg-red-50 px-3 py-2 rounded-lg">{pdfError}</p>
                )}
                <RichTextEditor
                  key={`editor-${editId ?? 'new'}-${editorKey}`}
                  value={form.content}
                  onChange={v => set('content', v)}
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  Hỗ trợ tiêu đề, in đậm, in nghiêng, danh sách, trích dẫn, khối code, v.v.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Danh mục">
                  <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Thời gian đọc (phút)">
                  <input
                    type="number"
                    min={1}
                    value={form.readTime}
                    onChange={e => set('readTime', e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Tags (phân cách bằng dấu phẩy)">
                <input
                  value={form.tags}
                  onChange={e => set('tags', e.target.value)}
                  className={inputCls}
                  placeholder="React, TypeScript, Performance"
                />
              </Field>

              <Field label="Ngày đăng">
                <input
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                  className={inputCls}
                />
              </Field>

              <Field label="Cover Icon (emoji)">
                <input
                  value={form.coverIcon}
                  onChange={e => set('coverIcon', e.target.value)}
                  className={inputCls}
                  placeholder="⚛️"
                />
              </Field>

              <Field label="Cover Color">
                <select value={form.coverColor} onChange={e => set('coverColor', e.target.value)} className={inputCls}>
                  {COVER_COLORS.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>

              <Field label="Tác giả">
                <select
                  value={form.authorId}
                  onChange={e => set('authorId', Number(e.target.value))}
                  className={inputCls}
                >
                  {authors.map(au => (
                    <option key={au.id} value={au.id}>{au.name}</option>
                  ))}
                </select>
              </Field>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => set('featured', e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                  Bài viết nổi bật (Featured)
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl text-sm font-semibold transition-colors"
                >
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
  'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
