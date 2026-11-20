import * as React from 'react';

/**
 * RowMenuButton — from @devart/ui-react@1.0.0 (./src/components/RowMenuButton/RowMenuButton.stories.tsx).
 */
export interface RowMenuButtonProps {
  /** The menu — `DropdownMenuItem`s, separators, a label. */
  children: React.ReactNode;
  /** Name the action, not the row. In a list of many, add the row's own name ("More actions for Q1 revenue") so a screen read */
  "aria-label"?: string;
  /** Fade the trigger in on row hover, on keyboard focus anywhere in the row and while its menu is open, instead of showing i */
  reveal?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  style?: CSSProperties;
  ref?: React.Ref;
  className?: string;
  id?: string;
  /** Shown on hover and focus; `true` shows the `aria-label`. A disabled button with a tooltip is rendered `aria-disabled`, s */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

export declare const RowMenuButton: React.ComponentType<RowMenuButtonProps>;
