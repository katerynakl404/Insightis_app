import * as React from 'react';
import { cx } from './cx';

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'span'> {
  /** `shimmer` (default) is bare `.skel` — the sweep band is built into the base
   *  class; `pulse` adds `.pulse` (opacity 1 ↔ .5 loop); `none` adds `.none`
   *  (static block, no animation). */
  animation?: 'shimmer' | 'pulse' | 'none';
  /** Corner radius step. `md` (6px) is the bare `.skel` default; the rest map to
   *  `.r-none / .r-sm / .r-lg / .r-xl / .r-full`. */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** When true, renders `children` instead of the placeholder block. */
  isLoaded?: boolean;
  /** Placeholder width (layout dimension, e.g. `120` or `"100%"`). */
  width?: number | string;
  /** Placeholder height (layout dimension). */
  height?: number | string;
}

/**
 * Skeleton — Insightis kit loading placeholder (kit section #skeleton).
 * Renders `.skel` from kit-theme.css: `--skel-bg` block with an animated
 * `Surface/Card` shimmer sweep by default. Width/height are layout-only
 * inline dimensions, exactly as the kit demos size their placeholders.
 */
export function Skeleton({
  animation = 'shimmer',
  rounded = 'md',
  isLoaded = false,
  width,
  height,
  className,
  style,
  children,
  ...rest
}: SkeletonProps) {
  if (isLoaded) return <>{children}</>;
  return (
    <span
      className={cx(
        'skel',
        animation !== 'shimmer' && animation,
        rounded !== 'md' && `r-${rounded}`,
        className,
      )}
      style={width !== undefined || height !== undefined ? { width, height, ...style } : style}
      aria-hidden="true"
      {...rest}
    />
  );
}
