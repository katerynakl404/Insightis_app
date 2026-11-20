import * as React from 'react';

/**
 * CodeBlock — from @devart/ui-react@1.0.0 (./src/components/CodeBlock/CodeBlock.stories.tsx).
 */
export interface CodeBlockProps {
  /** The text shown, and the text copied. One source, so they cannot drift. */
  code: string;
  /** Rendered instead of the raw text — highlighted markup, for instance. It must render the same lines as `code`: the gutter */
  children?: React.ReactNode;
  /** A bar above the code — a label, a language glyph, a status Badge. Copy moves into it, at its end. */
  header?: React.ReactNode;
  /** A gutter of line numbers, out of the selection and the accessibility tree. For source, which does not wrap: with `wrap`, */
  lineNumbers?: boolean;
  /** Any CSS length, or a number of pixels. The code scrolls inside it; the header stays put. */
  maxHeight?: string | number;
  /** Wraps long lines instead of scrolling sideways — for output read as prose (a log, a traceback), not for source. */
  wrap?: boolean;
  copyable?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  style?: CSSProperties;
  className?: string;
  id?: string;
  variant?: "error" | "default";
  size?: "sm" | "md";
}

export declare const CodeBlock: React.ComponentType<CodeBlockProps>;
