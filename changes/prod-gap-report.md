# Prod gap report — kit vs prod

Audit of `pages/kit-theme.css` Expected rules vs `.prod`-scoped overrides.
Components that already match Expected: **Tooltip · CircularProgress · File · IconButton**.

---

## Token fixes applied this session

| Token | Was | Now | Affects |
|---|---|---|---|
| `--border-hover` light | `var(--slate-300)` #CBD5E1 ~1.52:1 | `var(--slate-450)` #7C8CA2 ~3.28:1 | Input hover, Textarea hover, Checkbox resting border, InputGroup, Selector |
| `--border-hover` dark | `var(--slate-700)` #334155 ~2.1:1 | `var(--slate-600)` #475569 ~2.35:1 | Same as above |
| `--input-focus` dark | `var(--slate-600)` | `var(--slate-500)` #64748B ~3.74:1 | Input/Textarea/InputGroup focus border, Selector open state — ensures focus reads above hover |

These changes are live in `pages/kit-theme.css`. They need to ship in `globals.css` on prod.

---

## Badge

Prod scope: `.prod { --badge-primary-bg: …; --badge-primary-text: …; --badge-secondary-bg: …; --badge-secondary-text: … }`

| Token | Prod resolves to | Expected resolves to |
|---|---|---|
| `--badge-primary-bg` | `color-mix(in srgb, var(--p-primary) 20%, transparent)` — alpha wash over transparent; near-invisible on dark | `var(--brand-50)` solid light #EFF8F8 (light) / `var(--brand-800)` #142B31 (dark) |
| `--badge-primary-text` | through `--p-primary` → teal hsl values | `var(--brand-secondary)` → Brand-700 (light) / Brand-400 (dark) |
| `--badge-secondary-bg` | `var(--chips)` → page-bg (invisible, 1:1 contrast) | `var(--card2)` → Slate-100 (light) / Grey-800 (dark) |
| `--badge-secondary-text` | `var(--ink-secondary)` | `var(--ink-body)` |

**Fix:** update the four `--badge-*` token assignments in `globals.css` to match the kit values above.

---

## Button (Secondary)

Prod scope: `.prod .btn-secondary { … }`

| Property | State | Prod | Expected |
|---|---|---|---|
| `background` | Default | `transparent` | `var(--card)` — filled card-style |
| `border-color` | Default | `var(--p-secondary)` teal | `var(--btn-secondary-border)` → Slate-300 (light) / Grey-600 (dark) |
| `background` | Hover | `color-mix(--p-primary 5%, transparent)` | `var(--state-hover)` neutral |
| `border-color` | Hover | `var(--p-accent)` teal | `var(--btn-secondary-border-hover)` → Slate-400 (light) / Grey-500 (dark) |
| `color` | Hover | `var(--p-accent)` — text turns teal | `var(--ink-body)` — text stays neutral |

Tokens `--btn-secondary-border` and `--btn-secondary-border-hover` are already defined in `kit-theme.css`; prod CSS just hasn't adopted them yet.

---

## Input / Textarea

These two share the same gap pattern.

| Property | State | Prod | Expected |
|---|---|---|---|
| `border-color` | Hover | `.prod` explicitly resets to `var(--border)` (no lift) | `var(--border-hover)` — one step stronger |
| `border-color` | Focus | `var(--ink)` near-black (light) / `var(--p-accent)` teal (dark) | `var(--input-focus)` → Slate-600 #475569 (light) / Slate-500 (dark) |
| `border-color` | Error | `color-mix(--fb-red 30%, transparent)` alpha | `var(--input-error)` solid |
| `background` | Error | `color-mix(--fb-red 5%, transparent)` red tint added | not set — remove this rule |
| `background` | Disabled | alpha-based grey (via prod token remap) | `var(--state-disabled)` solid |
| `background` | Disabled (Textarea only) | `transparent` | `var(--state-disabled)` |
| `color` | Disabled (Textarea only) | `var(--ink-body)` | `var(--ink-inactive)` |
| `opacity` | Disabled (Textarea only) | `.5` | not set — use solid fill, no opacity |

**Fix:** remove the `.prod .field:hover` and `.prod .ta:hover` border-color overrides; remap focus and error border tokens; remove the red error-bg rule; fix disabled surface to solid `--state-disabled`.

---

## Switch

| Property | State | Prod | Expected |
|---|---|---|---|
| `background` (track off) | Default | `var(--switch-off-bg)` → `var(--bg)` page-bg — invisible | `var(--switch-off-bg)` → Slate-300 (light) / Grey-700 (dark) |
| `border` | Default | `1px solid var(--border)` added | none |
| `background` (track on) | On | `var(--p-accent)` | `var(--brand-primary)` |
| `border-color` | On | `var(--p-accent)` added | none |
| `background` (thumb) | Default | `var(--p-light)` grey | `var(--content-on-solid)` always white |
| `background` (thumb) | On | `var(--card)` theme-adaptive | `var(--content-on-solid)` always white |
| `background` (track on) | Hover | no change | `var(--brand-hover)` Brand-500 |
| Focus ring | Focus | suppressed | `0 0 0 2px var(--card), 0 0 0 4px var(--focus-ring)` |
| `::before` hit target | — | `display: none` | `inset: -12px -4px` (44×44px WCAG 2.5.5) |

**Fix:** remap `--switch-off-bg` in prod tokens to the correct step; remove the added border; update thumb to `--content-on-solid`; add hover + focus rules; restore the hit-target `::before`.

---

## Checkbox

| Property | State | Prod | Expected |
|---|---|---|---|
| `width` / `height` | Default | 20px | 18px (`1.125rem`) |
| `border-radius` | Default | 6px (`.375rem`) | 4px (`.25rem`) |
| `border` | Default | `1px solid var(--border)` | `1.5px solid var(--border-hover)` |
| `background` + `border-color` | Checked | `var(--p-accent)` | `var(--brand-primary)` |
| `border-color` | Hover (unchecked) | no change | `var(--ink-secondary)` |
| `background` | Hover (checked) | no change | `var(--brand-hover)` Brand-500 |
| Focus ring | Focus | suppressed | `0 0 0 2px var(--card), 0 0 0 4px var(--focus-ring)` |
| `opacity` | Disabled | `.5` | `var(--opacity-disabled)` = `.65` |
| `border-color` | Disabled | `var(--border)` (lighter) | no override — keeps `.cbx` base border `var(--border-hover)`; disabled conveyed via `opacity: .65` |

---

## Avatar

| Property | Prod | Expected |
|---|---|---|
| `.ava-init` `background` | `var(--bg)` page-bg — invisible | `var(--brand-primary)` Brand-600 (light) / Brand-500 (dark) |
| `.ava-init` `color` | `var(--ink-body)` | `var(--content-on-solid)` always white |

**Fix:** two-line CSS change — `background: var(--brand-primary); color: var(--content-on-solid)`.

---

## ProgressBar

Two sizes exist by design:

| Context | Selector | Height | Notes |
|---|---|---|---|
| Base component | `.progress` | `0.5rem` (8px) | Default — used on pages, modals, etc. |
| Sidebar token counter | `.sb-tok .progress` | `4px` | Context override — intentionally smaller |

Prod overrides the base to 4px via `.prod .progress { height: 4px }` — losing the distinction. Expected: base stays 8px; sidebar keeps its 4px context override.

| Property | Prod | Expected |
|---|---|---|
| Base `height` | 4px (prod flattens both sizes) | `0.5rem` 8px |
| Track `background` | `var(--bg)` page-bg | `var(--chips)` → Surface/Chips |
| Fill `background` | `var(--p-grad)` gradient | `var(--brand-primary)` (≈ same teal, rebinding only) |

---

## Toast

| Property | State | Prod | Expected |
|---|---|---|---|
| `width` | Default | fixed `240px` | fluid `min-width: 280px; max-width: 600px` |
| `background` | success | `var(--card)` plain | `var(--toast-bg-success)` = `color-mix(--fb-green 5%, var(--card))` (light) / 8% (dark) |
| `border-color` | success | `var(--border)` neutral | `var(--toast-border-success)` = `color-mix(--fb-green 30%, transparent)` |
| `background` | info | `var(--card)` plain | `var(--toast-bg-info)` = `color-mix(--brand-primary 5%/8%, var(--card))` |
| `border-color` | info | `var(--border)` | `var(--toast-border-info)` = `color-mix(--brand-primary 30%, transparent)` |
| `background` | warning | `var(--card)` plain | `var(--toast-bg-warning)` = `color-mix(--fb-attention 5%/8%, var(--card))` |
| `border-color` | warning | `var(--border)` | `var(--toast-border-warning)` = `color-mix(--fb-attention 30%, transparent)` |
| `background` | error | `var(--card)` plain | `var(--toast-bg-error)` = `color-mix(--fb-red-text 5%/8%, var(--card))` |
| `border-color` | error | `var(--border)` | `var(--toast-border-error)` = `color-mix(--fb-red-text 30%, transparent)` |

All `--toast-bg-*` and `--toast-border-*` tokens are already defined in `kit-theme.css` (5% tint light / 8% dark, 30% border). Prod CSS just hasn't adopted them.

---

## Priority order for prod implementation

1. **Switch** — accessibility: invisible off-track + suppressed focus ring + missing hit target
2. **Checkbox** — accessibility: suppressed focus ring + incorrect size/border
3. **Toast** — all variants look identical on prod (zero colour differentiation)
4. **Button Secondary** — teal→neutral restyle not shipped
5. **Input / Textarea** — focus border wrong colour; error state diff
6. **Badge** — invisible primary badge on dark
7. **Avatar** — invisible initials background
8. **ProgressBar** — prod flattens both sizes to 4px; base should be 8px; track + fill token rebinding
