import * as React from 'react';
import { cx } from './cx';

export interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the target page when a page button or prev/next chevron is clicked. */
  onPageChange?: (page: number) => void;
}

/**
 * Pagination — Insightis kit pagination row, composed exactly like the kit
 * (#pagination): prev/next = `IconButton secondary` (2rem square, 18px chevron with
 * `.svg-chev-l` / `.svg-chev-r` optical nudge), active page = `Button primary`,
 * other pages = `Button secondary`, all at `btn-sm` with the kit's 2rem square
 * sizing (inline in the kit's canonical markup — the kit defines no `.pag` class).
 * The `<nav>` wrapper carries no kit layout class; the parent supplies the gap.
 */
export function Pagination({ page, pageCount, onPageChange, className, ...rest }: PaginationProps) {
  const pages = Array.from({ length: Math.max(0, pageCount) }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className={className} {...rest}>
      <button
        className="iconbtn iconbtn-secondary"
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        style={{ height: '2rem', width: '2rem' }}
      >
        <svg className="svg-chev-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={cx('btn', 'btn-sm', p === page ? 'btn-primary' : 'btn-secondary')}
          type="button"
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onPageChange?.(p)}
          style={{ width: '2rem', padding: 0 }}
        >
          {p}
        </button>
      ))}
      <button
        className="iconbtn iconbtn-secondary"
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
        style={{ height: '2rem', width: '2rem' }}
      >
        <svg className="svg-chev-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}
