import * as React from 'react';
import { cx } from './cx';

export interface MetaRowProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Left slot — the count line (e.g. "12 conversations"). Rendered in `.meta-row-count`
   *  (`Text/Secondary`, caption size inherited from the row). Noun pluralises with the
   *  count (1 → "conversation"; ≠1 → "conversations"). */
  count: React.ReactNode;
  /** Inline action slot (`.meta-row-actions`) — typically a `.link`-styled
   *  "Select all" / "Deselect all" button (use the kit `Link` wrapper). Omit to render
   *  a count-only row. */
  actions?: React.ReactNode;
  /** Opt into the split layout (`.var-split`, `justify-content: space-between`) when the
   *  action belongs on the opposite edge. Default clusters count + actions on the left. */
  split?: boolean;
}

/**
 * MetaRow — Insightis kit caption row above a list view (kit section #metarow).
 * Fully transparent: no background, no border, no card wrapper. Renders
 * `.meta-row > .meta-row-count + .meta-row-actions` from kit-theme.css; the row
 * itself carries the caption font-size so count and `.link` actions stay the
 * same size.
 */
export function MetaRow({ count, actions, split = false, className, children, ...rest }: MetaRowProps) {
  return (
    <div className={cx('meta-row', split && 'var-split', className)} {...rest}>
      <span className="meta-row-count">{count}</span>
      {actions !== undefined && <span className="meta-row-actions">{actions}</span>}
      {children}
    </div>
  );
}
