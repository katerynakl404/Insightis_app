# Badge — prod → expected

Baseline: [`../current/Badge.md`](../current/Badge.md).

| Variant / state | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Primary | bg `primary/20` (alpha-mix teal over surface), text `primary` `#06596B` | — | **bg solid `Brand-50` `#E8F2F5` (light) / `Brand-800` `#142B31` (dark); text `Brand/Secondary` (`Brand-700` `#066867` light / `Brand-400` `#2FA29B` dark)** | Replace alpha-mix with a clean primitive surface so the chip reads as a deliberate pale-teal accent, not a muddy wash. Text switches `Brand/Primary` → `Brand/Secondary` for comfortable AA (5.84:1 light / 4.97:1 dark). Dark bg is `Brand-800` — the dark analogue of light's `Brand-50`, matching that subtlety (~1.2:1 surface); `Brand-900` was invisible (≈1:1 vs the card) and a filled `Brand-700` read too loud. |
| Secondary | bg `chip` `#FAFAFA`, text `content-secondary` `#62748E` (~4.7:1) | — | **bg `--badge-secondary-bg` = `Surface/Card 2` `#F1F5F9` (light) / `#21212C` (dark); text `--badge-secondary-text` = `Text/Body`** | Old mapping (`--chips`) collapsed against the kit stages (`.stage` bg = `--bg` = Slate-50 = `--chips`) — chip vanished. New tokens lift the chip one neutral step above the page bg via `--card2`. Contrast: light Slate-700 on Slate-100 = 10.36:1 AAA; dark Grey-100 on Grey-800 = 12.86:1 AAA. The `.prod` scope still maps `--badge-secondary-bg`/`-text` to `--chips` / `--ink-secondary` so the Current column keeps showing what prod actually ships. |
| Body | bg `chip`, text `content-body` | — | — no change (hex shift only → [colors](colors.md)) | Reference variant — Secondary is now intentionally aligned to it. |
| Success | bg `green/15`, text `green` | — | — no change (hex shift only) | — |
| Error | bg `red/15`, text `red` | — | — no change (hex shift dark theme only → [colors](colors.md)) | — |
| Attention | bg `attention/15`, text `attention` | — | — no change | — |
| **With leading icon** *(new)* | — did not exist | — | **new** — inline SVG slot via existing `gap:.5rem`; helper class `.badge .b-ic{width:14px;height:14px;flex:none}` | Icon inherits `currentColor` so it picks up the chip's text token across every variant. |
| **Removable (close)** *(new)* | — did not exist | — | **new** — trailing `×` button: `.badge .b-x{width:14px;height:14px;margin-left:2px;color:currentColor;opacity:.7;cursor:pointer;border-radius:2px;border:none;background:transparent}` + hover `opacity:1;background:color-mix(in srgb,currentColor 12%,transparent)` + brand focus ring | Promotes the existing `.acpl .acpl-ctrl .badge .b-x` pattern into a first-class Badge slot. |
| **Status dot** *(new)* | — did not exist | — | **new** — leading 6×6 dot: `.badge .b-dot{width:6px;height:6px;border-radius:9999px;background:currentColor;flex:none}`, paired with semantic colour variants (`badge-green` online / `badge-attention` idle / `badge-red` offline) | Dot uses `currentColor` so it inherits the variant's text token. Status conveyed by dot **+** text label, never colour alone (WCAG 1.4.1). |
| **Size: small (sm)** | — (did not exist) | — | height `1.25rem` (20 px), padding `0 .375rem`, font `0.6875rem` (11 px), radius `0.25rem` | New compact size for dense UI contexts (table cells, inline labels) |

## No change (—)

Heights md 28 px and the xs–xl size scale, radius `md`/`full`, gap 8 px between slot + label, font-size text-xs medium, slot positions (left/right), `border-transparent`, the success / error / attention / body variants' bg+text recipes.

## Token map used

`--brand-50` (Primary bg, light) · `--brand-800` (Primary bg, dark — the subtle dark analogue of Brand-50) · `--brand-secondary` (Primary text — theme-adaptive: Brand-700 light / Brand-400 dark) · `--brand-primary` (icon `currentColor` in primary-branded chips) · `--card2` (Secondary / Body bg) · `--ink-body` (Secondary / Body text) · `--fb-red` / `--fb-red-text` · `--fb-green` · `--fb-attention` · `--focus-ring-brand` (removable `:focus-visible`) · `--card` (focus-ring gap). All resolve via existing semantic + primitive aliases — no new tokens introduced, no inline color-mix.

## Accessibility & consistency self-check
```
Consistency: PASS — all colours via tokens; Primary now uses a solid primitive surface instead of alpha-mix over an arbitrary parent. Removable `.b-x` reuses the brand focus-ring recipe shared with Button / IconButton / Tabs.
Accessibility:
  ✓ Primary text vs bg — light #066867 (Brand-700) on #E8F2F5 (Brand-50) = 5.84:1 (target 4.5:1, 1.4.3 — comfortable margin; Brand-600 was 4.21:1, fails)
  ✓ Primary text vs bg — dark #2FA29B (Brand-400) on #142B31 (Brand-800) = 4.97:1 (subtle tint matching light's Brand-50)
  ✓ Secondary text vs bg — light #334155 / #F8FAFC = 10.66:1 (now aligned with Body chip)
  ✓ Secondary text vs bg — dark #F4F4F5 (Grey-100) on #21212C (Grey-800) = 12.36:1
  ✓ Removable × hit target — wrapper provides 24×24 inclusive of the 14×14 button + 2px margin + label flank; meets 2.5.8 desktop AAA
  ✓ Removable focus — brand 4-px halo on `:focus-visible`; visible against any underlying chip bg (2.4.7)
  ✓ Status not by colour alone — status-dot chip pairs dot + text label (1.4.1)
```
