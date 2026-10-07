# AskUserPanel — prod → expected

Baseline: [`../current/AskUserPanel.md`](../current/AskUserPanel.md). Storybook: [`#askuserpanel`](../insightis-preview-kit.html#askuserpanel). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (state D1).

The assistant asking for a decision before it can continue. The component is the **whole card** — `.cfc` carries its own surface — not a block of content placed inside another card.

## was → became

| | Current (prod) | Expected |
|---|---|---|
| Card | sits inside the answer card, on its surface | **its own card**, floated over the thread — `.cfc` is the whole panel |
| Option control | a bordered `<button>` per choice | a **radio row** — real `<input type="radio">` + [Radio](Radio.md) skin + label |
| "Other" | unboxed, below the real choices | **one of the choices** — same box, same mark |
| Description | Body/L | Body/M |
| Choosing | submits immediately | selects; the card shows which one is chosen |
| Question + dismiss | stacked | **one line** |
| Card height | — | follows the content: N options, N rows |
| Multi select — options | unboxed checkbox rows | the **same option row** as single select, with an input-backed [Checkbox](Checkbox.md) (`.cbx-in`) in place of the radio |
| Several questions — options | unboxed radio rows | the **same option row** as single select — each tab holds a single-select card's question + radio group (`.cfc-panel`) |
| Several questions — top line | tabs + dismiss, the tabs' rule stops where the tabs end | tabs + dismiss on one line; the **row** draws the one hairline (`.tabset.var-flush`), so it runs under the dismiss too |
| Unanswered tab | a dot | — the dot stays; the tab's accessible name adds ", unanswered" |
| Submit | `Submit` below the list; in several questions disabled until all are answered, with "N questions left to answer" | — composed from Button (`btn-primary btn-sm`); multi select is also gated (disabled while nothing is ticked) |
| Mobile (≤ 600px) | — | "Esc to cancel" hides (no Esc key on a phone), the dismiss stays; a tab label never wraps — tabs that do not fit scroll sideways on one line |

## Three variants, one option row

Single select, multi select and several questions are the same card asking in three ways. Prod draws them as three different lists — bordered buttons for one, unboxed rows for the other two — so the same act of choosing looks different depending on how many answers are wanted. In Expected they share **one option row** (`.cfc-opt`): same box, same hover, same selected wash, same title-line alignment. Only the control inside it says how many you may pick — a radio for one, a checkbox for several — which is exactly the difference the reader needs to see, and nothing else changes.

The checkbox is input-backed (`.cbx-in`) for the reason the radio is: these are form fields, and a real input brings the name, value, role and keyboard with it.

**Submit appears only where one pick is not the whole answer.** In single select the choice is the answer; in the other two a pick is one step of several, so the card needs an explicit end. The note beside a disabled Submit is what keeps the disabled state from reading as broken: it says why, in numbers, and disappears at zero.

**The dismiss sits with the tabs, not with the question.** In several questions it escapes all of them, so it belongs beside the control that spans them — the rule from single select ("the escape hatch belongs beside what it escapes from") applied one level up.

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

## It floats over the thread, it does not sit in it

The card used to render inside the answer card, in the flow of the conversation. It now lifts out and floats directly above the composer, covering the tail of the thread — `.cfc` carries a surface of its own — the component is the whole card — and `.cp-cfc-layer` on the chat page puts it there.

The reason is the queue. The card is the thing the queue is waiting on, and a question you have to scroll back to find reads as optional — meanwhile the queue looks stuck for no visible reason. Floating it means the question and the reason the queue stopped are on screen together, always.

It carries `--shadow-overlay-soft` rather than a heavier border: it sits OVER the conversation, and depth is what says so. Positioning stays with the consumer; the component is the panel itself.

## Token map

| Slot | Token |
|---|---|
| card | `--surface-card` · `--stroke-border` · `--radius-xl` · `--shadow-overlay-soft` |
| card gap | `.75rem` |
| option row | `--stroke-border` on `--surface-card`; hover `--state-hover` + `--card-border-hover` |
| selected row | `--brand-primary` border + `color-mix(--brand-primary, --tint-5, transparent)` |
| question | `Title/14` · `Text/Primary` |
| option label | `Title/16` · `Text/Body` |
| description | `Body/M` · `Text/Secondary` |
| dismiss | `.iconbtn.iconbtn-tertiary.iconbtn-xs` |
| multi-select control | `.cbx-in` + `.cbx` ([Checkbox](Checkbox.md)) |
| question tabs | `.tabset.var-flush` + `.tab`; row hairline `--stroke-border` |
| unanswered marker | `.cfc-tab-pend` · `--ink-highlight` (the active underline's accent) |
| submit | `.btn.btn-primary.btn-sm` |
| submit note | `Body/M` · `Text/Secondary` |

No new colour tokens; the selected wash is the sanctioned tint recipe.

## No change (—)

Radius, card padding, the dismiss affordance and the "Esc to cancel" hint keep their prod treatment.

## Accessibility self-check

- `role="radiogroup"` with an `aria-label`; the options are real inputs sharing a `name`, so arrow-key navigation and the "N of M" announcement come from the platform.
- The label is a `<label>` wrapping the input, so the whole row — box, title and description — is a click target and an accessible name.
- Selection is carried by the dot, the border and the wash together, never by colour alone (WCAG 1.4.1).
- Focus lands on the real input and is visualised once, on the row.
- "Esc to cancel" is stated in the card, and the dismiss button is reachable in the tab order rather than only by the key.
- Multi select: the options are a `role="group"` of real checkboxes, labelled by the question; the checked row carries the tick, the border and the wash together (1.4.1).
- Several questions: `role="tablist"` / `tab` / `tabpanel` with `aria-selected`, `aria-controls` and roving tabindex; ← / → / Home / End move between tabs (`pages/kit-kit.js` §11). The unanswered dot is `aria-hidden`; the state is spoken through ", unanswered" in the tab's name, and the dot is presence, not colour.
- Submit is a real `disabled` button while answers are missing, `aria-describedby` the note, and the note is `aria-live="polite"` — the count is announced as it drops.
