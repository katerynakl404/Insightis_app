# Queue Item — prod → expected

Baseline: [`../current/QueueItem.md`](../current/QueueItem.md) — **new component, nothing on prod to diff against.** Storybook: [`#queueitem`](../insightis-preview-kit.html#queueitem). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html). Spec: AIINS-1808.

One waiting message inside the [Queue Band](QueueBand.md): an order number in a circle, one line of text, and two actions that appear when the row is hovered or holds focus.

## Why it looks like this

**The row must never read as an input.** Three properties carry that: no border, no fill of its own (it inherits the band's tray), and `cursor: default`. Everything that would make it look like a field — a box outline, a card surface, a text cursor — is deliberately absent. There is no editing state to blur the line either: **editing a queued message returns it to the composer** rather than turning the row into a field, so the band never contains anything typeable.

**The number is content, not decoration.** Order decides what gets asked next, so the number sits at `--ink-secondary`, not `--ink-inactive` — the inactive step measures 3.13:1 on the band and fails the 4.5:1 floor for 12px text. It stays a clear step below the message itself. It rides in a circle (`--surface-card2`, `--radius-full`) so a column of numbers reads as a column rather than as loose digits against prose.

**Two visible controls, not three.** Grip · Edit · Remove — and that is the whole set. An earlier version put Remove behind a kebab alongside Move up / Move down; the kebab is gone. Move up/down duplicated the grip and the keyboard path for a third time, and once they were removed the kebab held a single item, which is a menu that exists to hide one button. Remove is cheap to undo, so it does not need to be hidden behind anything.

**Reordering has two routes, not three.** Drag (pointer) and `Alt`+`↑`/`↓` (keyboard, on the focused row) — both from [SortableList](SortableList.md), which is kit behaviour rather than anything this component implements. Below 1024px the grip and actions are permanently visible, which is what covers touch.

## Composition — no new primitives

| Part | What it actually is |
|---|---|
| Order number | `.mqi-num` — a `--radius-full` circle on `--surface-card2` |
| Attachment chip | `.badge.badge-sm.badge-secondary` + `.mqi-file` (cap + truncate only) |
| Attachment lost after reload | the same chip in `.badge-attention` with an alert glyph |
| Edit / Remove buttons | `.iconbtn.iconbtn-tertiary.iconbtn-2xs` |
| Undo | `.btn.btn-tertiary.btn-xs` |
| Drag behaviour | [SortableList](SortableList.md) — `data-sortable` / `data-sort-item` / `data-sort-handle` |

`.mqi-file` and `.mqi-file-name` are the only additions, and they add nothing but a width cap and ellipsis.

## State stacking

`.mqi` sits inside `.mqb`, which never changes background on interaction — so the row is **standalone interactive** and takes the neutral `--state-hover`. Its nested IconButtons keep their own neutral hover for the same reason the ChatRow kebab does: the overlays stack, so the button still reads as a distinct surface on a hovered row, and a brand-tinted copy would only differ on dark.

## Padding is symmetric

The row once carried a negative right margin so the action icons could sit flush with the band's edge. It was reverted: the band's right padding then looked smaller than its left, and `+N more` hung off the edge. Left gap equals right gap, and the icons stop where the padding says they stop.

## DOM / markup contract

- `<li class="mqi" data-sort-item tabindex="0" data-tip="{full text}">` — the row is a tab stop, then its controls are. Undo strips are **not** tab stops; they hand focus to their own button.
- Order: `<span class="mqi-lead">` holding `<button class="mqi-grip" data-sort-handle aria-label="Drag to reorder">` and `<span class="mqi-num">` · `<span class="mqi-text">` · optional file badge · `<span class="mqi-acts">` with Edit and Remove.
- Reorder: `.mqi.is-dragging` on the lifted row, `<li class="sort-ph">` as the landing slot — both applied by `kit-kit.js`, not by the consumer.
- Removed: `.mqi.is-removed` holding the row's place with the quoted text and an Undo `.btn-tertiary.btn-xs`.
- Motion: `.is-entering` / `.is-sending` are applied for the duration of one animation and then removed by the consumer.

## Copy

| Where | Text |
|---|---|
| aria-labels | `Edit queued message` · `Remove from queue` · `Drag to reorder` |
| Removed | `Removed “{text}”` · `Undo` |
| Attachment lost | `{file} — attach again` |

## Motion

**Taken from prod, not invented.** The live app animates every appearance with `tailwindcss-animate`: `.animate-in` is `@keyframes enter` at `animation-duration: .15s` (default easing), `.fade-in-0` sets opacity from 0 and `.slide-in-from-bottom-1` sets `--tw-enter-translate-y: 0.25rem`. So a queued row enters with **4px of travel over 150ms**, and leaves through the mirrored `exit` — `mq-enter` / `mq-exit` are those two keyframes written out in plain CSS. Read from the live app and from `ds-bundle/_ds_bundle.css` on 2026-09-29. The streaming caret is prod's verbatim: a **1px hairline in the text's own colour**, one line-height tall, blinking on `caret-blink` (`1.25s ease-out infinite`) — not a coloured block. Under `prefers-reduced-motion` the animations are dropped and the row is still added and removed — prod's own `motion-safe:` / `motion-reduce:animate-none` pairing.

⚠ One prod value the kit cannot express: prod reveals row actions over `transition-opacity duration-150`, and the kit's micro-feedback step is `--motion-fast` (120ms). The reveal uses the kit token rather than a one-off 150ms — the kit's motion scale is its own agreed contract, and reconciling it with prod's 100/150 steps is a separate decision, not something to settle inside this component.

## No change (—)

Typography, hover recipe, IconButton sizing and focus treatment are the kit's existing contracts; nothing here overrides them.

## Accessibility self-check

- Message text **9.45:1** light · **14.49:1** dark. Order number **5.03:1** / **10.81:1** (raised from Text/Inactive's failing 3.13:1 — see above).
- Grip glyph uses `--ink-icon`, clearing the 3:1 non-text floor on the hovered row, where Text/Inactive dipped under it.
- Hit targets: grip 24×32, IconButtons 24×24 — at the 2.5.8 minimum. Below 1024px grip and actions are permanently visible — prod's own rule for message actions is `lg:opacity-0 … group-hover:opacity-100`, i.e. hover-reveal only from `lg` up, which also covers every touch device without a hover query.
- Everything is reachable by keyboard: Tab to the row, Tab through its controls, `Alt`+`↑`/`↓` to reorder, `Delete` to remove.
- ⚠ Focus management is a consumer requirement the component cannot enforce: when a row leaves the queue, focus must move to the next row or back to the composer, never to `<body>`. Implemented on the concept page; note it in the front-end handoff.
