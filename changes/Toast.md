# Toast — prod → expected

Source: `@insightis/ui` `Toast/` (Toaster, ToastMessage, `toast()`). Baseline: [`../current/Toast.md`](../current/Toast.md).

## ToastMessage container

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Width | `width:240px` (fixed) | `min-width:280px; max-width:600px; width:100%` | Fluid to 600 px; min prevents collapse on narrow containers |
| Background | `background:var(--card)` — solid, same for all variants | Variant-tinted: `var(--toast-bg-*)` — **5% colour mix over `--card`** (light) / 8% on dark | More transparent on white backgrounds; dark retains 8% for parity |
| Border | `1px solid var(--border)` — neutral, same for all variants | Variant-tinted: `var(--toast-border-*)` — 30% colour mix over transparent | Pairs with bg tint; stronger than bg tint to stay visible on tinted surface |
| Closing | Progress bar drains; `onClose` runs at end | — | Duration default 4000ms unchanged |

## Reproduction values (kit-theme.css ~1667–1677)

| Part | Selector | Values |
|---|---|---|
| Container | `.toast` | `min-width:280px; max-width:600px; border-radius:8px; padding:16px; background:var(--card); border:1px solid var(--border); box-shadow:0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); position:relative; overflow:hidden; display:flex; flex-direction:column; gap:12px` |
| Content row | `.toast .toast-row` | `display:flex; align-items:flex-start; gap:12px` |
| Icon | `.toast .toast-ic` | `width:20px; height:20px; flex:none; margin-top:1px; stroke-linecap:round; stroke-linejoin:round` |
| Body | `.toast .toast-body` | `flex:1; display:flex; flex-direction:column; gap:2px` |
| Title | `.toast .toast-msg` | `font-size:.875rem; font-weight:500; color:var(--ink); line-height:1.4` |
| Description | `.toast .toast-desc` | `font-size:.75rem; font-weight:400; color:var(--ink-secondary); line-height:1.4` |
| Close button | `.toast .toast-x` | `width:24px; height:24px; flex:none; border-radius:4px` (colour/hover/pressed/focus inherit from `.iconbtn.iconbtn-tertiary`) |
| Close icon | `.toast .toast-x svg` | `width:14px; height:14px` |
| Progress bar | `.toast .toast-prog` | `position:absolute; left:0; right:0; bottom:0; height:3px; background:transparent` |
| Progress fill | `.toast .toast-prog>span` | `display:block; height:100%` (variant sets the colour + `width:60%`) |

Note: the doc table above labels this surface "ToastMessage container"; in the shipped kit those container values live on `.toast` (width / bg / border per the table at the top of this doc).

## Variants — icon + background

| Variant | Current icon | Expected icon | Background / border |
|---|---|---|---|
| **success** | `Check` — bare diagonal checkmark | `CheckCircle2` — circle + checkmark | `--toast-bg-success` / `--toast-border-success` |
| **info** (default) | `Info` — circle with i | `Info` — unchanged | `--toast-bg-info` / `--toast-border-info` |
| **warning** | `AlertTriangle` — triangle with ! | `AlertTriangle` — unchanged | `--toast-bg-warning` / `--toast-border-warning` |
| **error** | `X` — bare cross (same shape as close button) | `XCircle` — circle + cross (distinguishable from close) | `--toast-bg-error` / `--toast-border-error` |

Icon colors (`--fb-green`, `--brand-primary`, `--fb-attention`, `--fb-red-text`) and progress bar colors unchanged.

### Per-variant reproduction (each variant standalone — bg / border / icon / progress)

Every variant sets four things off one source colour. Resolved selectors from `pages/kit-theme.css` (~1678–1685):

| Variant | Source colour | Background (`.toast.var-*`) | Border (`.toast.var-*`) | Icon (`.toast-ic`) + progress fill (`.toast-prog>span`) |
|---|---|---|---|---|
| **success** | `--fb-green` | `var(--toast-bg-success)` = `color-mix(--fb-green 5%, --card)` light / `8%` dark | `var(--toast-border-success)` = `color-mix(--fb-green 30%, transparent)` | `color:var(--fb-green)` · progress `background:var(--fb-green); width:60%` |
| **info** (default) | `--brand-primary` | `var(--toast-bg-info)` = `color-mix(--brand-primary 5%, --card)` light / `8%` dark | `var(--toast-border-info)` = `color-mix(--brand-primary 30%, transparent)` | `color:var(--brand-primary)` · progress `background:var(--brand-primary); width:60%` |
| **warning** | `--fb-attention` | `var(--toast-bg-warning)` = `color-mix(--fb-attention 5%, --card)` light / `8%` dark | `var(--toast-border-warning)` = `color-mix(--fb-attention 30%, transparent)` | `color:var(--fb-attention)` · progress `background:var(--fb-attention); width:60%` |
| **error** | `--fb-red-text` | `var(--toast-bg-error)` = `color-mix(--fb-red-text 5%, --card)` light / `8%` dark | `var(--toast-border-error)` = `color-mix(--fb-red-text 30%, transparent)` | `color:var(--fb-red-text)` · progress `background:var(--fb-red-text); width:60%` |

All four variants share the identical container box model (radius 8px, padding 16px, gap 12px, icon 20px, close 24px, progress 3px — see Reproduction values above); only the source colour and resolved bg/border/icon/progress differ.

## Text structure

| Part | Current (prod) | Expected | Specification |
|---|---|---|---|
| Message container | `<span class="toast-msg">` with `flex:1` | `<div class="toast-body">` takes `flex:1`; wraps title + description | Body is always present; description is optional |
| Title | `<span class="toast-msg">` — `.875rem 500 --ink` | `<span class="toast-msg">` — unchanged spec | Always present |
| Description | — did not exist | `<span class="toast-desc">` — `.75rem 400 --ink-secondary` | Optional; omit when no secondary context needed |

## Markup contract

```html
<!-- new structure -->
<div class="toast-row">
  <svg class="toast-ic">…</svg>
  <div class="toast-body">
    <span class="toast-msg">Title text</span>
    <span class="toast-desc">Optional description</span>  <!-- omit if unused -->
  </div>
  <button class="iconbtn iconbtn-tertiary toast-x" aria-label="Close">…</button>
</div>
```

## Token map

| Token | Value | Layer |
|---|---|---|
| `--toast-bg-success` | `color-mix(in srgb, var(--fb-green) 5%, var(--card))` light / `8%` dark | Component-scoped |
| `--toast-bg-info` | `color-mix(in srgb, var(--brand-primary) 5%, var(--card))` light / `8%` dark | Component-scoped |
| `--toast-bg-warning` | `color-mix(in srgb, var(--fb-attention) 5%, var(--card))` light / `8%` dark | Component-scoped |
| `--toast-bg-error` | `color-mix(in srgb, var(--fb-red-text) 5%, var(--card))` light / `8%` dark | Component-scoped |
| `--toast-border-success` | `color-mix(in srgb, var(--fb-green) 30%, transparent)` | Component-scoped |
| `--toast-border-info` | `color-mix(in srgb, var(--brand-primary) 30%, transparent)` | Component-scoped |
| `--toast-border-warning` | `color-mix(in srgb, var(--fb-attention) 30%, transparent)` | Component-scoped |
| `--toast-border-error` | `color-mix(in srgb, var(--fb-red-text) 30%, transparent)` | Component-scoped |

## Accessibility self-check

| Check | Result |
|---|---|
| Title contrast (`--ink` on tinted bg) | PASS — Slate-900 / Grey-50 vs 8% tint over Card clears ≥ 7:1 in both themes |
| Description contrast (`--ink-secondary` on tinted bg) | PASS — Slate-550 on light tinted surface ≈ 5.1:1; Grey-300 on dark tinted surface ≈ 7.8:1 |
| Icon contrast vs tinted bg | PASS — all `--fb-*` and `--brand-primary` tokens ≥ 3:1 against their 8% tinted surface |
| Status not conveyed by colour alone | PASS — icon shape (circle-check / circle-i / triangle / circle-x) differentiates variants; progress bar supplementary |
| Close button | PASS — `.iconbtn.iconbtn-tertiary` hover / focus-visible / pressed states unchanged |

## ⚠ Best-practice states — still to define

- **Hover** — pause progress bar countdown.
- **Focus-visible** — `--focus-ring-brand` around container when keyboard-focused.
- **`role="status"` / `role="alert"`** — success/info → `status` (polite); error/warning → `alert` (assertive). Verify Toaster wiring.
- **Stacking** — focus order when multiple toasts stack (Toaster's responsibility; document).
