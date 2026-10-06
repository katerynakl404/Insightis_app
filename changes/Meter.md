# Meter — prod → expected

No baseline in [`../current/`](../current/): prod has the sidebar's credit meter, but not as a named
component. Storybook: [`#sidebar-subparts`](../insightis-preview-kit.html#sidebar-subparts).

## What it is

Label, figure, bar — how much of an allowance is gone. Two consumers today: the subscription
credits in the sidebar's balance popover, and file storage on the Files page.

| Piece | Component | Why |
|---|---|---|
| Row | `.meter .row` + `.label` + `.val` | The label is `Body/S` secondary, the figure `Title/16` with tabular numerals, so a changing number does not shift the row. |
| Bar | `.meter .bar` + `span` | 4px track on `Surface/Card2`, fill on `Brand/Tertiary`. |
| Over limit | `.meter.is-over` | The fill takes `Feedback/Attention` — the same accent the warning Alert uses, because it is the same statement. |

## Decisions

**Renamed from `.sbx-pop-tok-meter` (2026-10-06).** It was named for the sidebar popover it first
appeared in. When the Files page needed the same thing — a label, a figure and a bar reporting an
allowance — reusing a sidebar-prefixed class would have been a component pretending to be two.
`.sbx-pop-tok-meter` is kept as an alias on every rule until that markup is renamed.

**The fill colour belongs to the component.** It used to be written inline on every bar
(`style="width:42.6%;background:var(--brand-tertiary)"`) — twelve copies of one decision, and a kit
atom restyled from page markup. Only the WIDTH is inline now, because only the width is data.

**Over-limit is a state, not a colour a page paints.** The page toggles `.is-over`; it never writes
`--fb-attention` into the element.

## No change (—)

Everything else: the sidebar's existing credit meters keep their markup, their numbers and their
layout. This is a rename plus one state, not a redesign.

## Accessibility self-check

- The bar carries `role="progressbar"` with `aria-valuemin/max/now` where it reports a number a
  person is acting on (storage); the decorative sidebar meters state their figure in text beside it.
- Over-limit is not colour alone: the figure itself says `1.2 GB of 1 GB`, and the mark that opens
  the panel changes glyph from info to warning.
