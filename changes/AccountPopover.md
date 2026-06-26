# AccountPopover — prod → expected

Source: `@insightis/ui` Sidebar user-row action.
Baseline: [`../current/Sidebar.md`](../current/Sidebar.md) (user-row section).

## Overview

**Current (prod):** clicking the user row opens a full-screen split panel — left nav
sidebar (Account: My Account, Manage Plan, Billing, Balance; Support: Leave Feedback,
Resources↗; Log Out) + right Settings content (email, Change password, Delete Account,
Theme switcher).

**Expected:** compact floating popover opens directly above the footer user row via
`.sbx-pop.sbx-pop-account`. Same nav destinations; no full-panel takeover.

## State table

| Aspect | Current (prod) | Expected | Specification |
|---|---|---|---|
| Trigger | user row click → full-screen split panel | `<button>` `aria-haspopup="menu"` `aria-expanded` | toggle on click; close on outside click / Escape |
| Surface | full-screen split panel (left nav + right content) | `.sbx-pop.sbx-pop-account.is-open` above footer | `bottom:calc(100%+4px)`, `left:.5rem`, `right:.5rem` |
| Account items | My Account · Manage Plan · Billing · Balance | same 4 as `.sbx-pop-item` rows | Hover/pressed shifts **bg only** (no content recolour) — matches the rest of the sidebar (nav-items, chat rows). Text stays `--ink-body`, icons stay `--ink-secondary`. Brand-tinted content is reserved for the active state on routed items (nav-items, chat rows). |
| Support items | Leave Feedback · Resources↗ | same 2 | Resources keeps ext icon |
| Log Out | bottom of left panel, red icon | **Sign Out** `.sbx-pop-item` (after the theme switcher, outside any `.sbx-pop-sect`), log-out icon, neutral text | no destructive color at row level — kept neutral per Figma |
| Theme switcher | Light / Dark / System in right Settings panel | same 3-option `.sbx-pop-theme` row | reuses existing segmented-control alias. **Light**: slot `var(--chips)` (Slate-50, per the prod baseline in [`../current/SegmentedControl.md`](../current/SegmentedControl.md#the-existing-instance-theme-switcher)) → pill `var(--card)` (white). **Dark**: slot `var(--bg)` (Grey-950, darkest surface) → pill `var(--card2)` (Grey-800, two steps lighter). Both themes walk the canonical surface ladder so the pill always elevates visibly above the slot. See [`SegmentedControl.md`](SegmentedControl.md) for the full recipe. |
| Settings detail (email, Delete Account, Change password) | right panel | — not in popover; accessible via My Account | out of scope for popover surface |
| Focus | — | focus enters on open; Escape closes + returns focus to trigger | consumer responsibility |

## Reused styles (no new CSS)

`.sbx-pop`, `.sbx-pop-account`, `.sbx-pop-sect`, `.sbx-pop-label`, `.sbx-pop-list`,
`.sbx-pop-item` (+ `.ic` leading-icon and `.ext` external-marker children), `.sbx-pop-theme`, `.sbx-pop-theme-btn`.

## DOM structure (reproduction)

```
div.sbx-pop.sbx-pop-account  [id, role="menu", aria-label="Account"]   (+.is-open when shown)
  div.sbx-pop-sect           [role="group"]
    span.sbx-pop-label       "Account"
    div.sbx-pop-list
      button.sbx-pop-item [role="menuitem"]  svg.ic + "My Account"
      …Manage Plan / Billing / Balance
  div.sbx-pop-sect           [role="group"]
    span.sbx-pop-label       "Support"
    div.sbx-pop-list
      button.sbx-pop-item     svg.ic + "Leave Feedback"
      button.sbx-pop-item     svg.ic + "Resources" + svg.ext
  div.segctrl.is-sm.sbx-pop-theme  [role="tablist", aria-label="Theme"]
      button.segctrl-btn.sbx-pop-theme-btn.is-active  [role="tab"]  svg (Light = sun)
      button.segctrl-btn.sbx-pop-theme-btn            svg (Dark = moon)
      button.segctrl-btn.sbx-pop-theme-btn            svg (System = monitor)
  button.sbx-pop-item        svg.ic + "Sign Out"      (standalone, outside any sect)
```

All icons are 24×24-viewBox Lucide SVGs, `fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"`; glyph paths live in the storybook markup (`#accountpopover` → My Account = user, Manage Plan = blocks/layers, Billing = credit-card, Balance = wallet, Leave Feedback = message-circle-heart, Resources = file-question + arrow `.ext`, theme = sun/moon/monitor-smartphone, Sign Out = log-out).

## Dimensions (reproduction)

Shell + rows come from the shared `.sbx-pop` recipe — canonical table in [`Popover.md`](Popover.md#kit-reproduction--shipped-sbx-pop-values); the theme switcher from [`SegmentedControl.md`](SegmentedControl.md). Account-popover values:

| Part | Size / spacing |
|---|---|
| Surface (`.sbx-pop.sbx-pop-account`) | bg `Surface/Card` (`--card`), border `var(--border-width) solid var(--border)` (1 px `Stroke/Border`), **radius .5rem (8 px)**, **padding 1rem .75rem (16 px 12 px)**, `position:absolute`, `z-index:20`, `font-family:inherit`. Shadow `var(--shadow-overlay)` (floating-overlay rung — light `0 10px 15px -3px rgba(0,0,0,.12), 0 4px 6px -4px rgba(0,0,0,.08)`, theme-aware dark). Closed state `display:none` |
| Dark surface | carried by `--shadow-overlay`'s `.dark` override `0 16px 32px -8px rgba(0,0,0,.65), 0 6px 14px -4px rgba(0,0,0,.5), inset 0 1px 0 0 rgba(255,255,255,.04)` — no per-component `.dark .sbx-pop` rule |
| Position | `bottom:calc(100% + 4px)`, `left:.5rem`, `right:.5rem` — anchored above the footer user row |
| Open layout (`.sbx-pop.is-open`) | `display:flex; flex-direction:column;` **section gap .875rem (14 px)** |
| Section (`.sbx-pop-sect`) | `display:flex; flex-direction:column;` **gap .5rem (8 px)**, `width:100%`; label `.sbx-pop-label` **font-size .75rem (12 px) / line-height 1 / weight 500** `--ink-secondary`, padding `0 .5rem` |
| List (`.sbx-pop-list`) | `display:flex; flex-direction:column;` **gap 1 px** |
| Item (`.sbx-pop-item`) | `<button>`; `display:flex; align-items:center;` **gap .625rem (10 px)**, **padding .375rem .5rem (6 px 8 px)**, `border:none`, `background:transparent`, **radius .375rem (6 px)**, **font-size .875rem (14 px), line-height 1.25**, `color:var(--ink-body)`, `width:100%`, `text-align:left`, `font-family:inherit`, `cursor:pointer`, `transition:background .12s` (no explicit height — derives to ~30 px: 17.5 px text + 12 px padding). Leading icon `.ic` **16×16 px** `--ink-secondary`, `flex:none`. External marker `.ext` **14×14 px** `--ink-secondary`, `flex:none`, `margin-left:auto` |
| Item states | `:hover` → bg `var(--state-hover)`; `:active` & `.active` → bg `var(--state-pressed)` (bg only — text/icons keep default ink); `:focus-visible` → `outline:none; box-shadow:var(--shadow-focus)` |
| Theme switcher (`.segctrl.is-sm.sbx-pop-theme`) | `display:flex; gap:.25rem; width:100%`, `padding:2px`, **radius .375rem (6 px)**, border `var(--border-width) solid var(--border)`; bg overridden to `Surface/Chips` (`--chips`), `.dark` → `var(--card2)` |
| Theme button (`.sbx-pop-theme-btn`) | `flex:1; display:inline-flex; align-items:center; justify-content:center;` **height 1.25rem (20 px)**, `border:none`, `background:transparent`, **radius .25rem (4 px)**, `color:var(--ink-secondary)`, `transition:background .12s, color .12s, box-shadow .12s`. Icon `svg` **12×12 px**. `:not(.is-active):hover` → bg `var(--segctrl-btn-hover-bg)`, color `var(--ink)`, shadow `var(--shadow-rim-hover)`. `.is-active` → bg `var(--card)` (`.dark` → `var(--chips)`), color `var(--ink)`, shadow `var(--shadow-rim-active)`. `:focus-visible` → `box-shadow:var(--shadow-focus)` |

## A11y

- Trigger: `aria-haspopup="menu"`, `aria-expanded` toggled on open/close.
- Popover root: `role="menu"`, `aria-label="Account menu"`.
- Items: `role="menuitem"`. Sections: `role="group"` with `aria-labelledby`.
- Resources: `aria-label="Resources (opens in new tab)"`.
- Theme buttons: `aria-label` per option + `aria-pressed`.
- Escape closes popover + returns focus to trigger.

## Self-check

Consistency: PASS — all styles from existing `.sbx-pop*`; no raw hex.  
Accessibility: PASS — `.sbx-pop-item` ink-body on `--card` ≥ 7:1. Item hit target ~30px
(no explicit height; padding 6px + 14px/1.25 text); full-row click area + visible
`--shadow-focus` ring compensate. External link labeled. Color never used alone.  
Note: `.sbx-pop-theme-btn` height is 20px (design intent — icon-only segmented control);
keyboard focus ring compensates for small target size.
