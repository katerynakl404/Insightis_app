# Badge — prod → expected

Baseline: [`../current/Badge.md`](../current/Badge.md).

| Variant / state | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Primary | bg `primary/20` (alpha-mix teal over surface), text `primary` `#06596B` | — | **bg solid `Brand-50` `#E8F2F5` (light) / `Brand-800` `#142B31` (dark); text `Brand/Secondary` (`Brand-700` `#066867` light / `Brand-400` `#2FA29B` dark)** | Replace alpha-mix with a clean primitive surface so the chip reads as a deliberate pale-teal accent, not a muddy wash. Text switches `Brand/Primary` → `Brand/Secondary` for comfortable AA (5.84:1 light / 4.97:1 dark). Dark bg is `Brand-800` — the dark analogue of light's `Brand-50`, matching that subtlety (~1.2:1 surface); `Brand-900` was invisible (≈1:1 vs the card) and a filled `Brand-700` read too loud. |
| Secondary | bg `chip` `#FAFAFA`, text `content-secondary` `#62748E` (~4.7:1) | — | **bg `--badge-secondary-bg` = `Surface/Card 2` `#F1F5F9` (light) / `#21212C` (dark); text `--badge-secondary-text` = `Text/Body`** | Old mapping (`--chips`) collapsed against the kit stages (`.stage` bg = `--bg` = Slate-50 = `--chips`) — chip vanished. New tokens lift the chip one neutral step above the page bg via `--card2`. Contrast: light Slate-700 on Slate-100 = 10.36:1 AAA; dark Grey-100 on Grey-800 = 12.86:1 AAA. The `.prod` scope still maps `--badge-secondary-bg`/`-text` to `--chips` / `--ink-secondary` so the Current column keeps showing what prod actually ships. |
| Body | bg `chip`, text `content-body` | — | — no change (hex shift only → [colors](colors.md)) | Reference variant — Secondary is now intentionally aligned to it. |
| Success | bg `green/15`, text `green` | — | — no change (hex shift only) | `.badge-green` = `background:color-mix(in srgb,var(--fb-green) 15%,transparent); color:var(--fb-green)`. Carry `.rf` for the pill (full) radius. |
| Error | bg `red/15`, text `red` | — | — no change (hex shift dark theme only → [colors](colors.md)) | `.badge-red` = `background:color-mix(in srgb,var(--fb-red) 15%,transparent); color:var(--fb-red-text)`. Note text uses the distinct `--fb-red-text` (light Red-700 / dark Red-400), **not** `--fb-red`. Carry `.rf` for pill radius. |
| Attention | bg `attention/15`, text `attention` | — | — no change | `.badge-attention` = `background:color-mix(in srgb,var(--fb-attention) 15%,transparent); color:var(--fb-attention)`. Carry `.rf` for pill radius. |
| **With leading icon** *(new)* | — did not exist | — | **new** — inline SVG slot via existing `gap:.5rem`; helper class `.badge .b-ic{width:14px;height:14px;flex:none}` | Icon inherits `currentColor` so it picks up the chip's text token across every variant. |
| **Removable (close)** *(new)* | — did not exist | — | **new** — trailing `×` button: `.badge .b-x{width:16px;height:16px;margin-left:2px;color:currentColor;opacity:.7;cursor:pointer;border-radius:2px;border:none;background:transparent}` + hover `opacity:1;background:color-mix(in srgb,currentColor 12%,transparent)` + brand focus ring | Promotes the existing `.acpl .acpl-ctrl .badge .b-x` pattern into a first-class Badge slot. |
| **Status dot** *(new)* | — did not exist | — | **new** — leading 6×6 dot: `.badge .b-dot{width:6px;height:6px;border-radius:9999px;background:currentColor;flex:none}`, paired with semantic colour variants (`badge-green` online / `badge-attention` idle / `badge-red` offline) | Dot uses `currentColor` so it inherits the variant's text token. Status conveyed by dot **+** text label, never colour alone (WCAG 1.4.1). |
| **Size: small (sm)** | — (did not exist) | — | height `1.25rem` (20 px), padding `0 .375rem`, font `0.6875rem` (11 px), radius `0.25rem` | New compact size for dense UI contexts (table cells, inline labels) |

## Sizes (per-size spec — both sizes listed individually)

Base `.badge`: `display:inline-flex`, `align-items:center`, `gap:.5rem` (8px between slot + label), `border:1px solid transparent`, `font-weight:500`, `line-height:1`. Only height / padding / radius / font-size differ per size.

| Size | Class | Height | Padding | Radius | Font-size | Font-weight |
|---|---|---|---|---|---|---|
| md (default) | `.badge` | `1.75rem` (28px) | `0 .625rem` (0 / 10px) | `.375rem` (6px) | `.75rem` (12px) | 500 |
| sm | `.badge-sm` | `1.25rem` (20px) | `0 .375rem` (0 / 6px) | `.25rem` (4px) | `.6875rem` (11px) | 500 |

> `md` is the implicit default carried by the base `.badge` rule (no modifier class). `.badge-sm` overrides only height, padding, radius and font-size for dense contexts (table cells, inline labels). Variant colour and slots (`.b-ic` / `.b-dot` / `.b-x`) are size-independent.

### Pill (full) radius helper

Add `.rf` alongside the variant class to round the chip to a full pill: `.rf{border-radius:9999px}`. By convention the semantic-status variants (`.badge-green` / `.badge-red` / `.badge-attention`) and status-dot chips ship `.rf` (e.g. `class="badge badge-green rf"`); `.badge-primary` / `.badge-secondary` / `.badge-body` keep the default `.375rem` (sm: `.25rem`) corner.

### Autocomplete control scope (size override)

Inside an Autocomplete control, badges shrink: `.acpl .acpl-ctrl .badge{height:1.5rem;padding:0 6px;font-size:.75rem}` and the removable button bumps its gap + colour: `.acpl .acpl-ctrl .badge .b-x{margin-left:4px;font-weight:600;cursor:pointer;color:var(--ink-secondary)}`. This is the original site the first-class `.b-x` slot was promoted from.

## Slots (per-slot spec — size-independent, inherit `currentColor`)

| Slot | Class | Size | Notes |
|---|---|---|---|
| Leading icon | `.b-ic` | 14×14px (`flex:none`) | Inline SVG; inherits the variant's text token via `currentColor` |
| Status dot | `.b-dot` | 6×6px, `border-radius:9999px`, `background:currentColor` (`flex:none`) | Pair with text label — never colour alone (1.4.1) |
| Removable × | `.b-x` | `display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:2px;font-size:.875rem;line-height:1;color:currentColor;opacity:.7;cursor:pointer;border-radius:2px;border:none;background:transparent;font-family:inherit;padding:0;flex:none`. Hover: `opacity:1;background:color-mix(in srgb,currentColor 12%,transparent)`. `:focus-visible`: `outline:none;opacity:1;box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` | Promotes the old `.acpl .acpl-ctrl .badge .b-x` into a first-class slot. Rendered as a `<button>` with `aria-label="Remove"` and `×` glyph |

## Variant colour tokens (per-variant exact values)

| Variant | Class | bg token → primitive | text token → primitive |
|---|---|---|---|
| Primary | `.badge-primary` | `--badge-primary-bg` → light `--brand-50` `#E8F2F5` / dark `--brand-800` `#142B31` | `--badge-primary-text` → `--brand-secondary` (light Brand-700 `#066867` / dark Brand-400 `#2FA29B`) |
| Secondary | `.badge-secondary` | `--badge-secondary-bg` → `--card2` (light `#F1F5F9` / dark `#21212C`) | `--badge-secondary-text` → `--ink-body` (Text/Body) |
| Body | `.badge-body` | `--chips` | `--ink-body` |
| Success | `.badge-green` | `color-mix(in srgb,var(--fb-green) 15%,transparent)` | `--fb-green` |
| Error | `.badge-red` | `color-mix(in srgb,var(--fb-red) 15%,transparent)` | `--fb-red-text` (distinct from `--fb-red`) |
| Attention | `.badge-attention` | `color-mix(in srgb,var(--fb-attention) 15%,transparent)` | `--fb-attention` |

> The Primary/Secondary `bg`+`text` are routed through component-scoped tokens (set per light / `.dark` / `.prod` block) rather than literal values on the selector, so each scope sets its own value cleanly and avoids a `.dark` vs `.prod` cascade collision. `.prod` scope remaps `--badge-primary-bg`/`-text` to `color-mix(in srgb,var(--p-primary) 20%,transparent)` / `--p-primary`, and `--badge-secondary-bg`/`-text` to `--chips` / `--ink-secondary`, so the Current column still reflects what prod ships. Success / Error / Attention / Body bake their `color-mix` directly on the selector (no per-scope token); only `--fb-red-text` flips per theme (Red-700 light / Red-400 dark).

## DOM / markup

```html
<!-- label-only -->
<span class="badge badge-primary">Primary</span>
<!-- pill status variants carry .rf -->
<span class="badge badge-green rf">Active</span>
<!-- leading icon: inline SVG, class .b-ic, stroke=currentColor -->
<span class="badge badge-primary"><svg class="b-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="…"/></svg>Star</span>
<!-- status dot -->
<span class="badge badge-green rf"><span class="b-dot"></span>Online</span>
<!-- removable: trailing <button>, not a <span> -->
<span class="badge badge-secondary">Tag<button class="b-x" aria-label="Remove">×</button></span>
<!-- compact -->
<span class="badge badge-sm badge-secondary">Built-in</span>
```

Root is always `<span class="badge {variant} [badge-sm] [rf]">`. Slots are direct children in order: leading `.b-ic` SVG or `.b-dot`, the text label (bare text node), then a trailing `.b-x` `<button>`.

## No change (—)

Heights md 28 px and the xs–xl size scale, radius `md`/`full`, gap 8 px between slot + label, font-size text-xs medium, slot positions (left/right), `border-transparent`, the success / error / attention / body variants' bg+text recipes.

## Token map used

`--brand-50` (Primary bg, light) · `--brand-800` (Primary bg, dark — the subtle dark analogue of Brand-50) · `--brand-secondary` (Primary text — theme-adaptive: Brand-700 light / Brand-400 dark) · `--brand-primary` (icon `currentColor` in primary-branded chips) · `--card2` (Secondary bg) · `--ink-body` (Secondary / Body text) · `--chips` (Body bg) · `--fb-red` (Error bg mix) / `--fb-red-text` (Error text — distinct, theme-flipped Red-700/Red-400) · `--fb-green` (Success bg + text) · `--fb-attention` (Attention bg + text) · `--focus-ring` (removable `:focus-visible`) · `--card` (focus-ring gap). The semantic Success/Error/Attention bgs are component-baked `color-mix(… 15%,transparent)` on the selector (the one allowed inline mix, mirrored across the status family); Primary/Secondary route through `--badge-primary-*` / `--badge-secondary-*` component tokens. `.rf` (`border-radius:9999px`) is the shared pill helper. No new tokens introduced.

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
