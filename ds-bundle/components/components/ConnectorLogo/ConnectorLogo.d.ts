import * as React from 'react';

/**
 * ConnectorLogo — from @devart/ui-react@1.0.0 (./changes/components/ConnectorLogo.stories.tsx).
 */
export interface ConnectorLogoProps {
  /** The connector, as a name or as its slug — `PostgreSQL`, `postgresql` and `Amazon S3` all resolve to the same mark. */
  connector: string;
  /** Accessible name for the mark. Leave it off when the connector's name is already rendered next to the logo, which is the  */
  label?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg" | "xs";
}

export declare const ConnectorLogo: React.ComponentType<ConnectorLogoProps>;
