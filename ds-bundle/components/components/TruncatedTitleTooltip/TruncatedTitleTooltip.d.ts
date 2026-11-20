import * as React from 'react';

/**
 * TruncatedTitleTooltip — from @devart/ui-react@1.0.0 (./src/components/TruncatedTitleTooltip/TruncatedTitleTooltip.stories.tsx).
 */
export interface TruncatedTitleTooltipProps {
  /** Text to show inside the tooltip. */
  title: string;
  /** Trigger element. Tooltip opens only when the resolved target is overflowing. */
  children: React.ReactNode;
  /** Resolves the element whose overflow should be checked, given the trigger element. Defaults to the last `<span>` child of */
  getTruncationTarget?: (trigger: Element) => Element | null;
  /** Tooltip side. Defaults to `top`. */
  side?: "top" | "right" | "bottom" | "left";
  /** Extra classes for the tooltip content. */
  className?: string;
}

export declare const TruncatedTitleTooltip: React.ComponentType<TruncatedTitleTooltipProps>;
