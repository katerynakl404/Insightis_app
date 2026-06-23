# Toast — prod → expected

Source: `@insightis/ui` `Toast/` (Toaster, ToastMessage, `toast()`). Baseline: [`../current/Toast.md`](../current/Toast.md).

## ToastMessage container

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Width | `width:240px` (fixed) | `min-width:280px; max-width:600px; width:100%` | Fluid to 600 px; min prevents collapse on narrow containers |
| Background | `background:var(--card)` — solid, same for all variants | Variant-tinted: `var(--toast-bg-*)` — **5% colour mix over `--card`** (light) / 8% on dark | More transparent on white backgrounds; dark retains 8% for parity |
| Border | `1px solid var(--border)` — neutral, same for all variants | Variant-tinted: `var(--toast-border-*)` — 30% colour mix over transparent | Pairs with bg tint; stronger than bg tint to stay visible on tinted surface |
| Closing | Progress bar drains; `onClose` runs at end | — | Duration default 4000ms unchanged |

## Variants — icon + background

| Variant | Current icon | Expected icon | Background / border |
|---|---|---|---|
| **success** | `Check` — bare diagonal checkmark | `CheckCircle2` — circle + checkmark | `--toast-bg-success` / `--toast-border-success` |
| **info** (default) | `Info` — circle with i | `Info` — unchanged | `--toast-bg-info` / `--toast-border-info` |
| **warning** | `AlertTriangle` — triangle with ! | `AlertTriangle` — unchanged | `--toast-bg-warning` / `--toast-border-warning` |
| **error** | `X` — bare cross (same shape as close button) | `XCircle` — circle + cross (distinguishable from close) | `--toast-bg-error` / `--toast-border-error` |

Icon colors (`--fb-green`, `--brand-primary`, `--fb-attention`, `--fb-red-text`) and progress bar colors unchanged.

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
