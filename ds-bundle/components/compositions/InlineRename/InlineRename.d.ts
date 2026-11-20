import * as React from 'react';

/**
 * InlineRename — from @devart/ui-react@1.0.0 (./src/components/InlineRename/InlineRename.stories.tsx).
 */
export interface InlineRenameProps {
  /** The title being renamed. The field opens holding it, all of it selected. */
  defaultValue: string;
  /** Required. The field takes the place of the visible title, so nothing else labels it ("Chat name", "Report name"). */
  "aria-label": string;
  /** Enter or blur, with the new title trimmed. Called only when it is neither empty nor unchanged — either of those is a can */
  onCommit: (value: string) => void;
  /** Esc, or a commit that would change nothing. */
  onCancel: () => void;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const InlineRename: React.ComponentType<InlineRenameProps>;
