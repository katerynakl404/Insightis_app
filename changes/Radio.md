# Radio — prod → expected

Baseline: [`../current/Radio.md`](../current/Radio.md) — **port of the design system’s `RadioButton` into this kit; nothing on prod to diff against.** Storybook: [`#radio`](../insightis-preview-kit.html#radio).

The **Insightis kit** had a [Checkbox](Checkbox.md) and no radio, so a one-of-N choice that has to stay marked had no control that said so.

**It stays in the kit with no consumer.** Nothing on the screens uses it at the moment, and that is not a reason to remove it: it is the design system's own control, and the next one-of-N choice that has to stay marked takes it from here instead of inventing one.

**The design system already ships one.** `RadioButton` exists in `@devart/ui-react`; what was missing was its CSS-class counterpart in this kit. So this is a **port, not a new component**, and the parity is deliberate and exact — same shell as Checkbox, 1.5px border, `radius-full`, `Surface/Card` on `Stroke/Field_Hover`, hover to `Text/Secondary`, checked `Brand/Primary` with a `Content/On_Solid` mark, checked-hover `Brand/Hover`, `--input-error` for error, the neutral focus ring (brand colour never visualises form-control focus) and the opacity disabled recipe. Anything that changes here changes there.

## The whole design is one sentence

**It is Checkbox, with a circle instead of a square and a dot instead of a tick.**

Size, border weight, colours, hover, focus, error and disabled are Checkbox's, deliberately and to the value. A radio that differed in any of those would read as a control from a different family rather than as the same control with a different arity — and arity is the only thing that actually differs.

## Decisions worth recording

**The dot is drawn on top, not punched out of the fill.** A ring with a transparent centre takes the colour of whatever surface it sits on, and these sit inside cards, inside washes, inside selected rows. The dot is `Content/On_Solid` over the brand fill, so it is white on every surface.

**The real `<input>` stays in the DOM** — visually hidden, never `display:none`. That keeps the group's arrow-key navigation, its name/value and its screen-reader role for free; `.rdo` is only the skin, and `:checked` / `:focus-visible` on the input drive it. Reimplementing roving focus in JS to style a `<span>` would have been the expensive way to get less.

**Focus is keyboard-only, and drawn once.** `:focus-visible` on the input, not `:focus-within` on a wrapper — the latter fires on a mouse click too, so *choosing* an option painted a focus ring on top of the selected state and the two together read as an error. A composed row that draws its own ring suppresses the control's, so one focus is never shown twice.

## Token map

Every token is Checkbox's; nothing new was added.

| Slot | Token |
|---|---|
| box | `--field-border-hover` border, `--surface-card` fill |
| selected | `--brand-primary` (hover `--brand-hover`) |
| mark | `--content-on-solid` |
| hover border | `--ink-secondary` |
| focus | `--shadow-focus` |
| error | `--input-error` |
| disabled | `--opacity-disabled` |
| radius | `--radius-full` — the one value that differs from Checkbox |

## No change (—)

Size, border weight, motion, spacing: identical to Checkbox by design, not by omission.

## Accessibility self-check

- Real `<input type="radio">`, so role, group semantics, arrow-key navigation and `:checked` announcement come from the platform.
- Visually hidden with `clip-path`, never `display:none` / `visibility:hidden` — both would take it out of the accessibility tree and out of the tab order.
- Focus ring is the kit's neutral `State/Focus_Ring`; brand colour never visualises form-control focus (same rule as Checkbox and Input).
- Selection is carried by the dot's presence, not by colour alone (WCAG 1.4.1).
- Disabled fades from its own base via opacity, with `pointer-events:none`; 1.4.3 exempts disabled from AA.
