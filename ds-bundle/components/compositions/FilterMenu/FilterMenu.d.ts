import * as React from 'react';

/**
 * FilterMenu — from @devart/ui-react@1.0.0 (./src/components/FilterMenu/FilterMenu.stories.tsx).
 */
export interface FilterMenuProps {
  /** What the filter is about — the pill reads "Label: Value". */
  label: string;
  value: string;
  options: FilterMenuOption[];
  onValueChange: (value: string) => void;
  /** The value that means "no filter". While another is chosen, the pill carries a ✕ that puts this one back. */
  defaultValue?: string;
  clearLabel?: string;
  defaultOpen?: boolean;
  align?: "start" | "end";
  className?: string;
}

export declare const FilterMenu: React.ComponentType<FilterMenuProps>;
