# Queue Pause — prod → expected

Baseline: [`../current/QueuePause.md`](../current/QueuePause.md) — **new component, nothing on prod to diff against.** Storybook: [`#queuepause`](../insightis-preview-kit.html#queuepause). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (states D1–D5, E2). Spec: AIINS-1808.

The block that takes the [Queue Band](QueueBand.md)'s header slot when the queue stops. Four pause reasons plus two non-pause notices, all one shape.

## Why four states and not one label

A shared *"Paused"* makes the reader guess, and guessing is expensive here: the action that clears the pause is different every single time — answer a card, retry, buy credits, or just resume. So each state has to do four things at once: name the reason, offer the way out, show Resume, and say plainly that nothing was lost and nothing was charged.

They also have to be **one system**. Four bespoke blocks would read as four unrelated warnings appearing in the same slot.

## How one property does all of it

Everything that differs between variants flows through a single local custom property, `--mqp-accent`, which each variant points at an existing semantic token. The glyph colour, the inset rail and the surface wash all read it:

```
background: color-mix(in srgb, var(--mqp-accent) var(--tint-5), transparent);
box-shadow: inset var(--mq-rail) 0 0 0 var(--mqp-accent);
```

That is the sanctioned tint recipe — a semantic base plus a `--tint-N` step, no literal percentage. **These are deliberately not four `:root` tokens**: each would be a pure alias of a semantic that already exists (`--brand-primary`, `--fb-red-text`, `--fb-attention-text`, `--ink-secondary`), which the colour-token rules call drift, not reuse. Composing at the use site also lets the wash resolve against the element's own cascaded bases, so `.dark` needs no second declaration.

Consequence worth knowing: the live Spec panel prints that background as a raw `color(srgb …)` because a composited wash has no token to map back to. Every other `color-mix` wash in the kit reads the same way (compare Badge's border-color) — it is a limit of the inspector, not an untokenised value.

## Telling them apart without reading

| ID | Reason | Glyph **shape** | Accent | Primary action | Resume |
|---|---|---|---|---|---|
| D1 | Confirmation Card waiting | question circle | `--brand-primary` | Go to question | disabled until answered |
| D1b | card answered | check circle | `--brand-primary` | Resume | — |
| D2 | last reply failed | warning triangle | `--fb-red-text` | Retry | available |
| D3 | out of credits | coin | `--fb-attention-text` | Buy credits | disabled while the balance is zero |
| D4 | you pressed Stop | stop square | `--ink-secondary` | Resume | — |
| D5 | resumed mid-reply | play circle | `--brand-primary` | — (no buttons) | — |
| E2 | restored after reload | history arrow | `--fb-attention-text` | Resume | — |

Four different silhouettes, four accents, four different primary actions. D4 is the neutral member on purpose: the person stopped the reply themselves, so nothing went wrong and nothing should look like it did. D2 is the only one drawn as an error, because it is the only one that is one.

Two rules the buttons encode rather than state: **Resume is always manual** (R7) — the queue never restarts itself behind someone's back — and **Resume is disabled, not hidden, where it cannot work** (D1, D3), so the control's absence never has to be interpreted. D3's disabled Resume also matters commercially: the queue must not become a way around the zero-balance spend block.

## DOM / markup contract

- `<div class="mqp is-{confirm|error|credits|stopped|resumed|restored}" role="status">`.
- `.mqp-ic` glyph (`aria-hidden`) · `.mqp-body` with `.mqp-t` and optional `.mqp-d` · optional `.mqp-acts`.
- Actions are plain `.btn` at `btn-xs`: primary first (`.btn-primary`), Resume last (`.btn-secondary`, or `.btn-primary` when it *is* the primary action). Disabled Resume uses the native `disabled` attribute.
- The block replaces the band's `.mqb-head` — it is never stacked beside it.
- D5 and E2 reuse the shell with no `.mqp-acts` (D5) or a single Resume (E2); they are notices, not prompts.

## Copy

| Where | Text |
|---|---|
| D1 | `Queue paused · waiting for your answer above` |
| D1b | `You answered — resume when ready` |
| D2 | `Queue paused · the last reply didn’t finish` |
| D3 | `Queue paused · you’re out of credits` |
| D4 | `Queue paused because you stopped the reply` |
| D5 | `Resumed · sends after this reply` |
| E2 | `Restored {n} queued messages` + `“{file}” wasn’t kept — attach it again` |
| All pauses (description) | `{n} messages kept · nothing sent or charged` |
| Buttons | `Go to question` · `Retry` · `Buy credits` · `Resume` |

The reassurance line is identical in all four and sits in the same place every time — it is the sentence people look for in D3, and repeating it verbatim is what makes it findable.

Term check: the interface says **credits** (Buy credits, Credit usage), never tokens.

## Open — needs a decision before this is final

**Q2 · the queue's state after a reload.** Built as E2 = **paused**, with the running alternative implemented and switchable on the concept page. Paused costs one click; running risks firing a question the person has forgotten is there, right after the one moment they were least in control.

**Q5 · does the thread already render its own Retry on a failed answer?** If it does, D2 links to it instead of rendering a second one. Front-end to confirm — the block is drawn with its own Retry until then.

## Accessibility self-check

- Titles **16.3:1** light · **15.24:1** dark. Descriptions **5.03:1** / **10.81:1**. All over the 4.5:1 floor.
- Glyphs, measured against the band surface: D1 4.36 / 4.05 · D2 5.91 / 4.71 · D3 4.58 / 7.04 · D4 5.03 / 10.81 — every one over the 3:1 non-text floor in both themes.
- Reason is never carried by colour alone: distinct glyph shape + explicit sentence + a different primary action (1.4.1).
- `role="status"` announces the pause and its reason without stealing focus; the band's own region carries the same live politeness.
- Disabled Resume keeps its accessible name and stays perceivable — the adjacent text says why it cannot be used yet.
- The rail is a `box-shadow`, so it adds no layout shift when a pause appears; the appearance is a plain insert with no blink and no shake, per the spec's "a pause is not an error".
