import * as React from 'react';
import { cx } from './cx';

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Trigger label content (rendered inside the `.clps-trig` button, before the chevron). */
  trigger: React.ReactNode;
  /** Controlled open state. Leave undefined for uncontrolled use with `defaultOpen`. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called with the next open state on every trigger click. */
  onOpenChange?: (open: boolean) => void;
  /** Panel content (`.clps-cnt`); hidden via `[data-state=closed]` in kit-theme.css. */
  children?: React.ReactNode;
}

/**
 * Collapsible — Insightis kit disclosure wrapper (kit section #collapsible).
 * Renders `.clps > .clps-trig + .clps-cnt` from kit-theme.css, driven by
 * `data-state="open|closed"` exactly as the kit demo (the chevron rotation and
 * content hiding are pure CSS off that attribute). Behaviour-only component —
 * no visual tokens of its own beyond the kit classes.
 */
export function Collapsible({
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const contentId = React.useId();

  const toggle = () => {
    if (!isControlled) setUncontrolledOpen(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <div className={cx('clps', className)} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      <button
        className="clps-trig"
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
      >
        {trigger}
        <svg
          className="clps-chev"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="clps-cnt" id={contentId}>
        {children}
      </div>
    </div>
  );
}
