import * as React from 'react';
import { Accordion, AccordionItem } from 'insightis-kit';

export function Default() {
  return (
    <Accordion>
      <AccordionItem header="What counts as a data source?" defaultOpen>
        Any warehouse, database or file upload — Snowflake, BigQuery, Postgres or a CSV file all work
      </AccordionItem>
      <AccordionItem header="How are credits counted?">
        Each chat answer that queries live data uses one credit
      </AccordionItem>
      <AccordionItem header="Can I share metrics with my team?">
        Yes — metric libraries are shared across the workspace on Pro
      </AccordionItem>
    </Accordion>
  );
}

export function Collapsed() {
  return (
    <Accordion>
      <AccordionItem header="Connection settings">Host, port and credentials for this source</AccordionItem>
      <AccordionItem header="Sync schedule">How often Insightis refreshes the data</AccordionItem>
    </Accordion>
  );
}
