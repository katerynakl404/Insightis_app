import * as React from 'react';
import { Popover } from 'insightis-kit';

export function Default() {
  return (
    <Popover title="Connected sources">
      Production DB and Main CRM feed this metric. Values refresh every 15 minutes.
    </Popover>
  );
}

export function BodyOnly() {
  return (
    <Popover>
      Churn rate counts customers whose subscription lapsed during the selected period
    </Popover>
  );
}
