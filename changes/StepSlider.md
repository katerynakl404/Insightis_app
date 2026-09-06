# StepSlider — new component

**No prod baseline** — there is no `current/StepSlider.md`: `@insightis/ui` ships no discrete-level
control, so nothing in the DS package to diff against. Prod does render this control inside the chat
composer's model popover (the Effort rail); this component is the design system's version of it, so
the storybook States table has **no Current (prod) column**.

Live demo + derived values: storybook [`#stepslider`](../insightis-preview-kit.html#stepslider).
Implementation: `pages/kit-theme.css` → the `.stps` block.

## What it is

A **discrete level picker** — Low / Medium / High, or any short ordered scale.

It **reads** as a slider (a knob sitting at the selected position, small dots at the others) but
**behaves** as a `radiogroup`: every step is its own button, directly clickable. That was the
deliberate call — a real slider needs drag, a track, a thumb, pointer capture and a keyboard
fallback, and none of it buys anything for a 3-value scale where every value is one click away.
Consequence: keyboard and AT support are the native radio ones, and the component ships no JS.

## It belongs to the Switch family

This is the load-bearing decision, not a styling preference. The composer's model popover stacks
**Thinking** (a [Switch](Switch.md)) directly above **Effort** (this control). Two settings rows,
one on top of the other — if the controls don't come from the same visual family the block reads as
two unrelated widgets that happen to share a popover.

So StepSlider is built as a switch-shaped rail, and it ships **the same two sizes as Switch under
the same names** — because a size is only right relative to the Switch it sits with:

| | `.swt` / `.stps` (default) | `.swt.is-sm` / `.stps.is-sm` |
|---|---|---|
| Track height | `1.25rem` (20 px) | `1rem` (16 px) |
| Thumb / knob | `1rem` (16 px) | `.75rem` (12 px) |
| Thumb inset from rim | `2px` | `2px` |
| Unselected dot | 6 px | 4 px |
| Slot / gap | `1rem` / `.5rem` | `.75rem` / `.75rem` |
| Total StepSlider width | 68 px | 64 px |
| Track fill — Switch | `--switch-off-bg` | `--switch-off-bg` |
| Track fill — StepSlider | `--card2` | `--card2` |

**The composer uses `.is-sm`**, because its Thinking row is a `.swt.is-sm` (28 × 16 track, 12 × 12
thumb) — the same small switch the Connections rows use. Getting this wrong is the whole reason the
size table exists: the first implementation copied the **default** Switch geometry (20 px track,
16 px knob) into a popover whose switch is 16 px tall, so the Effort rail sat 4 px taller than the
toggle directly above it and the pair stopped reading as a pair. Pick the size of the Switch beside
it, always.

The **one** divergence from Switch at either size is the track fill, and it is forced: StepSlider's
unselected marks are `--switch-off-bg` dots, so it cannot also fill its track with that grey.
`--card2` sits one notch recessed from the popover's `Surface/Card`, which leaves the dots legible
on it in both themes.

### Why the knob is the Switch thumb, not a rim

An earlier pass drew the selected step as a *hollow* circle ringed in `--switch-off-bg`, and one
before that used `--shadow-rim-active` (SegmentedControl's raised pill). Both were wrong here:

- `--shadow-rim-active` fails in dark — there `--card` **is** the menu surface and the rim is only
  white 6%, so the knob became a hole *darker* than the unselected dots, inverting the hierarchy.
- The hollow ring survived both themes but broke the family read: sitting under a Switch with a
  solid white thumb, a hollow ring looks like a different kind of control.

The white thumb with `--shadow-thumb` fixes both — and it is what prod ships.

**No brand fill on the selected step.** A step's meaning is its *level*, which is text — exposed on
every step as `[data-tip]` and `aria-label`, and echoed in the consumer's row label. Colour would be
a second, redundant cue and would imply the level carries status.

## Anatomy

| Part | Class | Notes |
|---|---|---|
| Track | `.stps` | `role="radiogroup"` + `aria-label`. `flex:none` at a fixed width per size — **68 px** default (`2 + 3 × 1rem + 2 × .5rem + 2`), **64 px** at `.is-sm` (`2 + 3 × .75rem + 2 × .75rem + 2`) — so the group never stretches or shrinks and the label beside it is what truncates. |
| Step | `.stps-step` | One `<button role="radio">` per level. A **constant slot** (`1rem` default, `.75rem` at `.is-sm`) — only the mark inside it resizes, so changing step cannot reflow the row. Carries `[data-tip]` = the level name. |
| Mark | `.stps-dot` | A **real child element, not a pseudo** — every step carries `[data-tip]`, and the CSS-only tooltip fallback owns `::after` on `[data-tip]` (and `html.tt-js` sets it to `display:none`), so a pseudo mark disappears the moment the JS tooltip engine loads. `::before` on the step stays free and is used for the hit target. |

## Hover names the level

Every step tips its level name through the kit [Tooltip](Tooltip.md) engine (300 ms, no warm-up).
Without it three identical dots are unlabelled targets — the user can see *which* position is
selected but not what any position means until they click it. The selected knob tips too, and its
surface stays put while hovered: it is already the strongest mark in the group, so the tooltip is
the whole hover feedback.

## Two disabled forms, on purpose

| Form | Behaviour | Use |
|---|---|---|
| `.stps.s-disabled` | group fades, `pointer-events:none` on the whole thing | nothing to explain |
| `.stps[aria-disabled="true"]` | group fades, only the **steps** go inert — the group stays hoverable so a `[data-tip]` on `.stps` can say **why** | a **gated** control |

The gated form exists because of the composer. Effort is meaningless while Thinking is off, and the
first implementation simply removed the row — which resized the popover on every toggle of the
switch and read as the menu jumping under the cursor. The row now stays in place, disabled, and tips
*"Turn on Thinking to set effort"*, so the dependency is stated rather than inferred and the
popover keeps one footprint (verified: Δ height = 0 px on toggle).

## Token map

| Slot | Token |
|---|---|
| Track fill | `--card2` |
| Track / dot / knob radius | `--radius-full` |
| Dot fill (unselected) | `--switch-off-bg` |
| Dot fill — hover | `--switch-off-bg-hover` |
| Knob fill (selected) | `--content-on-solid` |
| Knob lift | `--shadow-thumb` |
| Transition | `--motion-fast` |
| Focus ring | `--shadow-focus` |
| Disabled | `--opacity-disabled` |

`--shadow-thumb` is **new**, and it is a pure extraction: Switch's thumb already carried this exact
`box-shadow` as a literal, and StepSlider's knob needs the same lift, so the value moved to a token
and both now read it. Switch's rendered output is unchanged. `FALLBACK_TOKEN_NAMES` in the storybook
was regenerated for it.

## No change (—)

Nothing is retired by this component. It touches exactly one existing rule — `.swt::after`, whose
literal shadow became `var(--shadow-thumb)` at the same value.

## Accessibility self-check

- **Role / state** — `role="radiogroup"` on the group with `aria-label`; `role="radio"` +
  `aria-checked` per step. Native radio keyboard behaviour, no custom handler.
- **Name** — every step has an `aria-label` naming its level (`"Medium effort"`), so the level is
  never conveyed by position alone.
- **1.4.1 Use of colour** — selection is carried by **size, shape and lift** (a small grey dot → the
  full white thumb), not hue. There is no colour-only state in the component.
- **1.4.11 Non-text contrast** — the knob is `Content/On_Solid` on a `--card2` track with
  `--shadow-thumb`'s 0.5 px hairline giving it a perceivable edge, the same treatment that carries
  Switch's thumb. Unselected dots are `--switch-off-bg`, one step above the track in both themes.
- **2.5.5 / 2.5.8 Target size** — the mark sits in a slot expanded to a **24 × 24 px** hit area at
  **both** sizes: `.stps-step::before {inset:-4px}` on the `1rem` slot, `{inset:-6px}` on the
  `.75rem` one. Clears the 24 × 24 AA minimum on both axes without changing layout. Each size's gap
  is set to that growth (`.5rem` / `.75rem`), so neighbouring hit areas never overlap.
- **Focus** — `--shadow-focus` on the focused step, the same neutral ring as Button / IconButton /
  Switch / SegmentedControl.
- **Gated state** — `aria-disabled` (not `disabled`) so the group stays focusable/hoverable and its
  explanatory tooltip is reachable; the steps themselves are inert.

## Consumers

| Where | Row |
|---|---|
| Chat composer → model popover | `.stps.is-sm` — `Effort (Low)`, gated by the Thinking switch (`.swt.is-sm`) — see [`../page-changes/chat-landing.md`](../page-changes/chat-landing.md) |
