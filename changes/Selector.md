# Selector — prod → expected

Replaces the native OS `<select>` with a branded custom trigger + `.menu`/`.mi` dropdown surface.
Shell inherits the same border/radius/bg/focus tokens as `Input` so it sits flush in any form layout.

| Part | Current (prod) | Expected | Specification |
|---|---|---|---|
| **Trigger shell** | Native `<select>` in `.field` wrapper — OS-styled, no custom hover/focus | `.sel-trig` — `border: 1px solid var(--border)`, `bg: var(--card)`, `h: 2.25rem` (36 px), `border-radius: .375rem` | Matches `Input` shell geometry so selectors and text inputs can sit side-by-side consistently |
| **Trigger padding** | Browser default (varies by OS) | `0 .75rem` (12 px left + right) | Symmetric; more generous than `Input`'s `0 .5rem` to visually balance the trailing chevron |
| **Chevron** | OS-native indicator | `14 × 14 px` SVG, `color: var(--ink-secondary)`, rotates 180° when open | Theme-aware; smooth `transform .15s` transition |
| **Placeholder text** | OS default | `color: var(--ink-inactive)` via `.sel-ph` | Matches `Input` placeholder token |
| **Selected value text** | OS default | `color: var(--ink)` via `.sel-val`, `flex:1`, ellipsis overflow | — |
| **Hover state** | OS default | `border-color: var(--border-hover)` | Matches `Input` hover |
| **Open / active state** | OS native dropdown popup | `border-color: var(--input-focus)` + chevron rotated 180° | Matches `Input` focus border; no outer ring on the trigger |
| **Focus ring** | None (native `<select>` focus is OS-styled) | `box-shadow: var(--shadow-focus-brand)` on `:focus-visible` | WCAG 2.4.7 — visible keyboard focus |
| **Dropdown surface** | OS-native list | `.menu` shell (`border-radius: 8 px`, `border: 1px solid var(--border)`, `bg: var(--card)`, standard shadow) + `.mi` items | Reuses kit `.menu`/`.mi` — same surface as Dropdown; positioned `2 px` below trigger via `top: calc(100% + 2px)` |
| **Dropdown items** | OS-native rows | `.mi` — `padding: 6 / 12 px`, `font-size: 14 px`, `color: var(--ink-body)`, hover `--state-hover` | Consistent with Dropdown component |
| **Disabled state** | `disabled` attr + OS styling | `.sel-trig[disabled].s-disabled` — `opacity: var(--opacity-disabled)`, `cursor: not-allowed` | Matches `Input` disabled token |
| **Size variants** | None | `.is-sm` 32 px · default 36 px · `.is-lg` 40 px · `.is-xl` 44 px | Mirrors `Input` size scale |

## open/close mechanism

`aria-expanded` on `.sel-trig` drives menu visibility via CSS adjacent-sibling rule:

```css
.sel-trig[aria-expanded="true"] + .sel-menu { display: block; }
```

JS sets `aria-expanded`; no extra class toggling. Click-outside closes via a document `click` listener.

## Token map

| Role | Token |
|---|---|
| Trigger border (rest) | `--border` |
| Trigger border (hover) | `--border-hover` |
| Trigger border (open) | `--input-focus` |
| Trigger bg | `--card` |
| Selected text | `--ink` |
| Placeholder text | `--ink-inactive` |
| Chevron colour | `--ink-secondary` |
| Focus ring | `--shadow-focus-brand` |
| Dropdown surface | `.menu` tokens (see Dropdown) |
| Menu item hover | `--state-hover` |
| Disabled opacity | `--opacity-disabled` |
