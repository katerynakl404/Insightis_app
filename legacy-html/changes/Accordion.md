# Accordion — change

**No component-level change (—).** New component, live on prod since 04.06 (see `../current/Accordion.md`).
Expected matches prod; there is no Current → Expected diff. The full reproduction spec below lets the component be rebuilt from this doc alone.

## Reproduction spec (`.acc`)

| Part | Value | Specification |
|---|---|---|
| **Container `.acc`** | width `280px`; border `1px solid var(--border)`; border-radius `.5rem` (8px); background `var(--card)`; `overflow:hidden` | Card-surface panel; rounded corners clipped so item borders don't poke past the radius |
| **Item `.acc-item`** | border-bottom `1px solid var(--border)`; `.acc-item:last-child` → `border-bottom:none` | Divider between items, suppressed on the last item |
| **Header `.acc-h`** | `display:flex; align-items:center; justify-content:space-between`; gap `12px`; padding `12px`; font-size `.875rem` (14px); font-weight `500`; color `var(--ink)`; `cursor:pointer` | Clickable row; title left, chevron pushed right via `justify-content:space-between` |
| **Body `.acc-b`** | padding `0 12px 12px`; font-size `.875rem` (14px); color `var(--ink-body)` | Revealed content; no top padding so it tucks under the header |
| **Chevron** | trailing inline glyph `<span style="color:var(--ink-secondary)">…</span>` inside `.acc-h`; expanded item uses `▾`, collapsed uses `▸`; color `var(--ink-secondary)` | Indicates expanded/collapsed state by **swapping the glyph character** (down ▾ = open, right ▸ = closed). There is **no** `.acc`-scoped rotation/transition rule in `kit-theme.css` — the chevron is plain markup, not a CSS-rotated SVG; state is conveyed by the glyph swap alone |

## States, motion & responsive

- **No interaction states styled in CSS.** `.acc` has no `:hover`, `:focus-visible`, `:active`, `:disabled`, `.is-*`, pseudo-element, `@media`, or `.dark` override in `kit-theme.css`. The header carries only `cursor:pointer`; surface/text colours do not change on interaction.
- **No transition / animation in CSS.** Despite the storybook sub-line saying "animated open/close", there is no `transition` or keyframe rule on any `.acc*` selector — open/close is an instant show/hide of `.acc-b`. (Storybook text is aspirational; CSS is the contract.)
- Dark theme inherits automatically via the semantic tokens (`--border`, `--card`, `--ink`, `--ink-body`); no component-scoped dark rule.

## Token map

`--border` (container + item-divider border) · `--card` (container bg) · `--ink` (header text) · `--ink-body` (body text) · `--ink-secondary` (chevron glyph). No new tokens introduced — every value composes from existing semantic aliases.
