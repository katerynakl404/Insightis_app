import * as React from 'react';
import { cx } from './cx';

/* Canonical fragments mirrored 1:1 from the approved page generator
   (pages/approved/data-sources_connections-landing.html → dsCardHtml() / dsMarkWrap() /
   FLAME_BADGE / PLUS_SVG_SM). The inline styles below ARE the kit markup for these
   fragments — the flame badge / logo-wrap positioning lives in the generated markup,
   not in kit-theme.css. */

const PLUS_SVG_SM = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ width: 16, height: 16, flex: 'none' }}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const FLAME_BADGE = (
  <span
    aria-label="Popular"
    style={{
      position: 'absolute',
      top: -4,
      right: -4,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--card)',
      border: '1.5px solid var(--card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg
      viewBox="0 0 24 24"
      fill="var(--popular-flame)"
      stroke="none"
      aria-hidden="true"
      style={{ width: 18, height: 18, flex: 'none' }}
    >
      <path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2-1-3.5-2-4.5 0 2-1.5 3-1.5 3C13.5 8 12 5 12 2z" />
    </svg>
  </span>
);

export interface DataSourceCardProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Connector name — `.ds-card-name` (text-14, regular weight; the approved catalog
   *  tile clamps it to 2 lines, centered). Name only — the approved tile has no
   *  category/description line. */
  title: string;
  /** Connector logo — pass the kit sprite span, e.g.
   *  `<span className="logo-spr postgresql" role="img" aria-label="PostgreSQL logo" />`.
   *  Size comes from the ancestor context (`.ds-card .logo-spr` 3rem; `.ds-v3` tile 2.5rem). */
  logo: React.ReactNode;
  /** Popular connector — overlays the flame badge on the logo's top-right corner
   *  (18px circle, `--card` ring, `--popular-flame` fill), per `dsMarkWrap()`. */
  popular?: boolean;
  /** Click handler for the scrim-revealed "+ Connect" button
   *  (`.btn.btn-sm.btn-secondary.ds-card-connect`). */
  onConnect?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * DataSourceCard — Insightis kit connector catalog card (kit section #dscard).
 * Renders the exact `.ds-card` markup built by `dsCardHtml()`: logo wrap (+ flame
 * badge when popular) · `.ds-card-body > .ds-card-head > .ds-card-name` ·
 * `.ds-card-hover` scrim with the "+ Connect" secondary button. The approved
 * vertical-tile layout, hover lift, scrim reveal and touch `.is-active` behaviour
 * come from the ancestor `.ds-app.ds-v3` scope in kit-theme.css — wrap the grid in
 * that scope, exactly like the page does.
 */
export function DataSourceCard({
  title,
  logo,
  popular = false,
  onConnect,
  className,
  children,
  ...rest
}: DataSourceCardProps) {
  return (
    <div className={cx('ds-card', className)} role="listitem" {...rest}>
      <span className="ds-logo-wrap" style={{ position: 'relative', flex: 'none', display: 'inline-flex' }}>
        {logo}
        {popular && FLAME_BADGE}
      </span>
      <div className="ds-card-body">
        <div className="ds-card-head">
          <span className="ds-card-name">{title}</span>
        </div>
      </div>
      {children}
      <div className="ds-card-hover">
        <button
          className="btn btn-sm btn-secondary ds-card-connect"
          type="button"
          aria-label={`Connect ${title}`}
          onClick={onConnect}
        >
          {PLUS_SVG_SM}
          <span>Connect</span>
        </button>
      </div>
    </div>
  );
}
