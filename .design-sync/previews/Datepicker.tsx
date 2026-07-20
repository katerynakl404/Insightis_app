import * as React from 'react';
import { Datepicker, Button } from 'insightis-kit';
import type { DatepickerDay } from 'insightis-kit';

/** June 2026 — starts on Monday, 30 days, padded with July 1–5 outside days. */
function juneDays(mark: (day: number) => Partial<DatepickerDay>): DatepickerDay[] {
  const days: DatepickerDay[] = [];
  for (let d = 1; d <= 30; d++) days.push({ day: d, ...mark(d) });
  for (let d = 1; d <= 5; d++) days.push({ day: d, outside: true });
  return days;
}

export function SingleDate() {
  return <Datepicker caption="June 2026" days={juneDays((d) => (d === 16 ? { selected: true } : {}))} />;
}

export function RangeSelection() {
  return (
    <Datepicker
      caption="June 2026"
      days={juneDays((d) => {
        if (d === 11) return { range: 'start' };
        if (d > 11 && d < 15) return { range: 'middle' };
        if (d === 15) return { range: 'end' };
        return {};
      })}
    />
  );
}

export function WithFooter() {
  return (
    <Datepicker
      caption="June 2026"
      days={juneDays((d) => (d === 24 ? { selected: true } : {}))}
      footer={
        <Button size="lg" style={{ flex: 1 }}>
          Set Date
        </Button>
      }
    />
  );
}
