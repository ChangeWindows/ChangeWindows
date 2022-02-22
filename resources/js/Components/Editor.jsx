import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';

export default function Editor({ content }) {
  console.log(content);
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `${content}`
  });

  useEffect(() => {
    if (content) {
      editor.commands.setContent(content);
    }
  }, [content]);

  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}

function MenuBar({ editor }) {
  if (!editor) {
    return null
  }

  return (
    <div className="editor-toolbar btn-toolbar p-3">
      <div className="btn-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx('btn btn-primary btn-sm fw-bold', { 'active': editor.isActive('bold') })}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx('btn btn-primary btn-sm fst-italic', { 'active': editor.isActive('italic') })}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx('btn btn-primary btn-sm text-decoration-line-through', { 'active': editor.isActive('strike') })}
        >
          S
        </button>
      </div>
      <div className="btn-group ms-2">
        <button className="btn btn-primary btn-sm" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('paragraph') })}
        >
          P
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('heading', { level: 1 }) })}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('heading', { level: 2 }) })}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('heading', { level: 3 }) })}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('heading', { level: 4 }) })}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('heading', { level: 5 }) })}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('heading', { level: 6 }) })}
        >
          H6
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('bulletList') })}
        >
          UL
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('orderedList') })}
        >
          OL
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('code') })}
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('codeBlock') })}
        >
          Block
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx('btn btn-primary btn-sm', { 'active': editor.isActive('blockquote') })}
        >
          Quote
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          HR
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
      </div>
      <div className="btn-group ms-2">
        <button className="btn btn-primary btn-sm" onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
      </div>
    </div>
  )
}
