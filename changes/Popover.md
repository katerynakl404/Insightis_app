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
| **Account menu** *(documented this iteration)* | Sidebar footer — `<button class="sb-user">` opens it | Shell = the `.sbx-pop` reproduction above (bg `Surface/Card`, 1 px `Stroke/Border`, **radius 8 px, padding 16 px 12 px, inter-section gap 14 px**, `drop-shadow-lg`). Two labelled sections (`Account`, `Support`): section label 12 px/500 `--ink-secondary`; rows `.sbx-pop-item` **gap 10 px, padding 6 px 8 px, radius 6 px, 14 px label + 16 px icon**. Theme switcher = SegmentedControl `is-sm` (**20 px height, icon-only, 12 px icons**), markup `.segctrl.is-sm.sbx-pop-theme` with `.segctrl-btn.sbx-pop-theme-btn` children. Surface ladder (mirrors `.segctrl` recipe with `.sbx-pop-theme` overrides): **light** slot `var(--chips)` → active pill `var(--card)`; **dark** slot `var(--card2)` (`.dark .sbx-pop-theme`) → active pill `var(--chips)` (`.dark .sbx-pop-theme-btn.is-active`). Btn hover (non-active) `background:var(--segctrl-btn-hover-bg); color:var(--ink); box-shadow:var(--shadow-rim-hover)`; active `box-shadow:var(--shadow-rim-active)`; focus `var(--shadow-focus)`; `transition:background .12s,color .12s,box-shadow .12s`. Plain `Log out` row. Relocated from Stepper to the Popover section. |
| **Subscription credits** *(re-shipped this iteration)* | Sidebar footer — tokens-meter button opens it | **Container 260 px wide**, same `.sbx-pop` shell as the Account variant. Plan header (`.sbx-pop-tok-head`, **gap 8 px**): no icon — 18 px `font-semibold` plan name (`H5` desktop size); on `Pro` the name shares a row with a `badge-attention badge-sm` reading "Trial ends in N days". Per-pool coin meter (see the dedicated section below) — two `.sbx-pop-tok-meter` rows (Subscription / Purchased), each a label + coin icon + value + thin progress bar. Actions (`.sbx-pop-tok-actions`, vertical, **gap 10 px**): two full-width `rounded-full` CTAs at **h32** — `Button primary` Buy Credits + `Button secondary` Upgrade Plan (`--card` bg, neutral `--border`, `--ink-body` text). Relocated from Stepper to the Popover section. |

## Subscription credits — kit reproduction (shipped)

Two coin-icon meter rows — Subscription and Purchased — each a label, a coin icon + tabular value,
and a thin progress bar underneath.

| Slot | Prod (never existed) | Expected | Specification |
|---|---|---|---|
| Subscription Credits coin (28×28) | — | external SVG `pages/assets/coins/coin-brand-1.svg` | Teal-family coin (matches `Brand/Tertiary`). Hand-built pure-vector flat coin — Style 1 of a 4-style concept set (see `pages/concept/coin-review.html`) — radial-gradient face + soft ambient drop-shadow, no extruded edge or reeded texture. Insightis mark in solid white with a thin dark keyline for contrast. |
| Purchased Credits coin (20×20) | — | external SVG `pages/assets/coins/coin-green-1.svg` | Green-family coin (matches `Feedback/Green`). Same construction as brand, palette swap only. |

> The plan-badge icon (`.plan-badge`, external `basic.svg`) documented in an earlier iteration of
> this table was **removed** — see [`Sidebar.md`](Sidebar.md) → "Tokens popover — plan header".

| Part | Selector | Shipped value |
|---|---|---|
| Container width | `.sbx-pop-tokens` | `width:auto` with `left:.5rem; right:.5rem` (fills footer column ~260px) |
| Plan header | `.sbx-pop-tok-head` | `display:flex; align-items:center; gap:.5rem` (8px); `padding:0 .25rem` — no icon |
| Plan name | `.sbx-pop-tok-head .plan-name` | `font-size:1.125rem; line-height:1.75rem; font-weight:600; color:var(--ink)` (`H5` desktop size, weight matches `.acct-plan-name`) |
| Plan info column | `.sbx-pop-tok-head .plan-info` | `display:flex; flex-direction:column; align-items:flex-start; gap:.25rem` — only used on the `Pro` plan, to hold the name row |
| Plan name row | `.plan-info .plan-name-row` | `display:flex; align-items:center; gap:.5rem` — holds `.plan-name` and (when present) the trial badge in one row, never stacked |
| Plan trial badge | `.plan-name-row .badge.badge-attention.badge-sm` | reuses [`Badge`](Badge.md) as-is, no overrides — renders only on the `Pro` plan; Free/Starter omit it entirely |
| Meter | `.sbx-pop-tok-meter` | `display:flex; flex-direction:column; gap:.375rem; padding:0 .25rem; width:100%` — one per pool |
| Meter label row | `.sbx-pop-tok-meter .row` | `display:flex; align-items:center; gap:.25rem` (tightened from 8px so the coin sits close to its number) |
| Meter label | `.sbx-pop-tok-meter .label` | `font-size:.75rem; line-height:1; color:var(--ink-secondary); flex:1` |
| Meter coin | `.sbx-pop-tok-meter .coin` (+ `.sm`) | `28×28` (`20×20` for `.sm`, the Purchased row); `background:url(assets/coins/coin-brand-1.svg)` / `coin-green-1.svg` |
| Meter value | `.sbx-pop-tok-meter .val` (+ `.sm`) | `font-size:1rem; line-height:1.5rem; font-weight:500; color:var(--ink); tabular-nums` (`.75rem/1` for `.sm`) |
| Meter bar | `.sbx-pop-tok-meter .bar` | `width:100%; height:4px; border-radius:9999px; background:var(--card2); overflow:hidden` |
| Meter fill | `.sbx-pop-tok-meter .bar>span` | `height:100%; border-radius:9999px`; `Brand/Tertiary` (Subscription) / `Feedback/Green` (Purchased) |
| Actions group | `.sbx-pop-tok-actions` | `display:flex; flex-direction:column; gap:.625rem` (10px); `width:100%; margin-top:.125rem` (2px) |
| CTA button | `.sbx-pop-cta` | `width:100%; height:2rem` (h32); `border-radius:9999px; justify-content:center; font-size:.8125rem; font-weight:500` (composed onto `.btn` primary/secondary) |

## Subscription credits — Balance-aligned legend + bar *(parked, not shipped)*

A later exploration replaced the coin meter with a shared legend + combined two-zone bar recipe
aligned to [`Manage Account → Balance`](../pages/approved/user_profile-modal.html)'s V2 view
(`.sbx-pop-tok-legend` / `.sbx-pop-tok-balbar` / `.sbx-pop-tok-bar2`, tokens
`--balance-subscription-track` / `--balance-purchased-track`). **Reverted back to the coin meter
above** — the coin-meter recipe is the shipped design. The legend+bar CSS remains in
`kit-theme.css` and is visible only in `pages/concept/tokens-popover-review.html` ("Concept 1 /
Concept 2") as a parked reference; no consuming page or the kit storybook renders it.

A "usage hero" variant (`.sbx-pop-tok-usage` / `.sbx-pop-tok-usage-of`, a big bold "N/total used"
figure under the plan name) was also prototyped alongside the legend+bar concept ("Concept 2" in
the review page) — likewise parked, not shipped.

No new tokens introduced by the coin-meter recipe (reuses existing coin SVGs + `--brand-tertiary`
/ `--fb-green`, already used elsewhere in the kit).

## ⚠ Best-practice states — to define
- **Trigger focus / hover / pressed** — delegated to the consumer's Button / IconButton, already covered there.
- **Arrow** — Radix supports `<Popover.Arrow>` but Insightis doesn't expose / style it.
- **Sizes** — only one width (`w-72` = 288px); no `sm` / `lg` width variants.
- **Dismiss-on-outside-click / Esc** — Radix defaults, document them for consumers.
