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
| Log Out | bottom of left panel, red icon | `.sbx-pop-item`, log-out icon, neutral text | no destructive color at row level |
| Theme switcher | Light / Dark / System in right Settings panel | same 3-option `.sbx-pop-theme` row | reuses existing segmented-control alias. **Light**: slot `var(--chips)` (Slate-50, per the prod baseline in [`../current/SegmentedControl.md`](../current/SegmentedControl.md#the-existing-instance-theme-switcher)) → pill `var(--card)` (white). **Dark**: slot `var(--bg)` (Grey-950, darkest surface) → pill `var(--card2)` (Grey-800, two steps lighter). Both themes walk the canonical surface ladder so the pill always elevates visibly above the slot. See [`SegmentedControl.md`](SegmentedControl.md) for the full recipe. |
| Settings detail (email, Delete Account, Change password) | right panel | — not in popover; accessible via My Account | out of scope for popover surface |
| Focus | — | focus enters on open; Escape closes + returns focus to trigger | consumer responsibility |

## Reused styles (no new CSS)

`.sbx-pop`, `.sbx-pop-account`, `.sbx-pop-sect`, `.sbx-pop-label`, `.sbx-pop-list`,
`.sbx-pop-item`, `.sbx-pop-theme`, `.sbx-pop-theme-btn`.

## Dimensions (reproduction)

Shell + rows come from the shared `.sbx-pop` recipe — canonical table in [`Popover.md`](Popover.md#kit-reproduction--shipped-sbx-pop-values); the theme switcher from [`SegmentedControl.md`](SegmentedControl.md). Account-popover values:

| Part | Size / spacing |
|---|---|
| Surface (`.sbx-pop.sbx-pop-account`) | bg `Surface/Card` (`--card`), 1 px `Stroke/Border`, **radius 8 px**, **padding 16 px 12 px**, shadow `drop-shadow-lg`, `z-index:20` |
| Position | `bottom:calc(100% + 4px)`, `left:.5rem`, `right:.5rem` — anchored above the footer user row |
| Open layout | `display:flex; flex-direction:column;` **section gap 14 px** (`.875rem`) |
| Section (`.sbx-pop-sect`) | **gap 8 px**; label `.sbx-pop-label` **12 px / 500** `--ink-secondary`, padding `0 .5rem` |
| List (`.sbx-pop-list`) | column, **gap 1 px** |
| Item (`.sbx-pop-item`) | height ~30 px, **padding 6 px 8 px**, **gap 10 px**, **radius 6 px**, font **14 px** `--ink-body`; icon **16 px** `--ink-secondary` |
| Theme switcher | SegmentedControl `is-sm` — **20 px tall, icon-only**, 12 px icons, 2 px padding, 6 px radius; bg overridden to `Surface/Chips` (`--chips`) |

## A11y

- Trigger: `aria-haspopup="menu"`, `aria-expanded` toggled on open/close.
- Popover root: `role="menu"`, `aria-label="Account menu"`.
- Items: `role="menuitem"`. Sections: `role="group"` with `aria-labelledby`.
- Resources: `aria-label="Resources (opens in new tab)"`.
- Theme buttons: `aria-label` per option + `aria-pressed`.
- Escape closes popover + returns focus to trigger.

## Self-check

Consistency: PASS — all styles from existing `.sbx-pop*`; no raw hex.  
Accessibility: PASS — `.sbx-pop-item` ink-body on `--card` ≥ 7:1. Hit targets ≥ 36px
(`.sbx-pop-item` min height). External link labeled. Color never used alone.  
Note: `.sbx-pop-theme-btn` height is 20px (design intent — icon-only segmented control);
keyboard focus ring compensates for small target size.
