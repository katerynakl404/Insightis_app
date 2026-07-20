import * as React from 'react';
import { cx } from './cx';

export interface ChipProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Selected state (`.is-active` + `aria-pressed="true"`) — `--state-pressed` fill,
   *  `--ink-highlight` border + text, cursor default (no hover change; locked). */
  active?: boolean;
  /** Optional trailing count (`.chip-n` — 11px tabular-nums). */
  count?: number;
}

/**
 * Chip — Insightis kit single-select filter pill (28px, radius full).
 * Renders `.chip` (+ `.is-active`) from kit-theme.css; hover / pressed / focus /
 * disabled states are pure CSS. Selection logic lives in the parent — render
 * chips inside a `ChipRow` and toggle `active`.
 */
export function Chip({ active = false, count, className, children, ...rest }: ChipProps) {
  return (
    <button
      className={cx('chip', active && 'is-active', className)}
      type="button"
      aria-pressed={active}
      {...rest}
    >
      {children}
      {count !== undefined && <span className="chip-n">{count}</span>}
    </button>
  );
}

export interface ChipRowProps extends React.ComponentPropsWithoutRef<'div'> {}

/**
 * ChipRow — kit container that owns the chip wrap + gap (`.chip-row`).
 * On mobile (≤767px) the kit switches it to single-line horizontal scroll.
 */
export function ChipRow({ className, children, ...rest }: ChipRowProps) {
  return (
    <div className={cx('chip-row', className)} {...rest}>
      {children}
    </div>
  );
}

export interface ChipMetaProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Trailing 10px chevron (`.chip-meta-arrow`, `--brand-primary`) — the drill-in /
   *  expand affordance. Omit for tag-style read-only name chips. */
  arrow?: boolean;
}

/**
 * ChipMeta — Insightis kit meta chip (drill-in / expand variant).
 * Small rounded-square chip (`.chip-meta`, 12px/500, radius .375rem) distinct from
 * the filter pill in shape, size and intent — it opens a detail / expanded view
 * rather than toggling filter state. Hover / focus / disabled and the dark-theme
 * surface lift are pure CSS.
 */
export function ChipMeta({ arrow = false, className, children, ...rest }: ChipMetaProps) {
  return (
    <button className={cx('chip-meta', className)} type="button" {...rest}>
      {children}
      {arrow && (
        <svg
          className="chip-meta-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      )}
    </button>
  );
}
