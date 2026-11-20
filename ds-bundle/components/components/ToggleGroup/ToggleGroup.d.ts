import * as React from 'react';

/**
 * ToggleGroup — from @devart/ui-react@1.0.0 (./src/components/ToggleGroup/ToggleGroup.stories.tsx).
 */
export interface ToggleGroupProps {
  type: "single" | "multiple";
  /** The controlled stateful value of the item that is pressed. */
  value?: string | string[];
  /** The value of the item that is pressed when initially rendered. Use `defaultValue` if you do not need to control the stat */
  defaultValue?: string | string[];
  /** Whether the group is disabled from user interaction. */
  disabled?: boolean;
  /** Whether the group should maintain roving focus of its buttons. */
  rovingFocus?: boolean;
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "outline" | "ghost" | "stroke" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  scrollIntoGroup?: boolean;
}

export declare const ToggleGroup: React.ComponentType<ToggleGroupProps>;
