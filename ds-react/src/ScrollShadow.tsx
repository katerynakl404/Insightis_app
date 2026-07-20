import * as React from 'react';
import { cx } from './cx';

export interface ScrollShadowProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Scrollable content, rendered inside the `.ssh-inner` overflow container. */
  children?: React.ReactNode;
}

/**
 * ScrollShadow — Insightis kit scroll container with edge shadows (`.ssh`
 * from kit-theme.css). Top and bottom `::before`/`::after` gradients fade
 * into `--bg`; content scrolls inside `.ssh-inner`. Pure CSS — the kit wires
 * no visibility JS, so the gradients are always painted at both edges.
 */
export function ScrollShadow({ className, children, ...rest }: ScrollShadowProps) {
  return (
    <div className={cx('ssh', className)} {...rest}>
      <div className="ssh-inner">{children}</div>
    </div>
  );
}
