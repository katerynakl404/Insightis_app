import * as React from 'react';
import { cx } from './cx';

export interface StatusViewProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Icon-circle tint: `info` brand@10% · `success` green@10% · `error` red@10% ·
   *  `neutral` `--state-hover` bg with `--ink-secondary` icon. */
  variant?: 'info' | 'success' | 'error' | 'neutral';
  /** Density step: sm gap 8 / pad 16 / circle 32px · md (default) gap 12 / pad 24 /
   *  circle 40px · lg gap 16 / pad 32 / circle 56px. */
  size?: 'sm' | 'md' | 'lg';
  /** Icon SVG rendered inside the `.vic` circle (16px sm · 20px md · 28px lg). */
  icon?: React.ReactNode;
  /** Status title (`.vt`). */
  title: React.ReactNode;
  /** Helper text (`.vd`). Copy rule: no trailing period. */
  description?: React.ReactNode;
  /** Optional trailing action, e.g. a kit `<Button>`. */
  action?: React.ReactNode;
}

/**
 * StatusView — Insightis kit centered status / empty / error block
 * (`.statv` from kit-theme.css): tinted icon circle + title + description,
 * with an optional action. Card surface, `--border`, radius 8px.
 */
export function StatusView({
  variant = 'info',
  size = 'md',
  icon,
  title,
  description,
  action,
  className,
  children,
  ...rest
}: StatusViewProps) {
  return (
    <div
      className={cx('statv', `statv-${variant}`, size === 'sm' && 'is-sm', size === 'lg' && 'is-lg', className)}
      role="status"
      {...rest}
    >
      {icon && <div className="vic">{icon}</div>}
      <div className="vt">{title}</div>
      {description && <div className="vd">{description}</div>}
      {action}
      {children}
    </div>
  );
}
