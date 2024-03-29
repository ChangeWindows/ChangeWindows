import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import clsx from "clsx";
import AmaranthIcon, {
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
          <AmaranthIcon icon={aiBold} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("italic"),
          })}
        >
          <AmaranthIcon icon={aiItalic} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("underline"),
          })}
        >
          <AmaranthIcon icon={aiUnderline} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx("editor-btn", { active: editor.isActive("strike") })}
        >
          <AmaranthIcon icon={aiStrikethrough} />
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
          <AmaranthIcon icon={aiParagraph} />
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
          <AmaranthIcon icon={aiHeading1} />
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
          <AmaranthIcon icon={aiHeading2} />
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
          <AmaranthIcon icon={aiHeading3} />
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
          <AmaranthIcon icon={aiHeading4} />
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
          <AmaranthIcon icon={aiHeading5} />
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
          <AmaranthIcon icon={aiHeading6} />
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
            <AmaranthIcon icon={aiChain} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={clsx("editor-btn", {
              active: editor.isActive("link"),
            })}
          >
            <AmaranthIcon icon={aiChainSlash} />
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
          <AmaranthIcon icon={aiList} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("orderedList"),
          })}
        >
          <AmaranthIcon icon={aiListOrdered} />
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
          <AmaranthIcon icon={aiCode} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx("editor-btn", {
            active: editor.isActive("codeBlock"),
          })}
        >
          <AmaranthIcon icon={aiCodeblock} />
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
          <AmaranthIcon icon={aiTable} /> Table
        </button>
        <a
          className="editor-btn"
          href="#"
          id="tableTools"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <AmaranthIcon icon={aiAngleDown} />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="tableTools"
        >
          <DropdownItem onClick={() => editor.commands.addColumnBefore()}>
            <AmaranthIcon icon={aiTableColumnInsertLeft} sx={{ mr: 1 }} /> Add
            column before
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.addColumnAfter()}>
            <AmaranthIcon icon={aiTableColumnInsertRight} sx={{ mr: 1 }} /> Add
            column after
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.deleteColumn()}>
            <AmaranthIcon icon={aiTableColumnMin} sx={{ mr: 1 }} /> Delete
            column
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.addRowBefore()}>
            <AmaranthIcon icon={aiTableRowInsertTop} sx={{ mr: 1 }} /> Add row
            before
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.addRowAfter()}>
            <AmaranthIcon icon={aiTableRowInsertBottom} sx={{ mr: 1 }} /> Add
            row before
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.deleteRow()}>
            <AmaranthIcon icon={aiTableRowMin} sx={{ mr: 1 }} /> Add row before
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.deleteTable()}>
            <AmaranthIcon icon={aiTableMin} sx={{ mr: 1 }} /> Delete table
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.mergeOrSplit()}>
            <AmaranthIcon icon={aiTableCellMerge} sx={{ mr: 1 }} /> Merge/split
            cell
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.toggleHeaderColumn()}>
            <AmaranthIcon icon={aiTableHeaderColumn} sx={{ mr: 1 }} /> Make
            header column
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.toggleHeaderRow()}>
            <AmaranthIcon icon={aiTableHeaderRow} sx={{ mr: 1 }} /> Make header
            row
          </DropdownItem>
          <DropdownItem onClick={() => editor.commands.toggleHeaderCell()}>
            <AmaranthIcon icon={aiTableHeaderCell} sx={{ mr: 1 }} /> Make header
            cell
          </DropdownItem>
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
          <AmaranthIcon icon={aiQuote} />
        </button>
        <button
          className="editor-btn"
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <AmaranthIcon icon={aiLine} />
        </button>
      </div>
      <div className="flex-grow-1" />
      <div className="btn-group">
        <button
          className="editor-btn"
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <AmaranthIcon icon={aiAGum} />
        </button>
        <button
          className="editor-btn"
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <AmaranthIcon icon={aiSquareGum} />
        </button>
      </div>
    </div>
  );
}
