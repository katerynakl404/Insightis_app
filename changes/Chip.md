# Chip — prod → expected

Single-select filter pill. Pill shape (radius `full`), height `1.75rem` (28px).

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | bg transparent, border `Stroke/Border` `#F0F5FA`, text `--ink-body` | — | bg `--card`, border `--border`, text `--ink-body` | Card surface with light border at rest |
| Hover | bg `State/Hover`, border `--border-hover`, text `--ink` | — | bg `State/Hover`, no border | Hover surface, still no border |
| **Active (selected)** | bg `color-mix(Brand/Primary @20%, transparent)` · border `--p-primary` · text `--p-primary` — **alpha tint** | — | bg `--state-pressed` · border `--ink-highlight` · text `--ink-highlight`; `cursor: default` — no hover | Outlined + pressed-surface fill; active is non-interactive (locked state) |
| Active · Hover | same teal alpha tint | — | locked — same as Active | Active chip has no hover state |
| Focus | browser default (no ring) | — | ring `0 0 0 2px --card, 0 0 0 4px --focus-ring-brand` | Brand-tinted focus ring; matches Button / IconButton |
| Disabled | `opacity: .5` | — | `opacity: var(--opacity-disabled)` (.65) | Reusable token; .65 chosen to remain legible |
| `.chip-n` count | `--ink-inactive` rest · alpha-tint text when active | — | `--ink-inactive` rest · 70% `--ink-highlight` when active | Matches the active border/text token |

## No change (—)
Radius `full`, height `1.75rem` (28px), padding `0 .75rem`, font `.8125rem` / weight 500, hover surface `State/Hover`.
