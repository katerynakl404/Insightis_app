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
| **Chevron (open)** | header carries a trailing chevron glyph that rotates to point down when the item is expanded | Indicates expanded/collapsed state via icon rotation. No dedicated `.acc`-scoped rotation rule exists in `kit-theme.css` — sibling collapsibles use `transform:rotate(90deg)` (`.clps[data-state=open] .clps-chev`); follow that recipe |

## Token map

`--border` (container + item-divider border) · `--card` (container bg) · `--ink` (header text) · `--ink-body` (body text). No new tokens introduced — every value composes from existing semantic aliases.
