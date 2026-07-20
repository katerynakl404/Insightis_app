import * as React from 'react';
import { cx } from './cx';

export interface ProviderCardProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Provider logo (img or SVG) inside the 44×44 `.prov-ic-w` wrapper. */
  logo?: React.ReactNode;
  /** Connection name — always the primary line (600 weight, truncated). */
  name: React.ReactNode;
  /** Connected renders a `.badge.badge-green.badge-sm` "Connected" badge;
   *  otherwise a `.prov-card-dot` + "Not connected" text. */
  connected?: boolean;
  /** Custom content for the `.prov-card-status` row; overrides `connected`. */
  status?: React.ReactNode;
  /** Label above the metric chips (`.prov-card-metrics-label`). */
  metricsLabel?: React.ReactNode;
  /** Metric chips (e.g. `.chip-meta` buttons), laid out in a `.chip-row`. */
  metrics?: React.ReactNode;
  /** Footer CTA (`.prov-card-footer`), e.g. a Connect / Manage kit Button —
   *  stretched full-width by the kit. */
  action?: React.ReactNode;
}

/**
 * ProviderCard — Insightis kit data-source / integration card (`.prov-card`
 * from kit-theme.css): icon wrapper + name + status, hidden divider that
 * pushes the footer down, metric chips, full-width CTA footer. Elevation-lift
 * hover comes from the kit CSS.
 */
export function ProviderCard({
  logo,
  name,
  connected = false,
  status,
  metricsLabel = 'Available metrics',
  metrics,
  action,
  className,
  ...rest
}: ProviderCardProps) {
  return (
    <div className={cx('prov-card', className)} {...rest}>
      <div className="prov-card-head">
        {logo && <div className="prov-ic-w">{logo}</div>}
        <div className="prov-card-info">
          <span className="prov-card-name">{name}</span>
          <span className="prov-card-status">
            {status ??
              (connected ? (
                <span className="badge badge-green badge-sm">Connected</span>
              ) : (
                <>
                  <span className="prov-card-dot" />
                  <span className="prov-card-status-text">Not connected</span>
                </>
              ))}
          </span>
        </div>
      </div>
      <hr className="prov-card-divider" />
      <div>
        {metrics && (
          <>
            <div className="prov-card-metrics-label">{metricsLabel}</div>
            <div className="chip-row">{metrics}</div>
          </>
        )}
      </div>
      {action && <div className="prov-card-footer">{action}</div>}
    </div>
  );
}

export interface ProviderBrowseCardProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Icon inside the 40px dashed `.prov-card-browse-ic` circle. */
  icon?: React.ReactNode;
  /** Primary label (`.prov-card-browse-label`). */
  label: React.ReactNode;
  /** Secondary line (`.prov-card-browse-sub`). Copy rule: no trailing period. */
  sub?: React.ReactNode;
}

/**
 * ProviderBrowseCard — the ghost/dashed browse-all variant
 * (`.prov-card.is-browse`): centred dashed icon circle, label and sub-text.
 * Rendered as a focusable button-role card, matching the kit fragment.
 */
export function ProviderBrowseCard({ icon, label, sub, className, ...rest }: ProviderBrowseCardProps) {
  return (
    <div className={cx('prov-card', 'is-browse', className)} role="button" tabIndex={0} {...rest}>
      {icon && <div className="prov-card-browse-ic">{icon}</div>}
      <p className="prov-card-browse-label">{label}</p>
      {sub && <p className="prov-card-browse-sub">{sub}</p>}
    </div>
  );
}
