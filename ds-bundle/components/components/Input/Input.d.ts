import * as React from 'react';

/**
 * Input — from @devart/ui-react@1.0.0 (./src/components/Input/Input.stories.tsx).
 * @replaces input
 */
export interface InputProps {
  /** Takes digits only; a letter typed, pasted or dropped is dropped. */
  digitsOnly?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Input: React.ComponentType<InputProps>;
