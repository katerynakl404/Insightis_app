# Queue Band — prod → expected

Baseline: [`../current/QueueBand.md`](../current/QueueBand.md) — **new component, nothing on prod to diff against.** Storybook: [`#queueband`](../insightis-preview-kit.html#queueband). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html). Spec: AIINS-1808.

The strip between the conversation and the composer that holds follow-up questions typed while the assistant is still answering. Prod has nowhere to put them: while a reply streams, Send becomes Stop and submission is blocked, so text typed during a reply has no stated fate at all.

## The decisions

**It is part of the composer, not a tray on top of it.** Same surface family, same corner (`--radius-3xl`), sitting directly above it — band and composer read as one stack. An earlier version used the darker `--surface-card2` to separate the two; measured against the page it came out at 1.05:1, which is not a separation, it is a smudge. The contrast that matters is carried by the rows on hover, not by the tray.

**It renders only when it holds something.** No empty frame, no zero-height placeholder. The space above the composer is the most-used area of the product and is never spent on a container with nothing in it. "Empty queue" is therefore not a state of this component; it is the component's absence.

**The header never reacts to the streamed text.** It says the count and when the queue leaves, and keeps saying it while a tool or Python call runs — an answer that looks finished is not a finished turn.

**There is no maximum.** The count is a sentence, not a badge counting toward a ceiling. An earlier version showed `n / 10` from the first message on the reasoning that a limit on screen from the start reads as a rule rather than a fault. The limit itself was then dropped from the feature, and with it the whole apparatus: no `n / 10`, no attention badge at the top, no disabled Send confirming a ceiling, and no "queue full" state. A queue that cannot fill cannot have a full state.

**Collapsed height is measured, not counted.** The list stands three rows tall and scrolls. Whether anything is hidden is decided by measuring the box — `kit-kit.js` sets `.is-clipped` — never by counting rows, because a row count stopped meaning anything once rows wrap: three rows can overflow and five can fit.

**Expand points up, and it exists only when there is something to expand.** The panel grows upward out of the composer, so the arrow points the way the panel will move; it turns back down once open. When nothing is clipped the control is *absent*, not disabled — there is nothing for it to do.

**Expanded, the list takes the band's ceiling, not its own.** `50vh`: the queue and the conversation get the same room and neither reads as the subordinate one. The list had been capped at eight nominal rows, which is four real ones when the text is long — that is how Expand came to barely expand.

**The bottom edge fades as a mask on the scroller, not a gradient over it.** An overlay tints the text it covers, and dark letters under a white wash go muddy rather than faint, which reads as blur; it also stops at its own box while the scroller keeps clipping lower, so a hard line survives under the soft one. A mask fades the glyphs themselves and ends exactly where the scroll box ends. Both edges fade, because a scroller that has been scrolled has content above it too.

**Paused, the queue steps back.** The [Alert](Alert.md) states the reason and the count and the rows fold away, so the thing that actually needs doing is the only thing competing for attention. They stay reachable — everything is editable until it is sent, so this is a disclosure, not a lockout. **Clear Queue appears only on neutral pauses**, where stopping was the person's own doing; on an error or a credits pause, clearing is not the next thing anyone wants.

**A removal leaves a note in the gap it made.** Not at the top of the list, where it read as a new event arriving rather than as the hole where something was. Several removals are several notes, each in its own place with its own Undo and its own clock. Each leaves on its own after `--undo-window` — the same time a Toast gives, because an undo that floats past and an undo that sits in a list have to give the same amount of time.

**A removal is one move, not two.** The note replaces the row *in place*: the box stays and only the contents cross over, with the height moving between the two and never through zero. Collapsing to nothing and then expanding again reads as two events — the list closes a gap and then tears it back open. Undo is the same move reversed. See the kit's `row-swap-in` / `row-swap-out`, mirroring the design system's keyframes of the same names.

## Token map

| Slot | Token |
|---|---|
| tray | `--surface-card` on `--stroke-border`, `--radius-3xl` |
| header | `Label/M`, `--ink-secondary`; glyph `--icon-sm` at `--ink-inactive` |
| note | `Label/M` — the header's own weight, so the two annotations in the band match |
| ceiling | `50vh` on the band; the list sets none of its own |
| fade | `--scroll-fade-h` / `--scroll-fade-top`, the design system's `ScrollShadow` size |
| undo window | `--undo-window` |
| leaving / arriving | `row-out`, `row-in`, `row-swap-out`, `row-swap-in` |

## No change (—)

Nothing: there is no prod counterpart.

## Accessibility self-check

- `role="region"` with an accessible name, so the band is reachable as a landmark rather than as loose content above the field.
- Every row is editable and removable from the keyboard; controls are revealed by `focus-within`, never by hover alone.
- Removal, undo and clearing are announced through the page's live region; the announcement is built from the captured message, not read back from state after the re-render.
- Expand carries `aria-expanded` and an `aria-label` that names the action, not the glyph.
- Every animation has a reduced-motion path that shortens it to one frame rather than removing it — the retirement is driven by the animation's own end, so removing the animation would remove the retirement with it.
