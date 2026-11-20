Spacing from @devart/ui-react. Use via `window.DevartUI.Spacing` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A 4px grid. The step number **is** the unit: `4` = 16px, `6` = 24px.

| Step | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| px | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96 |

Every value must land on a step. An arbitrary `p-[0.92rem]` is always wrong — if
nothing fits, that argues for a token, not a literal.

Half-steps (`px`, `0.5`, `1.5`, `2.5`, `3.5`) exist for **control internals
only** — icon gaps, chip padding, a field's own insets. Never use them for page
or section rhythm.

Typical page rhythm: page padding `p-6`, section gap `gap-6`, related-element
gap `gap-4`, tight cluster `gap-2`.
