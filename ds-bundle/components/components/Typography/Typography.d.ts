import * as React from 'react';

/**
 * Typography — from @devart/ui-react@1.0.0 (./changes/components/Typography.stories.tsx).
 */
export interface TypographyProps<E extends ElementType = 'p'> {
  variant?: "div" | "h2" | "h3" | "p" | "span" | "blockquote" | "code" | "h1" | "h4" | "h5" | "h6" | "large" | "lead";
  align?: "center" | "right" | "left" | "justify";
  textStyle?: unknown;
  leading?: "none" | "normal" | "tight" | "snug" | "relaxed" | "loose";
  textColor?: "body" | "inherit" | "success" | "warning" | "primary" | "secondary" | "destructive" | "light" | "accent" | "white";
  noWrap?: boolean;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  underline?: boolean;
  lineThrough?: boolean;
  overline?: boolean;
  element?: E;
  ref?: React.Ref;
  children?: React.ReactNode;
}

export declare const Typography: React.ComponentType<TypographyProps>;
