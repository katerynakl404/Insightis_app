import * as React from 'react';
import { cx } from './cx';

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'onChange'> {
  /** Controlled checked state — pair with `onChange`. */
  checked?: boolean;
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean;
  /** Called with the next checked value on toggle (click or Space). */
  onChange?: (checked: boolean) => void;
  /** Tri-state third position: `Brand/Primary` fill with a horizontal bar mark;
   *  reported as `aria-checked="mixed"`. Wins over `checked` while set. */
  indeterminate?: boolean;
  /** Error: red `--input-error` border (unchecked) / fill (checked) — mirrors Input `.s-error`. */
  error?: boolean;
  /** Disabled: unified opacity recipe (`--opacity-disabled`) + pointer-events off. */
  disabled?: boolean;
}

/**
 * Checkbox — Insightis kit tri-state checkbox (unchecked / checked / indeterminate).
 * Renders the kit `<span class="cbx">` with the check SVG always present (CSS fades
 * it via `.on`); adds `role="checkbox"`, `tabIndex` and Space/click toggling so the
 * span is a real control. Hover/focus visuals are pure CSS. Supports controlled
 * (`checked` + `onChange`) and uncontrolled (`defaultChecked`) use.
 */
export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  error = false,
  disabled = false,
  className,
  tabIndex,
  onClick,
  onKeyDown,
  ...rest
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = indeterminate ? true : !isChecked;
    if (checked === undefined) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <span
      className={cx(
        'cbx',
        !indeterminate && isChecked && 'on',
        indeterminate && 'is-indeterminate',
        error && 's-error',
        disabled && 's-disabled',
        className,
      )}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : isChecked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex ?? 0}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggle();
        }
        onKeyDown?.(e);
      }}
      {...rest}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}
