# SegmentedControl — live prod baseline

**There is no first-class SegmentedControl in `@insightis/ui` today.**

The only live segmented control in production is the **theme switcher inside the Sidebar Account popover** (Light · Dark · System). It is implemented inline as part of the Account popover composition, not as a reusable component, under the Sidebar-scoped class names `.sbx-pop-theme` / `.sbx-pop-theme-btn`.

## The existing instance (theme switcher)

| Slot | Value |
|---|---|
| Container | `bg-chip` + 1 px `Stroke/Border`, padding 2 px, radius `md 6 px`, `flex` + 4 px gap |
| Item | flex 1, height 20 px, transparent bg, icon-only (12 × 12 SVG), text `Text/Secondary` |
| Item hover | text → `Text/Primary` |
| Item active | bg `Surface/Card`, text `Text/Primary`, `aria-selected="true"` |
| Item focus-visible | `--shadow-focus-brand` |
| Item disabled | not defined in prod |
| Size variants | none (icon-only, 20 px only) |
| ARIA | `role="tablist"` on container, `role="tab"` on items |

## Why this matters

This pattern is reusable — Insightis already has the visual language and the focus/hover/active recipe — but it lives **only** inside the Sidebar Account popover. Any new surface that wants a segmented control (view-mode toggle, sort-by selector, density chooser, etc.) currently has to either:

- Re-implement the recipe inline (duplication, drift risk), or
- Hijack the Sidebar's `.sbx-pop-theme` class semantically — which is a leaky abstraction.

The promotion to a first-class component is captured in [`../changes/SegmentedControl.md`](../changes/SegmentedControl.md).
