import * as React from 'react';
import { cx } from './cx';

const CHECK_SVG = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const PIN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M12 17v5" />
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  </svg>
);

const KEBAB_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="6" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="18" r="2" />
  </svg>
);

export interface ChatListProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Selection mode (`.is-selecting`) — reveals every row's checkbox. Turn on when any
   *  row is selected (list-level state, per the kit's ancestor-driven visibility rule). */
  selecting?: boolean;
}

/**
 * ChatList — `.chat-list` container for `ChatRow`s (kit section #chatrow).
 * Owns the list-level `.is-selecting` state that keeps checkboxes visible on
 * all rows while any row is selected.
 */
export function ChatList({ selecting = false, className, children, ...rest }: ChatListProps) {
  return (
    <div className={cx('chat-list', selecting && 'is-selecting', className)} {...rest}>
      {children}
    </div>
  );
}

export interface ChatRowProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Conversation name — `.chat-row-name` (truncates with ellipsis). */
  title: React.ReactNode;
  /** Right-anchored timestamp — `.chat-row-time` (e.g. "2h ago"). */
  meta?: React.ReactNode;
  /** Selected (selection mode) — `.is-selected` row bg `State/Pressed` + brand border;
   *  the checkbox renders checked (`.cbx.on`). Pair with `ChatList selecting`. */
  selected?: boolean;
  /** Pinned — renders the inline `.chat-row-pin` marker after the title (filled
   *  `Brand/Primary`, click toggles to unpin). Unpinned rows have no pin slot at all. */
  pinned?: boolean;
  /** Click handler for the pin marker (unpin). Only relevant when `pinned`. */
  onPinToggle?: React.MouseEventHandler<HTMLButtonElement>;
  /** Click handler for the kebab (`.chat-row-more`, revealed on hover/focus-within). */
  onMoreClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Context-menu open state — sets `aria-expanded` on the kebab; kit CSS shows the
   *  sibling `.chat-row-menu` and holds the row in its hover state while open. */
  menuOpen?: boolean;
  /** Context-menu content (`.mi` items, Delete = `.mi.danger`) rendered inside the
   *  kebab-anchored `.menu.chat-row-menu`. */
  menu?: React.ReactNode;
}

/**
 * ChatRow — Insightis kit Chats-library list row (kit section #chatrow).
 * Composes checkbox slot (`.cbx`, hidden until hover / `.is-selecting`) · name ·
 * pin marker (pinned rows only) · timestamp · kebab. Card surface, hover lift,
 * press scale and reveal behaviour are pure CSS (locked card-hover recipe in
 * kit-theme.css).
 */
export function ChatRow({
  title,
  meta,
  selected = false,
  pinned = false,
  onPinToggle,
  onMoreClick,
  menuOpen = false,
  menu,
  className,
  children,
  ...rest
}: ChatRowProps) {
  return (
    <div className={cx('chat-row', selected && 'is-selected', className)} {...rest}>
      <span className={cx('cbx', selected && 'on')}>{selected ? CHECK_SVG : null}</span>
      <span className="chat-row-name">{title}</span>
      {pinned && (
        <button
          className="chat-row-pin"
          type="button"
          aria-label="Unpin"
          aria-pressed="true"
          onClick={onPinToggle}
        >
          {PIN_SVG}
        </button>
      )}
      {children}
      {meta !== undefined && <span className="chat-row-time">{meta}</span>}
      <button
        className="chat-row-more"
        type="button"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={onMoreClick}
      >
        {KEBAB_SVG}
      </button>
      {menu !== undefined && <div className="menu chat-row-menu" role="menu">{menu}</div>}
    </div>
  );
}
