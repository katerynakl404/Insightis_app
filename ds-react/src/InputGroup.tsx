import * as React from 'react';
import { cx } from './cx';

export interface InputGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'prefix'> {
  /** Optional label rendered above the shell (Sentence case) — wraps the group
   *  in `.igrp-wrap` with an `.igrp-lbl` line. */
  label?: string;
  /** Height step on the `.igrp` shell: xs 28px · sm 32px · md 36px (default) ·
   *  lg 40px · xl 44px. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant: `primary` (default, `--bg` background) · `outline` (`--card`
   *  background, `.var-outline`). */
  variant?: 'primary' | 'outline';
  /** Leading addon (icon SVG, text, …) rendered inside a `.igrp-add` slot before
   *  the input. */
  prefix?: React.ReactNode;
  /** Trailing addon rendered inside a `.igrp-add` slot after the input. */
  suffix?: React.ReactNode;
  /** Keyboard-shortcut hint (e.g. "⌘K") rendered in the trailing
   *  `.igrp-add.igrp-kbd-slot` as a `.igrp-kbd` chip. */
  kbd?: string;
  /** Search variant: renders the trailing clear (×) `.igrp-clear` button. The kit
   *  CSS reveals it only while the input has content (`:has(:not(:placeholder-shown))`);
   *  clicking empties the input and refocuses it. */
  clearable?: boolean;
  /** Called after the clear (×) button empties the input. */
  onClear?: () => void;
  /** Error state: 1px `--input-error` border, icon + placeholder tinted — `.s-error`. */
  error?: boolean;
  /** Disabled: `--opacity-disabled` + pointer-events off — `.s-disabled`. */
  disabled?: boolean;
}

/**
 * InputGroup — Insightis kit composite input shell with addons. Renders
 * `.igrp .is-<size> [.var-outline]` from kit-theme.css with `.igrp-add` addon
 * slots around a bare `.igrp-input`. Hover/focus/pressed states are pure CSS
 * (full-wrapper hover → `Stroke/Border_Hover`, focus-within → 1px `--input-focus`
 * neutral border, no ring). `className` goes on the `.igrp` shell; all native
 * input props land on the inner `<input>`.
 */
export function InputGroup({
  label,
  size = 'md',
  variant = 'primary',
  prefix,
  suffix,
  kbd,
  clearable = false,
  onClear,
  error = false,
  disabled = false,
  className,
  ...rest
}: InputGroupProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    const el = inputRef.current;
    if (el) {
      el.value = '';
      el.focus();
    }
    onClear?.();
  };

  const group = (
    <div
      className={cx(
        'igrp',
        `is-${size}`,
        variant === 'outline' && 'var-outline',
        error && 's-error',
        disabled && 's-disabled',
        className,
      )}
    >
      {prefix != null && <span className="igrp-add">{prefix}</span>}
      <input
        ref={inputRef}
        className="igrp-input"
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
      {clearable && (
        <button
          className="iconbtn iconbtn-tertiary igrp-clear"
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
      {suffix != null && <span className="igrp-add">{suffix}</span>}
      {kbd != null && (
        <span className="igrp-add igrp-kbd-slot">
          <kbd className="igrp-kbd">{kbd}</kbd>
        </span>
      )}
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
