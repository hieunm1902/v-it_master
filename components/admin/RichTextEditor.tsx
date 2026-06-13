'use client';

import { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Code, List, ListOrdered,
  Heading2, Heading3, Quote, Minus, Undo, Redo, Code2,
  ImagePlus, Link2, Upload, X,
} from 'lucide-react';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Nội dung bài viết...' }: Props) {
  const [imgPanel, setImgPanel] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const imgFileRef = useRef<HTMLInputElement>(null);
  const imgPanelRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: { class: 'tiptap-img' },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'tiptap px-4 py-3 text-sm text-slate-800 leading-relaxed focus:outline-none min-h-[280px]',
      },
    },
  });

  if (!editor) return null;

  function insertByUrl() {
    const src = imgUrl.trim();
    if (!src) return;
    editor!.chain().focus().setImage({ src }).run();
    setImgUrl('');
    setImgPanel(false);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target?.result as string;
      editor!.chain().focus().setImage({ src }).run();
      setImgPanel(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-200 bg-slate-50">
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={15} /></Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="In đậm (Ctrl+B)"><Bold size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="In nghiêng (Ctrl+I)"><Italic size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code nội tuyến"><Code size={15} /></Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Danh sách"><List size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Danh sách số"><ListOrdered size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Trích dẫn"><Quote size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Khối code"><Code2 size={15} /></Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Đường kẻ ngang"><Minus size={15} /></Btn>
        <Sep />
        {/* Image button */}
        <div className="relative" ref={imgPanelRef}>
          <Btn onClick={() => setImgPanel(p => !p)} active={imgPanel} title="Chèn ảnh">
            <ImagePlus size={15} />
          </Btn>
          {imgPanel && (
            <div className="absolute top-full left-0 mt-1 z-50 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-600">Chèn ảnh</span>
                <button type="button" onClick={() => setImgPanel(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              </div>
              {/* URL input */}
              <div className="flex gap-1.5">
                <input
                  type="url"
                  value={imgUrl}
                  onChange={e => setImgUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && insertByUrl()}
                  placeholder="https://... hoặc dán URL ảnh"
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={insertByUrl}
                  disabled={!imgUrl.trim()}
                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Link2 size={11} /> Chèn
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex-1 h-px bg-slate-200" />
                hoặc
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              {/* File upload */}
              <label className="flex items-center justify-center gap-2 w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-xs text-slate-500 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-colors">
                <Upload size={13} />
                Upload ảnh từ máy
                <input
                  ref={imgFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
              <p className="text-[11px] text-slate-400">Ảnh upload sẽ được nhúng trực tiếp vào bài viết.</p>
            </div>
          )}
        </div>
        <Sep />
        <Btn onClick={() => editor.chain().focus().undo().run()} active={false} disabled={!editor.can().undo()} title="Hoàn tác (Ctrl+Z)"><Undo size={15} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} active={false} disabled={!editor.can().redo()} title="Làm lại (Ctrl+Y)"><Redo size={15} /></Btn>
      </div>

      {/* Editor area */}
      <div className="max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function Btn({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors disabled:opacity-30 ${
        active ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-slate-200 mx-1 self-center" />;
}
