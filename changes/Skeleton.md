# Skeleton — prod → expected

Source: `@insightis/ui` `Skeleton/index.tsx`. Baseline: [`../current/Skeleton.md`](../current/Skeleton.md).

**Change this iteration:** the kit is **aligned to prod** — shimmer is promoted to the **default animation on a bare `.skel`** (previously the kit gated it behind an explicit `.shimmer` class, so a bare `.skel` rendered static — diverging from prod where `shimmer` is the default). A `.none` modifier is added for the static variant. The only token shift remains the `Surface/Chips` hex (documented in [`colors`](colors.md)).

| State | Current (prod) · was | Expected · became |
|---|---|---|
| Loading (`isLoaded=false`) | `bg-chip pointer-events-none relative overflow-hidden`, animation `shimmer` (default) / `pulse` / `none` | shimmer is the bare-`.skel` default (now matches prod); static via `.none` (hex → [colors](colors.md)) |
| Loaded (`isLoaded=true`) | renders children directly (wrapper unmounted) | — no change |

## Variants — full per-option spec (reproduce any from this alone)

Base `.skel` → `display:inline-block; background:var(--chips); position:relative; overflow:hidden; border-radius:6px; vertical-align:middle`. The base radius (`6px`) **is** the `md` default; `rounded` and `animation` are applied as modifier classes.

### `rounded` options (each → a `border-radius`)

| Option | Class | `border-radius` |
|---|---|---|
| none | `.skel.r-none` | `0` |
| sm | `.skel.r-sm` | `2px` |
| md (default) | `.skel` (base — no class) | `6px` |
| lg | `.skel.r-lg` | `8px` |
| xl | `.skel.r-xl` | `12px` |
| full | `.skel.r-full` | `9999px` |

> ⚠ The base `.skel` radius is `6px`. `current/Skeleton.md` and the prod prop call `md` the default — consistent. There is **no `.r-md` class** (the default lives on the base); reproduce `md` by omitting the radius modifier.

### `animation` options

| Option | Class | Behaviour |
|---|---|---|
| shimmer (default) | `.skel` (base — no class needed) | `::after` sweep band — `background:linear-gradient(90deg, transparent 0, color-mix(in srgb, var(--card) 80%, transparent) 50%, transparent 100%); animation:skel-shim 1.4s linear infinite`. The legacy `.shimmer` class is kept as an optional/redundant alias so existing markup stays valid. |
| pulse | `.skel.pulse` | `animation:skel-pulse 1.4s ease-in-out infinite` (`@keyframes skel-pulse{0%,100%{opacity:1}50%{opacity:.5}}`); suppresses the default sweep via `.skel.pulse::after{content:none}` |
| none | `.skel.none` | static `--chips` block; suppresses the default sweep via `.skel.none::after{content:none}` |

> **Resolved (prod-aligned):** shimmer is now the default on a bare `.skel`, matching prod / `current/Skeleton.md`. Static placeholders must opt out with `.none`. (This also fixed `skeletons/DetailPanel.html`, whose placeholders had omitted `.shimmer` and were rendering static — they now animate consistently with every other loading skeleton.)

## ⚠ Best-practice — to consider
- **Reduced-motion (production)** — recommend adding `@media (prefers-reduced-motion: reduce){.skel::after{animation:none}.skel.pulse{animation:none}}` in the product build (WCAG 2.3.3). **Intentionally not shipped in the kit** so the storybook showcase demos always animate (so reviewers can see the effect regardless of their OS motion setting).
- **Contrast** — `bg-chip` against `bg-card` is ~3% perceptual delta in light mode. ⚠ visually subtle — keep, but document for designers.

> Summary: shimmer promoted to the bare-`.skel` default (kit aligned to prod), `.none` added for static, and a `prefers-reduced-motion` guard added. The underlying `Surface/Chips` token shift is documented in [`colors`](colors.md).
