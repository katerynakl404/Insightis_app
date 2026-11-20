import * as React from 'react';

/**
 * Table — from @devart/ui-react@1.0.0 (./changes/components/Table.stories.tsx).
 * @replaces table
 */
export interface TableProps {
  wrapperClassName?: string;
  /** `auto` (the default) sizes every column from its own content, so the layout shifts whenever the data does — a longer sta */
  layout?: "auto" | "fixed";
  /** How much vertical air a row gets. **Draft** — see Table.md. `comfortable` (the default) is 10px above and below, which i */
  density?: "comfortable" | "compact";
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Table: React.ComponentType<TableProps>;
