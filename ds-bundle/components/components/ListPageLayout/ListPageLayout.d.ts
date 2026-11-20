import * as React from 'react';

/**
 * ListPageLayout — from @devart/ui-react@1.0.0 (./changes/components/ListPageLayout.stories.tsx).
 */
export interface ListPageLayoutProps {
  children: React.ReactNode;
  /** The header above the list, sticky below `lg`. As a render function it receives the header's state, so a header that cond */
  stickyHeader?: boolean | ((state: ListPageLayoutHeaderState) => ReactNode) | React.ReactNode;
  stickyHeaderClassName?: string;
  scrollRestorationId?: string;
  /** The centred column that holds the header and the body — its max width. */
  contentClassName?: string;
  /** The body under the header. It owns the list's side and bottom inset (`pb-3`) and the 12px between blocks, which `content */
  bodyClassName?: string;
  /** Pixels of scroll after which the sticky header condenses: its inset tightens and a render-function header receives `cond */
  condenseAfter?: number;
  onScrollElementChange?: (element: HTMLDivElement | null) => void;
}

export declare const ListPageLayout: React.ComponentType<ListPageLayoutProps>;
