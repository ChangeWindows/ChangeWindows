import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import clsx from "clsx";
import Amicon, {
  aiBold,
  aiAGum,
  aiSquareGum,
  aiCode,
  aiCodeblock,
  aiHeading1,
  aiHeading2,
  aiHeading3,
  aiHeading4,
  aiHeading5,
  aiHeading6,
  aiLine,
  aiItalic,
  aiChain,
  aiChainSlash,
  aiList,
  aiListOrdered,
  aiParagraph,
  aiQuote,
  aiStrikethrough,
  aiUnderline,
  aiTable,
  aiTableColumnInsertLeft,
  aiTableColumnInsertRight,
  aiTableColumnMin,
  aiTableRowInsertTop,
  aiTableRowInsertBottom,
  aiTableRowMin,
  aiTableMin,
  aiTableCellMerge,
  aiTableHeaderColumn,
  aiTableHeaderRow,
  aiTableHeaderCell,
  aiAngleDown,
} from "@studio384/amaranth";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import DropdownItem from "./Navbar/DropdownItem";

export default function Editor({ content = null, setData }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Table.configure({
        HTMLAttributes: {
          class: "table table-bordered table-sm",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setData((_content) => ({ ..._content, changelog: editor.getHTML() }));
    },
  });

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

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="editor-toolbar btn-toolbar">
      <div className="btn-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("bold"),
          })}
        >
          <Amicon icon={aiBold} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("italic"),
          })}
        >
          <Amicon icon={aiItalic} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("underline"),
          })}
        >
          <Amicon icon={aiUnderline} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx("editor-btn", { active: editor.isActive("strike") })}
        >
          <Amicon icon={aiStrikethrough} />
        </button>
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("paragraph"),
          })}
        >
          <Amicon icon={aiParagraph} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx("editor-btn", {
            active: editor.isActive("heading", { level: 1 }),
          })}
        >
          <Amicon icon={aiHeading1} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx("editor-btn", {
            active: editor.isActive("heading", { level: 2 }),
          })}
        >
          <Amicon icon={aiHeading2} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx("editor-btn", {
            active: editor.isActive("heading", { level: 3 }),
          })}
        >
          <Amicon icon={aiHeading3} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={clsx("editor-btn", {
            active: editor.isActive("heading", { level: 4 }),
          })}
        >
          <Amicon icon={aiHeading4} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={clsx("editor-btn", {
            active: editor.isActive("heading", { level: 5 }),
          })}
        >
          <Amicon icon={aiHeading5} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={clsx("editor-btn", {
            active: editor.isActive("heading", { level: 6 }),
          })}
        >
          <Amicon icon={aiHeading6} />
        </button>
      </div>
      <div className="btn-group">
        {!editor.isActive("link") ? (
          <button
            type="button"
            onClick={setLink}
            className={clsx("editor-btn", {
              active: editor.isActive("link"),
            })}
          >
            <Amicon icon={aiChain} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={clsx("editor-btn", {
              active: editor.isActive("link"),
            })}
          >
            <Amicon icon={aiChainSlash} />
          </button>
        )}
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("bulletList"),
          })}
        >
          <Amicon icon={aiList} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("orderedList"),
          })}
        >
          <Amicon icon={aiListOrdered} />
        </button>
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("code"),
          })}
        >
          <Amicon icon={aiCode} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("codeBlock"),
          })}
        >
          <Amicon icon={aiCodeblock} />
        </button>
      </div>
      <div className="btn-group">
        <button
          className="editor-btn"
          type="button"
          onClick={() =>
            editor.commands.insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
          }
        >
          <Amicon icon={aiTable} /> Table
        </button>
        <a
          className="editor-btn"
          href="#"
          id="tableTools"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Amicon icon={aiAngleDown} />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="tableTools"
        >
          <button className="dropdown-item" type="button" onClick={() => editor.commands.addColumnBefore()}>
            <Amicon icon={aiTableColumnInsertLeft} /> Add column before
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.addColumnAfter()}>
            <Amicon icon={aiTableColumnInsertRight} /> Add column after
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.deleteColumn()}>
            <Amicon icon={aiTableColumnMin} /> Delete column
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.addRowBefore()}>
            <Amicon icon={aiTableRowInsertTop} /> Add row before
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.addRowAfter()}>
            <Amicon icon={aiTableRowInsertBottom} /> Add row after
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.deleteRow()}>
            <Amicon icon={aiTableRowMin} /> Delete row
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.deleteTable()}>
            <Amicon icon={aiTableMin} /> Delete table
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.mergeOrSplit()}>
            <Amicon icon={aiTableCellMerge} /> Merge/split cell
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.toggleHeaderColumn()}>
            <Amicon icon={aiTableHeaderColumn} /> Make header column
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.toggleHeaderRow()}>
            <Amicon icon={aiTableHeaderRow} /> Make header row
          </button>
          <button className="dropdown-item" type="button" onClick={() => editor.commands.toggleHeaderCell()}>
            <Amicon icon={aiTableHeaderCell} /> Make header cell
          </button>
        </ul>
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("blockquote"),
          })}
        >
          <Amicon icon={aiQuote} />
        </button>
        <button
          className="editor-btn"
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Amicon icon={aiLine} />
        </button>
      </div>
      <div className="flex-grow-1" />
      <div className="btn-group">
        <button
          className="editor-btn"
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <Amicon icon={aiAGum} />
        </button>
        <button
          className="editor-btn"
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <Amicon icon={aiSquareGum} />
        </button>
      </div>
    </div>
  );
}
