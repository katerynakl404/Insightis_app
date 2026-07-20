import * as React from 'react';
import { cx } from './cx';

export interface TooltipProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Tooltip text. Rendered via the kit's `[data-tip]` CSS anchor, which shows a
   *  `.tt`-styled bubble on hover / focus-visible with the locked ~300ms cold-enter
   *  delay built into the kit CSS transition. */
  content: string;
  /** Bubble placement relative to the trigger. `top` is the kit default;
   *  `right` / `bottom` map to `data-tip-side` (the only side variants in kit-theme.css). */
  side?: 'top' | 'right' | 'bottom';
  /** The trigger element(s) the tooltip is anchored to. */
  children: React.ReactNode;
}

/**
 * Tooltip — Insightis kit hover tooltip (kit section #tooltip).
 * Wraps the trigger in a `[data-tip]` span; kit-theme.css renders the bubble
 * as `::after` (bg `Text/Primary`, text `Surface/Card`, theme-adaptive) with
 * the mandatory ~300ms show delay. Behaviour is pure CSS — no JS engine here.
 */
export function Tooltip({ content, side = 'top', children, className, ...rest }: TooltipProps) {
  return (
    <span
      className={className}
      data-tip={content}
      data-tip-side={side === 'top' ? undefined : side}
      {...rest}
    >
      {children}
    </span>
  );
}

export interface TooltipBubbleProps extends React.ComponentPropsWithoutRef<'span'> {}

/**
 * TooltipBubble — the statically rendered tooltip surface (`.tt`), always
 * visible. Use in design previews / specs where the open bubble itself is the
 * content, without a trigger or hover behaviour.
 */
export function TooltipBubble({ className, children, ...rest }: TooltipBubbleProps) {
  return (
    <span className={cx('tt', className)} {...rest}>
      {children}
    </span>
  );
}
