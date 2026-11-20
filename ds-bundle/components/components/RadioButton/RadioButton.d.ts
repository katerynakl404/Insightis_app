import * as React from 'react';

/**
 * RadioButton — from @devart/ui-react@1.0.0 (./src/components/RadioButton/RadioButton.stories.tsx).
 * @replaces input[type=radio]
 */
export interface RadioButtonProps {
  label?: React.ReactNode;
  labelClassName?: string;
  value: string;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  checked?: boolean;
  required?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  variant?: "primary";
  size?: "md";
  labelPosition?: "top" | "right" | "bottom" | "left";
  gap?: "sm" | "md" | "lg";
}

export declare const RadioButton: React.ComponentType<RadioButtonProps>;
