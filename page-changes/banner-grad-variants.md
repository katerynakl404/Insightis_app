# Banner Gradient Variants — page-level changes

## Out of scope
No kit-component changes — this is a net-new exploration screen with no prod equivalent.

## Purpose
Visual audit page comparing 6 gradient treatments for `.banner-grad` across light and dark themes.
Current baseline (A) is too heavy on light theme and too washed out on dark theme.

## Variants documented

| Variant | Gradient | Notes |
|---|---|---|
| A — Current | `brand-400 → slate-900` | Reference baseline |
| B — Brand sweep | `brand-300 → brand-800` | Lighter entry, no near-black endpoint |
| C — Deeper | `brand-500 → brand-900` | More saturated, ends at brand's own dark |
| D — Three-stop | `brand-400 → brand-700 → slate-800 (150deg)` | Mid-tone plateau softens dark jump |
| E — Slate entry | `slate-700 → brand-600` | Reversed: neutral entry, teal bloom |
| F — Theme-adaptive | Light: `brand-400 → brand-800` / Dark: `brand-600 → brand-900` | **Recommended** — different gradient per theme via `.dark` scope |

## Recommended implementation (Variant F)
Override `--grad-teal-dark` in `pages/kit-theme.css`:
```css
.banner-grad { --grad-teal-dark: linear-gradient(135deg, var(--brand-400) 0%, var(--brand-800) 100%) }
.dark .banner-grad { --grad-teal-dark: linear-gradient(135deg, var(--brand-600) 0%, var(--brand-900) 100%) }
```
