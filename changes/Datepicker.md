# Datepicker — prod → expected

Source: `@insightis/ui` `Datepicker/` (Calendar, CalendarDayButton, SingleDatePicker, DateRangePicker). Baseline: [`../current/Datepicker.md`](../current/Datepicker.md).

The shipped kit component is `.dpk` (CSS source of truth). Tailwind v3 utility names from the React/Radix source are noted where useful, but the concrete px / token values below are authoritative.

## Container — `.dpk`
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | radius `md 6px`, border `border`, bg `card` | — no change (hex → [colors](colors.md)) | width **260px**, radius **6px**, `display:flex` column, gap **8px**, border `--border`, bg `--card`. Calendar body `.dpk-cal` has bottom divider (`border-bottom:1px solid var(--border)`). |

## Day cell — `.dpk-day`
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | Button `transparent`, `font-normal` | — no change | height **30px** (not 32 / `h-8`), font `.8125rem`, radius `9999px`, color `--ink-body`, bg transparent, no border |
| Hover | inherits Button transparent (no fill) | `.dpk-day:hover` bg `--state-hover` | Defined in CSS (`:hover:not(.selected):not(.range-start):not(.range-end):not(.range-middle)`) — matches Button outline hover language |
| Selected (single) | bg `primary`, text `background` | — no change (hex → [colors](colors.md)) | `.dpk-day.selected` — bg `--brand-primary`, text `--content-on-solid` |
| Range start | bg `primary`, text `background`, radius `rounded-l` | — no change | `.dpk-day.range-start` — bg `--brand-primary`, text `--content-on-solid`, right radius 0 |
| Range middle | bg `muted` (= chip), text `foreground` | — no change (hex → [colors](colors.md)) | `.dpk-day.range-middle` — bg `--chips`, text `--ink`, radius 0 |
| Range end | bg `primary`, text `background`, radius `rounded-r` | — no change | `.dpk-day.range-end` — bg `--brand-primary`, text `--content-on-solid`, left radius 0 |
| Focus | `border-ring ring-[3px] ring-ring/50` (global ring) | `.dpk-day.focused` ring `0 0 0 2px var(--card),0 0 0 4px var(--focus-ring-brand)` | 2px brand ring with 2px `Surface/Card` gap — matches Button/Outline |
| Outside month | text `content-secondary` | — no change | `.dpk-day.outside` — color `--ink-inactive` |
| Disabled (past `startMonth` / future `endMonth`) | ⚠ no explicit styling (Radix disables interaction) | ⚠ — to define | text `Text/Inactive`, no bg on hover |

## Caption / nav / grid header
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Nav row `.dpk-nav` | — | — | `display:flex`, space-between, height **32px**, padding `0 4px` |
| Nav button `.nav-btn` | text `content-secondary`, hover `content-primary` | — no change (hex → [colors](colors.md)) | **28 × 28px** (not 32 / `size-8`), color `--ink-secondary`, hover color `--ink`, radius **4px**, bg transparent |
| Caption `.dpk-cap` | — | — | font `.875rem`, weight 500, color `--ink` |
| Grid `.dpk-grid` | — | — | `grid-template-columns:repeat(7,1fr)`, gap 2px, `margin-top:6px` |
| Weekday header `.dpk-wd` | — | — | font `.75rem`, weight 500, color `--ink-secondary`, centered, padding `6px 0` |
| Footer `.dpk-foot` | — | — | `display:flex`, gap 8px, padding `0 12px 12px`; child `.btn` is `flex:1` |

## ⚠ Best-practice states — to define
- Day cell **today** indicator (separate from selected).
- Day cell **disabled** explicit styling (past `startMonth` / future `endMonth`).
