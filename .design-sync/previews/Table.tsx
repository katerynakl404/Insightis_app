import * as React from 'react';
import { Table, TableRow, Badge } from 'insightis-kit';

export function MetricRows() {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Source</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        <TableRow>
          <td>Sprint velocity</td>
          <td>Jira</td>
          <td>2 hours ago</td>
        </TableRow>
        <TableRow selected>
          <td>Pull request cycle time</td>
          <td>GitHub</td>
          <td>Yesterday</td>
        </TableRow>
        <TableRow>
          <td>Subscription MRR</td>
          <td>Stripe</td>
          <td>3 days ago</td>
        </TableRow>
        <TableRow>
          <td>Lead conversion rate</td>
          <td>HubSpot</td>
          <td>Last week</td>
        </TableRow>
      </tbody>
    </Table>
  );
}

export function WithBadges() {
  return (
    <Table>
      <thead>
        <tr>
          <th>Connection</th>
          <th>Source</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <TableRow>
          <td>Production Jira</td>
          <td>Jira Software Cloud</td>
          <td>
            <Badge size="sm" variant="green" pill dot>
              Active
            </Badge>
          </td>
        </TableRow>
        <TableRow selected>
          <td>Platform Repos</td>
          <td>GitHub</td>
          <td>
            <Badge size="sm" variant="secondary">
              Paused
            </Badge>
          </td>
        </TableRow>
        <TableRow>
          <td>Billing Events</td>
          <td>Stripe</td>
          <td>
            <Badge size="sm" variant="red" pill dot>
              Error
            </Badge>
          </td>
        </TableRow>
      </tbody>
    </Table>
  );
}
