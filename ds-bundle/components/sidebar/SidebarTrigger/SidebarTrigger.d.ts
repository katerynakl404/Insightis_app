import * as React from 'react';

/**
 * SidebarTrigger — from @devart/ui-react@1.0.0 (./src/components/Sidebar/SidebarTrigger.stories.tsx).
 */
export interface SidebarTriggerProps {
  /** Accessible name for the trigger's screen-reader-only text. */
  label?: string;
  /** Replaces the default panel glyph. Sizing stays with `className`, so an override inherits whatever `[&_svg]:size-*` the c */
  icon?: React.ReactNode;
  /** Also shows `label` visually, which is what an icon-only rail needs. Off while the sidebar is the sheet (`isMobile`): the */
  tooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  asChild?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  /** Shows a spinner and blocks pointer interaction while keeping the variant fill (the label is retained). Sets `aria-busy`; */
  isLoading?: boolean;
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline" | "transparentUnderline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  align?: "center" | "right" | "left";
  fullWidth?: boolean;
}

export declare const SidebarTrigger: React.ComponentType<SidebarTriggerProps>;
