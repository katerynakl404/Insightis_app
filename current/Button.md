# Button — current (prod)

Live baseline from `@insightis/ui` `Button/index.tsx` + `globals.css`.

Base: `inline-flex`, gap 6px (`gap-1.5`), `font-medium`, radius `md` (default), `transition-all`.
Sizes (height / px): xs 28 / sm 32 / md 36 (default) / lg 40 / xl 44, padding-x 10px (`px-2.5`).
Focus: `ring-2 ring-ring ring-offset-2`.

## Primary
- Default: `border-gradient-inner-accent` → fill **accent** `hsl(179 94% 26%)`, text = `background`, light top-border overlay.
- Hover: `::before` crossfades to **primary→secondary** gradient (`primary-button-gradient-hover`).
- Pressed: `::after` pressed gradient + `shadow-button-press` (inset).
- Disabled: `border-gradient-inner-border`, text `content-light`.

## Secondary
- Default: border `secondary` `hsl(193 85% 35%)`, text `content-body`, icon `secondary`.
- Hover/Active: border `accent`, bg `primary/5`, icon `accent`; active adds `shadow-button-press`.
- Disabled: border + text `content-light`.

## Outline
- Default: border `border`, bg `card`, text `content-body`.
- Hover/Active: text `accent`; active border `accent` + inset shadow.
- Disabled: text `content-secondary`.

## Destructive
- `border-gradient-inner-red` → fill **red** `hsl(357 100% 38%)` (dark `hsl(358 100% 66%)`), text `background`.

## Transparent
- No padding/border, bg transparent, text `content-body`.
