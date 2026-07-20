import * as React from 'react';
import { cx } from './cx';

export interface AccordionProps extends React.ComponentPropsWithoutRef<'div'> {
  /** One or more `<AccordionItem>` children. */
  children?: React.ReactNode;
}

/**
 * Accordion — Insightis kit accordion shell (`.acc` from kit-theme.css).
 * Bordered card container; items divide with a 1px border. Open/close is an
 * instant show/hide — the kit defines no transition.
 */
export function Accordion({ className, children, ...rest }: AccordionProps) {
  return (
    <div className={cx('acc', className)} {...rest}>
      {children}
    </div>
  );
}

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Header label shown in the always-visible row (`.acc-h`). */
  header: React.ReactNode;
  /** Controlled open state; pair with `onOpenChange`. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called with the next open state when the header is toggled. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * AccordionItem — one `.acc-item` row: clickable header (`.acc-h`) with the
 * kit's chevron glyph (▾ open / ▸ closed, `--ink-secondary`) and a collapsible
 * body (`.acc-b`). Controlled via `open`/`onOpenChange` or uncontrolled via
 * `defaultOpen` (useState).
 */
export function AccordionItem({
  header,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const toggle = () => {
    if (!isControlled) setUncontrolledOpen(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <div className={cx('acc-item', className)} {...rest}>
      <div
        className="acc-h"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        {header} <span style={{ color: 'var(--ink-secondary)' }}>{isOpen ? '▾' : '▸'}</span>
      </div>
      {isOpen && <div className="acc-b">{children}</div>}
    </div>
  );
}
