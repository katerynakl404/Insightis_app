# Separator — prod → expected

Source: `@insightis/ui` `Separator/index.tsx`. Baseline: [`../current/Separator.md`](../current/Separator.md).

**No component-level change (—).** Separator is a Radix re-export with three variants — only the underlying hex of each token shifts (documented in [`colors`](colors.md)).

| Variant | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| **border** (default) | bg `border` (`#F0F5FA` / dark `#2A2834`) | — no change (hex → [colors](colors.md)) | `border` → `#F1F5F9` / `#2A2834` |
| **primary** | bg `primary` (`#07827F` / dark `#0E353B`) | — no change (hex → [colors](colors.md)) | `primary` → `#07807E` / `#148F8D` |
| **secondary** | bg `secondary` (`#0FA8AB` / dark `#0F8A8A`) | — no change (hex → [colors](colors.md)) | `secondary` → `#066867` / `#2FA29B` |

## Per-variant colour token (each variant standalone)

`.sep` is `display:block`. The variant sets only the `background` (the line colour):

| Variant | Selector | `background` (colour token) | Resolved hex (light / dark) |
|---|---|---|---|
| **border** (default) | `.sep.var-border` | `var(--border)` | `#F1F5F9` / `#2A2834` |
| **primary** | `.sep.var-primary` | `var(--brand-primary)` | `#07807E` / `#148F8D` |
| **secondary** | `.sep.var-secondary` | `var(--brand-secondary)` | `#066867` / `#2FA29B` |

## Per-orientation dimensions (each orientation standalone)

Orientation sets the line's thickness/length; both pair with any variant colour above:

| Orientation | Selector | Dimensions |
|---|---|---|
| **horizontal** (h-px) | `.sep.h` | `height:1px; width:160px` (kit demo width; prod uses `w-full`). Stays 1px tall. |
| **vertical** (w-px) | `.sep.v` | `height:40px; width:1px; display:inline-block; vertical-align:middle` (kit demo height; prod uses `h-full`). Stays 1px wide. |

> The kit fixes demo length (`160px` / `40px`); in prod the cross-axis is fluid (`w-full` horizontal / `h-full` vertical) — the 1px line axis is the invariant.

## No change (—)
Orientation grammar (`h-px w-full` for horizontal, `h-full w-px` for vertical), Radix `decorative` default `true`, `shrink-0`.

## ⚠ Best-practice — to consider
- **Spacing prop** — currently the consumer adds `my-N` / `mx-N` manually. A `gap` or `spacing` variant would standardize divider rhythms.
- **Variant `muted`** — between `border` (very subtle) and `primary` (brand-loud). Optional.

> Summary: no component-level work needed; the line just gets thinner in light mode (1px → 1px, hex shift only).
