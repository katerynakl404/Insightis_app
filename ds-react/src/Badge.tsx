import * as React from 'react';
import { cx } from './cx';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Colour variant. `primary` solid Brand-50 tint; `secondary` Surface/Card 2 neutral;
   *  `body` chips-surface neutral; `green` / `red` / `attention` feedback tints. */
  variant?: 'primary' | 'secondary' | 'body' | 'green' | 'red' | 'attention';
  /** Size step: md 28px (default) · sm 20px (`.badge-sm` — table badge columns). */
  size?: 'md' | 'sm';
  /** Fully-rounded corners (`.rf`) — kit convention for status badges (green/red/attention). */
  pill?: boolean;
  /** 6×6 leading status dot (`.b-dot`, `background:currentColor`). Pair with a text
   *  label — status is never conveyed by colour alone (WCAG 1.4.1). */
  dot?: boolean;
  /** Optional leading icon (14px SVG via `.b-ic`; `currentColor` picks up the variant's text token). */
  icon?: React.ReactNode;
  /** Renders a trailing `×` remove button (`.b-x`) and makes the badge removable. */
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  /** aria-label for the remove button. */
  removeLabel?: string;
}

/**
 * Badge — Insightis kit compact status / label chip.
 * Renders `.badge .badge-<variant>` (+ `.badge-sm`, `.rf`) from kit-theme.css.
 * Slots: leading icon (`.b-ic`), status dot (`.b-dot`), trailing remove button (`.b-x`).
 * Purely presentational — hover/focus styling of the remove button is pure CSS.
 */
export function Badge({
  variant = 'primary',
  size = 'md',
  pill = false,
  dot = false,
  icon,
  onRemove,
  removeLabel = 'Remove',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx('badge', `badge-${variant}`, size === 'sm' && 'badge-sm', pill && 'rf', className)}
      {...rest}
    >
      {dot && <span className="b-dot" />}
      {icon}
      {children}
      {onRemove && (
        <button className="b-x" type="button" aria-label={removeLabel} onClick={onRemove}>
          ×
        </button>
      )}
    </span>
  );
}
