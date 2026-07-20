import * as React from 'react';
import { Link } from 'insightis-kit';

export function Default() {
  return <Link href="#connections">View all connections</Link>;
}

export function InBodyCopy() {
  return (
    <p style={{ maxWidth: 420, margin: 0 }}>
      Your Snowflake connection expired on July 12 — <Link href="#reconnect">reconnect it</Link> to resume metric
      syncs, or <Link href="#support">contact support</Link> if the issue persists.
    </p>
  );
}

export function Disabled() {
  return <Link disabled>Change password</Link>;
}
