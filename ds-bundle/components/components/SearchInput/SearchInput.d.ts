import * as React from 'react';

/**
 * SearchInput — from @devart/ui-react@1.0.0 (./changes/components/SearchInput.stories.tsx).
 */
export interface SearchInputProps<T extends SearchResultBase = SearchResultBase> {
  placeholder: string;
  value?: string;
  clearLabel?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  variant?: "outline";
  className?: string;
  ref?: React.Ref;
  "aria-label"?: string;
  autoFocus?: boolean;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  /** The matches, already filtered by the caller; listed while something is typed. */
  results?: readonly T[];
  /** Defaults to the result's `label`. */
  getResultLabel?: (result: T) => string;
  /** The row; the label alone when omitted. */
  renderResult?: (result: T) => ReactNode;
  /** A result was picked; its label is now in the field. */
  onSelect?: (result: T) => void;
  /** Defaults to `No matches`. */
  emptyText?: React.ReactNode;
}

export declare const SearchInput: React.ComponentType<SearchInputProps>;
