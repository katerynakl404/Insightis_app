import * as React from 'react';
import { cx } from './cx';

export interface AutocompleteProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'prefix' | 'onSelect'> {
  /** Optional label rendered above the control (Sentence case) — `.acpl-lbl`. */
  label?: string;
  /** Open state: adds `.is-open` (rotates the chevron 180°) and renders the
   *  `.acpl-list` suggestion menu below the control. */
  open?: boolean;
  /** Suggestion items rendered as `.acpl-opt` rows while `open`. */
  items?: string[];
  /** Index into `items` that carries the kit's `data-highlighted` attribute
   *  (`State/Hover` surface). */
  highlighted?: number;
  /** Multi-select: chosen values rendered as `.badge.badge-secondary` chips with
   *  a `.b-x` remove affordance inside the control. */
  values?: string[];
  /** Called when a value chip's × is clicked. */
  onRemoveValue?: (value: string) => void;
  /** Called when a suggestion row is clicked. */
  onSelect?: (item: string) => void;
  /** Clearable: renders the `.iconbtn-mini` clear (✕) button in the `.acpl-end`
   *  slot; called on click. */
  onClear?: () => void;
  /** Text shown in `.acpl-empty` when `open` and `items` is empty
   *  (no trailing period). */
  emptyText?: string;
}

/**
 * Autocomplete — Insightis kit combobox composing InputGroup-style control +
 * dropdown list + (multi) Badge chips. Renders `.acpl [.is-open]` from
 * kit-theme.css: `.acpl-ctrl` shell (badges + bare input + `.acpl-end` clear/chevron),
 * `.acpl-list` with `.acpl-opt` rows. No own visual tokens — focus-within border
 * and highlighted-option surface are pure CSS. Statically renderable via `open`.
 * `className` goes on the `.acpl` root; all native input props land on the
 * inner `<input>`.
 */
export function Autocomplete({
  label,
  open = false,
  items = [],
  highlighted,
  values = [],
  onRemoveValue,
  onSelect,
  onClear,
  emptyText = 'No results',
  className,
  ...rest
}: AutocompleteProps) {
  return (
    <div className={cx('acpl', open && 'is-open', className)}>
      {label && <span className="acpl-lbl">{label}</span>}
      <div className="acpl-ctrl">
        {values.map((value) => (
          <span key={value} className="badge badge-secondary">
            {value}{' '}
            <span
              className="b-x"
              role="button"
              aria-label={`Remove ${value}`}
              onClick={() => onRemoveValue?.(value)}
            >
              ×
            </span>
          </span>
        ))}
        <input {...rest} />
        <div className="acpl-end">
          {onClear && (
            <button className="iconbtn-mini" type="button" aria-label="Clear" onClick={onClear}>
              ✕
            </button>
          )}
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      {open && (
        <div className="acpl-list">
          {items.length === 0 ? (
            <div className="acpl-empty">{emptyText}</div>
          ) : (
            items.map((item, i) => (
              <div
                key={item}
                className="acpl-opt"
                data-highlighted={i === highlighted ? '' : undefined}
                onClick={() => onSelect?.(item)}
              >
                {item}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
