import * as React from 'react';
import { cx } from './cx';

export interface TextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  /** Min-height step (resize handle still works): xs 28px/12px font · sm 32px/13px ·
   *  md 36px/14px (default) · lg 40px · xl 44px/14px. Padding scales per step. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Error state: red `--input-error` 1px border + this string as `.err-help`
   *  helper text below — matches Input exactly. */
  error?: string;
  /** Disabled: `State/Disabled` bg, `Text/Inactive` text, cursor not-allowed. */
  disabled?: boolean;
}

/**
 * TextArea — Insightis kit multiline form-control. Renders `.ta .is-<size>`
 * from kit-theme.css; same border/radius/colour tokens as Input, `resize:none`.
 * Hover/focus states are pure CSS. When `error` is set the control + helper
 * text are wrapped in a plain column `<div>`.
 */
export function TextArea({ size = 'md', error, disabled = false, className, ...rest }: TextAreaProps) {
  const helpId = React.useId();

  const ta = (
    <textarea
      className={cx('ta', `is-${size}`, error && 's-error', disabled && 'is-disabled', className)}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? helpId : undefined}
      {...rest}
    />
  );

  if (!error) return ta;
  return (
    <div>
      {ta}
      <div className="err-help" id={helpId}>{error}</div>
    </div>
  );
}
