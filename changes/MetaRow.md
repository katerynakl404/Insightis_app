# MetaRow — prod → expected

Baseline: [`../current/MetaRow.md`](../current/MetaRow.md).

⚠ **Current column is a placeholder.** Whether the live `/chats` page renders a count / Select-all row above its list is not verified — the rendered DOM at <https://insightis-app.devart.info/chats> was not captured (SPA, static fetch returns only `<div id="root">`). The Expected spec stands on existing kit tokens; the diff is to be measured once the prod UI is captured.

A transparent caption row above a list view. Left slot: a count (e.g. *"12 conversations"*). Right slot: an inline `.link`-styled action (typically `Select all` / `Deselect all`). No background, no border, no card wrapper — fully delegates surface to whatever sits behind it.

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default | ⚠ pending | transparent row, `padding:.375rem 0`, count in `Text/Secondary` `.8125rem`, action `.link` (Brand/Primary, hover underline) | reuses existing tokens only: `--ink-secondary` for the count, `.link` for the action |
| All selected | ⚠ pending | action label flips from `Select all` → `Deselect all`; same `.link` style | label is a derived view-state of the parent list (selected count = total) |
| Singular count | ⚠ pending | noun pluralises with count: `1 conversation` vs `0 / 2+ conversations` | view-layer concern; component is presentation-only |
| Empty list | ⚠ pending | action → `.link.is-disabled` (Text/Inactive, no underline, `pointer-events:none`) | reuses existing `.link.is-disabled` recipe — no new tokens |

## No change (—)

n/a — new component.

## Token map used

`--ink-secondary` (count text) · `--brand-primary` (action — via `.link`) · `--ink-inactive` (disabled action — via `.link.is-disabled`) · transparent background. No new tokens introduced.

## Accessibility & consistency self-check

```
Consistency: PASS — no new tokens; reuses .link and existing text-color tokens. Typography sits on the kit's existing scale (.8125rem · Text/Secondary).
Accessibility:
  ✓ Action ("Select all") is a real <button class="link"> — keyboard-focusable, has a focus ring (2.4.7)
  ✓ Count vs page bg: --ink-secondary on --bg → Slate-500 #64748B / #F8FAFC = 4.85:1 light; #94A3B8 / #1A1D24 = 7.69:1 dark (target 4.5:1, 1.4.3)
  ✓ Action label contrast: --brand-primary on --bg → Brand-600 #07807E / #F8FAFC = 4.65:1 light; Brand-500 #148F8D / #1A1D24 = 6.30:1 dark (target 4.5:1)
  ✓ Selection state not by colour alone — label text flips ("Select all" → "Deselect all") (1.4.1)
  ✓ Disabled action remains perceivable (--ink-inactive) but signals non-interactive via pointer-events:none + accessible name preserved
```
