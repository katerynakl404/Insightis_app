import * as React from 'react';
import { cx } from './cx';

export interface SpinnerProps extends React.ComponentPropsWithoutRef<'svg'> {
  /** Square size in px. Kit default is 24. */
  size?: number;
}

/**
 * Spinner — Insightis kit indeterminate spinner (kit section #spinner).
 * Renders the standalone `.spin` SVG arc from the kit markup: open 270°
 * path stroked in `Brand/Primary` at 2.5, rotated by the `.spin` keyframe
 * animation in kit-theme.css. (The border-based `.spinner` recipe is scoped
 * to `.btn`/`.iconbtn` and is not this component.)
 */
export function Spinner({ size = 24, className, ...rest }: SpinnerProps) {
  return (
    <svg
      className={cx('spin', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--brand-primary)"
      strokeWidth={2.5}
      aria-hidden={rest['aria-label'] ? undefined : true}
      {...rest}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
