import * as React from 'react';

/**
 * Switch — from @devart/ui-react@1.0.0 (./changes/components/Switch.stories.tsx).
 */
export interface SwitchProps {
  label?: unknown;
  containerVariant?: "default" | "tertiary";
  labelClassName?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  defaultChecked?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "accent";
  size?: "sm" | "default";
  rounded?: "default";
  checked?: boolean;
  required?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  /** The sm track lines up with the label's first line only beside it. */
  besideLabel?: boolean;
  labelPosition?: "top" | "right" | "bottom" | "left";
  gap?: "sm" | "md" | "lg";
  description?: React.ReactNode;
  tooltip?: boolean | React.ReactNode;
}

export declare const Switch: React.ComponentType<SwitchProps>;
