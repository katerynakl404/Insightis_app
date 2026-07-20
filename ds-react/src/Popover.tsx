import * as React from 'react';
import { cx } from './cx';

export interface PopoverProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Statically renderable: `true` (default) renders the popover surface inline
   *  (no portal/positioning); `false` renders nothing. */
  open?: boolean;
  /** Optional heading — rendered as the kit `.pop-t` title row (600 weight, Text/Heading). */
  title?: React.ReactNode;
}

/**
 * Popover — Insightis kit popover surface (`.pop` from kit-theme.css): 200px wide,
 * Surface/Background fill, 1px Stroke/Border, 6px radius, 16px padding,
 * `--shadow-overlay`, text-sm. Children render in the `.pop-d` description slot
 * (text-xs, Text/Secondary) below the optional `.pop-t` title.
 */
export function Popover({ open = true, title, className, children, ...rest }: PopoverProps) {
  if (!open) return null;
  return (
    <div className={cx('pop', className)} {...rest}>
      {title != null && <div className="pop-t">{title}</div>}
      {children != null && <div className="pop-d">{children}</div>}
    </div>
  );
}
