import * as React from 'react';
import { cx } from './cx';

export interface SheetProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Statically renderable: `true` (default) renders mask + panel inline (no portal);
   *  `false` renders nothing. */
  open?: boolean;
  /** Anchored edge. `right` is the kit default (bare `.sht`); the others add the
   *  kit `var-top` / `var-bottom` / `var-left` modifier. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Drawer title — kit `.sht-t` (16px, 600, Text/Heading). */
  title?: React.ReactNode;
  /** Drawer description — kit `.sht-d` (text-xs, Text/Secondary). */
  description?: React.ReactNode;
  /** Click handler for the corner close button (`IconButton tertiary` + `.sht-x`
   *  positioning hook — hover/pressed/focus inherit from the tertiary variant). */
  onClose?: () => void;
}

/**
 * Sheet — Insightis kit side-anchored drawer (#sheet): `.sht` shell containing the
 * `--overlay-scrim` mask (`.sht-mask`) and the `.sht-panel` surface with title,
 * description and an `iconbtn iconbtn-tertiary sht-x` close button, per kit-theme.css.
 */
export function Sheet({
  open = true,
  side = 'right',
  title,
  description,
  onClose,
  className,
  children,
  ...rest
}: SheetProps) {
  const titleId = React.useId();
  if (!open) return null;
  return (
    <div className={cx('sht', side !== 'right' && `var-${side}`, className)} {...rest}>
      <div className="sht-mask" />
      <div className="sht-panel" role="dialog" aria-modal="true" aria-labelledby={title != null ? titleId : undefined}>
        {title != null && <div id={titleId} className="sht-t">{title}</div>}
        {description != null && <div className="sht-d">{description}</div>}
        {children}
        <button className="iconbtn iconbtn-tertiary sht-x" type="button" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
