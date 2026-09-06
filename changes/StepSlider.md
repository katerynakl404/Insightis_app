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
| Unselected dot fill | `--ink-inactive` | `--ink-inactive` |

**The composer uses `.is-sm`**, because its Thinking row is a `.swt.is-sm` (28 × 16 track, 12 × 12
thumb) — the same small switch the Connections rows use. Getting this wrong is the whole reason the
size table exists: the first implementation copied the **default** Switch geometry (20 px track,
16 px knob) into a popover whose switch is 16 px tall, so the Effort rail sat 4 px taller than the
toggle directly above it and the pair stopped reading as a pair. Pick the size of the Switch beside
it, always.

Two things diverge from Switch, and both are forced by the dots — the marks Switch simply doesn't
have.

**The track fill.** `--card2`, one notch recessed from the popover's `Surface/Card`, rather than
Switch's `--switch-off-bg`: the dots need a track they can be seen against, and Switch's off-track
grey is too close to them.

**The dot fill: `--ink-inactive`, not `--switch-off-bg`.** Reusing Switch's resting grey looked
like the obvious family choice and was the second mistake in this component's history. Measured:

| | dot vs track — was (`--switch-off-bg`) | now (`--ink-inactive`) |
|---|---|---|
| Light | **1.34:1** | **3.13:1** |
| Dark | **1.10:1** | **4.65:1** |

The dots are not decoration. They are the **other steps** — the only thing telling a user the control
has three positions and where they sit — so WCAG 1.4.11's 3:1 applies to them. At 1.34:1 they were
effectively invisible. Switch's own off-track is exempt from that bar because it is a *background*,
not a state indicator; the dots are the indicator.

Hover moves one step along the ink ramp to `--ink-secondary`, which darkens away from the track in
light and lightens away from it in dark — the right direction in both themes.

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
| `.stps[aria-disabled="true"]` | group fades, only the **steps** go inert, so a hover reaches whatever `[data-tip]` is above it and can say **why** | a **gated** control |

The gated form exists because of the composer. Effort is meaningless while Thinking is off, and the
first implementation simply removed the row — which resized the popover on every toggle of the
switch and read as the menu jumping under the cursor. The row now stays in place, disabled — its **label** on the `.mi.is-disabled` colour recipe
(`--ink-inactive`), its **control** on the opacity recipe every other kit control uses, so the two
never compound — and tips *"Turn on Thinking to set effort"*, so the dependency is stated rather
than inferred and the popover keeps one footprint (verified: Δ height = 0 px on toggle).

**The tip belongs on the row, not on the rail.** The first pass put `[data-tip]` on `.stps`, so the
explanation only appeared when the pointer found the 64 px rail — hovering the label it belongs to
gave nothing, even though the label is the larger target and the thing that reads as unavailable. A
consumer with a labelled row puts the tip on the **row**; because the steps are `pointer-events:none`
while gated, the hover reaches the row from the rail too, so both halves explain themselves. A bare
StepSlider with no row keeps the tip on `.stps` itself.

## Token map

| Slot | Token |
|---|---|
| Track fill | `--card2` |
| Track / dot / knob radius | `--radius-full` |
| Dot fill (unselected) | `--ink-inactive` |
| Dot fill — hover | `--ink-secondary` |
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
  Switch's thumb — a white circle on a light track is a low ratio on its own (1.10:1 in light), and
  as on Switch it is the `--shadow-thumb` drop-shadow plus its 0.5 px hairline that supplies the
  boundary. **Unselected dots are `--ink-inactive`: 3.13:1 light / 4.65:1 dark against the track**,
  clearing the 3:1 bar — they identify the control's other positions, so the bar applies to them.
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
| Chat composer → model popover | `.stps.is-sm` — `Effort (Medium)` by default, gated by the Thinking switch (`.swt.is-sm`) — see [`../page-changes/chat-landing.md`](../page-changes/chat-landing.md) |
