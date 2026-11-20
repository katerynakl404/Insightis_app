import * as React from 'react';

/**
 * CtaBanner — from @devart/ui-react@1.0.0 (./src/components/CtaBanner/CtaBanner.stories.tsx).
 */
export interface CtaBannerProps {
  title: string;
  description?: React.ReactNode;
  ctaLabel: string;
  variant?: "default" | "horizontalWide" | "diagonalAiry" | "diagonalFade" | "horizontalSlab";
  actionVariant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline" | "transparentUnderline";
  size?: "sm" | "default";
  icon?: React.ReactNode;
  className?: string;
  ref?: React.Ref;
  onClick: () => void;
}

export declare const CtaBanner: React.ComponentType<CtaBannerProps>;
