# SegmentedControl — live prod baseline

**There is no first-class SegmentedControl in `@insightis/ui` today.**

There are **two live prod instances** of the segmented-control pattern, both on the theme switcher (Light · Dark · System). Neither is exposed as a reusable component — both are inline compositions.

## Instance 1 — Sidebar Account popover (`.sbx-pop-theme`)

| Slot | Value |
|---|---|
| Container | `bg-chip` + 1 px `Stroke/Border`, padding 2 px, radius `md 6 px`, `flex` + 4 px gap |
| Item | flex 1, height 20 px, transparent bg, icon-only (12 × 12 SVG), text `Text/Secondary` |
| Item hover | text → `Text/Primary` |
| Item active | bg `Surface/Card`, text `Text/Primary`, `aria-selected="true"` |
| Item focus-visible | `--shadow-focus` |
| Item disabled | not defined in prod |
| Size variants | none (icon-only, 20 px only) |
| ARIA | `role="tablist"` on container, `role="tab"` on items |

## Instance 2 — Settings modal theme switcher (Tailwind, `role="tablist"`)

Inspected via DevTools on `https://insightis-app.devart.info` (Settings > Appearance, 2026-06-17).

| Slot | Value |
|---|---|
| Container | Tailwind `inline-flex items-center justify-center gap-1 border border-stroke bg-chip h-9 p-1 rounded-md w-full`; computed bg `#F3F5F7` (`bg-chip`/`--chips`), border `0.8px solid rgb(226,232,240)` (Slate-200), height 36 px, padding 4 px, radius 6 px, gap 4 px, full-width |
| Item (inactive) | bg `transparent`, text `rgb(54,68,89)` (≈ Text/Primary — **same as active**, no visual differentiation), height 28 px, padding `6 px / 12 px`, radius 4 px, font 14 px / 500 |
| Item (active) | bg `rgb(255,255,255)` (`Surface/Card`), text same `rgb(54,68,89)`, `box-shadow: rgba(0,0,0,.05) 0px 1px 2px 0px` (outset drop only — **no inset rim**) |
| Icons | 24 × 24 Lucide (all states) |
| Item hover | not captured (Tailwind hover class, no bg change visible in static DevTools) |
| Item disabled | not defined |
| ARIA | `role="tablist"` on container, `role="tab"` on items |

## Why this matters

This pattern is reusable — Insightis already has the visual language and the focus/hover/active recipe — but it lives **only** inside the Sidebar Account popover. Any new surface that wants a segmented control (view-mode toggle, sort-by selector, density chooser, etc.) currently has to either:

- Re-implement the recipe inline (duplication, drift risk), or
- Hijack the Sidebar's `.sbx-pop-theme` class semantically — which is a leaky abstraction.

The promotion to a first-class component is captured in [`../changes/SegmentedControl.md`](../changes/SegmentedControl.md).
