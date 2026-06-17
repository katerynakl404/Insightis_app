# Separator — prod → expected

Source: `@insightis/ui` `Separator/index.tsx`. Baseline: [`../current/Separator.md`](../current/Separator.md).

**No component-level change (—).** Separator is a Radix re-export with three variants — only the underlying hex of each token shifts (documented in [`colors`](colors.md)).

| Variant | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| **border** (default) | bg `border` (`#F0F5FA` / dark `#2A2834`) | — no change (hex → [colors](colors.md)) | `border` → `#F1F5F9` / `#2A2834` |
| **primary** | bg `primary` (`#07827F` / dark `#0E353B`) | — no change (hex → [colors](colors.md)) | `primary` → `#07807E` / `#148F8D` |
| **secondary** | bg `secondary` (`#0FA8AB` / dark `#0F8A8A`) | — no change (hex → [colors](colors.md)) | `secondary` → `#066867` / `#2FA29B` |

## No change (—)
Orientation grammar (`h-px w-full` for horizontal, `h-full w-px` for vertical), Radix `decorative` default `true`, `shrink-0`.

## ⚠ Best-practice — to consider
- **Spacing prop** — currently the consumer adds `my-N` / `mx-N` manually. A `gap` or `spacing` variant would standardize divider rhythms.
- **Variant `muted`** — between `border` (very subtle) and `primary` (brand-loud). Optional.

> Summary: no component-level work needed; the line just gets thinner in light mode (1px → 1px, hex shift only).
