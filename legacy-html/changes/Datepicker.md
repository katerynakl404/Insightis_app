# Datepicker — prod → expected

Source: `@insightis/ui` `Datepicker/` (Calendar, CalendarDayButton, SingleDatePicker, DateRangePicker). Baseline: [`../current/Datepicker.md`](../current/Datepicker.md).

The shipped kit component is `.dpk` (CSS source of truth). Tailwind v3 utility names from the React/Radix source are noted where useful, but the concrete px / token values below are authoritative.

### DOM structure (reproduction)
```html
<div class="dpk">
  <div class="dpk-cal">
    <div class="dpk-nav">
      <button class="nav-btn" aria-label="Previous"><svg …chevron-left/></button>
      <span class="dpk-cap">June 2026</span>
      <button class="nav-btn" aria-label="Next"><svg …chevron-right/></button>
    </div>
    <div class="dpk-grid">
      <span class="dpk-wd">M</span> … <span class="dpk-wd">S</span>   <!-- 7 weekday headers -->
      <button class="dpk-day outside">31</button>
      <button class="dpk-day">1</button> …                          <!-- 42 day cells -->
      <button class="dpk-day range-start">11</button>
      <button class="dpk-day range-middle">12</button>
      <button class="dpk-day range-end">15</button>
      <button class="dpk-day selected">16</button>
      <button class="dpk-day focused">18</button>
    </div>
  </div>
  <div class="dpk-foot"><button class="btn btn-lg btn-primary" style="border-radius:9999px;flex:1">Set Date</button></div>
</div>
```
Nav icons are 16×16 stroke (`stroke-width:2`, `currentColor`) chevron-left / chevron-right SVGs. The day grid is one flat `.dpk-grid` containing the 7 `.dpk-wd` headers followed by the day `<button>`s.

## Container — `.dpk`
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | radius `md 6px`, border `border`, bg `card` | — no change (hex → [colors](colors.md)) | width **260px**, radius **6px**, `display:flex; flex-direction:column`, gap **8px**, `padding-bottom:0`, border `1px solid var(--border)`, bg `--card`. Calendar body `.dpk-cal`: `padding:8px 8px 12px`, bottom divider `border-bottom:1px solid var(--border)`. No box-shadow, no transition, no dark-mode override (tokens carry the theme). |

## Day cell — `.dpk-day`
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | Button `transparent`, `font-normal` | — no change | `<button class="dpk-day">`; height **30px** (not 32 / `h-8`), width = grid cell (`1fr`, no fixed width), `display:flex; align-items:center; justify-content:center`, font **.8125rem** / `font-family:inherit` / weight inherited (400), radius **9999px**, color `--ink-body`, `background:transparent`, `border:none`, `cursor:pointer`. No transition. |
| Hover | inherits Button transparent (no fill) | `.dpk-day:hover` bg `--state-hover` | Defined in CSS (`:hover:not(.selected):not(.range-start):not(.range-end):not(.range-middle)`) — matches Button outline hover language |
| Selected (single) | bg `primary`, text `background` | — no change (hex → [colors](colors.md)) | `.dpk-day.selected` — bg `--brand-primary`, text `--content-on-solid` |
| Range start | bg `primary`, text `background`, radius `rounded-l` | — no change | `.dpk-day.range-start` — bg `--brand-primary`, text `--content-on-solid`, right radius 0 |
| Range middle | bg `muted` (= chip), text `foreground` | — no change (hex → [colors](colors.md)) | `.dpk-day.range-middle` — bg `--chips`, text `--ink`, radius 0 |
| Range end | bg `primary`, text `background`, radius `rounded-r` | — no change | `.dpk-day.range-end` — bg `--brand-primary`, text `--content-on-solid`, left radius 0 |
| Focus | `border-ring ring-[3px] ring-ring/50` (global ring) | `.dpk-day.focused` ring `0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` | 2px brand ring with 2px `Surface/Card` gap — matches Button/Outline |
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
| Footer `.dpk-foot` | — | — | `display:flex; align-items:center`, gap **8px**, padding `0 12px 12px`; child `.dpk-foot .btn` is `flex:1`. Action button markup `.btn.btn-lg.btn-primary` with inline `border-radius:9999px` (pill). |

## ⚠ Best-practice states — to define
- Day cell **today** indicator (separate from selected).
- Day cell **disabled** explicit styling (past `startMonth` / future `endMonth`).
