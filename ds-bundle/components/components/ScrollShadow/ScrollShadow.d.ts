import * as React from 'react';

/**
 * ScrollShadow — from @devart/ui-react@1.0.0 (./src/components/ScrollShadow/ScrollShadow.stories.tsx).
 */
export interface ScrollShadowProps {
  ref?: React.Ref;
  size?: number;
  offset?: number;
  orientation?: "horizontal" | "vertical";
  visibility?: "none" | "auto" | "top" | "right" | "bottom" | "left" | "both";
  isEnabled?: boolean;
  /** Whether this container is itself a Tab stop. - `'auto'` (default) — only when content overflows and no descendant is alr */
  focusable?: boolean | "auto";
  onVisibilityChange?: (visibility: ScrollShadowVisibility) => void;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const ScrollShadow: React.ComponentType<ScrollShadowProps>;
