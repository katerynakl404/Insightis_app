import * as React from 'react';
import { cx } from './cx';

const TOAST_ICONS: Record<NonNullable<ToastProps['variant']>, React.ReactNode> = {
  /* CheckCircle2 */
  success: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  /* Info */
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  /* AlertTriangle */
  warning: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  /* XCircle — distinct from the bare-X close button */
  error: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </>
  ),
};

export interface ToastProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Feedback flavour — tinted bg/border + icon colour per `.toast.var-<variant>`.
   *  Icons: CheckCircle2 / Info / AlertTriangle / XCircle. */
  variant?: 'success' | 'info' | 'warning' | 'error';
  /** Optional secondary line (`.toast-desc`, text-xs on `Text/Secondary`). Omit when
   *  there is no supporting text. */
  description?: React.ReactNode;
  /** Optional action slot rendered below the message row — the kit uses a
   *  `<Button size="xs" variant="outline">`. */
  action?: React.ReactNode;
  /** Close (×) handler for the `.toast-x` icon button. */
  onClose?: () => void;
  /** Countdown strip (`.toast-prog`) along the bottom edge; fill colour follows
   *  the variant. Defaults on, as in the kit demos. */
  progress?: boolean;
  /** Toast message (title line, `.toast-msg`). */
  children?: React.ReactNode;
}

/**
 * Toast — Insightis kit toast message (kit section #toast).
 * Renders `.toast .var-<variant>` from kit-theme.css: variant-tinted surface,
 * `.toast-row` with a 20px variant icon, `.toast-body` (title + optional
 * description), tertiary IconButton close, optional action button and a
 * bottom `.toast-prog` countdown strip. Default variant is `info`.
 */
export function Toast({
  variant = 'info',
  description,
  action,
  onClose,
  progress = true,
  className,
  children,
  ...rest
}: ToastProps) {
  return (
    <div className={cx('toast', `var-${variant}`, className)} role="status" {...rest}>
      <div className="toast-row">
        <svg
          className="toast-ic"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          {TOAST_ICONS[variant]}
        </svg>
        <div className="toast-body">
          <span className="toast-msg">{children}</span>
          {description != null && <span className="toast-desc">{description}</span>}
        </div>
        <button
          className="iconbtn iconbtn-tertiary toast-x"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      {action}
      {progress && (
        <div className="toast-prog">
          <span />
        </div>
      )}
    </div>
  );
}
