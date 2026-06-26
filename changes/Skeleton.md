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
| shimmer (default) | `.skel` (base — no class needed) | `.skel::after{content:""; position:absolute; inset:0; background:linear-gradient(90deg, transparent 0, color-mix(in srgb, var(--card) 80%, transparent) 50%, transparent 100%); animation:skel-shim 1.4s linear infinite}` where `@keyframes skel-shim{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`. ⚠ There is **no `.shimmer` CSS rule** — the legacy `.shimmer` class seen in some storybook markup is an inert no-op (the sweep comes from the base `.skel::after`); it stays valid only because it matches nothing. |
| pulse | `.skel.pulse` | `.skel.pulse{animation:skel-pulse 1.4s ease-in-out infinite}` with `@keyframes skel-pulse{0%,100%{opacity:1}50%{opacity:.5}}`; suppresses the default sweep via `.skel.pulse::after{content:none}` |
| none | `.skel.none` | static `--chips` block; suppresses the default sweep via `.skel.none::after{content:none}` |

> Note: the sweep-suppressors are authored as one shared rule — `.skel.pulse::after,.skel.none::after{content:none}`.

## Markup & loading-state toggle (reproduce the kit demo plumbing)

A skeleton element is any inline element carrying `.skel` (plus optional radius / animation modifiers); **dimensions are set inline** per use (`style="width:…;height:…"`) — the base class fixes no width/height. Example: `<span class="skel" style="width:120px;height:14px"></span>`.

The kit demonstrates loading state via a global toggle (driven by the topbar SegmentedControl that flips `html.skel-on`). Each swappable region carries two siblings — `.sk-loaded` (the real content) and `.sk-skel` (its `.skel` placeholder):

```css
html.skel-on .sk-loaded{display:none}
html.skel-on .sk-skel{display:block}
```

When `html.skel-on` is absent, real content shows and placeholders are hidden (their default `display` lives elsewhere); when present, content hides and placeholders render. This mirrors the prod behaviour where `isLoaded=false` swaps children for the placeholder block.

> **Resolved (prod-aligned):** shimmer is now the default on a bare `.skel`, matching prod / `current/Skeleton.md`. Static placeholders must opt out with `.none`. (This also fixed `skeletons/DetailPanel.html`, whose placeholders had omitted `.shimmer` and were rendering static — they now animate consistently with every other loading skeleton.)

## ⚠ Best-practice — to consider
- **Reduced-motion (production)** — recommend adding `@media (prefers-reduced-motion: reduce){.skel::after{animation:none}.skel.pulse{animation:none}}` in the product build (WCAG 2.3.3). **Intentionally not shipped in the kit** so the storybook showcase demos always animate (so reviewers can see the effect regardless of their OS motion setting).
- **Contrast** — `bg-chip` against `bg-card` is ~3% perceptual delta in light mode. ⚠ visually subtle — keep, but document for designers.

> Summary: shimmer promoted to the bare-`.skel` default (kit aligned to prod), `.none` added for static, and a `prefers-reduced-motion` guard added. The underlying `Surface/Chips` token shift is documented in [`colors`](colors.md).
