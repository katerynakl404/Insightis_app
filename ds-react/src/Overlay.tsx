import * as React from 'react';
import { cx } from './cx';

export interface OverlayProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Statically renderable: `true` (default) adds `.is-open` (backdrop visible);
   *  `false` keeps the kit's hidden rest state (`display:none`). */
  open?: boolean;
}

/**
 * Overlay — Insightis kit full-viewport backdrop (`.ov` / `.ov.is-open` from
 * kit-theme.css): fixed inset-0, `--overlay-scrim` fill, z-index 60 (modal-scrim
 * tier, above sticky page furniture at z-50). Place the slide-over panel or dialog
 * as a child so backdrop and dismiss-on-click are co-located; pass `onClick` with
 * an `event.target === event.currentTarget` guard for scrim dismissal.
 */
export function Overlay({ open = true, className, children, ...rest }: OverlayProps) {
  return (
    <div className={cx('ov', open && 'is-open', className)} {...rest}>
      {children}
    </div>
  );
}
