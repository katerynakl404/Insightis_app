# Badge — prod → expected

Baseline: [`../current/Badge.md`](../current/Badge.md).

| Variant / state | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Primary | bg `primary/20` (alpha-mix teal over surface), text `primary` `#06596B` | — | **bg solid `Brand-50` `#E8F2F5` (light) / `Brand-800` `#142B31` (dark); text `Brand/Secondary` (`Brand-700` `#066867` light / `Brand-400` `#2FA29B` dark)** | Replace alpha-mix with a clean primitive surface so the chip reads as a deliberate pale-teal accent, not a muddy wash. Text switches `Brand/Primary` → `Brand/Secondary` for comfortable AA (5.84:1 light / 4.97:1 dark). Dark bg is `Brand-800` — the dark analogue of light's `Brand-50`, matching that subtlety (~1.2:1 surface); `Brand-900` was invisible (≈1:1 vs the card) and a filled `Brand-700` read too loud. |
| Secondary | bg `chip` `#FAFAFA`, text `content-secondary` `#62748E` (~4.7:1) | — | **bg `--badge-secondary-bg` = `Surface/Card 2` `#F1F5F9` (light) / `#21212C` (dark); text `--badge-secondary-text` = `Text/Body`** | Old mapping (`--chips`) collapsed against the kit stages (`.stage` bg = `--bg` = Slate-50 = `--chips`) — chip vanished. New tokens lift the chip one neutral step above the page bg via `--card2`. Contrast: light Slate-700 on Slate-100 = 10.36:1 AAA; dark Grey-100 on Grey-800 = 12.86:1 AAA. |
| Body | bg `chip`, text `content-body` | — | — no change (hex shift only → [colors](colors.md)) | Reference variant — Secondary is now intentionally aligned to it. |
| Success | bg `green/15`, text `green` | — | — no change (hex shift only) | `.badge-green` = `background:color-mix(in srgb,var(--fb-green) var(--tint-15),transparent); color:var(--fb-green)`. Carry `.rf` for the pill (full) radius. |
| Error | bg `red/15`, text `red` | — | — no change (hex shift dark theme only → [colors](colors.md)) | `.badge-red` = `background:color-mix(in srgb,var(--fb-red) var(--tint-15),transparent); color:var(--fb-red-text)`. Note text uses the distinct `--fb-red-text` (light Red-700 / dark Red-400), **not** `--fb-red`. Carry `.rf` for pill radius. |
| Attention | bg `attention/15`, text `attention` | — | — no change | `.badge-attention` = `background:color-mix(in srgb,var(--fb-attention) var(--tint-15),transparent); color:var(--fb-attention)`. Carry `.rf` for pill radius. |
| **With leading icon** *(new)* | — did not exist | — | **new** — inline SVG slot via existing `gap:.5rem`; helper class `.badge .b-ic{width:14px;height:14px;flex:none}` | Icon inherits `currentColor` so it picks up the chip's text token across every variant. |
| **Removable (close)** *(new)* | — did not exist | — | **new** — trailing remove **icon** (`.badge .b-x`): a 16px SVG filling a 16px box, no margin of its own, no hover surface — see *Remove icon proportions* | Promotes the existing `.acpl .acpl-ctrl .badge .b-x` pattern into a first-class Badge slot. |
| **Status dot** *(new)* | — did not exist | — | **new** — leading 6×6 dot: `.badge .b-dot{width:6px;height:6px;border-radius:var(--radius-full);background:currentColor;flex:none}`, paired with semantic colour variants (`badge-green` online / `badge-attention` idle / `badge-red` offline) | Dot uses `currentColor` so it inherits the variant's text token. Status conveyed by dot **+** text label, never colour alone (WCAG 1.4.1). |
| **Size: small (sm)** | — (did not exist) | — | height `1.25rem`, padding `0 .375rem`, `gap:.25rem`, font `--ts-label-m`, radius `.25rem` | New compact size for dense UI contexts (table cells, inline labels) |
| **Border: bordered / flat** | `border:1px solid transparent` — no edge anywhere; an outline only appeared via a `.chat-row` / `table.tbl` context rule | — | **bordered is the default on every variant** — base `.badge` carries `border:1px solid var(--badge-border)`; `.badge-flat` is the borderless variation | The edge is a property of the Badge, not of the surface it happens to sit on: one component, two documented variations, instead of an invisible context rule that made the same markup render differently in a table than on a page. The tint comes from the badge's own `currentColor`, so it reads as part of each chip (teal on Primary, neutral on Secondary) and rows keep the definition they had — with no per-context selector. |

## Sizes (per-size spec — both sizes listed individually)

Base `.badge`: `display:inline-flex`, `align-items:center`, `gap:.5rem` (8px between slot + label), `border:1px solid var(--badge-border)` (bordered by default — see below), `font-weight:var(--ts-label-m-weight)`, `line-height:var(--ts-label-m-lh)`. Only height / padding / radius / gap differ per size — both sizes share the `--ts-label-m` type step.

| Size | Class | Height | Padding | Radius | Gap | Type step |
|---|---|---|---|---|---|---|
| md (default) | `.badge` | `1.75rem` | `0 .625rem` | `.375rem` | `.5rem` | `--ts-label-m` |
| sm | `.badge-sm` | `1.25rem` | `0 .375rem` | `.25rem` | `.25rem` | `--ts-label-m` |

> `md` is the implicit default carried by the base `.badge` rule (no modifier class). `.badge-sm` overrides height, padding, radius, font-size **and `gap` (`.25rem` — 8px is too loose between a 12px glyph and a label in a 20px pill)** for dense contexts (table cells, inline labels). Variant colour and slots (`.b-ic` / `.b-dot` / `.b-x`) are size-independent.

### Border variations — bordered (default) / `.badge-flat`

The border is part of the Badge, not of the surface it sits on. Every badge ships **bordered**: base `.badge` carries `border:1px solid var(--badge-border)`, a hairline mixed from the badge's **own** colour (`currentColor` = the variant's text token), so it reads as part of each chip — teal on Primary, neutral on Secondary, green on Success — never a uniform grey, and it never "appears" on interaction.

This is also what solves state-stacking: a badge inside a `.chat-row`, `.ds-conn-row` or `table.tbl` row shares the row's background when that row hovers/selects (`Badge/Secondary` fill = `--card2` = row hover/selected; `Badge/Primary` fill = `--brand-50` = Card selected), and the always-on edge keeps it defined. Because it is the default, **rows need no context rule** — the previous `.chat-row .badge, .ds-conn-row .badge, table.tbl tbody tr .badge{border-color:…}` selector is gone, and the same markup now renders identically in a table, a card and a page.

`.badge-flat` (`border-color:transparent`) is the borderless variation — for surfaces that already frame the chip, where the edge would read as a second frame. Border is drawn inside the declared height, so neither variation changes the badge's size.

### Pill (full) radius helper

Add `.rf` alongside the variant class to round the chip to a full pill: `.rf{border-radius:var(--radius-full)}` (was a raw `9999px` — tokenised 2026-09-19). By convention the semantic-status variants (`.badge-green` / `.badge-red` / `.badge-attention`) and status-dot chips ship `.rf` (e.g. `class="badge badge-green rf"`); `.badge-primary` / `.badge-secondary` / `.badge-body` keep the default `.375rem` (sm: `.25rem`) corner.

### Badge as a button

When the whole chip is the affordance — a failed status that opens its error toast (Connections → Last check) — the Badge is rendered as a `<button>` instead of a `<span>`, same classes. `button.badge` adds `font-family:inherit` + `cursor:pointer` and a `:focus-visible` ring; colour, size and slots stay the variant's. This replaces the page-local `.ds-sync-chip` that used to re-implement Badge for exactly this case.

### Autocomplete control scope (size override)

Inside an Autocomplete control, badges shrink: `.acpl .acpl-ctrl .badge{height:1.5rem;padding:0 6px;font-size:var(--ts-body-s-size);line-height:var(--ts-body-s-lh)}` only. The `.b-x` override it used to carry (`margin-left:4px; font-weight:600`) is **gone** — both existed only to prop up the old text-`×` glyph, and the 4px on top of the chip's own gap is what made these chips read as gappy. This is the original site the first-class `.b-x` slot was promoted from.

### Remove icon proportions (2026-09-19)

Measured against the prod component library's [Badge / Removable](https://devart-ui-react-a83534.gitlabpages.devart.com/?path=/story/components-badge--removable): chip height 28, padding `0 10px`, **gap 8**, radius 6 — all of which the kit already matched — and a ✕ whose **box and glyph are both 16**. Ours differed in three ways, and together they made the chip look gappy with a dwarf ✕:

| | Was | Now |
|---|---|---|
| Glyph | the text character `×`, which inks roughly half its box | a real SVG filling the box, 16 = 16 |
| Spacing | the chip's `gap` **plus** a private `margin-left` (2px base, 4px in Autocomplete) | the chip's `gap` alone, stated once |
| Hover | a `currentColor` tint pill behind the glyph | opacity only — an icon on the chip's own surface gets no second surface |

The third one is the same rule as the [InputGroup](InputGroup.md) trailing action: **an icon docked inside a component is not a button and needs no background highlight.**

> **Tap target:** 16px is below the 24px WCAG 2.2 (2.5.8) minimum. Accepted, matching the reference — the ✕ is an inline control with a keyboard-equivalent removal path, which is the spec's inline exception. Revisit if `.b-x` ever becomes the only way to remove a chip.

## Slots (per-slot spec — size-independent, inherit `currentColor`)

| Slot | Class | Size | Notes |
|---|---|---|---|
| Leading icon | `.b-ic` | 14×14px, **12×12 in `.badge-sm`** (`flex:none`) | Inline SVG; inherits the variant's text token via `currentColor` |
| Status dot | `.b-dot` | 6×6px, `border-radius:var(--radius-full)`, `background:currentColor` (`flex:none`) | Pair with text label — never colour alone (1.4.1) |
| Removable × | `.b-x` | A 16×16 box holding a **16×16 SVG** — the glyph fills the box. No margin: the gap to the label is the badge's own `gap`. Transparent, borderless; hover lifts `opacity` .7 → 1 and paints **nothing**. `:focus-visible`: `outline:none;opacity:1;box-shadow:var(--shadow-focus)`. `.badge-sm` steps box and glyph to 12 | `<button type="button" aria-label="Remove">` wrapping an inline SVG — see *Remove icon proportions* |

## Variant colour tokens (per-variant exact values)

| Variant | Class | bg token → primitive | text token → primitive |
|---|---|---|---|
| Primary | `.badge-primary` | `--badge-primary-bg` → light `--brand-50` `#E8F2F5` / dark `--brand-800` `#142B31` | `--badge-primary-text` → `--brand-secondary` (light Brand-700 `#066867` / dark Brand-400 `#2FA29B`) |
| Secondary | `.badge-secondary` | `--badge-secondary-bg` → `--card2` (light `#F1F5F9` / dark `#21212C`) | `--badge-secondary-text` → `--ink-body` (Text/Body) |
| Body | `.badge-body` | `--chips` | `--ink-body` |
| Success | `.badge-green` | `color-mix(in srgb,var(--fb-green) var(--tint-15),transparent)` | `--fb-green` |
| Error | `.badge-red` | `color-mix(in srgb,var(--fb-red) var(--tint-15),transparent)` | `--fb-red-text` (distinct from `--fb-red`) |
| Attention | `.badge-attention` | `color-mix(in srgb,var(--fb-attention) var(--tint-15),transparent)` | `--fb-attention` |

> The Primary/Secondary `bg`+`text` are routed through component-scoped tokens (set per light / `.dark` block) rather than literal values on the selector, so each theme sets its own value cleanly. Success / Error / Attention / Body bake their `color-mix` directly on the selector (no per-scope token); only `--fb-red-text` flips per theme (Red-700 light / Red-400 dark).

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
<span class="badge badge-secondary">Tag<button class="b-x" type="button" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>
<!-- compact -->
<span class="badge badge-sm badge-secondary">Built-in</span>
```

Root is always `<span class="badge {variant} [badge-sm] [rf]">`. Slots are direct children in order: leading `.b-ic` SVG or `.b-dot`, the text label (bare text node), then a trailing `.b-x` `<button>`.

## No change (—)

Heights md 28 px and the xs–xl size scale, radius `md`/`full`, gap 8 px between slot + label, font-size text-xs medium, slot positions (left/right), the success / error / attention / body variants' bg+text recipes.

## Token map used

`--brand-50` (Primary bg, light) · `--brand-800` (Primary bg, dark — the subtle dark analogue of Brand-50) · `--brand-secondary` (Primary text — theme-adaptive: Brand-700 light / Brand-400 dark) · `--brand-primary` (icon `currentColor` in primary-branded chips) · `--card2` (Secondary bg) · `--ink-body` (Secondary / Body text) · `--surface-chips` (Body bg) · `--fb-red` (Error bg mix) / `--fb-red-text` (Error text — distinct, theme-flipped Red-700/Red-400) · `--fb-green` (Success bg + text) · `--fb-attention` (Attention bg + text) · `--badge-border` (the default hairline — `currentColor` mixed at `--tint-25`; `.badge-flat` resets it to `transparent`) · `--shadow-focus` (removable + `button.badge` `:focus-visible`) · `--tint-12` (removable hover wash) · `--tint-15` (status-variant fills) · `--tint-25` (inside `--badge-border`) · `--radius-full` (`.rf`) · `--ts-label-m-*` (both sizes' type step) · `--ts-body-m-*` (removable ×) · `--surface-chips` (Body bg). The semantic Success/Error/Attention bgs are component-baked `color-mix(in srgb, var(--fb-*) var(--tint-15), transparent)` on the selector (the one allowed inline mix, mirrored across the status family); Primary/Secondary route through `--badge-primary-*` / `--badge-secondary-*` component tokens. `.rf` (`border-radius:var(--radius-full)`) is the shared pill helper. One new token: `--badge-border`.

## Accessibility & consistency self-check
```
Consistency: PASS — all colours via tokens; Primary now uses a solid primitive surface instead of alpha-mix over an arbitrary parent. Removable `.b-x` reuses the brand focus-ring recipe shared with Button / IconButton / Tabs.
Accessibility:
  ✓ Primary text vs bg — light #066867 (Brand-700) on #E8F2F5 (Brand-50) = 5.84:1 (target 4.5:1, 1.4.3 — comfortable margin; Brand-600 was 4.21:1, fails)
  ✓ Primary text vs bg — dark #2FA29B (Brand-400) on #142B31 (Brand-800) = 4.97:1 (subtle tint matching light's Brand-50)
  ✓ Secondary text vs bg — light #334155 / #F8FAFC = 10.66:1 (now aligned with Body chip)
  ✓ Secondary text vs bg — dark #F4F4F5 (Grey-100) on #21212C (Grey-800) = 12.36:1
  ⚠ Removable ✕ hit target — 16×16, matching the reference component. Below 2.5.8 (Minimum); accepted under the inline exception, the chip stays removable by keyboard
  ✓ Removable focus — brand 4-px halo on `:focus-visible`; visible against any underlying chip bg (2.4.7)
  ✓ Status not by colour alone — status-dot chip pairs dot + text label (1.4.1)
```
