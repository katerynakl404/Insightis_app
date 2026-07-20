import * as React from 'react';
import { cx } from './cx';

export interface StepperProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Total number of steps (dots). */
  count: number;
  /** Zero-based index of the current step. Steps before it render as done
   *  (brand fill, ✓), the current one as active (brand fill + 25% brand ring),
   *  later ones as todo (chip bg, number). Default 0. */
  active?: number;
}

/**
 * Stepper — Insightis kit numbered step indicator (`.step` from
 * kit-theme.css): 24px dots (`.dot done|active|todo`) joined by 24×2px
 * connector lines (`.ln`). Done/active use `--brand-primary`; upcoming use
 * the chip surface.
 */
export function Stepper({ count, active = 0, className, ...rest }: StepperProps) {
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    if (i > 0) dots.push(<span key={`ln-${i}`} className="ln" />);
    const state = i < active ? 'done' : i === active ? 'active' : 'todo';
    dots.push(
      <span key={`dot-${i}`} className={cx('dot', state)} aria-current={i === active ? 'step' : undefined}>
        {state === 'done' ? '✓' : i + 1}
      </span>,
    );
  }
  return (
    <div className={cx('step', className)} {...rest}>
      {dots}
    </div>
  );
}
