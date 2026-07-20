import * as React from 'react';
import { cx } from './cx';

export interface PasswordInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'size' | 'prefix'> {
  /** Optional label rendered above the shell (Sentence case) — wraps the group
   *  in `.igrp-wrap` with an `.igrp-lbl` line. */
  label?: string;
  /** Error state: 1px `--input-error` border, icon + placeholder tinted — `.s-error`. */
  error?: boolean;
  /** Disabled: `--opacity-disabled` + pointer-events off — `.s-disabled`. */
  disabled?: boolean;
  /** Initial visibility of the password text (default masked). */
  defaultVisible?: boolean;
}

/**
 * PasswordInput — Insightis kit composition of InputGroup + leading Lock icon +
 * trailing visibility toggle (Eye / EyeOff). No own visual tokens — all states
 * delegate to the `.igrp` form-control system in kit-theme.css. The toggle's
 * aria-label swaps "Show password" ↔ "Hide password". `className` goes on the
 * `.igrp` shell; all native input props land on the inner `<input>`.
 *
 * The toggle button's inline sizing style is copied verbatim from the kit's
 * canonical #passwordinput demo markup — kit-authored, not invented here.
 */
export function PasswordInput({
  label,
  error = false,
  disabled = false,
  defaultVisible = false,
  className,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(defaultVisible);

  const group = (
    <div className={cx('igrp', error && 's-error', disabled && 's-disabled', className)}>
      <span className="igrp-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <input
        className="igrp-input"
        type={visible ? 'text' : 'password'}
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
      <button
        className="iconbtn"
        type="button"
        style={{
          height: '24px',
          width: '24px',
          background: 'transparent',
          border: 'none',
          color: 'var(--ink-secondary)',
          marginRight: '6px',
        }}
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <path d="m2 2 20 20" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );

  if (!label) return group;
  return (
    <div className="igrp-wrap">
      <span className="igrp-lbl">{label}</span>
      {group}
    </div>
  );
}
