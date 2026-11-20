import * as React from 'react';

/**
 * LinkButton — from @devart/ui-react@1.0.0 (./src/components/LinkButton/LinkButton.stories.tsx).
 */
export interface LinkButtonProps {
  /** Render the child element instead of an `<a>` — a router link. */
  asChild?: boolean;
  disabled?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  ref?: React.Ref;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
  inline?: boolean;
}

export declare const LinkButton: React.ComponentType<LinkButtonProps>;
