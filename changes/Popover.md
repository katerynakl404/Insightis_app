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
| Focus | — | — | `--shadow-focus` (2px Card gap + 2px Brand ring) | Matches rest of kit |

## Note — surface bg (resolved)
The authoritative Popover surface is **`var(--card)`** (`#FFFFFF` light) — the shipped kit `.sbx-pop` value. This aligns the Popover with Dropdown / Tooltip / Modal (all on `bg-card`). The older React `PopoverContent` `bg-background` (`#F8FAFC` subtle off-white) is the **superseded prod-reference only** and is not the target — the `.sbx-pop` `--card` surface supersedes it.

## Kit reproduction — shipped `.sbx-pop` values (kit-theme.css 1337–1358)

The tables above describe the React/Radix/Tailwind `PopoverContent` (`rounded-md` border, `bg-background`, `p-4`, `shadow-md`). The **shipped kit** `.sbx-pop` popover diverges — these are the values to reproduce from the kit:

| Part | Selector | Shipped value |
|---|---|---|
| Surface | `.sbx-pop` | `background:var(--card)` (NOT `bg-background` / Surface/Background); `border:var(--border-width) solid var(--border)`; `border-radius:.5rem` (8px, NOT `rounded-md` 4px); `padding:1rem .75rem` (16px top/bottom · 12px left/right, NOT `p-4`/8px); `box-shadow:var(--shadow-overlay)` (floating-overlay rung — light `0 10px 15px -3px rgba(0,0,0,.12), 0 4px 6px -4px rgba(0,0,0,.08)`, theme-aware dark; normalised from the prior inline `.1/.05`); `position:absolute; z-index:20` |
| Open | `.sbx-pop.is-open` | `display:flex; flex-direction:column; gap:.875rem` (inter-section gap 14px) |
| Section | `.sbx-pop-sect` | `display:flex; flex-direction:column; gap:.5rem` (label→list 8px) |
| Section label | `.sbx-pop-label` | `font-size:.75rem; line-height:1; font-weight:500; color:var(--ink-secondary); padding:0 .5rem` |
| List | `.sbx-pop-list` | `display:flex; flex-direction:column; gap:1px` |
| Item | `.sbx-pop-item` | `display:flex; align-items:center; gap:.625rem` (10px); `padding:.375rem .5rem` (6px · 8px); `border-radius:.375rem`; `font-size:.875rem; line-height:1.25; color:var(--ink-body)`; `background:transparent; border:none` |
| Item transition | `.sbx-pop-item` | `transition:background .12s` (only bg animates) |
| Item icon | `.sbx-pop-item .ic` | `width:16px; height:16px; flex:none; color:var(--ink-secondary)` |
| Item trailing/external icon | `.sbx-pop-item .ext` | `width:14px; height:14px; flex:none; margin-left:auto; color:var(--ink-secondary)` (right-aligned trailing glyph, e.g. external-link) |
| Item hover | `.sbx-pop-item:hover` | `background:var(--state-hover)` (bg only; text + icons keep default ink) |
| Item pressed | `.sbx-pop-item:active` | `background:var(--state-pressed)` |
| Item active (open route) | `.sbx-pop-item.active` | `background:var(--state-pressed)` — persistent "currently-open" signal; content stays `--ink-body`, NO brand colour |
| Item focus | `.sbx-pop-item:focus-visible` | `outline:none; box-shadow:var(--shadow-focus)` |
| Dark elevation | `--shadow-overlay` (`.dark`) | `0 16px 32px -8px rgba(0,0,0,.65), 0 6px 14px -4px rgba(0,0,0,.5), inset 0 1px 0 0 rgba(255,255,255,.04)` (boosted drop + 1px white inset rim). Now carried by the token's `.dark` override — no per-component `.dark .sbx-pop` rule (low-opacity black is invisible on dark) |
| Anchoring (account) | `.sbx-pop-account` | `left:.5rem; right:.5rem; bottom:calc(100% + 4px)` (anchored above footer trigger) |
| Anchoring (tokens) | `.sbx-pop-tokens` | `left:.5rem; right:.5rem; bottom:calc(100% + 4px); width:auto` |

## Resolved — shipped kit (`.sbx-pop`) is authoritative

**Decision: the shipped `.sbx-pop` kit values are the authoritative specification.** The React/Radix `PopoverContent` description is the **superseded prod-reference only** — where the two diverge, the kit wins:

| Property | React/Radix (superseded prod-reference) | Shipped kit (`.sbx-pop`) — **authoritative** |
|---|---|---|
| Surface | `bg-background` (Surface/Background `#F8FAFC` light) | **`var(--card)`** (`#FFFFFF` light) |
| Radius | `rounded-md` (4px) | **`.5rem` (8px)** |
| Padding | `p-4` (16px uniform) | **`1rem .75rem`** (16px top/bottom · 12px left/right) |
| Shadow | `shadow-md` | **`var(--shadow-overlay)`** (kit elevation rung, theme-aware) |

Reproduce from the kit values (right column / Kit reproduction table above), not from the Radix description.

## No change (—)
Default `align="center"`, `sideOffset={4}`, animation set, portalling, transform origin (`--radix-popover-content-transform-origin`).

## Variants (consumer compositions documented in the kit)

| Variant | Where it's used | Note |
|---|---|---|
| **Account menu** *(documented this iteration)* | Sidebar footer — `<button class="sb-user">` opens it | Shell = the `.sbx-pop` reproduction above (bg `Surface/Card`, 1 px `Stroke/Border`, **radius 8 px, padding 16 px 12 px, inter-section gap 14 px**, `drop-shadow-lg`). Two labelled sections (`Account`, `Support`): section label 12 px/500 `--ink-secondary`; rows `.sbx-pop-item` **gap 10 px, padding 6 px 8 px, radius 6 px, 14 px label + 16 px icon**. Theme switcher = SegmentedControl `is-sm` (**20 px height, icon-only, 12 px icons**), markup `.segctrl.is-sm.sbx-pop-theme` with `.segctrl-btn.sbx-pop-theme-btn` children. Surface ladder (mirrors `.segctrl` recipe with `.sbx-pop-theme` overrides): **light** slot `var(--chips)` → active pill `var(--card)`; **dark** slot `var(--card2)` (`.dark .sbx-pop-theme`) → active pill `var(--chips)` (`.dark .sbx-pop-theme-btn.is-active`). Btn hover (non-active) `background:var(--segctrl-btn-hover-bg); color:var(--ink); box-shadow:var(--shadow-rim-hover)`; active `box-shadow:var(--shadow-rim-active)`; focus `var(--shadow-focus)`; `transition:background .12s,color .12s,box-shadow .12s`. Plain `Sign Out` row. Relocated from Stepper to the Popover section. |
| **Subscription tokens** *(documented this iteration)* | Sidebar footer — tokens-meter button opens it | **Container 260 px wide**, same `.sbx-pop` shell as the Account variant. Plan header (`.sbx-pop-tok-head`, **gap 8 px**): **21×16 px** shield-check badge in `Brand/Tertiary` + 14 px `font-medium` plan name. Two metered rows (`.sbx-pop-tok-meter`, **gap 6 px**; label 12 px `--ink-secondary`): Subscription Tokens = **24 px coin + 16 px value**, `Brand/Tertiary` fill; Purchased Credits = **16 px coin + 12 px value**, `Feedback/Green` fill; progress bar **4 px**, track `--card2`, radius full. Actions (`.sbx-pop-tok-actions`, vertical, **gap 10 px**): two full-width `rounded-full` CTAs at **h32** — `Button primary` Buy Credits + `Button secondary` Upgrade Plan (`--card` bg, neutral `--border`, `--ink-body` text). Relocated from Stepper to the Popover section. |

## Subscription tokens — icon assets *(this iteration)*

| Slot | Current (prod) | Expected | Specification |
|---|---|---|---|
| Plan badge (next to "Basic") | 21×16 inline base64 PNG embedded in `.sbx-pop-tok-head .plan-badge` | external SVG `achievement-shield.svg` referenced via `background: url("achievement-shield.svg") center/contain no-repeat` | Pure-vector, themeable, no raster. Source = Figma-exported SVG (gradients preserved). Relative URL from kit HTML. |
| Subscription Tokens coin (24×24) | inline base64 PNG embedded in `.sbx-pop-tok-meter .coin` | external SVG `coin-blue.svg` | Teal-family coin (matches `Brand/Tertiary` progress bar in same row). Hand-built pure-vector with reeded edge and shadow-only emboss. |
| Purchased Credits coin (16×16) | inline base64 PNG embedded in `.sbx-pop-tok-meter .coin.sm` | external SVG `coin-green.svg` | Green-family coin (matches `Feedback/Green` progress bar in same row). Same construction as blue, only palette swap. |

No size / layout / spacing / colour change. Only the icon source format changes (PNG → SVG). Both prod-demo and Expected popover copies share the same CSS class, so both columns of the kit pick up the new SVG references automatically.

## Subscription tokens — kit reproduction (kit-theme.css 1425–1440)

| Part | Selector | Shipped value |
|---|---|---|
| Container width | `.sbx-pop-tokens` | `width:auto` with `left:.5rem; right:.5rem` (fills footer column ~260px) |
| Plan header | `.sbx-pop-tok-head` | `display:flex; align-items:center; gap:.5rem` (8px); `padding:0 .25rem` |
| Plan badge | `.sbx-pop-tok-head .plan-badge` | `display:inline-block; width:21px; height:16px; flex:none; background:url("../achievement-shield.svg") center/contain no-repeat` |
| Plan name | `.sbx-pop-tok-head .plan-name` | `font-size:.875rem; line-height:1.25rem; font-weight:500; color:var(--ink)` |
| Meter group | `.sbx-pop-tok-meter` | `display:flex; flex-direction:column; gap:.375rem` (6px); `padding:0 .25rem; width:100%` |
| Meter row | `.sbx-pop-tok-meter .row` | `display:flex; align-items:center; gap:.5rem` (8px) |
| Meter label | `.sbx-pop-tok-meter .label` | `font-size:.75rem; line-height:1; color:var(--ink-secondary); flex:1` |
| Coin (Subscription) | `.sbx-pop-tok-meter .coin` | `display:inline-block; width:24px; height:24px; flex:none; background:url("../coin-blue.svg") center/contain no-repeat` |
| Coin (Purchased, sm) | `.sbx-pop-tok-meter .coin.sm` | `width:16px; height:16px; background:url("../coin-green.svg") center/contain no-repeat` |
| Value | `.sbx-pop-tok-meter .val` | `font-size:1rem; line-height:1.5rem; font-weight:500; color:var(--ink); font-variant-numeric:tabular-nums` |
| Value (sm) | `.sbx-pop-tok-meter .val.sm` | `font-size:.75rem; line-height:1` |
| Progress track | `.sbx-pop-tok-meter .bar` | `width:100%; height:4px; border-radius:9999px; background:var(--card2); overflow:hidden` |
| Progress fill | `.sbx-pop-tok-meter .bar>span` | `display:block; height:100%; border-radius:9999px` (inline fill colour: `Brand/Tertiary` for Subscription row, `Feedback/Green` for Purchased) |
| Actions group | `.sbx-pop-tok-actions` | `display:flex; flex-direction:column; gap:.625rem` (10px); `width:100%; margin-top:.125rem` (2px) |
| CTA button | `.sbx-pop-cta` | `width:100%; height:2rem` (h32); `border-radius:9999px; justify-content:center; font-size:.8125rem; font-weight:500` (composed onto `.btn` primary/secondary) |

## ⚠ Best-practice states — to define
- **Trigger focus / hover / pressed** — delegated to the consumer's Button / IconButton, already covered there.
- **Arrow** — Radix supports `<Popover.Arrow>` but Insightis doesn't expose / style it.
- **Sizes** — only one width (`w-72` = 288px); no `sm` / `lg` width variants.
- **Dismiss-on-outside-click / Esc** — Radix defaults, document them for consumers.
