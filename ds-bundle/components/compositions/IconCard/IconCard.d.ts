import * as React from 'react';

/**
 * IconCard — from @devart/ui-react@1.0.0 (./src/components/IconCard/IconCard.stories.tsx).
 */
export interface IconCardProps {
  /** Gates activation as well as the overlay, so it is declared here rather than inherited from the recipe — a style axis may */
  disabled?: boolean;
  /** Mark above the caption. Decorative — the card is named by `aria-label`. */
  icon: React.ReactNode;
  /** Caption under the icon; clamped to two lines. */
  label: string;
  /** Marker pinned to the icon's top-right corner, e.g. a "popular" flame. */
  badge?: React.ReactNode;
  /** Caption on the hover overlay. */
  actionLabel: string;
  /** Glyph before `actionLabel` on the overlay. */
  actionIcon?: React.ReactNode;
  /** Semantic activation (connect, open, …). Skipped when `disabled`, or when a composed `onClick` / `onKeyDown` calls `preve */
  onActivate?: () => void;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
}

export declare const IconCard: React.ComponentType<IconCardProps>;
