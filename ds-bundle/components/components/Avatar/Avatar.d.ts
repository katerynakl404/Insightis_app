import * as React from 'react';

/**
 * Avatar — from @devart/ui-react@1.0.0 (./src/components/Avatar/Avatar.stories.tsx).
 */
export interface AvatarProps {
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "xxs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

export declare const Avatar: React.ComponentType<AvatarProps>;
