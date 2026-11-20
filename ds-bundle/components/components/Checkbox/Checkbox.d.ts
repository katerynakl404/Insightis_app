import * as React from 'react';

/**
 * Checkbox — from @devart/ui-react@1.0.0 (./changes/components/Checkbox.stories.tsx).
 * @replaces input[type=checkbox]
 */
export interface CheckboxProps {
  label?: React.ReactNode;
  labelClassName?: string;
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  required?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  variant?: "primary";
  size?: "md";
  rounded?: "md";
  labelPosition?: "top" | "right" | "bottom" | "left";
  gap?: "sm" | "md" | "lg";
}

export declare const Checkbox: React.ComponentType<CheckboxProps>;
