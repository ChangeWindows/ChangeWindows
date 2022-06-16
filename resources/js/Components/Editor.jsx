import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import AmaranthIcon, {
  aiBold,
  aiClearFormatting,
  aiClearNode,
  aiCode,
  aiCodeblock,
  aiHeading1,
  aiHeading2,
  aiHeading3,
  aiHeading4,
  aiHeading5,
  aiHeading6,
  aiHorizontalRule,
  aiItalic,
  aiList,
  aiListOl,
  aiParagraph,
  aiQuote,
  aiRedo,
  aiStrikethrough,
  aiUnderline,
  aiUndo,
} from "@changewindows/amaranth";

export default function Editor({ content }) {
  console.log(content);
  const editor = useEditor({
    extensions: [StarterKit],
    content: `${content}`,
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
    return null;
  }

  return (
    <div className="editor-toolbar btn-toolbar p-3">
      <div className="btn-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx("btn btn-primary btn-sm fw-bold", {
            active: editor.isActive("bold"),
          })}
        >
          <AmaranthIcon icon={aiBold} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx("btn btn-primary btn-sm fst-italic", {
            active: editor.isActive("italic"),
          })}
        >
          <AmaranthIcon icon={aiItalic} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx(
            "btn btn-primary btn-sm text-decoration-line-through",
            { active: editor.isActive("strike") }
          )}
        >
          <AmaranthIcon icon={aiStrikethrough} />
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <AmaranthIcon icon={aiClearFormatting} />
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <AmaranthIcon icon={aiClearNode} />
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("paragraph"),
          })}
        >
          <AmaranthIcon icon={aiParagraph} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("heading", { level: 1 }),
          })}
        >
          <AmaranthIcon icon={aiHeading1} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("heading", { level: 2 }),
          })}
        >
          <AmaranthIcon icon={aiHeading2} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("heading", { level: 3 }),
          })}
        >
          <AmaranthIcon icon={aiHeading3} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("heading", { level: 4 }),
          })}
        >
          <AmaranthIcon icon={aiHeading4} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("heading", { level: 5 }),
          })}
        >
          <AmaranthIcon icon={aiHeading5} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("heading", { level: 6 }),
          })}
        >
          <AmaranthIcon icon={aiHeading6} />
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("bulletList"),
          })}
        >
          <AmaranthIcon icon={aiList} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("orderedList"),
          })}
        >
          <AmaranthIcon icon={aiListOl} />
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("code"),
          })}
        >
          <AmaranthIcon icon={aiCode} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("codeBlock"),
          })}
        >
          <AmaranthIcon icon={aiCodeblock} />
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx("btn btn-primary btn-sm", {
            active: editor.isActive("blockquote"),
          })}
        >
          <AmaranthIcon icon={aiQuote} />
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <AmaranthIcon icon={aiHorizontalRule} />
        </button>
      </div>
      <div className="btn-group ms-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <AmaranthIcon icon={aiUndo} />
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <AmaranthIcon icon={aiRedo} />
        </button>
      </div>
    </div>
  );
}
