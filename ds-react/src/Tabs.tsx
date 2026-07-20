import * as React from 'react';
import { cx } from './cx';

export interface TabItem {
  /** Stable identifier reported through `onChange`. */
  value: string;
  /** Visible tab label. */
  label: React.ReactNode;
  /** Disables the tab (kit `:disabled` — `--opacity-disabled`, no pointer events). */
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** Tabs to render, in order. */
  items: TabItem[];
  /** Controlled active value. When set, pair with `onChange`. */
  value?: string;
  /** Uncontrolled initial active value; defaults to the first item. */
  defaultValue?: string;
  /** Called with the newly activated tab's value. */
  onChange?: (value: string) => void;
}

/**
 * Tabs — Insightis kit underline tab navigation.
 * Renders `.tabset` (flex row, `--border` baseline) containing `.tab` buttons;
 * the active tab gets `.is-active` (text `--ink-highlight` + full-width 2px
 * underline via `::after`). Hover / focus-ring / disabled states are pure CSS.
 * Uncontrolled by default; pass `value` + `onChange` to control.
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  className,
  ...rest
}: TabsProps) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
  const active = value !== undefined ? value : inner;

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  return (
    <div className={cx('tabset', className)} role="tablist" {...rest}>
      {items.map((item) => (
        <button
          key={item.value}
          className={cx('tab', item.value === active && 'is-active')}
          type="button"
          role="tab"
          aria-selected={item.value === active}
          disabled={item.disabled}
          onClick={() => select(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
