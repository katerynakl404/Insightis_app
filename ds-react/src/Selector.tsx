import * as React from 'react';
import { cx } from './cx';

/** Selector option — a plain string, or a distinct value/label pair. */
export type SelectorOption = string | { value: string; label: string };

export interface SelectorProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value' | 'onChange'> {
  /** Optional label rendered above the trigger (Sentence case) — `.sel-lbl`. */
  label?: string;
  /** Placeholder shown as `.sel-ph` (Text/Inactive) while no value is selected. */
  placeholder?: string;
  /** Options rendered as `.mi[role="option"]` rows inside the `.sel-menu.menu`
   *  listbox. */
  options?: SelectorOption[];
  /** Selected value; its option label is shown in `.sel-val`. */
  value?: string;
  /** Called with the option's value when an option row is clicked. */
  onChange?: (value: string) => void;
  /** Open state (controlled): sets `aria-expanded` on the trigger — the kit CSS
   *  shows the adjacent `.sel-menu`, swaps the border to `--input-focus` and
   *  rotates the chevron 180°. */
  open?: boolean;
  /** Trigger height step: sm 32px · md 36px (default) · lg 40px · xl 44px. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Disabled: `disabled` attr + `.s-disabled` (`--opacity-disabled`, no pointer). */
  disabled?: boolean;
}

/**
 * Selector — Insightis kit custom single-select. Renders
 * `.sel-wrap > .sel-lbl? + .sel-trig + .sel-menu.menu` from kit-theme.css;
 * the trigger and menu MUST stay adjacent siblings — the kit's
 * `.sel-trig[aria-expanded="true"]+.sel-menu` selector drives the open state.
 * Hover/focus/disabled states are pure CSS. Fully controlled: `open` shows the
 * menu (static preview friendly), option clicks call `onChange(value)`.
 */
export function Selector({
  label,
  placeholder = 'Select…',
  options = [],
  value,
  onChange,
  open = false,
  size = 'md',
  disabled = false,
  className,
  ...rest
}: SelectorProps) {
  const optionValue = (o: SelectorOption) => (typeof o === 'string' ? o : o.value);
  const optionLabel = (o: SelectorOption) => (typeof o === 'string' ? o : o.label);

  const selected = options.find((o) => optionValue(o) === value);
  const display = selected ? optionLabel(selected) : value;

  return (
    <div className="sel-wrap">
      {label && <span className="sel-lbl">{label}</span>}
      <button
        className={cx('sel-trig', size !== 'md' && `is-${size}`, disabled && 's-disabled', className)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        {...rest}
      >
        {display != null && display !== '' ? (
          <span className="sel-val">{display}</span>
        ) : (
          <span className="sel-ph">{placeholder}</span>
        )}
        <svg
          className="sel-chev"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="sel-menu menu" role="listbox">
        {options.map((o) => {
          const v = optionValue(o);
          return (
            <div
              key={v}
              className="mi"
              role="option"
              aria-selected={v === value || undefined}
              onClick={() => onChange?.(v)}
            >
              {optionLabel(o)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
