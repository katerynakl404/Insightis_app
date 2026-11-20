Shadows from @devart/ui-react. Use via `window.DevartUI.Shadows` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Elevation is expressed as **roles, not sizes** — pick by what the surface is
doing, not by how strong you want it to look.

| Class | Role |
|---|---|
| `shadow-rest` | a flat card at rest |
| `shadow-card-hover` | that card lifted under the pointer |
| `shadow-lift-hover` | a stronger lift for an interactive tile |
| `shadow-menu` | dropdown and context menus |
| `shadow-dropdown` | select and combobox listboxes |
| `shadow-overlay-soft` | popovers and soft floating panels |
| `shadow-thumb` / `-hover` | slider and switch thumbs |

Never write a raw `shadow-[0_1px_2px_…]`: a role token re-themes with the rest
of the system and a literal does not. Stock `shadow-sm|md|lg` still resolve, but
a role is always the better choice.
