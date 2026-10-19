# Toast — current (prod)

Live baseline from `@insightis/ui` `Toast/` (Toaster, ToastMessage, `toast()` API).

## ToastMessage spec
- Container: `relative flex w-full flex-col gap-3 overflow-hidden rounded-lg border border-border p-4 bg-card shadow-lg`.
- Inner row: `flex flex-1 items-start justify-between gap-3`.
- Icon: `mb-auto size-5 shrink-0` (color per variant — see below).
- Message: Typography `span weight=medium`, `max-w-60 text-content-primary`.
- Close (optional): `IconButton variant="transparent" size="sm"`, `mt-0.5 text-content-body`, `aria-label="Close"`.
- Action (optional): `Button variant="outline" size="xs"`.
- Progress bar (when `duration` is finite): `ToastProgress` bottom strip, color per variant.

## Variants (`variant`)
| Variant | Icon | Icon color | Progress |
|---|---|---|---|
| **success** | `Check` | `text-green` | `bg-green` |
| **info** (default) | `Info` | `text-accent` | `bg-accent` |
| **warning** | `TriangleAlert` | `text-attention` | `bg-attention` |
| **error** | `X` | `text-red` | `bg-red` |

## Defaults
- `TOAST_DEFAULT_DURATION` = `4000ms`.
- `TOAST_DEFAULT_POSITION` = `'top-right'`.

## States
- **Default** — visible, progress animating from full → empty over `duration`.
- **With action** — outline Button below message; clicking runs `action.onClick` then `onClose`.
- **Closing** — `onClose` invoked (manual close button or progress complete).
- No hover / focus / disabled defined on the surface — close button inherits IconButton transparent states.
