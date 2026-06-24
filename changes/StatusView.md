# StatusView — change

Prod ships only the **card** StatusView (`.statv`): a tinted icon circle on a bordered
`bg-card` block (see `../current/StatusView.md`). Expected **adds** a minimalist, app-style
companion variant `.empty-state` for search / filter "no results" and first-run empty lists —
no card, no tinted circle, just a plain line glyph + title + message centred on the page bg.
It is the shared single source of truth for chats, connections, and metrics empty states.

| Part | Current (prod) | Expected (`.empty-state`) | Specification |
|---|---|---|---|
| Container | `.statv` — bordered card, `bg-card`, radius `lg`, fixed width, `gap-3` | borderless, transparent, full-region; `display:flex` column, centred, `gap:.5rem`, `padding:3rem 1.5rem` | sits directly on the page bg — no surface chrome |
| Illustration | tinted circle `size-10/14`, bg `brand/green/red @10%`, glyph in the variant colour | `.es-illu` — a 150px "fading result cards" SVG: a crisp top row card fading into two ghosts (`opacity .55` / `.28`). Mirrors the shape of the list/grid it replaces | cards `fill:var(--card)` + `stroke:var(--border)`; placeholders `fill:var(--ink-inactive)` (`.es-ph` @ .35, `.es-ph-ic` @ .55); only `.es-card-top` carries a drop-shadow. **No literal magnifier** — the title carries the "search" meaning |
| First-run glyph | — | first-run empty (e.g. chats "no conversations yet") keeps a simple 48px line glyph via `.empty-ic` (`--ink-inactive`) | distinct from the search-empty illustration; pairs with the `.btn` CTA |
| Title | `.vt` — 14/500, `Text/Primary` | `.empty-title` — 16/600, `Text/Primary` (`--ink`), `line-height:1.5rem` | short ("No matches", "No conversations yet") |
| Message | `.vd` — 12, `Text/Secondary` | `.empty-msg` — 14, `Text/Secondary` (`--ink-secondary`), `max-width:32ch`, `line-height:1.25rem` | one-line guidance ("Try a different term or clear the filters.") |
| CTA | — | optional trailing `.btn` with `margin-top:.75rem` | first-run only (e.g. chats "New Chat"); omitted for search-no-match |
| Variants | info / success / error / neutral | — | the minimalist variant is single-tone (neutral); status colour belongs to the card `.statv` |

## Token map (`.empty-state`)

| Property | Token |
|---|---|
| Illustration card fill | `var(--card)` (`.es-card`) |
| Illustration card border | `var(--border)` (`.es-card`) |
| Illustration placeholders | `var(--ink-inactive)` (`.es-ph` @ .35, `.es-ph-ic` @ .55) |
| Top-card shadow | `drop-shadow(0 2px 5px rgba(15,23,42,.10))` (`.es-card-top`) |
| First-run glyph colour | `var(--ink-inactive)` (`.empty-ic`) |
| Title colour | `var(--ink)` |
| Message colour | `var(--ink-secondary)` |
| CTA | inherits `.btn` (`.btn-secondary` in first-run) |

All colour tokens are theme-aware, so the variant needs **no `.dark` override** — the cards
re-theme to the dark `--card`/`--border` surfaces automatically.

The illustration design is grounded in modern design-system practice (Supabase: empty state
mirrors the data structure it replaces; Vercel Geist: layered/"built" card depth) rather than
a generic stock magnifier glyph.

## Consumers

- **Chats** (`pages/concept/chats-landing.html`) — search-empty (fading result cards) + first-run empty (chat-bubble `.empty-ic` + "New Chat" CTA). Migrated from the page-local `.chat-list-empty` recipe to the shared kit class.
- **Connections** (`pages/concept/data-sources_connections-landing.html`) — replaces the prior plain inline-text "No connectors match your filters." with the illustration empty-state, grid-spanning via a neutral wrapper.
- **Metrics** (`pages/concept/metrics-landing.html`) — "All metrics" table search/filter now swaps the table for the empty-state when nothing matches (previously left a blank region).

## Accessibility self-check

- Container carries `role="status"`; the illustration / glyph is `aria-hidden`. PASS
- Title `--ink` and message `--ink-secondary` both meet ≥ 4.5:1 against the page bg (same tokens used for body text elsewhere). PASS
- The illustration is decorative (`aria-hidden`), so its low-contrast cards/placeholders are exempt from contrast minimums; meaning is carried by the title + message text. PASS
- No interactive element other than the optional `.btn`, which keeps its own focus-visible ring from `.btn`. PASS
