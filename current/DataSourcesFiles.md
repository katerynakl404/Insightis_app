---
name: DataSourcesFiles
description: Live prod state of the Data Sources — Files tab (upload drop zone, file list, tab bar)
metadata:
  type: project
---

# DataSourcesFiles — Current (prod)

## Tab bar

| Property | Value |
|---|---|
| Tabs | Connections · Files (underline active indicator) |
| Count badges | None — tabs show label only |
| Action button | None in the tab row |

## Drop zone

| Property | Value |
|---|---|
| Border | 2px dashed `--brand-primary` (teal) — heavy colored outline |
| Background | Transparent (no fill) |
| Content | Upload icon · "Drag & drop files here" · "Supports CSV, XLS, XLSX files" · Browse Files button (`btn btn-secondary btn-sm`) |
| Format indicators | Plain text — no badge components |
| Drag-over state | Not defined / no interactive feedback |
| Visibility | Always visible (drop zone always above list) |

## File count row

| Property | Value |
|---|---|
| Layout | Plain text count ("N files"), no interactive controls |
| Bulk actions | None |
| Select mode | Not available |

## File list rows

| Property | Value |
|---|---|
| Structure | File-type icon + file name + file size |
| Checkbox | Not present |
| Kebab / more button | Not present |
| Hover state | `--state-hover` background |
| Selected state | Not applicable |
| Context menu | Not available |

## Typography

All text uses font-size values set inline or via small class overrides — no token scale enforced.
