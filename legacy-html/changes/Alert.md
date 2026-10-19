# Alert — prod → expected

Baseline: [`../current/Alert.md`](../current/Alert.md) — **new component, nothing on prod to diff against.** Storybook: [`#alert`](../insightis-preview-kit.html#alert). First consumer: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (states D1–D5, E2). Spec: AIINS-1808.

A compact inline notice: a block that sits **inside** a surface, states a condition, and offers the way out of it. *"The queue is paused because the assistant is waiting for you." "The last reply failed." "You are out of credits."*

This file supersedes `changes/QueuePause.md`. That component was written as a private `.mqp` family inside the queue — exactly the component-in-a-page the kit rules exist to prevent — and it turned out the kit was missing the generic thing, not the queue-specific one.

## Why the kit needed a third feedback surface

| Surface | Job | Why it did not fit |
|---|---|---|
| [Banner](Banner.md) | onboarding / marketing | 60px icon, 24px padding, gradient artwork — it announces, it does not report |
| [Toast](Toast.md) | transient confirmation | floats over the page and takes itself away; a condition you have to act on must not leave |
| **Alert** | a condition, stated where it happened | — |

## It is Toast standing still

The decision that settles nearly every other question here: **Alert's variants, accents, glyphs and surface recipe are Toast's, token for token.** They are one feedback family, and a family that changes colour when it stops moving is two families. A reader should not have to learn that an orange triangle floating past and an orange triangle sitting in the page mean the same thing.

Concretely, shared with `.toast`:

- the roster — success · info · warning · error
- the accent per variant, read from the same semantics
- the glyph per variant, the **same SVG paths** (not lucide lookalikes — a set that merely resembles another set is how the vocabulary quietly stops being shared)
- the surface recipe: a wash of the accent over `Surface/Card`, plus a hairline of the accent at `--tint-30`

Two deliberate departures, both recorded so nobody "restores" them:

1. **Info is `Brand/Tertiary`, not `Brand/Primary`** (agreed 2026-09-29). Toast can afford the brand colour because it is gone in four seconds. An inline notice that stays would read as the product talking about itself — *"waiting for your answer"* looked like a promo in brand teal.
2. **Neutral exists and has no Toast counterpart.** Nothing floats over the page to say something colourless, but a queue paused because *you* pressed Stop is exactly that: nothing went wrong, and nothing should look like it did.

There is **no `brand` variant.** With info on Tertiary the two would be the same teal a shade apart, and Toast has one brand-family variant, not two.

## Decisions that took more than one pass

**The wash mixes over the card, not over transparent.** A translucent wash takes the colour of whatever it is dropped onto, and this block is dropped into cards, into the queue band, and into a Storybook docs page. Mixing over `Surface/Card` — Toast's own recipe — makes it opaque and self-contained.

**`--alert-wash` is one token, not eight.** Toast spells its 5% → 8% dark step into four background tokens per theme because each carries its own accent. Alert's accent is already a variable, so the only thing left to vary is the strength, and that is a single token redefined under `.dark`.

**Neutral is `Surface/Card2`, not `Surface/Chips`.** Chips was the first choice and it broke the two themes apart: on dark it resolves to the *same grey as `Stroke/Border`*, so fill and edge collapsed into one bright slab, while on light they sat clearly apart. Card2 is one surface step off the card in both themes, which is what "quiet" is supposed to mean.

**No accent rail.** A 2px left border following an 8px radius reads as a thick half-rounded edge rather than as a cue. The hairline all the way round does the job the rail was reaching for.

**Horizontal padding stays at `.75rem`, wider than vertical.** It was tightened to `.5rem` for one pass, to put the title on the same vertical as the unboxed text below it inside the Queue Band — a bordered block’s inner text only joins that column when the block’s own inset is subtracted from the chain. Reverted 2026-09-30: the side gaps read as too tight, and a block that is uncomfortable to look at is the worse trade. The consequence is recorded rather than hidden — inside the band the Alert title sits ~5px right of the row text, and that is accepted.

**The triangle belongs to warning and nothing else.** It was on error for a while, so the same failure carried a triangle in the band and a circle in the thread and read as two different events. Error took the circled cross — Toast's error mark — and the triangle moved to warning, where a coin glyph had been standing in for it.

**The glyph is not nudged down.** The glyph box is 16px and the title's line box is 16px, so they align by *being the same box*. The half-step it used to carry pushed it below the word it belongs to.

**Actions carry a leading glyph.** Every alert action is a verb, in a band that is otherwise prose. The primary sits LAST, on the right (house rule), so secondary choices are read first and the commitment is read last.

## Token map

| Slot | Token | Note |
|---|---|---|
| accent | `--alert-accent` | local property; each variant points it at a semantic that already exists |
| success | `--fb-green` | = `.toast.var-success` |
| info | `--brand-tertiary` | Toast uses `--brand-primary`; see departure 1 |
| warning | `--fb-attention` | = `.toast.var-warning` |
| error | `--fb-red-text` | = `.toast.var-error` |
| neutral | `--ink-secondary` on `--surface-card2` | Alert-only |
| wash strength | `--alert-wash` | `--tint-5` light, `--tint-8` dark — the same step Toast makes |
| hairline | accent · `--tint-30` | = `--toast-border-*` |
| title | `Title/12` on `Text/Primary` | |
| description | `Body/S` on `Text/Secondary` | |
| glyph | `--icon-sm` | |

**No new colour tokens.** Every accent is a semantic the kit already had. `--alert-wash` is the one addition and it carries a strength, not a colour.

## No change (—)

Radius, gap, typography scale, focus handling and motion are inherited from existing kit tokens; nothing bespoke. Padding is the one dimension with a decision behind it — see above.

## Accessibility self-check

- `role="status"`, not `role="alert"`: these announce a state change politely and must not interrupt. A true `alert` is for something that cannot wait, which none of these are.
- **The reason survives without colour** (WCAG 1.4.1): five distinct glyph *shapes* carry it before any accent does.
- Glyph contrast against the wash clears 3:1 in both themes for every variant; the title and description ride on `Text/Primary` / `Text/Secondary`, which clear AA on every kit surface.
- The glyph is `aria-hidden` — it duplicates the title, and a screen reader that reads both says the same thing twice.
- Under `sm` the actions drop under the copy instead of squeezing it into a column of single words.

## 2026-10-06 — Alert becomes the plan-state notice (U4 / U6)

Two surfaces that were built as gradient banners are now Alerts, with no change to the component
itself:

| Surface | Variant | Why the swap |
|---|---|---|
| **U4 — read-only notice** (Metrics, My Connections) | `.alert.alert-warn` | A gradient strip reads as an offer, and the eye files offers with marketing. This is a state of the person's own account, so it takes the component the product already uses for "something here is not normal". |
| **U6 — connections paused in a chat** (`.cl-u6`) | `.alert.alert-warn` | Same statement, inside a thread. The page sets position only (`width`, `max-width`, `margin`); every other value is the component's. |

**Warning, not error or info.** Nothing is broken and nothing was lost — but a constraint the
person has not met is attention, and the family's triangle is the glyph that says so. The eye glyph
tried first belonged to no variant.

**The action differs by context, and that is deliberate.** Above a table the upgrade is an inline
`.link` inside the description — a button there would be a third control in a row that already has
two. Inside a chat it is a real `.btn.btn-secondary.btn-xs` in `.alert-acts`, because a link inside
a sentence reads as part of the conversation. Both dismiss with an `.iconbtn.iconbtn-tertiary.iconbtn-2xs`
labelled **Dismiss** (not "Collapse": it goes away, it does not fold to a stub).

## 2026-10-06 — two sizes, S and M

An Alert does two jobs and they do not want the same type. Inside another component — a queue
band, a card — it is a footnote and reads at 12. Standing on a page above a table, speaking about
the whole screen, it occupies a full row, and 12px there is a whisper from something large.

| | S (default) | M (`.alert.is-md`) |
|---|---|---|
| Title | `Title/12` | `Title/14` |
| Description | `Body/S` (12) | `Body/M` (14) |
| Glyph | 16px | 20px — same stroke, only the box steps |
| Padding / gap | 10/12 · 10 | 12/14 · 12 |

S stays the default because every inline use predates M. **Every rung moves together** — type,
glyph and padding — so M is a size, not a bigger font.

**In use:** the read-only notice on Metrics and on My Connections is `is-md`; the paused-connections
card inside a chat thread stays S, because there it sits in a conversation rather than over it.

**Both sizes carry the same stroke (2026-10-06).** A 1.5 / 2 pair lived here for a day, on the
argument that a glyph at 16px with stroke 2 is ~20% heavier relative to its box than the same glyph
at 20px. It was dropped the same day: prod draws every UI glyph at one weight, and an Alert whose
glyph is lighter than the button beside it reads as a different icon set, not as a smaller alert.
Only the BOX steps — 16px at S, 20px at M — and the stroke stays `--icon-stroke`. The Devart UI
Alert made the same move in the same pass, so the package and the kit agree.

## Illustration — the opt-in leading mark (2026-10-06)

`.alert-illu` wraps the glyph in a round plate of its own colour. It is for an alert that names a
**thing** — credits, connections, metrics — rather than a severity: a warning triangle says only
"something is wrong", while the plate puts the subject first and the title says what happened to it.
Prod's *"You've run out of credits"* notice is the reference.

| | S | M |
|---|---|---|
| Plate | 32px | 40px |
| Glyph | `--icon-sm` | `--icon-lg` |

- **Fill only.** No border, no shadow — both were tried and rejected the same day.
- **The fill is the glyph's own colour at `--tint-15`**, composed from `currentColor` on the plate.
  No per-variant fill map and no new token: it follows `--alert-accent` and the theme by itself.
- **The glyph keeps the size it has bare.** The plate is the new thing, not a bigger mark, and the
  stroke stays `--icon-stroke` at both sizes.
- **The row centres on the plate** (`.alert:has(.alert-illu){align-items:center}`), because a plate
  is taller than the title's line box and top-aligning hangs the text off its edge.
- **Decorative** — `aria-hidden`, like the bare glyph. The title has to name the condition itself.

Devart UI ships the same thing as Alert's `illustration` prop (the caller passes only the glyph,
never a colour; `illustration` wins if `icon` is also passed).

**Consumers.** The three read-only notices: connections paused on the Connections page and inside
the chat that used them, and metrics read-only on the Metrics page. Each carries its own subject
glyph — `#mi-connections`, `#mi-metrics` — not the warning triangle they shared before.

## The dismiss aligns to the top; an action does not (2026-10-08)

Both live in `.alert-acts`, and the group is centred on the block — right for a button, wrong for
a ✕. A dismiss is a **corner affordance**: it belongs level with the top of the message, which is
where [Banner](Banner.md)'s `.banner-close` already sits. Centred on a two-line alert it drifts
into the middle of the paragraph and stops reading as the thing that closes it.

`.alert-x` marks the dismiss and `.alert-acts:has(> .alert-x)` lifts the group. An action button
keeps the centring: it answers the whole alert, and top-aligning it reads as having slipped upward
— that was tried and reverted on 2026-09-30, and this rule does not undo it, because the two cases
are told apart by the class rather than by the alert.
