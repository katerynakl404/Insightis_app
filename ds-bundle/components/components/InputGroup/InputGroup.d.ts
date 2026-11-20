import * as React from 'react';

/**
 * InputGroup — from @devart/ui-react@1.0.0 (./changes/components/InputGroup.stories.tsx).
 */
export interface InputGroupProps {
  isInvalid?: boolean;
  errorText?: string;
  label?: React.ReactNode;
  /** Marks the label with an asterisk and sets `aria-required` on the input. */
  required?: boolean;
  inputId?: string;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "outline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
}

export declare const InputGroup: React.ComponentType<InputGroupProps>;
