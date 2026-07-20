import * as React from 'react';
import { cx } from './cx';

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /** Inactive link: `Text/Inactive` colour, no underline, `cursor:not-allowed`,
   *  `pointer-events:none` — matches Button disabled language. */
  disabled?: boolean;
}

/**
 * Link — Insightis kit inline text-link. Renders `.link` from kit-theme.css:
 * colour `--ink-highlight` (theme-adaptive), no underline at rest, underline
 * on hover (25% offset below baseline), brand focus-visible ring. Hover/focus
 * states are pure CSS.
 */
export function Link({ disabled = false, className, tabIndex, children, ...rest }: LinkProps) {
  return (
    <a
      className={cx('link', disabled && 'is-disabled', className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      {...rest}
    >
      {children}
    </a>
  );
}
