import * as React from 'react';

/**
 * Banner — from @devart/ui-react@1.0.0 (./changes/components/Banner.stories.tsx).
 */
export interface BannerProps {
  title: string;
  description?: React.ReactNode;
  descriptionClassName?: string;
  titleClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  action?: React.ReactNode;
  actionClassName?: string;
  /** Renders the corner dismiss button described by the reference anatomy. */
  onDismiss?: () => void;
  /** Accessible label for the corner dismiss button. */
  dismissLabel?: string;
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "default" | "horizontalWide" | "diagonalAiry" | "diagonalFade" | "horizontalSlab";
  size?: "sm" | "default";
}

export declare const Banner: React.ComponentType<BannerProps>;
