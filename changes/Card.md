# Card — prod → expected

Source: `@insightis/ui` `Card/index.tsx` + sub-parts. Baseline: [`../current/Card.md`](../current/Card.md).

## Outline (default)
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | border `border`, shadow-sm, text `content-body` | — no change (hex shift → [colors](colors.md)) | radius `lg 8px`, `p-4`, gap 12px |
| Hover | border `primary` | — no change (hex → [colors](colors.md)) | border `Brand/Primary` (was `#07827F`, became `#07807E`) |
| Focus | ⚠ none defined | ⚠ state needed — to define | a focusable card should expose `--focus-ring-brand` 2px on `:focus-visible` |
| Pressed *(new this iteration)* | ⚠ none defined | **defined** — bg `color-mix(in srgb, Brand/Primary 4%, transparent)`, border `Brand/Primary`, text `Text/Body` | One step deeper than hover. Bg-shift-only feedback (no inset shadow, no transform) — aligns with the chat-row pressed direction and the wider press-feedback convention documented in [`changes/colors.md`](colors.md#layer-2--semantic-tokens-light--dark). Applies whenever Card carries `onClick`. |
| Disabled | ⚠ none defined | ⚠ state needed — to define | bg `State/Disabled`, text `Text/Inactive` |

## Secondary
| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | bg `card`, border `border`, text inherits | — no change | — |
| Group-hover | bg `hover`, text `content-secondary` | — no change (hex → [colors](colors.md)) | `hover` is `Surface/Hover` (was `#E5F2F5`, became `#E8F2F5`) |
| Self-hover | ⚠ does not exist (only `group/card` parent triggers it) | ⚠ — to define | useful when the card itself is interactive — recommend matching `State/Hover` |
| Focus / Pressed / Disabled | ⚠ none | ⚠ — to define | same gap as Outline |

## No change (—)
Sub-parts (Header / Title / Description / Content / Footer), spacing scale, radius set, animation duration.

> Summary: Card itself has **no component-level change** — only inherited token-hex shifts via [`changes/colors.md`](colors.md). The pending work is purely **state coverage** (focus, pressed, disabled, self-hover) which the prod component does not define.
