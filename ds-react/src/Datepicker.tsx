import * as React from 'react';
import { cx } from './cx';

/** One day cell in the Datepicker grid. */
export interface DatepickerDay {
  /** Day-of-month number shown in the cell. */
  day: number;
  /** Outside the displayed month — `.outside` (Text/Inactive). */
  outside?: boolean;
  /** Single selected day — `.selected` (`Brand/Primary` fill). */
  selected?: boolean;
  /** Range membership: `start` / `middle` / `end` → `.range-start` (left-rounded
   *  primary) / `.range-middle` (`Surface/Chips`, square) / `.range-end`
   *  (right-rounded primary). */
  range?: 'start' | 'middle' | 'end';
  /** Keyboard-focused day — `.focused` (`--shadow-focus` ring). */
  focused?: boolean;
}

export interface DatepickerProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Month caption in the nav row, e.g. "June 2026" — `.dpk-cap`. */
  caption: string;
  /** Weekday header letters — seven `.dpk-wd` cells. Default M T W T F S S. */
  weekdays?: string[];
  /** Day cells rendered in reading order into the 7-column `.dpk-grid`
   *  (include leading/trailing `outside` days to square the weeks). */
  days: DatepickerDay[];
  /** Previous-month nav button click. */
  onPrev?: () => void;
  /** Next-month nav button click. */
  onNext?: () => void;
  /** Called with the day model and its index when a day cell is clicked. */
  onSelectDay?: (day: DatepickerDay, index: number) => void;
  /** Footer slot rendered in `.dpk-foot` (e.g. a full-width pill "Set Date"
   *  Button per the kit demo). Omitted → no footer row. */
  footer?: React.ReactNode;
  /** Statically renderable open flag — when false the calendar renders nothing. */
  open?: boolean;
}

const DEFAULT_WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * Datepicker — Insightis kit calendar primitive (SingleDatePicker /
 * DateRangePicker compositions). Renders `.dpk > .dpk-cal > .dpk-nav + .dpk-grid`
 * from kit-theme.css: `.nav-btn` prev/next, `.dpk-cap` caption, `.dpk-wd`
 * weekday headers and `.dpk-day` cells with `outside / selected / range-start /
 * range-middle / range-end / focused` modifiers. Hover on unselected days is
 * pure CSS (`--state-hover`).
 *
 * NOTE: the kit has no "today" day-cell class yet — the storybook States table
 * marks Today as "state needed", so this wrapper deliberately exposes no
 * `today` flag until the kit defines one.
 */
export function Datepicker({
  caption,
  weekdays = DEFAULT_WEEKDAYS,
  days,
  onPrev,
  onNext,
  onSelectDay,
  footer,
  open = true,
  className,
  ...rest
}: DatepickerProps) {
  if (!open) return null;

  return (
    <div className={cx('dpk', className)} {...rest}>
      <div className="dpk-cal">
        <div className="dpk-nav">
          <button className="nav-btn" type="button" aria-label="Previous" onClick={onPrev}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <span className="dpk-cap">{caption}</span>
          <button className="nav-btn" type="button" aria-label="Next" onClick={onNext}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
        <div className="dpk-grid">
          {weekdays.map((wd, i) => (
            <span key={i} className="dpk-wd">
              {wd}
            </span>
          ))}
          {days.map((d, i) => (
            <button
              key={i}
              type="button"
              className={cx(
                'dpk-day',
                d.outside && 'outside',
                d.selected && 'selected',
                d.range === 'start' && 'range-start',
                d.range === 'middle' && 'range-middle',
                d.range === 'end' && 'range-end',
                d.focused && 'focused',
              )}
              onClick={() => onSelectDay?.(d, i)}
            >
              {d.day}
            </button>
          ))}
        </div>
      </div>
      {footer != null && <div className="dpk-foot">{footer}</div>}
    </div>
  );
}
