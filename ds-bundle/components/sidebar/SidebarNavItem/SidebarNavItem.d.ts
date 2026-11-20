import * as React from 'react';

/**
 * SidebarNavItem — from @devart/ui-react@1.0.0 (./src/components/Sidebar/SidebarNavItem.stories.tsx).
 */
export interface SidebarNavItemProps {
  /** The row's glyph. A component — a lucide icon — is rendered at the row's size; an element — a product mark, an `<img>` —  */
  icon: ReactElement<unknown, string | JSXElementConstructor<any>> | ComponentClass<{ className?: string; }, any> | FunctionComponent<{ className?: string; }>;
  label: string;
  /** Trailing content at the row's end — a `Counter`, a `Badge`. The rail has no room for it, so it leaves there; it is the r */
  badge?: React.ReactNode;
  activatable?: boolean;
  withTooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  className?: string;
  href?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export declare const SidebarNavItem: React.ComponentType<SidebarNavItemProps>;
