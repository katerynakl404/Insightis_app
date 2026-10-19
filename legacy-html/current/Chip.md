# Chip — current prod baseline

Single-select filter pill. Pill shape (radius `9999px`), height `1.75rem` (28px), padding `0 .75rem`.

| State | Prod value |
|---|---|
| Default | bg transparent, border `--border` (Slate-100 light / Grey-700 dark), text `--ink-body` |
| Hover | bg `State/Hover`, border `--border-hover`, text `--ink` |
| **Active (selected)** | bg `color-mix(Brand/Primary 20%, transparent)`, border + text `--p-primary` (teal alpha tint — no solid fill) |
| Active · Hover | same teal tint, slightly darker from `--p-gradh` bleed |
| Focus | no explicit ring (uses browser default) |
| Disabled | `opacity: .5`, pointer-events none |
| `.chip-n` count | `--ink-inactive` at rest, same alpha-tint teal text when active |
