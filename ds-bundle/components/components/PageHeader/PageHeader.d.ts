import * as React from 'react';

/**
 * PageHeader — from @devart/ui-react@1.0.0 (./changes/components/PageHeader.stories.tsx).
 */
export interface PageHeaderProps {
  /** The page title — an `h2`, the developers' level and the product's. An empty string renders no heading, leaving only `tit */
  title: React.ReactNode;
  /** Renders the back control. Omit it on a top-level page. */
  onBack?: () => void;
  /** Accessible name for the back control. */
  backLabel?: string;
  /** Trailing actions, pushed to the end of the row. */
  actions?: React.ReactNode;
  /** Content immediately before the title — a leading icon, a logo, the mobile sidebar trigger. It opens the row, 12px from w */
  titleLeft?: React.ReactNode;
  /** Content immediately after the title, inside the title cluster — an info control, a status chip, the data source a form i */
  titleRight?: React.ReactNode;
  /** DRAFT. The same header, shorter: a `heading20` where the full one has a `heading30` (`heading24` below `md`), and the ba */
  condensed?: boolean;
  /** The title wraps onto as many lines as it needs instead of truncating. For a title that must be read whole: on a phone a  */
  wrapTitle?: boolean;
  /** Shows `loadingContent` in place of the title. `titleLeft` and the back control stay; `titleRight` and `actions` are not  */
  isLoading?: boolean;
  /** Placeholder for the title while `isLoading`. Defaults to a `Skeleton`. */
  loadingContent?: React.ReactNode;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const PageHeader: React.ComponentType<PageHeaderProps>;
