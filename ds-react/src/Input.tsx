import * as React from 'react';
import { cx } from './cx';

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Height step on the `.field` wrapper: xs 28px/12px font · sm 32px/13px ·
   *  md 36px/14px (default) · lg 40px · xl 44px/14px. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Error state: red `--input-error` 1px border on the shell + this string as
   *  `.err-help` helper text below (no bg tint, no outer ring). */
  error?: string;
  /** Disabled: `State/Disabled` bg, `Text/Inactive` placeholder, cursor not-allowed. */
  disabled?: boolean;
  /** Optional leading glyph rendered inside the shell before the input — a 24×24
   *  stroke SVG; the kit pins it to 14×14 in `is-xs`. The `field-icon` class is
   *  merged onto the element automatically. */
  icon?: React.ReactNode;
}

/**
 * Input — Insightis kit text form-control. Renders the kit shell
 * `<div class="field is-<size>"><input/></div>` from kit-theme.css; shares the
 * form-control system with TextArea (identical hover/focus/error/disabled).
 * Hover/focus states are pure CSS. `className` goes on the `.field` shell;
 * all native input props land on the inner `<input>`. When `error` is set the
 * shell + helper text are wrapped in a plain column `<div>`.
 */
export function Input({ size = 'md', error, disabled = false, icon, className, ...rest }: InputProps) {
  const helpId = React.useId();

  const iconNode =
    React.isValidElement<{ className?: string }>(icon)
      ? React.cloneElement(icon, {
          className: cx('field-icon', icon.props.className),
          'aria-hidden': true,
        } as React.HTMLAttributes<HTMLElement>)
      : icon;

  const field = (
    <div className={cx('field', `is-${size}`, error && 's-error', disabled && 'is-disabled', className)}>
      {iconNode}
      <input
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? helpId : undefined}
        {...rest}
      />
    </div>
  );

  if (!error) return field;
  return (
    <div>
      {field}
      <div className="err-help" id={helpId}>{error}</div>
    </div>
  );
}
