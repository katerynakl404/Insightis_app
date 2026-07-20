import * as React from 'react';
import { Card, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'insightis-kit';

export function Default() {
  return (
    <Card>
      <CardTitle>Weekly active users</CardTitle>
      <CardDescription>Unique users with at least one session, rolling 7 days</CardDescription>
      <CardContent>4,218 users — up 6.2% vs last week</CardContent>
    </Card>
  );
}

export function WithFooter() {
  return (
    <Card>
      <CardTitle>Churn rate</CardTitle>
      <CardDescription>Cancelled subscriptions over active base</CardDescription>
      <CardContent>2.4% this month across all plans</CardContent>
      <CardFooter>
        <Button size="sm">View Metric</Button>
        <Button size="sm" variant="tertiary">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

export function Secondary() {
  return (
    <Card variant="secondary">
      <CardTitle>Data freshness</CardTitle>
      <CardDescription>Last sync completed 12 minutes ago</CardDescription>
    </Card>
  );
}
