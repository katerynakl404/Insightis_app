import * as React from 'react';
import { cx } from './cx';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Visual style. `primary` teal fill; `secondary` filled card-style (neutral border);
   *  `outline` teal-bordered stroke; `tertiary` ghost; `destructive` red fill;
   *  `outline-destructive` red-bordered stroke. */
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary' | 'destructive' | 'outline-destructive';
  /** Height step: xs 28px · sm 32px · md 36px · lg 40px · xl 44px. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner + label, aria-busy, pointer-events off — keeps the variant colour. */
  loading?: boolean;
  /** Tertiary only: brand-teal label instead of neutral. */
  brand?: boolean;
  /** Optional leading icon (16px SVG); 6px gap comes from the kit. */
  icon?: React.ReactNode;
}

/**
 * Button — Insightis kit action button. Label is Title Case ("Add New").
 * Renders `.btn .btn-<variant> .btn-<size>` from kit-theme.css; hover/press/
 * focus/disabled states are pure CSS.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  brand = false,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx('btn', `btn-${variant}`, `btn-${size}`, brand && 'is-brand', loading && 's-loading', className)}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {!loading && icon}
      {children}
    </button>
  );
}
