import * as React from 'react';
import { cx } from './cx';

export interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Line direction: horizontal `.sep.h` (1px tall) or vertical `.sep.v`
   *  (1px wide, inline-block). Default horizontal. */
  orientation?: 'horizontal' | 'vertical';
  /** Line colour: `border` (default, `--border`) · `primary`
   *  (`--brand-primary`) · `secondary` (`--brand-secondary`). */
  variant?: 'border' | 'primary' | 'secondary';
  /** Purely visual (default true) — renders with `role="none"`. Set false for
   *  a semantic `role="separator"` with `aria-orientation`. */
  decorative?: boolean;
}

/**
 * Separator — Insightis kit divider line (`.sep` from kit-theme.css).
 * Variants map to `.var-border` / `.var-primary` / `.var-secondary`;
 * orientation to `.h` / `.v`. The kit defines no labelled-separator class,
 * so no label prop is offered.
 */
export function Separator({
  orientation = 'horizontal',
  variant = 'border',
  decorative = true,
  className,
  ...rest
}: SeparatorProps) {
  return (
    <div
      className={cx('sep', orientation === 'vertical' ? 'v' : 'h', `var-${variant}`, className)}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      {...rest}
    />
  );
}
