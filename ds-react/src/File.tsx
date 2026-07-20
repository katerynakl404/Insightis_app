import * as React from 'react';
import { cx } from './cx';

export interface FileProps extends React.ComponentPropsWithoutRef<'div'> {
  /** File name — `.file-name` (Text/Body medium, ellipsised). */
  name: string;
  /** Secondary line — `.file-size` (Text/Secondary xs). File size ("2.4 MB") or
   *  status text ("Uploading…", "Upload failed"). */
  size?: string;
  /** Loading / uploading: `.s-loading` — pointer-events off, spinner in the
   *  right slot. */
  loading?: boolean;
  /** Error: `.s-error` — red-tinted border + background, icon and right-slot
   *  glyphs tinted. */
  error?: boolean;
  /** Renders the dismiss (×) button in the right slot; called on click. */
  onRemove?: () => void;
  /** Renders the retry button in the right slot (error rows); called on click. */
  onRetry?: () => void;
  /** Custom leading icon; the `.file-ic` class is merged on automatically.
   *  Defaults to the kit's FileIcon (24px, `--brand-tertiary`). */
  icon?: React.ReactNode;
}

/**
 * File — Insightis kit uploaded-file row. Renders `.file [.s-loading|.s-error]`
 * from kit-theme.css: `.file-l` (icon + `.file-meta` name/size column) and
 * `.file-r` right slot (spinner while loading, retry/dismiss buttons otherwise).
 * While `loading` the row is pointer-events-none and the right slot shows the
 * kit spinner (`btn-spin`).
 *
 * The retry/dismiss buttons' inline sizing styles are copied verbatim from the
 * kit's canonical #file demo markup — kit-authored, not invented here.
 */
export function File({
  name,
  size,
  loading = false,
  error = false,
  onRemove,
  onRetry,
  icon,
  className,
  ...rest
}: FileProps) {
  const iconNode = React.isValidElement<{ className?: string }>(icon) ? (
    React.cloneElement(icon, {
      className: cx('file-ic', icon.props.className),
      'aria-hidden': true,
    } as React.HTMLAttributes<HTMLElement>)
  ) : icon != null ? (
    icon
  ) : (
    <svg className="file-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );

  // Kit demo buttons: default row dismiss uses --ink-secondary; error row
  // buttons use color:inherit so the .s-error tint applies.
  const buttonStyle: React.CSSProperties = {
    height: '24px',
    width: '24px',
    background: 'transparent',
    border: 'none',
    color: error ? 'inherit' : 'var(--ink-secondary)',
  };

  const hasRightSlot = loading || onRetry != null || onRemove != null;

  return (
    <div className={cx('file', loading && 's-loading', error && 's-error', className)} {...rest}>
      <div className="file-l">
        {iconNode}
        <div className="file-meta">
          <span className="file-name">{name}</span>
          {size != null && <span className="file-size">{size}</span>}
        </div>
      </div>
      {hasRightSlot && (
        <div className="file-r">
          {loading ? (
            <span className="spinner" aria-hidden="true" />
          ) : (
            <>
              {onRetry && (
                <button className="iconbtn" type="button" style={buttonStyle} aria-label="Retry" onClick={onRetry}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.7 9.7 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                  </svg>
                </button>
              )}
              {onRemove && (
                <button className="iconbtn" type="button" style={buttonStyle} aria-label="Dismiss" onClick={onRemove}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
