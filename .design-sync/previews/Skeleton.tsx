import * as React from 'react';
import { Skeleton, Card } from 'insightis-kit';

export function CardLoading() {
  return (
    <Card style={{ width: 300 }} aria-busy="true">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Skeleton rounded="full" width={36} height={36} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <Skeleton width="55%" height={12} />
          <Skeleton width="35%" height={10} />
        </div>
      </div>
      <Skeleton rounded="lg" width="100%" height={72} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton width="100%" height={10} />
        <Skeleton width="85%" height={10} />
        <Skeleton width="60%" height={10} />
      </div>
    </Card>
  );
}

export function Animations() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220 }}>
      <Skeleton width="100%" height={14} />
      <Skeleton animation="pulse" width="100%" height={14} />
      <Skeleton animation="none" width="100%" height={14} />
    </div>
  );
}

export function Shapes() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Skeleton rounded="none" width={48} height={48} />
      <Skeleton rounded="sm" width={48} height={48} />
      <Skeleton width={48} height={48} />
      <Skeleton rounded="lg" width={48} height={48} />
      <Skeleton rounded="xl" width={48} height={48} />
      <Skeleton rounded="full" width={48} height={48} />
    </div>
  );
}
