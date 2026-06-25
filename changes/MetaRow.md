# MetaRow — prod → expected

Baseline: [`../current/MetaRow.md`](../current/MetaRow.md).

⚠ **Current column is a placeholder.** Whether the live `/chats` page renders a count / Select-all row above its list is not verified — the rendered DOM at <https://insightis-app.devart.info/chats> was not captured (SPA, static fetch returns only `<div id="root">`). The Expected spec stands on existing kit tokens; the diff is to be measured once the prod UI is captured.

A transparent caption row above a list view. Left slot: a count (e.g. *"12 conversations"*). Right slot: an inline `.link`-styled action (typically `Select all` / `Deselect all`). No background, no border, no card wrapper — fully delegates surface to whatever sits behind it.

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default | ⚠ pending | transparent row, `display:flex; align-items:center; gap:.75rem; padding:.375rem 0; min-height:2.25rem; line-height:1.4; font-size:.8125rem; background:transparent; border:none`, count in `Text/Secondary` `.8125rem`, action `.link` (Brand/Primary, hover underline) | reuses existing tokens only: `--ink-secondary` for the count, `.link` for the action |
| All selected | ⚠ pending | action label flips from `Select all` → `Deselect all`; same `.link` style | label is a derived view-state of the parent list (selected count = total) |
| Singular count | ⚠ pending | noun pluralises with count: `1 conversation` vs `0 / 2+ conversations` | view-layer concern; component is presentation-only |
| Empty list | ⚠ pending | action → `.link.is-disabled` (Text/Inactive, no underline, `pointer-events:none`) | reuses existing `.link.is-disabled` recipe — no new tokens |

## Reproduction values (kit-theme.css ~2003–2006)

| Selector | Values |
|---|---|
| `.meta-row` | `display:flex; align-items:center; gap:.75rem; padding:.375rem 0; min-height:2.25rem; background:transparent; border:none; font-size:.8125rem; line-height:1.4` — `font-size` lives on the row so every child (count, `.link`, action buttons) inherits the caption size; `min-height` matches the tallest possible child (the 1.5rem iconbtn in edit mode) so the row stays vertically stable |
| `.meta-row.var-split` | `justify-content:space-between` — opt-in split layout that pushes the action to the opposite edge (default clusters count + action together on the left) |
| `.meta-row-count` | `color:var(--ink-secondary); font-weight:400` |
| `.meta-row-actions` | `display:inline-flex; align-items:center; gap:.5rem` |

No background, no border, no card wrapper — the row fully delegates its surface to whatever sits behind it.

## No change (—)

n/a — new component.

## Token map used

`--ink-secondary` (count text) · `--brand-primary` (action — via `.link`) · `--ink-inactive` (disabled action — via `.link.is-disabled`) · transparent background. No new tokens introduced.
