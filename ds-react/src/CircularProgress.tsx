import * as React from 'react';
import { cx } from './cx';

export interface CircularProgressProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Current progress value, 0–`max`. */
  value: number;
  /** Upper bound of the scale. Kit default 100. */
  max?: number;
  /** Outer square size in px (drives the container, viewBox and ring geometry).
   *  Kit default 40. */
  size?: number;
  /** Ring stroke width in px. Kit default 2.5 (the kit's larger demos use 3). */
  strokeWidth?: number;
  /** Indicator colour: `primary` = `Brand/Primary` (default), `secondary` = `Brand/Secondary`. */
  variant?: 'primary' | 'secondary';
  /** Optional centered content (`.cpr-lbl`), e.g. the percentage label. */
  children?: React.ReactNode;
}

/**
 * CircularProgress — Insightis kit determinate SVG ring (kit section
 * #circularprogress). Renders `.cpr` from kit-theme.css with the exact kit
 * SVG recipe: track circle stroked in `--bg`, indicator circle in the variant
 * brand colour, `stroke-dasharray` = circumference, offset scaled by value,
 * rotated -90° so 0% starts at the top. `role="progressbar"` +
 * `aria-valuenow/min/max` per the kit spec.
 */
export function CircularProgress({
  value,
  max = 100,
  size = 40,
  strokeWidth = 2.5,
  variant = 'primary',
  className,
  style,
  children,
  ...rest
}: CircularProgressProps) {
  const c = size / 2;
  const r = c - strokeWidth;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.min(max, Math.max(0, value));
  const offset = circumference * (1 - (max === 0 ? 0 : clamped / max));
  return (
    <div
      className={cx('cpr', className)}
      style={{ width: size, height: size, ...style }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      {...rest}
    >
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--bg)" strokeWidth={strokeWidth} />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={variant === 'secondary' ? 'var(--brand-secondary)' : 'var(--brand-primary)'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference.toFixed(2)}
          strokeDashoffset={offset.toFixed(2)}
          strokeLinecap="round"
          transform={`rotate(-90 ${c} ${c})`}
        />
      </svg>
      {children != null && <span className="cpr-lbl">{children}</span>}
    </div>
  );
}
