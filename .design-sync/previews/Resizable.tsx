import * as React from 'react';
import { Resizable } from 'insightis-kit';

export function Default() {
  return <Resizable start="Chart" end="Data" />;
}

export function OffsetSplit() {
  return <Resizable split={65} start="Metric preview" end="SQL" />;
}
