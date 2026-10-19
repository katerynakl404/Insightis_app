# Separator — current (prod)

Live baseline from `@insightis/ui` `Separator/index.tsx`.

Built on Radix `@radix-ui/react-separator`. `shrink-0`.

## Variants (`variant`)
- **primary** — bg `primary` (`#07807E` / dark `#148F8D` — i.e. brand teal).
- **secondary** — bg `secondary` (`#066867` / dark `#2FA29B`).
- **border** (default) — bg `border` (`#F1F5F9` / dark `#2A2834`).

## Orientations (`orientation`)
- **horizontal** (default) — `h-px w-full` (1px full-width line).
- **vertical** — `h-full w-px`.

## States
- `decorative=true` (default) — Radix renders without semantic role (visual divider only).
- `decorative=false` — Radix renders with `role="separator"` and ARIA orientation.
- No interactive states — Separator has no hover / focus / disabled.
