# Selector — prod → expected

Replaces the native OS `<select>` with a branded custom trigger + `.menu`/`.mi` dropdown surface.
Shell inherits the same border/radius/bg/focus tokens as `Input` so it sits flush in any form layout.

## DOM / markup structure

```html
<div class="sel-wrap">
  <span class="sel-lbl">Connector</span>                          <!-- optional label above -->
  <button class="sel-trig" type="button" aria-haspopup="listbox" aria-expanded="false">
    <span class="sel-val">Snowflake</span>                       <!-- or .sel-ph for placeholder -->
    <svg class="sel-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>                        <!-- down-chevron -->
    </svg>
  </button>
  <div class="sel-menu menu" role="listbox">
    <div class="mi" role="option">All sources</div>
    <div class="mi" role="option">Snowflake</div>
  </div>
</div>
```

- **`.sel-wrap`** — `display: flex; flex-direction: column; gap: 4px; width: 240px; position: relative`. The `position: relative` is the positioning context for the absolutely-positioned `.sel-menu`; `gap: 4px` separates label from trigger.
- **`.sel-lbl`** — optional label above the trigger: `font-size: .75rem` (12 px), `font-weight: 500`, `color: var(--ink-secondary)`.
- The trigger is a `<button type="button">` (not a native `<select>`), with `aria-haspopup="listbox"` and `aria-expanded`. Selected value lives in a `.sel-val` span (or `.sel-ph` when no value chosen). The chevron is a 24×24-viewBox inline SVG with a single `<polyline points="6 9 12 15 18 9">`.
- The dropdown is a sibling `.sel-menu.menu` with `role="listbox"`; each option is a `.mi` with `role="option"` (reuses Dropdown's `.menu`/`.mi`).

| Part | Current (prod) | Expected | Specification |
|---|---|---|---|
| **Trigger shell** | Native `<select>` in `.field` wrapper — OS-styled, no custom hover/focus | `.sel-trig` — `display: flex; align-items: center`, `gap: .375rem` (6 px), `border: 1px solid var(--border)`, `bg: var(--card)`, `h: 2.25rem` (36 px), `border-radius: .375rem` (6 px), `width: 100%`, `text-align: left`, `cursor: pointer`, `font-family: inherit`, `transition: border-color .12s` | Matches `Input` shell geometry so selectors and text inputs can sit side-by-side consistently |
| **Trigger typography** | OS default | `font-size: .875rem` (14 px), `color: var(--ink)` | Same body size as `Input` text |
| **Trigger padding** | Browser default (varies by OS) | `0 .75rem` (12 px left + right) | Symmetric, and **identical to `Input`, `TextArea` and `InputGroup`** — every text control shares one left rail, so a form reads as one column. 12 px also matches `.mi`'s horizontal padding, so the selected value sits exactly above the option labels when the menu opens (at 8 px the text jogged 4 px on open/close). Confirmed 2026-09-02. |
| **Chevron** | OS-native indicator | `16 × 16 px` SVG (`.sel-chev`), `color: var(--ink-secondary)`, `flex: none`, rotates 180° when open (`transform: rotate(180deg)` via `[aria-expanded="true"] .sel-chev` / `.s-open .sel-chev`) | Theme-aware; smooth `transition: transform .15s` |
| **Placeholder text** | OS default | `color: var(--ink-inactive)` via `.sel-ph` | Matches `Input` placeholder token |
| **Selected value text** | OS default | `color: var(--ink)` via `.sel-val`, `flex:1`, ellipsis overflow | — |
| **Hover state** | OS default | `border-color: var(--border-hover)` | Matches `Input` hover |
| **Open / active state** | OS native dropdown popup | `border-color: var(--input-focus)` + chevron rotated 180° | Matches `Input` focus border; no outer ring on the trigger |
| **Focus ring** | None (native `<select>` focus is OS-styled) | `box-shadow: var(--shadow-focus)` on `:focus-visible` | WCAG 2.4.7 — visible keyboard focus |
| **Dropdown surface** | OS-native list | `.sel-menu.menu` shell (`border-radius: 8 px`, `border: 1px solid var(--border)`, `bg: var(--card)`, standard shadow) + `.mi` items. `.sel-menu` adds `position: absolute; top: calc(100% + 2px); left: 0; right: 0; width: 100%; min-width: unset; max-width: unset; z-index: 50; display: none` | Reuses kit `.menu`/`.mi` — same surface as Dropdown; positioned `2 px` below trigger and stretched to the trigger's full width (overrides `.menu`'s intrinsic min/max-width) |
| **Dropdown items** | OS-native rows | `.mi` — `padding: 6 / 12 px`, `font-size: 14 px`, `color: var(--ink-body)`, hover `--state-hover` | Consistent with Dropdown component |
| **Disabled state** | `disabled` attr + OS styling | `.sel-trig:disabled, .sel-trig.s-disabled` — `opacity: var(--opacity-disabled)`, `cursor: not-allowed`, `pointer-events: none` | Matches `Input` disabled token |

> **Resolved — disabled rule added to `pages/kit-theme.css`.** `.sel-trig:disabled,.sel-trig.s-disabled{opacity:var(--opacity-disabled);cursor:not-allowed;pointer-events:none}`. The rule now matches the `Input` disabled recipe (the doc no longer over-states an unimplemented state).
| **Size variants** | None | `.sel-trig.is-sm` `height: 2rem` (32 px) · default `2.25rem` (36 px) · `.sel-trig.is-lg` `2.5rem` (40 px) · `.sel-trig.is-xl` `2.75rem` (44 px) | Only `height` changes; padding/typography constant. Mirrors `Input` size scale |

## open/close mechanism

`aria-expanded` on `.sel-trig` drives menu visibility via CSS adjacent-sibling rule:

```css
.sel-trig[aria-expanded="true"] + .sel-menu { display: block; }
```

JS sets `aria-expanded`; no extra class toggling. Click-outside closes via a document `click` listener.

## Token map

| Role | Token |
|---|---|
| Label text (`.sel-lbl`) | `--ink-secondary` |
| Trigger border (rest) | `--border` |
| Trigger border (hover) | `--border-hover` |
| Trigger border (open) | `--input-focus` |
| Trigger bg | `--card` |
| Selected text | `--ink` |
| Placeholder text | `--ink-inactive` |
| Chevron colour | `--ink-secondary` |
| Focus ring | `--shadow-focus` |
| Dropdown surface | `.menu` tokens (see Dropdown) |
| Menu item hover | `--state-hover` |
| Disabled opacity | `--opacity-disabled` |
