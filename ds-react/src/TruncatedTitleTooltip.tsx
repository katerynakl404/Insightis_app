import * as React from 'react';

/** True when the element (or any descendant) horizontally overflows its box. */
function isTruncated(el: Element): boolean {
  if (el.scrollWidth - el.clientWidth > 1) return true;
  for (let i = 0; i < el.children.length; i++) {
    const child = el.children.item(i);
    if (child && isTruncated(child)) return true;
  }
  return false;
}

export interface TruncatedTitleTooltipProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Full label text. Shown as the tooltip content (`data-tip`) only while the rendered
   *  label is actually truncated (`scrollWidth > clientWidth`, re-measured on hover/focus).
   *  Also the default children when none are passed. */
  title: string;
  /** Bubble placement. `top` is the kit default; others map to `data-tip-side`. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** The truncating label content. Defaults to `title`. The truncation styles
   *  (overflow/ellipsis or the sidebar gradient fade) come from the surrounding kit
   *  class — pass it via `className` or nest the kit label element (e.g. `.lbl`,
   *  `.chat-row-name`). This wrapper adds behaviour only, no visual tokens of its own. */
  children?: React.ReactNode;
}

/**
 * TruncatedTitleTooltip — Insightis kit behaviour component (kit section #truncated).
 * A tooltip that appears **only when the label is truncated**. Built on the CSS-only
 * `[data-tip]` tooltip in kit-theme.css (bg `Text/Primary`, text `Surface/Card`,
 * ~300ms cold-enter delay). Statically renderable: the first paint has no `data-tip`;
 * hover/focus re-measures and attaches it well within the CSS show delay.
 */
export function TruncatedTitleTooltip({
  title,
  side = 'top',
  className,
  children,
  onMouseEnter,
  onFocus,
  ...rest
}: TruncatedTitleTooltipProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [truncated, setTruncated] = React.useState(false);

  const measure = React.useCallback(() => {
    const el = ref.current;
    if (el) setTruncated(isTruncated(el));
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      data-tip={truncated ? title : undefined}
      data-tip-side={truncated && side !== 'top' ? side : undefined}
      onMouseEnter={(e) => {
        measure();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        measure();
        onFocus?.(e);
      }}
      {...rest}
    >
      {children ?? title}
    </span>
  );
}
