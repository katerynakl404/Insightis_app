# Datepicker — prod → expected

Source: `@insightis/ui` `Datepicker/` (Calendar, CalendarDayButton, SingleDatePicker, DateRangePicker). Baseline: [`../current/Datepicker.md`](../current/Datepicker.md).

## SingleDatePicker container
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | radius `md 6px`, border `border`, bg `card` | — no change (hex → [colors](colors.md)) | gap 8px, calendar bottom divider |

## Day cell — CalendarDayButton
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | Button `transparent`, `font-normal` | — no change | `h-8 w-10`, day button `py-1.5 rounded-full` |
| Hover | inherits Button transparent (no fill) | ⚠ no surface — to define | recommend `bg State/Hover` to match Button outline hover language |
| Selected (single) | bg `primary`, text `background` | — no change (hex → [colors](colors.md)) | bg `Brand/Primary`, text `#FFF` |
| Range start | bg `primary`, text `background`, radius `rounded-l` | — no change | — |
| Range middle | bg `muted` (= chip), text `foreground` | — no change (hex → [colors](colors.md)) | bg `Surface/Chips` |
| Range end | bg `primary`, text `background`, radius `rounded-r` | — no change | — |
| Focus | `border-ring ring-[3px] ring-ring/50` (global ring) | use `--focus-ring-brand` for brand-consistent focus | 2px brand ring with 2px `Surface/Card` gap — matches Button/Outline |
| Outside month | text `content-secondary` | — no change | — |
| Disabled (past `startMonth` / future `endMonth`) | ⚠ no explicit styling (Radix disables interaction) | ⚠ — to define | text `Text/Inactive`, no bg on hover |

## Calendar caption / nav
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Nav button (chevrons) | text `content-secondary`, hover `content-primary` | — no change (hex → [colors](colors.md)) | `size-8` hit area — meets WCAG 2.5.8 |

## ⚠ Best-practice states — to define
- Day cell **today** indicator (separate from selected).
- Day cell **disabled** explicit styling.
- Day cell **hover** background.
- Keyboard focus ring consistency with the rest of the system (`--focus-ring-brand`).
