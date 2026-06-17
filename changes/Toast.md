# Toast — prod → expected

Source: `@insightis/ui` `Toast/` (Toaster, ToastMessage, `toast()`). Baseline: [`../current/Toast.md`](../current/Toast.md).

## ToastMessage container
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | `rounded-lg border border-border p-4 bg-card shadow-lg`, `flex flex-col gap-3`, `overflow-hidden` | — no change (hex → [colors](colors.md)) | radius `lg 8px` |
| Closing | progress bar drains; `onClose` runs at the end | — no change | duration default 4000ms |

## Variants (icon + progress color)
| Variant | Icon | Icon color · was | Progress · was | Expected · became |
|---|---|---|---|---|
| **success** | `Check` | `text-green` (`#0FB57B` / dark `#5BD13A`) | `bg-green` | — no change (hex → [colors](colors.md)); `Feedback/Green` → `#009966` / `#03AF76` |
| **info** (default) | `Info` | `text-accent` (`#07827F` / dark `#0EC5B7`) | `bg-accent` | — no change (hex → [colors](colors.md)); `accent` aligns with new `Brand/Primary` `#07807E` / `#148F8D` |
| **warning** | `TriangleAlert` | `text-attention` (`#FF6900`) | `bg-attention` | — no change |
| **error** | `X` | `text-red` (`#C10007` / dark `#7D1B1B`) | `bg-red` | — no change (hex → [colors](colors.md)); `Feedback/Red` → `#B91C1C` / `#EF4444` |

## Sub-parts
| Part | Current (prod) · was | Expected · became |
|---|---|---|
| Icon | `mb-auto size-5 shrink-0` + variant text-color | — no change |
| Message (Typography) | `weight=medium max-w-60 text-content-primary` | — no change (hex → [colors](colors.md)) |
| Close | `IconButton variant="transparent" size="sm" text-content-body aria-label="Close"` | — no change. ⚠ this iteration the kit's Current preview was rebuilt to actually reflect prod: the bespoke `.toast-x` element now carries `iconbtn iconbtn-tertiary` (the renewed equivalent of "IconButton transparent") and the `.toast .toast-x:hover{color:var(--brand-primary)}` rule (wrong direction — colour-shift instead of brand-tinted bg) was removed. |
| Action | `Button variant="outline" size="xs"` | — no change |
| Progress | bottom strip, variant `bg-*` color | — no change |

## ⚠ Best-practice states — to define
- **Hover** — pause progress bar countdown.
- **Focus-visible** — when keyboard-focused (e.g. via skip-link), draw `--focus-ring-brand` around the toast.
- **`role="status"` / `role="alert"`** — success/info should be `status` (polite), error/warning should be `alert` (assertive). Verify Toaster wiring; document.
- **Stacking** — when multiple toasts stack, the focus order needs to be deterministic (Toaster's job; document).

## No change (—)
Layout grammar, variant icon set, default duration (`4000ms`), default position (`top-right`), close button behavior, optional action button shape.
