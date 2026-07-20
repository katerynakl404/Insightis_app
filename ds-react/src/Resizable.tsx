import * as React from 'react';
import { cx } from './cx';

export interface ResizableProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Content of the first (leading) pane. */
  start: React.ReactNode;
  /** Content of the second (trailing) pane. */
  end: React.ReactNode;
  /** Fixed split — the leading pane's share in percent (0–100). Default 50.
   *  Static render only; no drag behaviour is wired. */
  split?: number;
}

/**
 * Resizable — Insightis kit split panel (`.rsz` from kit-theme.css): two panes
 * (`.p`) separated by a 6px `--border` handle (`.hd`, hover `primary/30`).
 * Rendered statically with a fixed split; the flex-grow ratio is layout only —
 * all appearance comes from the kit classes.
 */
export function Resizable({ start, end, split = 50, className, ...rest }: ResizableProps) {
  return (
    <div className={cx('rsz', className)} {...rest}>
      <div className="p" style={{ flexGrow: split }}>
        {start}
      </div>
      <div className="hd" role="separator" aria-orientation="vertical" />
      <div className="p" style={{ flexGrow: 100 - split }}>
        {end}
      </div>
    </div>
  );
}
