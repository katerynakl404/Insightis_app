import * as React from 'react';

/**
 * Skeleton — from @devart/ui-react@1.0.0 (./src/components/Skeleton/Skeleton.stories.tsx).
 */
export interface SkeletonProps {
  children?: React.ReactNode;
  isLoaded?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation?: "none" | "pulse" | "shimmer";
}

export declare const Skeleton: React.ComponentType<SkeletonProps>;
