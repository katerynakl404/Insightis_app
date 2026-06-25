# Popover — prod → expected

Source: `@insightis/ui` `Popover/index.tsx` + `PopoverContent.tsx`. Baseline: [`../current/Popover.md`](../current/Popover.md).

## PopoverContent
| State | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Open | `z-50 w-72 rounded-md border border-border bg-background text-content-primary p-4 shadow-md outline-none`; entry `animate-in fade-in-0 zoom-in-95` + side slide-in | — | shipped kit `.sbx-pop` is authoritative — surface `var(--card)`, radius `.5rem` (8px), padding `1rem .75rem`, kit shadow (see Kit reproduction) | **Authoritative spec = the shipped kit `.sbx-pop` values.** The React/Radix `bg-background` / `rounded-md` / `p-4` / `shadow-md` description is the superseded prod-reference only — it does NOT define the target surface. |
| Closed | exit `animate-out fade-out-0 zoom-out-95` | — | — no change | — |
| Focus trap | Radix default (focus enters content on open, returns to trigger on close) | — | — no change | a11y wired by Radix |

## Pop item states
| State | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Default | `Text/Body`, transparent bg | — | `Text/Body`, transparent bg | No change |
| Hover | `primary/10` bg | — | `State/Hover` (`--state-hover`) | Unified neutral hover |
| Pressed / Active | — not defined | — | `State/Pressed` (`--state-pressed`) via `.sbx-pop-item:active` + `.sbx-pop-item.active` | `.active` class marks the "currently open route" in nav-style popovers; bg-only signal, text stays `--ink-body` |
| Focus | — | — | `--shadow-focus-brand` (2px Card gap + 2px Brand ring) | Matches rest of kit |

## Note — surface bg (resolved)
The authoritative Popover surface is **`var(--card)`** (`#FFFFFF` light) — the shipped kit `.sbx-pop` value. This aligns the Popover with Dropdown / Tooltip / Modal (all on `bg-card`). The older React `PopoverContent` `bg-background` (`#F8FAFC` subtle off-white) is the **superseded prod-reference only** and is not the target — the `.sbx-pop` `--card` surface supersedes it.

## Kit reproduction — shipped `.sbx-pop` values (kit-theme.css 1337–1358)

The tables above describe the React/Radix/Tailwind `PopoverContent` (`rounded-md` border, `bg-background`, `p-4`, `shadow-md`). The **shipped kit** `.sbx-pop` popover diverges — these are the values to reproduce from the kit:

| Part | Selector | Shipped value |
|---|---|---|
| Surface | `.sbx-pop` | `background:var(--card)` (NOT `bg-background` / Surface/Background); `border:var(--border-width) solid var(--border)`; `border-radius:.5rem` (8px, NOT `rounded-md` 4px); `padding:1rem .75rem` (16px top/bottom · 12px left/right, NOT `p-4`/8px); `box-shadow:0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.05)`; `position:absolute; z-index:20` |
| Open | `.sbx-pop.is-open` | `display:flex; flex-direction:column; gap:.875rem` (inter-section gap 14px) |
| Section | `.sbx-pop-sect` | `display:flex; flex-direction:column; gap:.5rem` (label→list 8px) |
| Section label | `.sbx-pop-label` | `font-size:.75rem; line-height:1; font-weight:500; color:var(--ink-secondary); padding:0 .5rem` |
| List | `.sbx-pop-list` | `display:flex; flex-direction:column; gap:1px` |
| Item | `.sbx-pop-item` | `display:flex; align-items:center; gap:.625rem` (10px); `padding:.375rem .5rem` (6px · 8px); `border-radius:.375rem`; `font-size:.875rem; line-height:1.25; color:var(--ink-body)`; `background:transparent; border:none` |
| Item icon | `.sbx-pop-item .ic` | `width:16px; height:16px; flex:none; color:var(--ink-secondary)` |
| Dark elevation | `.dark .sbx-pop` | `box-shadow:0 16px 32px -8px rgba(0,0,0,.65), 0 6px 14px -4px rgba(0,0,0,.5), inset 0 1px 0 0 rgba(255,255,255,.04)` |

## Resolved — shipped kit (`.sbx-pop`) is authoritative

**Decision: the shipped `.sbx-pop` kit values are the authoritative specification.** The React/Radix `PopoverContent` description is the **superseded prod-reference only** — where the two diverge, the kit wins:

| Property | React/Radix (superseded prod-reference) | Shipped kit (`.sbx-pop`) — **authoritative** |
|---|---|---|
| Surface | `bg-background` (Surface/Background `#F8FAFC` light) | **`var(--card)`** (`#FFFFFF` light) |
| Radius | `rounded-md` (4px) | **`.5rem` (8px)** |
| Padding | `p-4` (16px uniform) | **`1rem .75rem`** (16px top/bottom · 12px left/right) |
| Shadow | `shadow-md` | **`0 10px 15px -3px … / 0 4px 6px -4px …`** (kit shadow) |

Reproduce from the kit values (right column / Kit reproduction table above), not from the Radix description.

## No change (—)
Default `align="center"`, `sideOffset={4}`, animation set, portalling, transform origin (`--radix-popover-content-transform-origin`).

## Variants (consumer compositions documented in the kit)

| Variant | Where it's used | Note |
|---|---|---|
| **Account menu** *(documented this iteration)* | Sidebar footer — `<button class="sb-user">` opens it | Shell = the `.sbx-pop` reproduction above (bg `Surface/Card`, 1 px `Stroke/Border`, **radius 8 px, padding 16 px 12 px, inter-section gap 14 px**, `drop-shadow-lg`). Two labelled sections (`Account`, `Support`): section label 12 px/500 `--ink-secondary`; rows `.sbx-pop-item` **gap 10 px, padding 6 px 8 px, radius 6 px, 14 px label + 16 px icon**. Theme switcher = SegmentedControl `is-sm` (**20 px, icon-only**), slot walks the surface ladder: light `var(--chips)` → pill `var(--card)`; dark `var(--bg)` → pill `var(--card2)`, same dark recipe as `.segctrl`. Plain `Sign Out` row. Relocated from Stepper to the Popover section. |
| **Subscription tokens** *(documented this iteration)* | Sidebar footer — tokens-meter button opens it | **Container 260 px wide**, same `.sbx-pop` shell as the Account variant. Plan header (`.sbx-pop-tok-head`, **gap 8 px**): **21×16 px** shield-check badge in `Brand/Tertiary` + 14 px `font-medium` plan name. Two metered rows (`.sbx-pop-tok-meter`, **gap 6 px**; label 12 px `--ink-secondary`): Subscription Tokens = **24 px coin + 16 px value**, `Brand/Tertiary` fill; Purchased Credits = **16 px coin + 12 px value**, `Feedback/Green` fill; progress bar **4 px**, track `--card2`, radius full. Actions (`.sbx-pop-tok-actions`, vertical, **gap 10 px**): two full-width `rounded-full` CTAs at **h32** — `Button primary` Buy Credits + `Button secondary` Upgrade Plan (`--card` bg, neutral `--border`, `--ink-body` text). Relocated from Stepper to the Popover section. |

## Subscription tokens — icon assets *(this iteration)*

| Slot | Current (prod) | Expected | Specification |
|---|---|---|---|
| Plan badge (next to "Basic") | 21×16 inline base64 PNG embedded in `.sbx-pop-tok-head .plan-badge` | external SVG `achievement-shield.svg` referenced via `background: url("achievement-shield.svg") center/contain no-repeat` | Pure-vector, themeable, no raster. Source = Figma-exported SVG (gradients preserved). Relative URL from kit HTML. |
| Subscription Tokens coin (24×24) | inline base64 PNG embedded in `.sbx-pop-tok-meter .coin` | external SVG `coin-blue.svg` | Teal-family coin (matches `Brand/Tertiary` progress bar in same row). Hand-built pure-vector with reeded edge and shadow-only emboss. |
| Purchased Credits coin (16×16) | inline base64 PNG embedded in `.sbx-pop-tok-meter .coin.sm` | external SVG `coin-green.svg` | Green-family coin (matches `Feedback/Green` progress bar in same row). Same construction as blue, only palette swap. |

No size / layout / spacing / colour change. Only the icon source format changes (PNG → SVG). Both prod-demo and Expected popover copies share the same CSS class, so both columns of the kit pick up the new SVG references automatically.

## ⚠ Best-practice states — to define
- **Trigger focus / hover / pressed** — delegated to the consumer's Button / IconButton, already covered there.
- **Arrow** — Radix supports `<Popover.Arrow>` but Insightis doesn't expose / style it.
- **Sizes** — only one width (`w-72` = 288px); no `sm` / `lg` width variants.
- **Dismiss-on-outside-click / Esc** — Radix defaults, document them for consumers.
