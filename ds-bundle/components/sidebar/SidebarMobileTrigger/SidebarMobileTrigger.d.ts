import * as React from 'react';

/**
 * SidebarMobileTrigger — from @devart/ui-react@1.0.0 (./src/components/Sidebar/SidebarMobileTrigger.stories.tsx).
 */
export interface SidebarMobileTriggerProps {
  /** Overrides `label` as the accessible name; prefer `label`. */
  "aria-label"?: string;
  label?: string;
  icon?: React.ReactNode;
  /** Also shows the accessible name visually — the button is a glyph and nothing else. The same string, so there is no second */
  tooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  style?: CSSProperties;
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline";
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "3xs" | "2xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  /** Replaces the icon with a spinner and blocks pointer interaction while keeping the variant fill. Sets `aria-busy`; does n */
  isLoading?: boolean;
}

export declare const SidebarMobileTrigger: React.ComponentType<SidebarMobileTriggerProps>;
