import * as React from 'react';

/**
 * Spotlight — from @devart/ui-react@1.0.0 (./src/components/Spotlight/Spotlight.stories.tsx).
 */
export interface SpotlightProps {
  /** What to light: a selector, an element, a ref, or an array of them (lit as one union). */
  target?: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** A rect already measured (and padded) — wins over `target`. `null` dims everything. */
  rect?: TargetRect;
  /** The area the scrim covers, with `rect`. Default: the boundary, else the viewport. */
  bounds?: TargetRect;
  /** The cutout's and the ring's corner. Default: concentric with the targets — their own radius + `padding` (`useTargetRect( */
  radius?: number;
  /** Grows the lit area on every side. */
  padding?: number;
  /** The area the scrim may cover (selector, element or ref). Default: the viewport. */
  boundary?: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** A click anywhere on the scrim. The cutout takes no clicks of its own. */
  onScrimClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** The ring's breathing pulse. */
  pulse?: boolean;
  /** Fades the layer out and lets every click through — while it unmounts. */
  leaving?: boolean;
  className?: string;
  /** Render into this element instead of `document.body`. */
  portalContainer?: HTMLElement;
  ref?: React.Ref;
}

export declare const Spotlight: React.ComponentType<SpotlightProps>;
