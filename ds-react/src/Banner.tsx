import * as React from 'react';
import { cx } from './cx';

export interface BannerProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Surface: `default` neutral card (`--card` bg, `--border`) or `gradient`
   *  (`.banner-grad`, `--grad-teal-dark` bg, white text tokens). */
  variant?: 'default' | 'gradient';
  /** Density: default padding 26/24px, 60px icon · `sm` (`.banner-sm`)
   *  padding 16/20px, 40px icon, 14px title. */
  size?: 'default' | 'sm';
  /** Icon SVG rendered inside the `.banner-ic` container. */
  icon?: React.ReactNode;
  /** Banner title (`.banner-t`). */
  title: React.ReactNode;
  /** Supporting text (`.banner-d`); `<b>` inside it renders emphasised. */
  description?: React.ReactNode;
  /** Right-aligned CTA area (`.banner-cta`), typically kit `<Button>`s. */
  action?: React.ReactNode;
  /** Renders the corner `.banner-close` ✕ and wraps the banner in
   *  `.banner-wrap` so dismissal animates the collapse (`.is-dismissed`). */
  dismissible?: boolean;
  /** Called after the close button is pressed. */
  onDismiss?: () => void;
}

/**
 * Banner — Insightis kit full-width informational strip (`.banner` from
 * kit-theme.css): icon + title + description + optional CTA, with an optional
 * gradient variant and corner dismiss. When `dismissible`, the component
 * manages its own collapsed state via `.banner-wrap.is-dismissed`.
 */
export function Banner({
  variant = 'default',
  size = 'default',
  icon,
  title,
  description,
  action,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...rest
}: BannerProps) {
  const [dismissed, setDismissed] = React.useState(false);

  const banner = (
    <div
      className={cx('banner', variant === 'gradient' && 'banner-grad', size === 'sm' && 'banner-sm', className)}
      role="note"
      {...rest}
    >
      {icon && (
        <div className="banner-ic" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="banner-body">
        <p className="banner-t">{title}</p>
        {description && <p className="banner-d">{description}</p>}
        {children}
      </div>
      {action && <div className="banner-cta">{action}</div>}
      {dismissible && (
        <button
          className="banner-close"
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
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
    </div>
  );

  if (!dismissible) return banner;
  return <div className={cx('banner-wrap', dismissed && 'is-dismissed')}>{banner}</div>;
}
