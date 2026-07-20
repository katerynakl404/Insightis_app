import * as React from 'react';
import { cx } from './cx';

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange'> {
  /** Controlled on/off state — pair with `onChange`. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** Called with the next state on toggle. */
  onChange?: (checked: boolean) => void;
  /** Track size: md 36×20px (default) · sm 28×16px (`is-sm` — compact contexts). */
  size?: 'md' | 'sm';
  /** Disabled: unified opacity recipe (`--opacity-disabled`) + native disabled attr. */
  disabled?: boolean;
}

/**
 * Switch — Insightis kit pill toggle. Renders `<button class="swt [is-sm] [on]">`
 * from kit-theme.css with `role="switch"` + `aria-checked`. On track
 * `Brand/Primary`, off track `--switch-off-bg`; thumb/hover/focus and the
 * invisible 44×44 hit area are pure CSS. Supports controlled (`checked` +
 * `onChange`) and uncontrolled (`defaultChecked`) use. Provide `aria-label`
 * or an external label — the control has no text.
 */
export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  size = 'md',
  disabled = false,
  className,
  onClick,
  ...rest
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  return (
    <button
      type="button"
      className={cx('swt', size === 'sm' && 'is-sm', isChecked && 'on', disabled && 's-disabled', className)}
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={(e) => {
        const next = !isChecked;
        if (checked === undefined) setInternalChecked(next);
        onChange?.(next);
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
