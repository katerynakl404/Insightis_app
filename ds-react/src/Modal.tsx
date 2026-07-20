import * as React from 'react';
import { cx } from './cx';

export interface ModalProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Statically renderable: `true` (default) renders scrim + dialog inline (no portal);
   *  `false` renders nothing. */
  open?: boolean;
  /** Dialog title — rendered as `h2.dlg-title` and wired via `aria-labelledby`. */
  title: React.ReactNode;
  /** Footer action bar (`.dlg-ftr`, right-aligned, top hairline). Omit to skip the bar. */
  footer?: React.ReactNode;
  /** When set, renders the header close IconButton (tertiary) and enables
   *  click-outside-on-scrim dismissal (the kit's `event.target===this` pattern). */
  onClose?: () => void;
}

/**
 * Modal — Insightis kit dialog shell: `.dlg-overlay` scrim (--overlay-scrim, z-60)
 * centering a `.dlg` flex column (Surface/Card, .875rem radius, --shadow-modal) with
 * `.dlg-hdr` → `.dlg-body` > `.dlg-step` → optional `.dlg-ftr`, per kit-theme.css.
 * Extra props (e.g. `style={{width:480, height:580}}`) land on the `.dlg` surface —
 * per-instance sizing is inline in the kit skeleton too.
 */
export function Modal({ open = true, title, footer, onClose, className, children, ...rest }: ModalProps) {
  const titleId = React.useId();
  if (!open) return null;
  return (
    <div
      className="dlg-overlay"
      onClick={onClose ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
    >
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className={cx('dlg', className)} {...rest}>
        <div className="dlg-hdr">
          <h2 id={titleId} className="dlg-title">{title}</h2>
          {onClose && (
            <button
              className="iconbtn iconbtn-tertiary"
              type="button"
              aria-label="Close"
              onClick={onClose}
              style={{ width: '2rem', height: '2rem', flex: 'none' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className="dlg-body">
          <div className="dlg-step">{children}</div>
        </div>
        {footer != null && <div className="dlg-ftr">{footer}</div>}
      </div>
    </div>
  );
}
