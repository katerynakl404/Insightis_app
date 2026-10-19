# Card — current (prod)

Live baseline from `@insightis/ui` `Card/index.tsx` + sub-parts (CardHeader, CardTitle, CardDescription, CardContent, CardFooter).

Base: `flex flex-col gap-3`, `p-4` (16px), `transition-[border,shadow] duration-300`.
Rounded variants: `none` / `sm 2px` / `md 6px` / `lg 8px` (default) / `xl 12px`.
fullWidth: `true` → `w-full` / `false` → `inline-flex w-auto`.

## Variants
- **Outline** (default): `border border-border`, `shadow-sm`, text `content-body`; hover border → `primary`.
- **Secondary**: `bg-card border border-border`, `transition-colors`; **group-hover** bg → `hover` (`#E8F2F5` / dark `#142B31`), text → `content-secondary`. Note: hover is `group/card` scoped — triggered by parent's `:hover`, not the card itself.

## Sub-parts
- **CardHeader**: `flex flex-col space-y-1.5`.
- **CardTitle**: built on Typography, `font-semibold text-base text-content-primary tracking-tight`.
- **CardDescription**: `text-sm text-muted-foreground` (= `text-content-secondary`).
- **CardContent**: `text-content-body` (no padding — inherits Card's `p-4`).
- **CardFooter**: `flex items-center`.

## States
- Default (outline) — border `border` (`#F1F5F9` / dark `#2A2834`), text `content-body`.
- Hover (outline) — border `primary` (`#07807E` / dark `#148F8D`).
- Hover (secondary, via `group/card` parent) — bg `hover`, text `content-secondary`.
- No focus / pressed / disabled / selected states defined.
