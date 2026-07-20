import * as React from 'react';
import { cx } from './cx';

export interface ProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Fill percentage, 0–100. Rendered as the inline `width` of the fill span
   *  (the value is data, not styling — matches the kit demo markup). */
  value: number;
}

/**
 * ProgressBar — Insightis kit determinate linear progress (kit section #progress).
 * Renders `.progress > span` from kit-theme.css: pill track on `Surface/Chips`,
 * `Brand/Primary` fill. Track height/radius/width come from the kit CSS
 * (no size or colour variants exist in the kit).
 */
export function ProgressBar({ value, className, ...rest }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cx('progress', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <span style={{ width: `${clamped}%` }} />
    </div>
  );
}
