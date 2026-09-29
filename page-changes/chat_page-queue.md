# Chat — message queue · Current → Expected

Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) · Spec: AIINS-1808 (epic INS-MJ9P, stories AIINS-1806 / 1810 / 1813).

This is **the chat screen**, not a feature mockup: the shell, sidebar, chat header, thread and composer are the approved `chat_page-landing.html`, and the queue is layered onto them. A **State** picker in the chat header drives this same page into every state the spec names (A1–A4, B0–B5, C1–C6, D1–D5, E1–E3), and `Live` leaves it free to interact with — type during a reply, queue, reorder, edit, delete with Undo, Stop, Resume, and all four pauses.

Everything visual comes from the kit. New components: [QueueBand](../changes/QueueBand.md) · [QueueItem](../changes/QueueItem.md) · [QueuePause](../changes/QueuePause.md). Composer change: [Button → Composer action slot](../changes/Button.md) — **one button, three faces**, overriding the spec's R4 on the design owner's call (2026-09-29).

## Motion is prod's, not ours

Every animation on this page is the value the live app already ships, read from `insightis-app.devart.info` and `ds-bundle/_ds_bundle.css` on 2026-09-29:

| What | Prod | Used for |
|---|---|---|
| appearance | `animate-in fade-in-0 slide-in-from-bottom-1` → `@keyframes enter`, **0.15s**, **4px** | a row entering the band |
| disappearance | `animate-out` → `@keyframes exit`, mirrored | a row leaving for the thread |
| streaming caret | `caret-blink 1.25s ease-out infinite` (0/70/100 → 1, 20/50 → 0) | the reply being written |
| hover reveal | `transition-opacity duration-150`, hidden only from `lg` up | row grip + actions |
| reduced motion | `motion-safe:` / `motion-reduce:animate-none` | all of the above |

The app has **no bespoke keyframes for messages** — nothing in the thread has a custom entrance — so the queue does not invent one either. ⚠ One gap stays open: prod reveals actions over 150ms and the kit's micro-feedback step is `--motion-fast` (120ms); the reveal uses the kit token, and reconciling the kit's motion scale with prod's 100/150 steps is a separate decision.

## Differences from the current chat screen

| Area | Current (prod) | Expected |
|---|---|---|
| Composer while a reply streams | Send is replaced by Stop in the same slot; Enter does nothing; typed text has no stated fate | **still one button in one slot**: Stop while the field is empty, Send the moment there is text; Enter queues; the placeholder says so |
| Between the thread and the composer | nothing | the Queue Band, rendered only when the queue is non-empty |
| Composer placeholder during a reply | unchanged from idle | `Ask a follow-up — it will wait its turn` |
| A stopped reply | the reply stops | the reply stops **and** the queue pauses with a named reason and a Resume |
| Input held during conversation compression (INS-ULRG) | its own, uncaptured surface | must move onto this same band — ⚠ open, see below |

Everything else on the chat screen — thread rendering, tool-call traces, Python execution, Confirmation Cards, attachments, connections and model dropdowns, message cost — is untouched. Editing or recalling an already-sent message stays out of scope, as does "Send now" (phase 2; the row menu reserves its slot).

## Layout rules this screen owns

- **The composer must not move when a row is added.** The band is stacked above the composer and the thread above it absorbs the height, so the band grows upward. This is the page's job, not the component's.
- **The band matches the composer width** (the same content column).
- Page `<style>` holds layout glue only: the composer column, the state picker, and the thread lines the queue flow appends. No selector in it restyles a kit class.

## ⚠ Open request to the kit — composer glue is on four pages, and they disagree

`.cl-composer`, `.cl-prompt`, `.cl-composer-foot`, `.cl-composer-tools` and `.cl-send` are page glue by the kit's current contract (the note above the composer-menu block in `kit-theme.css`). They are now copied into **four** pages: `chat-landing.html`, `chat_page-landing.html`, `chat_page-charts-landing.html` and this one.

The copies are **not** identical, which is exactly the failure the rule exists to prevent:

- `chat-landing.html` has no `position:relative` (the other three need it to anchor the @-mention popover), adds the glass treatment (`color-mix(--surface-card --tint-72)` + `backdrop-filter: blur(10px)`), and carries its own `@media` wrapping plus a `< 480px` icon-only Send.
- `chat_page-landing.html` and `chat_page-charts-landing.html` add `.cl-send[disabled]` keeping the Send button's active fill while disabled.
- `.cl-prompt` genuinely differs: `chat-landing` styles a `<textarea>` (`resize`, `::placeholder`), the rest style a contenteditable div (`max-height`, `overflow-y`, `white-space`, `word-break`, `:empty:before`).

Live prod, read 2026-09-29, matches the shared base and **ships the glass on the main chat composer too**: `rounded-2xl border-stroke bg-surface-card/[0.72] backdrop-blur-[10px] p-2 gap-2 transition-[border-color,box-shadow] duration-150 focus-within:border-input-focus`. So the glass is not a landing-only flourish — the kit rule should carry it and `chat_page-landing` is the page that is out of step with prod.

Proposal: lift the shared base into `kit-theme.css` (both `.cl-prompt` shapes), leave only the genuine per-page deltas behind. **Not done here** — it changes two approved pages, which needs sign-off.

`.cl-composer`, `.cl-prompt`, `.cl-composer-foot`, `.cl-composer-tools` and `.cl-send` are page glue by the kit's current contract (`kit-theme.css` note above the composer-menu block), and this page carries the third byte-identical copy after `chat-landing.html` and `chat_page-landing.html`. Three copies of one recipe is the drift the kit's own rules exist to prevent. Proposal: lift the set into `kit-theme.css` next to the composer-menu block in a separate pass. **Not done here** — it would change two approved pages, which needs sign-off first.

## ⚠ Open questions carried on the page

The spec leaves seven open. Three change what gets drawn, and both versions are built; Q7 and Q2 have their own entries in the State picker (`Q7 alt`, `Q2 alt`); the rest are noted where they bite.

| # | Question | Built as | Alternative on the page |
|---|---|---|---|
| Q7 | rows visible before the collapse | 3 desktop / 2 phone (state `B2`) | 5 desktop / 3 phone (state `Q7 alt`) |
| Q2 | the queue after a reload | paused, manual Resume (state `E2`) | continues on its own (state `Q2 alt`) |
| Q3 | a queue in another chat | counter badge in the chat list (E3) | — required part is that chat B never shows chat A's queue |
| Q1 | paused, no reply running, person types and presses Enter | appended to the end — a pause means "we are holding" | — |
| Q4 | cancelling an edit while the turn is held (C5) | the original text sends, as though the edit never started | — |
| Q5 | does the thread already have its own Retry on a failed answer? | D2 renders its own | if prod has one, D2 links to it instead — front-end to confirm |
| Q6 | what the compression-hold input looks like today | not captured | must end up on this same band |

## Responsive

- `< 768px` — the band clamps to 2 rows and tightens its padding; the composer action becomes a 40×40 icon square; row actions are permanently visible. Pick state **A4** and narrow the window to see it.
- `< 1024px` — the sidebar collapses into the off-canvas drawer (kit-owned), and the row grip + actions stop hiding behind hover — prod's own `lg:` rule.
- This is the real chat screen, so it inherits the approved page's responsive behaviour unchanged.

## Checks the spec asks for

- The four pauses are distinguishable without reading the text — different glyph **shape**, accent and primary action.
- A queue row cannot be mistaken for an input — borderless, transparent, `cursor: default`; the one state that is a field (C2) is bordered on a lifted surface.
- The composer action cannot be pressed by mistake — the slot shows Stop only while the field is empty, so it is never Stop when there is something to send. ⚠ Accepted consequence: with a draft in the field there is no Stop (see [Button](../changes/Button.md)).
- The composer does not jump when a row is added — the band grows upward into the thread.
