import * as React from 'react';

/**
 * SegmentedControl — from @devart/ui-react@1.0.0 (./changes/components/SegmentedControl.stories.tsx).
 */
export interface SegmentedControlProps {
  size?: "sm" | "md";
  variant?: "default";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  /** Nothing selected is a state of its own — Inherit, Not set — and pressing the selected option again returns to it (`onVal */
  deselectable?: boolean;
  /** What a screen reader is told the control is. `tabs` — a view switcher, whose segments show panels (`SegmentedControlCont */
  semantics?: "radio" | "tabs";
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** The orientation the tabs are layed out. Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: "horizontal" | "vertical";
  /** The direction of navigation between toolbar items. */
  dir?: "ltr" | "rtl";
  /** Whether a tab is activated automatically or manually. */
  activationMode?: "manual" | "automatic";
  style?: CSSProperties;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}

export declare const SegmentedControl: React.ComponentType<SegmentedControlProps>;
