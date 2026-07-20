import * as React from 'react';
import { cx } from './cx';

export interface SegmentedControlItem {
  /** Unique value reported by `onChange` when this item is selected. */
  value: string;
  /** Item label. Rendered as text in `md`; in `sm` (icon-only size) it becomes
   *  the button's `aria-label` when an icon is provided. */
  label: string;
  /** Optional glyph SVG — 12×12 in `sm`, 14×14 in `md` (sized by the kit CSS). */
  icon?: React.ReactNode;
  /** Disables this single item (`s-disabled` recipe + native disabled attr). */
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Segments, left to right. */
  items: SegmentedControlItem[];
  /** Controlled selected value — pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial selected value (defaults to the first item). */
  defaultValue?: string;
  /** Called with the newly selected item's value. */
  onChange?: (value: string) => void;
  /** Item height step: sm 20px icon-only (dense popovers / side rails) ·
   *  md 32px icon + label (default — settings panels, view toggles). */
  size?: 'sm' | 'md';
}

/**
 * SegmentedControl — Insightis kit pill-style single-select. Renders
 * `.segctrl .is-<size>` with `role="tablist"` and `.segctrl-btn` items
 * (`role="tab"`, `aria-selected`, `.is-active` on the selected one) from
 * kit-theme.css. The selected pill / hover / focus / disabled recipes are an
 * agreed contract and live entirely in the kit CSS — this wrapper only
 * toggles classes. Container is `width:100%`; constrain via the parent.
 * Provide `aria-label` for the tablist.
 */
export function SegmentedControl({
  items,
  value,
  defaultValue,
  onChange,
  size = 'md',
  className,
  ...rest
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue !== undefined ? defaultValue : items[0]?.value,
  );
  const selected = value !== undefined ? value : internalValue;

  const select = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={cx('segctrl', `is-${size}`, className)} role="tablist" {...rest}>
      {items.map((item) => {
        const isActive = item.value === selected;
        const iconOnly = size === 'sm' && item.icon != null;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            className={cx('segctrl-btn', isActive && 'is-active')}
            aria-selected={isActive}
            aria-label={iconOnly ? item.label : undefined}
            disabled={item.disabled}
            onClick={() => select(item.value)}
          >
            {item.icon}
            {!iconOnly && item.label}
          </button>
        );
      })}
    </div>
  );
}
