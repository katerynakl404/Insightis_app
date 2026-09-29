# Thinking Indicator — prod → expected

Baseline: [`../current/ThinkingIndicator.md`](../current/ThinkingIndicator.md). Storybook: [`#thinking`](../insightis-preview-kit.html#thinking). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (state A2).

What the answer card holds while the reply is on its way.

## was → became

| | Current (prod) | Expected |
|---|---|---|
| Label | "Thinking" + three animated dots | unchanged |
| Below it | nothing | *(an interim version added a 3-line skeleton — removed, see below)* |
| The word | static | a highlight sweeps it |

## The skeleton that came and went

The label alone reads as a stray word inside a full-width answer card, so an interim version paired it with a three-line [Skeleton](Skeleton.md) of the reply, tapering 96% / 88% / 54%.

It was wrong and was removed the same day. The skeleton drew a shape nobody had written yet — a placeholder claiming to know the length of an answer that did not exist — and the card resized when the real reply turned out to be a table, or one sentence. It is recorded here because "the label is too quiet on its own" is a real observation and the next person will reach for the same fix.

**What the observation actually wanted was a bigger indicator, not a bigger placeholder.** So the animation moved onto the text it is about: a highlight sweeps the word. The indicator is now as big as the thing actually loading, and the card never reserves height it has to give back.

## Two implementation notes that are easy to get wrong

**The gradient tiles.** Clipped to text with `color:transparent`, any part of the word the background does not cover renders as *nothing at all*. A `no-repeat` image three times the width slides clean off the box at the end of each cycle, and the label vanished mid-sweep. Both ends of the gradient are the same ink, so tiling is seamless and the word is always fully painted.

**The word never types itself.** All three dots are always rendered and only their opacity cycles, so the label never changes width and nothing reflows beside it. An earlier version typed the word in letter by letter, which made the card twitch.

## Token map

| Slot | Token |
|---|---|
| label | `Body/M` on `Text/Secondary` |
| sweep crest | `Text/Primary` |
| dots | same ink, opacity `.25` → `1` |

The sweep is two inks that already exist — no new tokens, and no colour that is not already the label's.

## No change (—)

Placement, card padding, the word itself and the three-dot rhythm are prod's.

## Accessibility self-check

- The dots are `aria-hidden`; the word "Thinking" is the whole announcement, and a screen reader reading three periods adds nothing.
- Under `prefers-reduced-motion` the sweep stops **and the label falls back to a flat ink** — a clipped gradient left unanimated would freeze the word at a half-tone instead of showing it in its own colour. The dots hold at full opacity rather than at the low end of their cycle.
- `Text/Secondary` on `Surface/Card` clears AA in both themes; the sweep only ever lightens toward `Text/Primary`, so no frame is below the resting contrast.
