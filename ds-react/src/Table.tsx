import * as React from 'react';
import { cx } from './cx';

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {}

/**
 * Table — Insightis kit base data table.
 * Renders `table.tbl` from kit-theme.css; plain `<thead>/<tbody>/<tr>/<th>/<td>`
 * children are styled by the kit (header text-xs `--ink-secondary`, body text-sm
 * `--ink-body`, 10/16px cell padding, `--border` row rules). Row hover and
 * `:active` pressed feedback are pure CSS and NEUTRAL grey in both themes
 * (locked rule — never brand-tinted). Use `TableRow` for the selected state.
 */
export function Table({ className, children, ...rest }: TableProps) {
  return (
    <table className={cx('tbl', className)} {...rest}>
      {children}
    </table>
  );
}

export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  /** Persistent selected state (`.is-selected`) — neutral `--tbl-row-pressed` fill,
   *  identical to the thead band in both themes; hover-while-selected blend is pure CSS. */
  selected?: boolean;
}

/**
 * TableRow — `<tr>` inside a kit Table. Adds `.is-selected` when `selected`;
 * hover / pressed states come from the kit CSS.
 */
export function TableRow({ selected = false, className, children, ...rest }: TableRowProps) {
  return (
    <tr className={cx(selected && 'is-selected', className) || undefined} aria-selected={selected || undefined} {...rest}>
      {children}
    </tr>
  );
}
