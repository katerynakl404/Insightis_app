# Counter — prod → expected

Baseline: [`../current/Counter.md`](../current/Counter.md). Storybook: [`#counter`](../insightis-preview-kit.html#counter). Mirrors `Counter` in `@devart/ui-react`. Consumers: [QueueItem](QueueItem.md) (the order number), [Sidebar](Sidebar.md) (the per-chat queue count).

A small round count, for wherever the product says *"N of these are waiting"*.

## Why it is not a Badge

A [Badge](Badge.md) labels a thing — "Recommended", "Beta", "12 sources" — and sizes itself to its label, which is exactly why it is a pill. A counter holds a **number**, the number is the whole content, and it keeps a **1:1 box**: a column of counts has to read as a column, and a row of differently-wide pills does not. A second digit therefore does not widen it — the kit's rule for every mark, here too.

## Why it exists at all

The same object had grown twice inside one feature: the order number on a queued message, and the per-chat count in the sidebar. One was a 20px circle, the other a padded pill, and nothing said they were the same thing. They are.

## Two states, and no more

| State | Reads as | Tokens |
|---|---|---|
| default | *this is a number* | `--surface-card2` + `--ink-body` |
| `.is-active` | *this is moving on its own right now* | `--btn-primary-bg` + `--btn-primary-text` |

A count is content, not a status, so the quiet one is the default. The filled one is reserved for the single meaning above — in the sidebar it says that chat's queue is still sending; a stopped queue goes back to quiet, which is the same grey the paused [Alert](Alert.md) stands on.

**The active fill is Button/Primary's pair, not `--brand-primary` raw.** White on Brand/Primary measures 3.93:1 on dark — under the 4.5:1 floor for 12px. The button's fill and ink are already maintained to stay legible in both themes, so this tracks them if the brand ever moves.

## Token map

| Slot | Token |
|---|---|
| box | 20px, `--radius-full` |
| type | `Label/M` at `line-height: 1` — the digit sits on the optical centre, not on a text baseline |
| digits | `font-variant-numeric: tabular-nums`, so a column lines up |
| default | `--surface-card2` / `--ink-body` |
| active | `--btn-primary-bg` / `--btn-primary-text` |

No new colour tokens.

## No change (—)

Nothing is bespoke: every value is an existing kit token, and the box matches the mark sizes already in use.

## Accessibility self-check

- Measured: **9.45:1** light · **14.49:1** dark at rest; **4.77:1** in both themes when active — all over the 4.5:1 floor for 12px text.
- The state is never carried by colour alone where it matters: in the sidebar the row's `title` says whether that queue is sending or paused, and the band itself states the reason in words.
- `tabular-nums` keeps the digit from shifting as the count changes, which matters when it updates under a reader.
- Decorative uses (the queue row's order number) are inside an `aria-hidden` lead — the row's own text is the announcement.
