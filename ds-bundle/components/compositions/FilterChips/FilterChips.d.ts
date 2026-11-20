import * as React from 'react';

/**
 * FilterChips — from @devart/ui-react@1.0.0 (./src/components/FilterChips/FilterChips.stories.tsx).
 */
export interface FilterChipsProps {
  items: FilterChipItem[];
  value: string;
  className?: string;
  /** Fires with `''` when the active chip is toggled off, which is how a single Radix toggle group reports deselection. A fil */
  onValueChange: (value: string) => void;
}

export declare const FilterChips: React.ComponentType<FilterChipsProps>;
