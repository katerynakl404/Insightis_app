import * as React from 'react';

/**
 * Card — from @devart/ui-react@1.0.0 (./changes/components/Card.stories.tsx).
 */
export interface CardProps {
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "row" | "secondary" | "outline" | "ghost" | "elevated";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded";
  fullWidth?: boolean;
}

export declare const Card: React.ComponentType<CardProps>;
