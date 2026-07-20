import * as React from 'react';
import { cx } from './cx';

export interface DropdownProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Statically renderable: `true` (default) renders the menu surface inline;
   *  `false` renders nothing. No portal/positioning — parent decides placement. */
  open?: boolean;
  /** Fixed width step: sm 14rem · md 18rem · lg 22rem. Omit for the fluid default
   *  (`width:max-content`, clamped 140–320px — hugs the longest item). */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Dropdown — Insightis kit context-menu surface. Renders the `.menu` shell
 * (Surface/Card bg, 8px radius, 4px padding, overlay shadow) from kit-theme.css.
 * Compose with `MenuItem` and `MenuSeparator` children.
 */
export function Dropdown({ open = true, size, className, children, ...rest }: DropdownProps) {
  if (!open) return null;
  return (
    <div role="menu" className={cx('menu', size && `is-${size}`, className)} {...rest}>
      {children}
    </div>
  );
}

export interface MenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Destructive row: text `Feedback/Red_Text`, red-tinted hover/press (`.mi.danger`). */
  danger?: boolean;
  /** Disabled row: `.mi.is-disabled` — text `Text/Inactive`, pointer-events off. */
  disabled?: boolean;
  /** Optional leading icon (16px Lucide SVG, stroke 1.75); receives the kit `.mi-ic` class. */
  icon?: React.ReactElement<{ className?: string }>;
}

/**
 * MenuItem — one `.mi` row inside a Dropdown. 6/12px padding, 8px gap, 4px radius,
 * text-sm `Text/Body`; hover `State/Hover`, press `State/Pressed` are pure CSS.
 */
export function MenuItem({ danger = false, disabled = false, icon, className, children, ...rest }: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cx('mi', danger && 'danger', disabled && 'is-disabled', className)}
      disabled={disabled}
      {...rest}
    >
      {icon ? React.cloneElement(icon, { className: cx('mi-ic', icon.props.className) }) : null}
      {children}
    </button>
  );
}

export interface MenuSeparatorProps extends React.ComponentPropsWithoutRef<'hr'> {}

/**
 * MenuSeparator — full-width hairline between menu groups (`.menu-sep`:
 * 1px `Stroke/Border`, 4px vertical margin, bleeds through the menu padding).
 */
export function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
  return <hr className={cx('menu-sep', className)} {...rest} />;
}
