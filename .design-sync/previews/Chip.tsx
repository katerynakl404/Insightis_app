import * as React from 'react';
import { Chip, ChipRow, ChipMeta } from 'insightis-kit';

export function FilterRow() {
  return (
    <ChipRow aria-label="Category filter">
      <Chip active count={21}>
        All
      </Chip>
      <Chip count={6}>Databases</Chip>
      <Chip count={3}>CRM</Chip>
      <Chip count={3}>Marketing</Chip>
    </ChipRow>
  );
}

export function DisabledChip() {
  return (
    <ChipRow aria-label="Source filter">
      <Chip active count={9}>
        Connected
      </Chip>
      <Chip count={4}>Files</Chip>
      <Chip disabled count={0}>
        Archived
      </Chip>
    </ChipRow>
  );
}

export function MetaDrillIn() {
  return (
    <ChipRow>
      <ChipMeta arrow>Issues created</ChipMeta>
      <ChipMeta arrow>Sprint velocity</ChipMeta>
      <ChipMeta arrow>Bug count</ChipMeta>
      <ChipMeta arrow>Story points</ChipMeta>
    </ChipRow>
  );
}

export function MetaLabels() {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <ChipMeta>Issues created</ChipMeta>
      <ChipMeta>Sprint velocity</ChipMeta>
    </div>
  );
}
