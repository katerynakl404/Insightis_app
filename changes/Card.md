# Card — prod → expected

Source: `@insightis/ui` `Card/index.tsx` + sub-parts. Baseline: [`../current/Card.md`](../current/Card.md).

## Outline (default)
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `border` (`#F1F5F9` light / `#2A2834` dark), shadow-sm, text `content-body` | — | — no change (hex shift only → [colors](colors.md)) | `.card-c`: width `220px`, `display:flex; flex-direction:column`, gap `12px`, padding `16px`, radius `8px`, border `1px solid var(--border)`, bg `var(--card)`, text `var(--ink-body)`, `transition: border .3s, box-shadow .3s`. **No box-shadow on any state** (`.card-c` is a flat bordered surface — neither rest, hover, nor pressed sets a `box-shadow`; the `box-shadow` listed in the transition is unused). |
| Hover | border `primary` (`#07827F`) | — | border `var(--card-border-hover)` = `color-mix(in srgb, var(--brand-primary) 25%, transparent)` | `.card-c:hover, .card-c.s-hover` — soft brand-tinted alpha border (Chats Library hover recipe), not solid `--brand-primary`. Distinct from `--border-hover` (form-only) |
| Focus | ⚠ none defined | ⚠ state needed — to define | ⚠ state needed — to define | focusable card should expose `--shadow-focus` 2px on `:focus-visible` |
| Pressed *(new)* | ⚠ none defined | bg `color-mix(in srgb, Brand/Primary 4%, transparent)`, border `Brand/Primary` (40% mix), text `Text/Body` | bg `color-mix(in srgb, var(--brand-primary) 4%, transparent)`, border `var(--card-border-press)` = `color-mix(in srgb, var(--brand-primary) 40%, transparent)` | `.card-c.s-pressed, .card-c:active` — one step deeper than hover: brand-tinted bg (4%) + 40% brand border. Bg-only feedback, no inset shadow |
| Disabled | ⚠ none defined | ⚠ state needed — to define | ⚠ state needed — to define | bg `State/Disabled`, text `Text/Inactive` |

## Secondary
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | bg `card`, border `border`, text inherits | — | — no change | `.card-c.var-secondary`: bg `var(--card)`, border `1px solid var(--border)` |
| Group-hover | bg `hover` (`#E5F2F5` / dark `#142B31`), text `content-secondary` | — | `--state-hover` (`#E8F2F5` light / `#21212C` dark), text `--ink-secondary` | `.card-c.var-secondary.s-hover`: bg `var(--state-hover)`, text `var(--ink-secondary)` |
| Self-hover | ⚠ does not exist (only `group/card` parent) | ⚠ — to define | ⚠ — to define | useful when card itself is interactive — match `State/Hover` |
| Focus / Pressed / Disabled | ⚠ none | ⚠ — to define | ⚠ — to define | same gap as Outline |

## Radius scale (prod `radius` prop — full spec)

The prod `Card` exposes a `radius` prop; each option maps to a fixed `border-radius`. Default is `lg` = 8px (the value hard-coded on the kit's `.card-c`). To reproduce a non-default radius, override `border-radius` on `.card-c`:

| `radius` value | `border-radius` |
|---|---|
| `none` | `0` |
| `sm` | `2px` |
| `md` | `6px` |
| `lg` (default) | `8px` — the value on `.card-c` in `pages/kit-theme.css` |
| `xl` | `12px` |

> The kit's `.card-c` hard-codes the **default** (`lg` / 8px); the other four are prop options on the prod component, not separate CSS classes. `fullWidth`: `true` → `width:100%` (`w-full`); `false` → `width:220px` (the kit demo width, `inline-flex w-auto` in prod).

## Per-variant reproduction (each variant standalone)

| Variant | Selector | Rest (full spec) |
|---|---|---|
| **Outline** (default) | `.card-c` | `display:flex; flex-direction:column; gap:12px; padding:16px; border-radius:8px; border:1px solid var(--border); background:var(--card); color:var(--ink-body); transition:border .3s, box-shadow .3s; width:220px`; **no box-shadow on any state**. Hover (`.card-c:hover, .card-c.s-hover`) → `border-color:var(--card-border-hover)` (25% brand mix), bg unchanged. Pressed (`.card-c:active, .card-c.s-pressed`) → `border-color:var(--card-border-press)` (40% brand mix) + `background:color-mix(in srgb, var(--brand-primary) 4%, transparent)`. |
| **Secondary** | `.card-c.var-secondary` | Same box model as Outline; `background:var(--card); border:1px solid var(--border)`. Hover (`.var-secondary.s-hover`) → `background:var(--state-hover)` + `color:var(--ink-secondary)`. No own pressed/focus/disabled (see ⚠ gaps in tables above). |

## Sub-part typography & layout (exact CSS — for standalone reproduction)

These descendant rules are unchanged from prod (token-hex shifts only) but are required to rebuild the card:

| Sub-part | Selector | Full spec |
|---|---|---|
| Title | `.card-c .c-title` | `font-size:1rem; font-weight:600; color:var(--ink); letter-spacing:-.01em` |
| Description | `.card-c .c-desc` | `font-size:.875rem; color:var(--ink-secondary)` |
| Body | `.card-c .c-body` | `font-size:.875rem; color:var(--ink-body)` |
| Footer | `.card-c .c-foot` | `display:flex; align-items:center; gap:8px` |

> No explicit `line-height` is set on any sub-part — each inherits the document/page default. DOM order inside `.card-c` is free; the demo uses `.c-title` → `.c-desc` → `.c-body` (with optional `.c-foot`), separated by the parent's `gap:12px` (no per-element margins). No icon SVG rule is scoped to the card.

## No change (—)
Sub-parts (Header / Title / Description / Content / Footer), spacing scale, radius set, animation duration.

> Summary: the Default card is unchanged apart from inherited token-hex shifts via [`changes/colors.md`](colors.md). The interactive states do change: hover moves from prod's solid `--brand-primary` border to the soft `--card-border-hover` (25% brand mix, Chats Library recipe) and a new Pressed state (`--card-border-press` 40% mix + 4% brand bg) is added. The remaining gap is **state coverage** (focus, disabled, secondary self-hover) which the prod component does not define.
