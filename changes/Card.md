# Card — prod → expected

Source: `@insightis/ui` `Card/index.tsx` + sub-parts. Baseline: [`../current/Card.md`](../current/Card.md).

## Outline (default)
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `border` (`#F1F5F9` light / `#2A2834` dark), shadow-sm, text `content-body` | — | — no change (hex shift only → [colors](colors.md)) | radius `lg 8px`, `p-4`, gap 12px |
| Hover | border `primary` (`#07827F`) | — | border `--brand-primary` (`#07807E`) | hex shift only |
| Focus | ⚠ none defined | ⚠ state needed — to define | ⚠ state needed — to define | focusable card should expose `--focus-ring-brand` 2px on `:focus-visible` |
| Pressed *(new)* | ⚠ none defined | bg `color-mix(in srgb, Brand/Primary 4%, transparent)`, border `Brand/Primary`, text `Text/Body` | — | Defined in v1.0; no change this iteration |
| Disabled | ⚠ none defined | ⚠ state needed — to define | ⚠ state needed — to define | bg `State/Disabled`, text `Text/Inactive` |

## Secondary
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | bg `card`, border `border`, text inherits | — | — no change | — |
| Group-hover | bg `hover` (`#E5F2F5` / dark `#142B31`), text `content-secondary` | — | `--state-hover` (`#E8F2F5` light / `#21212C` dark), text `--ink-secondary` | hex shift only |
| Self-hover | ⚠ does not exist (only `group/card` parent) | ⚠ — to define | ⚠ — to define | useful when card itself is interactive — match `State/Hover` |
| Focus / Pressed / Disabled | ⚠ none | ⚠ — to define | ⚠ — to define | same gap as Outline |

## No change (—)
Sub-parts (Header / Title / Description / Content / Footer), spacing scale, radius set, animation duration.

> Summary: Card itself has **no component-level change** — only inherited token-hex shifts via [`changes/colors.md`](colors.md). The pending work is purely **state coverage** (focus, pressed, disabled, self-hover) which the prod component does not define.
