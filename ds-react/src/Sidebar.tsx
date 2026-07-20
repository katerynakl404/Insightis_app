import * as React from 'react';
import { cx } from './cx';

/* Canonical glyphs from the kit sidebar markup (insightis-preview-kit.html #sidebar). */

const PANEL_LEFT_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 3v18" />
  </svg>
);

const PLUS_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const NEW_CHAT_ICON = (
  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const SECT_CHEV_SVG = (
  <svg className="sbx-sect-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CHATS_ICON_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const KEBAB_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="6" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="18" r="2" />
  </svg>
);

const USER_CHEV_SVG = (
  <svg className="sbx-user-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

/** Merge the kit's `.ic` glyph class onto a consumer-passed icon element. */
function withIconClass(icon: React.ReactNode): React.ReactNode {
  if (React.isValidElement<{ className?: string }>(icon)) {
    return React.cloneElement(icon, { className: cx('ic', icon.props.className) });
  }
  return icon;
}

/* ============================== Root ============================== */

export interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Icon-only rail (`.is-collapsed`) — width 3.563rem; labels, CTA text, chat sections
   *  and footer meta hidden by kit CSS (desktop ≥ 1024px only; the mobile drawer always
   *  shows the full layout). */
  collapsed?: boolean;
}

/**
 * Sidebar — Insightis kit app sidebar shell (`.sbx`, kit section #sidebar).
 * Compose: `SidebarHeader` (brand + CTA) → `SidebarNav` (`SidebarNewChat` +
 * `SidebarItem`s) → `SidebarChats` (`SidebarSection`s of `SidebarChat`s) →
 * `SidebarFooter` (`SidebarUsage` + `SidebarUser`). Width 16rem expanded /
 * 3.563rem collapsed — all layout, states and the Expected-scope CTA swap
 * (`.sbx-cta` hidden, `.sbx-nav-newchat` shown) are pure kit CSS.
 */
export function Sidebar({ collapsed = false, className, children, ...rest }: SidebarProps) {
  return (
    <div className={cx('sbx', collapsed && 'is-collapsed', className)} {...rest}>
      {children}
    </div>
  );
}

/* ============================== Header ============================== */

export interface SidebarHeaderProps extends React.ComponentPropsWithoutRef<'div'> {}

/** SidebarHeader — `.sbx-head` container (brand row + New Chat CTA). */
export function SidebarHeader({ className, children, ...rest }: SidebarHeaderProps) {
  return (
    <div className={cx('sbx-head', className)} {...rest}>
      {children}
    </div>
  );
}

export interface SidebarBrandProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Click on the brand logo — opens the same page as the New Chat CTA. */
  onLogoClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Click on the collapse trigger (`.sbx-collapse`). */
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the logo button. Kit default: "New Chat". */
  logoLabel?: string;
  /** Accessible name for the collapse trigger. Kit default: "Toggle Sidebar". */
  toggleLabel?: string;
}

/**
 * SidebarBrand — `.sbx-brand` row: clickable brand logo (`.sbx-brand-id`, full
 * `#lg` wordmark expanded / `#lg-mark` glyph collapsed — both reference the kit's
 * shared SVG symbols, which must be present in the page) + the collapse trigger
 * (`.iconbtn.iconbtn-tertiary.sbx-collapse`, PanelLeft glyph).
 */
export function SidebarBrand({
  onLogoClick,
  onToggle,
  logoLabel = 'New Chat',
  toggleLabel = 'Toggle Sidebar',
  className,
  children,
  ...rest
}: SidebarBrandProps) {
  return (
    <div className={cx('sbx-brand', className)} {...rest}>
      <button className="sbx-brand-id" type="button" aria-label={logoLabel} onClick={onLogoClick}>
        <svg className="sbx-brand-logo" aria-hidden="true">
          <use href="#lg" />
        </svg>
        <svg className="sbx-brand-mark" aria-hidden="true">
          <use href="#lg-mark" />
        </svg>
      </button>
      {children}
      <button
        className="iconbtn iconbtn-tertiary sbx-collapse"
        type="button"
        aria-label={toggleLabel}
        onClick={onToggle}
      >
        {PANEL_LEFT_SVG}
      </button>
    </div>
  );
}

export interface SidebarCtaProps extends React.ComponentPropsWithoutRef<'button'> {}

/**
 * SidebarCta — the filled New Chat pill (`.btn.btn-primary.btn-sm.sbx-cta`).
 * Current-(prod)-scope entry point; the Expected scope hides it via kit CSS and
 * surfaces `SidebarNewChat` in the nav instead. Render both — CSS picks.
 */
export function SidebarCta({ className, children, ...rest }: SidebarCtaProps) {
  return (
    <button className={cx('btn', 'btn-primary', 'btn-sm', 'sbx-cta', className)} {...rest}>
      {PLUS_SVG}
      <span>{children ?? 'New Chat'}</span>
    </button>
  );
}

/* ============================== Nav ============================== */

export interface SidebarNavProps extends React.ComponentPropsWithoutRef<'div'> {}

/** SidebarNav — `.sbx-nav` container for the compact 32px nav rows. */
export function SidebarNav({ className, children, ...rest }: SidebarNavProps) {
  return (
    <div className={cx('sbx-nav', className)} {...rest}>
      {children}
    </div>
  );
}

export interface SidebarItemProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Leading 16px glyph. Pass a kit SVG icon; the `.ic` class is merged on. */
  icon?: React.ReactNode;
  /** Currently open page — `.active` (bg `State/Pressed` + `Text/Body` ink, no brand
   *  colour) + `aria-current="page"`. */
  active?: boolean;
  /** Right-aligned counter pill (`.nav-badge`). */
  badge?: React.ReactNode;
}

/**
 * SidebarItem — `.sbx-nav-item` nav row (h32, icon 16px, text-13 medium).
 * Hover / pressed / focus / disabled states are pure CSS (`:disabled` maps to the
 * kit's disabled recipe). In collapsed mode pass `aria-label` — the label is hidden.
 */
export function SidebarItem({ icon, active = false, badge, className, children, ...rest }: SidebarItemProps) {
  return (
    <button
      className={cx('sbx-nav-item', active && 'active', className)}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {withIconClass(icon)}
      <span className="lbl">{children}</span>
      {badge !== undefined && <span className="nav-badge">{badge}</span>}
    </button>
  );
}

export interface SidebarNewChatProps extends React.ComponentPropsWithoutRef<'button'> {}

/**
 * SidebarNewChat — the Expected-scope New Chat nav row
 * (`.sbx-nav-item.sbx-nav-newchat`, outlined plus-in-circle glyph, 18px).
 * Hidden by kit CSS in the Current (prod) scope, where `SidebarCta` shows instead.
 */
export function SidebarNewChat({ className, children, ...rest }: SidebarNewChatProps) {
  return (
    <button
      className={cx('sbx-nav-item', 'sbx-nav-newchat', className)}
      type="button"
      aria-label="New Chat"
      {...rest}
    >
      {NEW_CHAT_ICON}
      <span className="lbl">{children ?? 'New Chat'}</span>
    </button>
  );
}

/* ============================== Chats ============================== */

export interface SidebarChatsProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Click on the collapsed-mode Chats icon (`.sbx-chats-icon`, replaces the
   *  Pinned/Recent sections in icon mode) — conventionally expands the sidebar. */
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the collapsed-mode icon. Kit default: "Chats". */
  iconLabel?: string;
}

/**
 * SidebarChats — `.sbx-chats` scroll area holding the Pinned / Recent
 * `SidebarSection`s. Also renders the collapsed-mode `.sbx-chats-icon` button
 * (kit CSS shows it only while the sidebar is collapsed).
 */
export function SidebarChats({ onIconClick, iconLabel = 'Chats', className, children, ...rest }: SidebarChatsProps) {
  return (
    <div className={cx('sbx-chats', className)} {...rest}>
      <button className="sbx-chats-icon" type="button" aria-label={iconLabel} onClick={onIconClick}>
        {CHATS_ICON_SVG}
      </button>
      {children}
    </div>
  );
}

export interface SidebarSectionProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Section label (all-caps `Text/Inactive`), e.g. "Pinned" / "Recent". */
  label: React.ReactNode;
  /** Collapse state of the section. `false` rotates the chevron and kit CSS hides
   *  the section's chat rows. */
  expanded?: boolean;
  /** Click on the full-width label wrap (collapse/expand toggle). */
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  /** Click on the hover-revealed "See all" link. The link renders only when provided. */
  onSeeAll?: React.MouseEventHandler<HTMLButtonElement>;
  /** Link text. Kit default: "See all". */
  seeAllLabel?: React.ReactNode;
}

/**
 * SidebarSection — `.sbx-sect` chat group with `.sbx-sect-head`: the full-row
 * collapse toggle (`.sbx-sect-label-wrap` with label + hover-revealed chevron)
 * and an independent `.link.sbx-sect-link` "See all" target.
 */
export function SidebarSection({
  label,
  expanded = true,
  onToggle,
  onSeeAll,
  seeAllLabel = 'See all',
  className,
  children,
  ...rest
}: SidebarSectionProps) {
  return (
    <div className={cx('sbx-sect', className)} {...rest}>
      <div className="sbx-sect-head">
        <button className="sbx-sect-label-wrap" type="button" aria-expanded={expanded} onClick={onToggle}>
          <span className="sbx-sect-label">{label}</span>
          {SECT_CHEV_SVG}
        </button>
        {onSeeAll !== undefined && (
          <button className="link sbx-sect-link" type="button" onClick={onSeeAll}>
            {seeAllLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export interface SidebarChatProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Currently open chat — `s-active` (bg `State/Pressed` + `Text/Body` ink; the kit's
   *  persistent active class for chat rows, paired with `aria-current="true"` as the
   *  live pages do). */
  active?: boolean;
  /** Rest-state status indicator on the right edge (`Brand/Primary`): `loading` = 10px
   *  spinner + `aria-busy`, `new` = 6px dot. Fades out on hover as the kebab takes the slot. */
  status?: 'loading' | 'new';
  /** Screen-reader text for the status. Kit defaults: "In progress" / "New activity". */
  statusLabel?: string;
  /** Render the hover-revealed kebab (`.iconbtn.iconbtn-tertiary.sbx-chat-more`). Default true. */
  more?: boolean;
  /** Click handler for the kebab. */
  onMoreClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Context-menu open state — `aria-expanded` on the kebab; kit CSS reveals the
   *  sibling `.sbx-chat-menu` and holds the row's hover bg while open. */
  menuOpen?: boolean;
  /** Context-menu content (`.mi` items: Pin/Unpin → Rename → Delete `.mi.danger`),
   *  rendered inside `.menu.sbx-chat-menu` after the kebab. */
  menu?: React.ReactNode;
}

/**
 * SidebarChat — `.sbx-chat` row (h28, text-13) with the persistent right-edge
 * gradient fade tracking the row bg via `--chat-fade`. Children = the label,
 * rendered in `.sbx-chat-lbl` (gradient fade, no ellipsis).
 */
export function SidebarChat({
  active = false,
  status,
  statusLabel,
  more = true,
  onMoreClick,
  menuOpen = false,
  menu,
  className,
  children,
  ...rest
}: SidebarChatProps) {
  return (
    <div
      className={cx('sbx-chat', active && 's-active', className)}
      role="button"
      tabIndex={0}
      aria-current={active ? 'true' : undefined}
      aria-busy={status === 'loading' || undefined}
      {...rest}
    >
      <span className="sbx-chat-lbl">{children}</span>
      {status === 'loading' && (
        <span className="sbx-chat-status is-loading" aria-hidden="true">
          <span className="sbx-spinner" />
        </span>
      )}
      {status === 'new' && <span className="sbx-chat-status is-new" aria-hidden="true" />}
      {status !== undefined && (
        <span className="sbx-sr">{statusLabel ?? (status === 'loading' ? 'In progress' : 'New activity')}</span>
      )}
      {more && (
        <button
          className="iconbtn iconbtn-tertiary sbx-chat-more"
          type="button"
          aria-label="More actions"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={onMoreClick}
        >
          {KEBAB_SVG}
        </button>
      )}
      {more && menu !== undefined && (
        <div className="menu sbx-chat-menu" role="menu">
          {menu}
        </div>
      )}
    </div>
  );
}

/* ============================== Footer ============================== */

export interface SidebarFooterProps extends React.ComponentPropsWithoutRef<'div'> {}

/** SidebarFooter — `.sbx-foot` (hairline top border): usage meter + user row. */
export function SidebarFooter({ className, children, ...rest }: SidebarFooterProps) {
  return (
    <div className={cx('sbx-foot', className)} {...rest}>
      {children}
    </div>
  );
}

export interface SidebarUsageProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> {
  /** Meter label (`.sbx-tok-label`, text-11). Kit default: "Usage". */
  label?: React.ReactNode;
  /** Value text (`.sbx-tok-val`, tabular), e.g. "213 / 1,040". */
  value: React.ReactNode;
  /** Fill of the 3px `Brand/Primary` bar, 0–100. */
  percent: number;
}

/**
 * SidebarUsage — `.sbx-tok` credits meter button (label + value over a 3px
 * `Brand/Primary` progress bar). Anchors the tokens popover — pass
 * `aria-haspopup` / `aria-expanded` / handlers through as needed.
 */
export function SidebarUsage({ label = 'Usage', value, percent, className, ...rest }: SidebarUsageProps) {
  return (
    <button className={cx('sbx-tok', className)} type="button" {...rest}>
      <div className="sbx-tok-row">
        <span className="sbx-tok-label">{label}</span>
        <span className="sbx-tok-val">{value}</span>
      </div>
      <div className="sbx-tok-bar">
        <span style={{ width: `${percent}%` }} />
      </div>
    </button>
  );
}

export interface SidebarUserProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'name'> {
  /** 24px avatar content (`.sbx-user-ava`, `Brand/Tertiary` disc) — typically an initial. */
  avatar: React.ReactNode;
  /** User name — primary line (`.sbx-user-name`, text-12 semibold, `Text/Primary`). */
  name: React.ReactNode;
  /** Secondary line (`.sbx-user-meta`, text-10 `Text/Secondary`), e.g. "Admin · Free". */
  meta?: React.ReactNode;
}

/**
 * SidebarUser — `.sbx-user` footer row: avatar + name over role/plan meta + faint
 * up-down chevron. Anchors the account popover — pass `aria-haspopup` /
 * `aria-expanded` / handlers through as needed. In collapsed mode kit CSS reduces
 * it to the avatar; provide `aria-label` ("name, role · plan").
 */
export function SidebarUser({ avatar, name, meta, className, ...rest }: SidebarUserProps) {
  return (
    <button className={cx('sbx-user', className)} type="button" {...rest}>
      <span className="sbx-user-ava">{avatar}</span>
      <span className="sbx-user-info">
        <span className="sbx-user-name">{name}</span>
        {meta !== undefined && <span className="sbx-user-meta">{meta}</span>}
      </span>
      {USER_CHEV_SVG}
    </button>
  );
}
