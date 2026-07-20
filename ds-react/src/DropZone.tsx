import * as React from 'react';
import { cx } from './cx';

export interface DropZoneProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Headline next to the upload icon. */
  title?: string;
  /** Helper line under the head (short description, no trailing period). */
  subtitle?: string;
  /** Label of the inner Browse button (Title Case). */
  browseLabel?: string;
  /** Called with the dropped or browsed files. */
  onFiles?: (files: FileList) => void;
  /** Forwarded to the hidden file input — accepted MIME types / extensions. */
  accept?: string;
  /** Forwarded to the hidden file input — allow selecting multiple files. */
  multiple?: boolean;
}

/**
 * DropZone — Insightis kit file-upload target (drag-and-drop + click-to-browse).
 * Renders `.dsf-drop` with `.dsf-drop-head` / `.dsf-drop-ic` / `.dsf-drop-title` /
 * `.dsf-drop-sub` and an inner `.btn.btn-outline.btn-sm` Browse button from
 * kit-theme.css. Hover / focus-within tinting is pure CSS; the drag-over state
 * toggles the kit's `.is-dragover` class. The zone itself is a click target;
 * keyboard users reach the inner Browse button, whose focus lifts the zone via
 * `:focus-within`.
 */
export function DropZone({
  title = 'Drag & drop files here',
  subtitle = 'or click to browse — files you upload are available to query in chats',
  browseLabel = 'Browse Files',
  onFiles,
  accept,
  multiple,
  className,
  ...rest
}: DropZoneProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) onFiles?.(files);
  };

  return (
    <div
      className={cx('dsf-drop', dragOver && 'is-dragover', className)}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      {...rest}
    >
      <div className="dsf-drop-head">
        <svg
          className="dsf-drop-ic"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="dsf-drop-title">{title}</p>
      </div>
      <p className="dsf-drop-sub">{subtitle}</p>
      <button
        className="btn btn-outline btn-sm"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        {browseLabel}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          handleFiles(e.currentTarget.files);
          e.currentTarget.value = '';
        }}
      />
    </div>
  );
}
