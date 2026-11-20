import * as React from 'react';

/**
 * Pagination — from @devart/ui-react@1.0.0 (./changes/components/Pagination.stories.tsx).
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
  boundaryCount: number;
  showFirstLast: boolean;
  showPrevNext: boolean;
  /** Draw the numbered page buttons. **Draft.** On for everything that is paged by the reader: a page number is a destination */
  showPageNumbers?: boolean;
  /** The rung the whole control is drawn on. **Draft.** `sm` (32px) is the default and is right when the pager is the page's  */
  size?: "sm" | "xs";
  /** How many items the whole list holds. With `pageSize`, the pager reads out its range — "Showing 26–50 of 60", `body12` in */
  totalItems?: number;
  /** Items per page — with `totalItems`, the range readout. **Draft. */
  pageSize?: number;
  onPageChange: (page: number) => void;
  /** Accessible labels for the navigation buttons, overriding their defaults. */
  labels?: { first?: string; previous?: string; next?: string; last?: string; };
}

export declare const Pagination: React.ComponentType<PaginationProps>;
