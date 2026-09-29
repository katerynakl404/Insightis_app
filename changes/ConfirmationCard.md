# Confirmation Card — prod → expected

Baseline: [`../current/ConfirmationCard.md`](../current/ConfirmationCard.md). Storybook: [`#confirmcard`](../insightis-preview-kit.html#confirmcard). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (state D1).

The assistant asking for a decision before it can continue, rendered inside the answer card.

## was → became

| | Current (prod) | Expected |
|---|---|---|
| Option control | a bordered `<button>` per choice | a **radio row** — real `<input type="radio">` + [Radio](Radio.md) skin + label |
| "Other" | unboxed, below the real choices | **one of the choices** — same box, same mark |
| Description | Body/L | Body/M |
| Choosing | submits immediately | selects; the card shows which one is chosen |
| Question + dismiss | stacked | **one line** |
| Card height | — | follows the content: N options, N rows |

## Why the options became a radio group

The card asks for **one of N**. A row of buttons says "several things you could press" and gives the reader nothing to look at afterwards to confirm what they chose. A radio is the control that means one-of-N, and it is now [in the kit](Radio.md) — the kit had a Checkbox and no radio, which is most of why this was buttons in the first place.

## Why "Other" is a peer

It was unboxed while it was read as an escape hatch — *not a real answer, just a way out*. It is not one. "Other" is an answer to the same question, so it is boxed and marked like the rest. Giving it a different shape made the reader parse the list twice.

## Three type steps, each a token apart

The question is the primary voice here. An option label at the same weight flattens the card into one shouting block, so:

- question → `Title/14` on `Text/Primary`
- option label → `Title/16` on `Text/Body` — **not** Text/Primary
- description → `Body/M` at weight 400 on `Text/Secondary`

The description was `Body/L` and read as a second paragraph competing with the label; one step down settles it. Weight 400 is explicit because it inherits nothing from the button it used to sit in — a button's own `font-weight` was making the prose read bold.

## Alignment and focus, both corrected after review

**The radio centres on the title LINE, not on the row.** Centring on the row drops it into the middle of the paragraph on a two-line option; aligning to the line's top edge leaves it sitting above the word. The offset is `(24px title line − 18px control) / 2`. Off the 4px step on purpose, the same way a 1.5px border is — an optical centring derived from two grid-legal values, not a spacing decision.

**The focus ring is keyboard-only and drawn once.** `:has(.rdo-in:focus-visible)` on the row, not `:focus-within` — the latter fires on a mouse click, so choosing an option painted a full ring on top of the selected state and the two together read as an error. The control inside suppresses its own ring, so one focus is drawn one time.

## Token map

| Slot | Token |
|---|---|
| card gap | `.75rem` |
| option row | `--stroke-border` on `--surface-card`; hover `--state-hover` + `--card-border-hover` |
| selected row | `--brand-primary` border + `color-mix(--brand-primary, --tint-5, transparent)` |
| question | `Title/14` · `Text/Primary` |
| option label | `Title/16` · `Text/Body` |
| description | `Body/M` · `Text/Secondary` |
| dismiss | `.iconbtn.iconbtn-tertiary.iconbtn-xs` |

No new colour tokens; the selected wash is the sanctioned tint recipe.

## No change (—)

Radius, card padding, the dismiss affordance and the "Esc to cancel" hint keep their prod treatment.

## Accessibility self-check

- `role="radiogroup"` with an `aria-label`; the options are real inputs sharing a `name`, so arrow-key navigation and the "N of M" announcement come from the platform.
- The label is a `<label>` wrapping the input, so the whole row — box, title and description — is a click target and an accessible name.
- Selection is carried by the dot, the border and the wash together, never by colour alone (WCAG 1.4.1).
- Focus lands on the real input and is visualised once, on the row.
- "Esc to cancel" is stated in the card, and the dismiss button is reachable in the tab order rather than only by the key.
