import * as React from 'react';
import { cx } from './cx';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Surface variant: `outline` (default `.card-c`) or `secondary`
   *  (`.card-c.var-secondary` — hover swaps to `--state-hover` bg). */
  variant?: 'outline' | 'secondary';
}

/**
 * Card — Insightis kit surface container (`.card-c` from kit-theme.css):
 * flex column, gap 12px, padding 16px, `--card` bg, `--border`, radius 8px.
 * Hover (border `--card-border-hover`) and pressed (brand-tinted bg) states
 * are pure CSS on every card — the kit defines no separate interactive
 * modifier class, so no `interactive` prop is exposed. Compose with
 * `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`.
 */
export function Card({ variant = 'outline', className, children, ...rest }: CardProps) {
  return (
    <div className={cx('card-c', variant === 'secondary' && 'var-secondary', className)} {...rest}>
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.ComponentPropsWithoutRef<'div'> {}

/** CardTitle — `.c-title`: 16px / 600, `--ink`, tight tracking. */
export function CardTitle({ className, children, ...rest }: CardTitleProps) {
  return (
    <div className={cx('c-title', className)} {...rest}>
      {children}
    </div>
  );
}

export interface CardDescriptionProps extends React.ComponentPropsWithoutRef<'div'> {}

/** CardDescription — `.c-desc`: 14px secondary text. */
export function CardDescription({ className, children, ...rest }: CardDescriptionProps) {
  return (
    <div className={cx('c-desc', className)} {...rest}>
      {children}
    </div>
  );
}

export interface CardContentProps extends React.ComponentPropsWithoutRef<'div'> {}

/** CardContent — `.c-body`: 14px body-ink content area. */
export function CardContent({ className, children, ...rest }: CardContentProps) {
  return (
    <div className={cx('c-body', className)} {...rest}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.ComponentPropsWithoutRef<'div'> {}

/** CardFooter — `.c-foot`: flex actions row, 8px gap. */
export function CardFooter({ className, children, ...rest }: CardFooterProps) {
  return (
    <div className={cx('c-foot', className)} {...rest}>
      {children}
    </div>
  );
}
