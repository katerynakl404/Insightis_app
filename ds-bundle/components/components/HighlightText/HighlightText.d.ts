import * as React from 'react';

/**
 * HighlightText — from @devart/ui-react@1.0.0 (./src/components/HighlightText/HighlightText.stories.tsx).
 */
export interface HighlightTextProps {
  /** The whole string — a row's name. */
  text: string;
  /** What was searched for. Empty, or only spaces: the text as it is. */
  query?: string;
  /** Added to each marked part. */
  className?: string;
}

export declare const HighlightText: React.ComponentType<HighlightTextProps>;
