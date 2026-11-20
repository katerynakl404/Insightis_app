import * as React from 'react';

/**
 * AsyncList — from @devart/ui-react@1.0.0 (./src/components/AsyncList/AsyncList.stories.tsx).
 */
export interface AsyncListProps<T> {
  items: T[];
  isLoading: boolean;
  isLoadingNextPage: boolean;
  emptyContent: React.ReactNode;
  loadingContent: React.ReactNode;
  errorContent?: React.ReactNode;
  isError?: boolean;
  containerProps?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: string; };
  containerClassName?: string;
  renderItem: (item: T, index: number) => ReactNode;
  /** Replaces the default `items.map(renderItem)` for the populated state. The seam exists so an application can window, grou */
  renderItems?: (items: T[], renderItem: (item: T, index: number) => ReactNode) => ReactNode;
}

export declare const AsyncList: React.ComponentType<AsyncListProps>;
