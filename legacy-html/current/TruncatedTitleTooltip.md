# TruncatedTitleTooltip — current (prod)

Live on prod (from the `insightis-sidebar` package).

## Spec
Behavior wrapper over `Tooltip`. Shows the tooltip **only when the trigger's label is
truncated** (`scrollWidth > clientWidth`), re-measured on each pointer-enter / focus.
- Default target: last `<span>` child of the trigger (matches `<a><Icon/><span>label</span></a>`).
- Default side: `right`.
- Visuals: inherited from `Tooltip` (bg `Text/Primary`, text `#FFF`, text-xs, radius `md`). No own tokens.
