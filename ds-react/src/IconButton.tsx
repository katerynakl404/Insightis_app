import * as React from 'react';
import { cx } from './cx';

export interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Visual style — reuses Button tokens 1:1. `primary` teal fill; `secondary` filled
   *  card-style (neutral border); `outline` teal-bordered stroke; `tertiary` borderless
   *  ghost; `outline-destructive` red-bordered stroke with neutral icon. */
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary' | 'outline-destructive';
  /** Spinner replaces the icon, aria-busy, pointer-events off — keeps the variant colour. */
  loading?: boolean;
}

/**
 * IconButton — Insightis kit square icon button (36×36px, fixed — no size variants).
 * Renders `.iconbtn .iconbtn-<variant>` from kit-theme.css; hover/press/focus/disabled
 * states are pure CSS. Pass the icon SVG as children (18px glyph typical; 14px in
 * table rows). Always provide `aria-label` — the button has no visible text.
 */
export function IconButton({
  variant = 'primary',
  loading = false,
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cx('iconbtn', `iconbtn-${variant}`, loading && 's-loading', className)}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="spinner" aria-hidden="true" /> : children}
    </button>
  );
}
