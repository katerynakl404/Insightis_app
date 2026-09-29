# Queue Item — prod → expected

Baseline: [`../current/QueueItem.md`](../current/QueueItem.md) — **new component, nothing on prod to diff against.** Storybook: [`#queueitem`](../insightis-preview-kit.html#queueitem). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (states C1–C6). Spec: AIINS-1808.

One waiting message inside the [Queue Band](QueueBand.md): an order number, one truncated line of text, and three actions that appear when the row is hovered or holds focus.

## Why it looks like this

**The row must never read as an input.** Three properties carry that: no border, no fill of its own (it inherits the band's tray), and `cursor: default`. Everything that would make it look like a field — a box outline, a card surface, a text cursor — is deliberately absent, and the one state that *is* a field (C2, editing) is deliberately bordered so the difference is unmissable.

**The number is content, not decoration.** Order decides what gets asked next, so the number sits at `--ink-secondary`, not `--ink-inactive` — the inactive step measures 3.13:1 on the band and fails the 4.5:1 floor for 12px text. It stays a clear step below the message itself (5.03:1 vs 9.45:1).

**Three visible controls, not four.** Grip · Edit · row menu. Remove lives inside the menu with `.mi.danger` rather than as a fourth always-on icon, because the row is 32px tall and a four-icon cluster turns a list line into a toolbar — and because Remove here is cheap to undo (C4), so it does not need to be the fastest thing on the row. The menu is also the slot spec §09 asks to reserve for the phase-2 **Send now**, so adding that later costs nothing.

**Reordering has three routes, not one.** Drag (pointer), `Alt`+`↑`/`↓` (keyboard, on the focused row), Move up / Move down in the menu (touch, and anyone who prefers a button). Drag alone would leave the feature unusable on a phone and unreachable by keyboard.

## Composition — no new primitives

| Part | What it actually is |
|---|---|
| `Next` marker | `.badge.badge-sm.badge-primary` |
| Attachment chip | `.badge.badge-sm.badge-secondary` + `.mqi-file` (cap + truncate only) |
| Attachment lost after reload | the same chip in `.badge-attention` with an alert glyph |
| Edit / row-menu buttons | `.iconbtn.iconbtn-tertiary.iconbtn-2xs` |
| Row menu | kit `[data-kbp]` + `.kbp-menu` + `.menu` / `.mi` / `.mi.danger` |
| Edit field | `.ta` (TextArea) |
| Save / Cancel / Undo | `.btn` at `btn-xs` |

`.mqi-file` and `.mqi-file-name` are the only additions, and they add nothing but a width cap and ellipsis.

## State stacking

`.mqi` sits inside `.mqb`, which never changes background on interaction — so the row is **standalone interactive** and takes the neutral `--state-hover`. Its nested IconButtons keep their own neutral hover for the same reason the ChatRow kebab does: the overlays stack, so the button still reads as a distinct surface on a hovered row, and a brand-tinted copy would only differ on dark.

## DOM / markup contract

- `<li class="mqi" tabindex="0" data-tip="{full text}">` — the row is a tab stop, then its controls are. Editing rows and Undo strips are **not** tab stops; they hand focus to their own field / button.
- Order: `<button class="mqi-grip" aria-label="Drag to reorder" tabindex="-1">` · `<span class="mqi-num">` · `<span class="mqi-text">` · optional `Next` badge · optional file badge · `<span class="mqi-acts">` with Edit, the `[data-kbp]` trigger and its `.kbp-menu`.
- Editing: `.mqi.is-editing` swaps to a 2-column grid — number, then `<div class="mqi-edit">` with the `.ta`, a `.mqi-hint` and the Cancel / Save pair.
- Held (C5): `.mqi.is-editing.is-held`; Save relabels to `Save & send`.
- Reorder: `.mqi.is-dragging` on the lifted row, `<li class="mqi-drop">` as the landing slot.
- Removed: `.mqi.is-removed` holding the row's place with the quoted text and an Undo `.btn-tertiary.btn-xs`.
- Motion: `.is-entering` / `.is-sending` are applied for the duration of one animation and then removed by the consumer.

## Copy

| Where | Text |
|---|---|
| aria-labels | `Edit queued message` · `Remove from queue` · `Move up` · `Move down` · `Drag to reorder` |
| Edit hint / buttons | `Enter to save · Esc to cancel` · `Save` · `Cancel` |
| Turn held mid-edit | `Your turn is held — sends when you save` · `Save & send` |
| Removed | `Removed “{text}”` · `Undo` |
| Attachment lost | `{file} — attach again` |

## Motion

**Taken from prod, not invented.** The live app animates every appearance with `tailwindcss-animate`: `.animate-in` is `@keyframes enter` at `animation-duration: .15s` (default easing), `.fade-in-0` sets opacity from 0 and `.slide-in-from-bottom-1` sets `--tw-enter-translate-y: 0.25rem`. So a queued row enters with **4px of travel over 150ms**, and leaves through the mirrored `exit` — `mq-enter` / `mq-exit` are those two keyframes written out in plain CSS. Read from the live app and from `ds-bundle/_ds_bundle.css` on 2026-09-29. The streaming caret is prod's `caret-blink` verbatim (`1.25s ease-out infinite`, stops at 0/70/100 → 1 and 20/50 → 0). Under `prefers-reduced-motion` the animations are dropped and the row is still added and removed — prod's own `motion-safe:` / `motion-reduce:animate-none` pairing.

⚠ One prod value the kit cannot express: prod reveals row actions over `transition-opacity duration-150`, and the kit's micro-feedback step is `--motion-fast` (120ms). The reveal uses the kit token rather than a one-off 150ms — the kit's motion scale is its own agreed contract, and reconciling it with prod's 100/150 steps is a separate decision, not something to settle inside this component.

## Open — needs a decision before this is final

**Q4 · cancelling an edit while the turn is held (C5).** Built as: Cancel sends the **original** text immediately, as though the edit had never started. The alternative — hold for a manual Resume — is safer but leaves a queue stopped by an action the person read as "never mind".

## Accessibility self-check

- Message text **9.45:1** light · **14.49:1** dark. Order number **5.03:1** / **10.81:1** (raised from Text/Inactive's failing 3.13:1 — see above).
- Grip glyph uses `--ink-icon`, clearing the 3:1 non-text floor on the hovered row, where Text/Inactive dipped under it.
- Hit targets: grip 24×32, IconButtons 24×24 — at the 2.5.8 minimum. Below 1024px grip and actions are permanently visible — prod's own rule for message actions is `lg:opacity-0 … group-hover:opacity-100`, i.e. hover-reveal only from `lg` up, which also covers every touch device without a hover query.
- Everything is reachable by keyboard: Tab to the row, Tab through its controls, `Alt`+`↑`/`↓` to reorder, `Delete` to remove, Enter / Esc inside the edit field.
- The `Next` marker is a labelled badge, not a colour — the order number says the same thing again (1.4.1).
- ⚠ Focus management is a consumer requirement the component cannot enforce: when a row leaves the queue, focus must move to the next row or back to the composer, never to `<body>`. Implemented on the concept page; note it in the front-end handoff.
