# ChatRow — prod → expected

Baseline: [`../current/ChatRow.md`](../current/ChatRow.md).

⚠ **Current column is a placeholder.** The live `/chats` page at <https://insightis-app.devart.info/chats> exists but its rendered DOM was not captured (React SPA; static fetch returns only the empty `<div id="root">`). The Expected column below is well-defined against existing kit tokens, but the *diff* is not — every row currently says **⚠ pending** in the Current cell. Fill those cells in once a screenshot or DOM dump is available. **Do not interpret an empty Current cell as "this didn't exist on prod"** — assume the live page already renders some version of this row and the diff is yet to be measured.

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default (unpinned) | ⚠ pending | — | `.chat-row` is `position:relative`. bg `Surface/Card` (`--card`), border `1px solid color-mix(in srgb, var(--border) 45%, transparent)`, radius `.5rem` (8px), height `2.75rem` (44px), padding `0 .75rem`, text `--ink-body`, `font-size:.875rem; font-weight:500`, `cursor:pointer`, ghost shadow `box-shadow:var(--shadow-rest)` (`0 1px 2px 0 rgba(15,23,42,.03)`) at rest; checkbox slot `.cbx` **hidden** by default. Transition: `background-color`/`border-color`/`transform`/`box-shadow` over `var(--motion-slow) var(--motion-ease-out)`, `color` over `var(--motion-fast) var(--motion-ease)`. | layout: `display:flex; gap:.75rem; padding:0 .75rem; align-items:center`. Content order: `[cbx] [name] [pin?] …(margin-left:auto on time)… [time] [kebab]`. |
| Hover | ⚠ pending | — | bg `State/Hover` (`--state-hover`); border `--card-border-hover` (`color-mix(in srgb, var(--brand-primary) 25%, transparent)`); box-shadow lifts to `--shadow-card-hover` (`0 2px 6px -1px rgba(15,23,42,.08), 0 1px 2px 0 rgba(15,23,42,.04)`); `.chat-row-more` fades in (opacity 0 → 1). | same fade recipe as `.sbx-chat-more`; reveal triggers on `:hover`, explicit `.s-hover`, `:focus-within`, kebab `:focus-visible`, and kebab `aria-expanded="true"`. **Menu-open keeps hover:** `.chat-row:has(.chat-row-more[aria-expanded="true"])` is matched by the same hover rule so the row holds its hover bg/border/shadow while its menu is open. |
| Active / press | ⚠ pending | — | `transform:scale(.99)` (1% inward) + box-shadow reset to `--shadow-rest` so press doesn't stack depth on top of hover; bg/border stay at their hover values (single source of feedback). Excluded while a child control is being clicked: `.chat-row:active:not(:has(button:active)):not(:has(.cbx:active))`. Release eases back over `--motion-slow`/`--motion-ease-out` (from the base transition). | `prefers-reduced-motion`: base transition drops to `var(--motion-fast)`; press → `transform:none` (scale dropped), shadow kept at the ghost rest value `0 1px 2px 0 rgba(15,23,42,.03)` so hover+press still feels less stacked. |
| Selection mode | ⚠ pending | — | when ≥1 row is selected the parent `.chat-list` gets `.is-selecting` → `.chat-list.is-selecting .chat-row .cbx{display:inline-flex}` (slot was `display:none`). The selected row also gets `.is-selected` (or `.s-selected`) → bg `State/Pressed` (`--state-pressed`), border `--brand-primary`, box-shadow `var(--shadow-rest)` (rest-depth token; was a near-identical literal `rgba(15,23,42,.04)` — tokenised so UI shadows reference the elevation scale). Selected + hover → bg `color-mix(in srgb,var(--brand-primary) 10%,var(--state-pressed))`, border `--brand-primary`. Inside `.chat-row` the `.cbx` is forced `background:transparent` (so its default `--card` bg doesn't read as a card-on-card outline); checked re-asserts `.chat-row .cbx.on{background:var(--brand-primary)}`. | the list-level class is the source of truth; hover-only reveal is the entry point, persistent checkboxes are the in-mode state. Same `State/Pressed` token used by `tr.is-selected` in Table — row selection language unified across the kit. |
| Checked (checkbox on) | ⚠ pending | — | reuses `.cbx.on` — bg + border `Brand/Primary`, mark `Content/On_Solid` | no per-row override; full delegation to [Checkbox](../changes/Checkbox.md) |
| Focus-visible | ⚠ pending | — | `.chat-row:focus-visible{outline:none;box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--focus-ring)}` — **inner ring is `--bg`** (the page background the row sits on), not `--card`, so the gap matches the surrounding canvas. | matches `.btn:focus-visible` / `.iconbtn:focus-visible` ring shape (those use `--card` inner; the row uses `--bg` because rows sit directly on the page background). |
| Pinned | ⚠ pending | — | pin marker `.chat-row-pin` rendered **only on pinned rows**, inline after the title, filled `Brand/Primary` glyph. Button: `1.25rem × 1.25rem`, `border-radius:.25rem`, `background:transparent`, `border:none`, `color:var(--brand-primary)`, `padding:0`, `margin-left:-.125rem`; transition `color .12s, background-color .12s`. SVG `14×14`, `fill+stroke:currentColor`, `transform:rotate(30deg)` at rest (tilted pushpin), straightens to `rotate(0deg)` on `:hover`/`:focus-visible` over `var(--motion-base) var(--motion-ease)` (held without animation under `prefers-reduced-motion`). Hover bg `color-mix(in srgb,var(--brand-primary) 8%,transparent)` (brand-mix deliberate — neutral would vanish against the row's hover bg). Focus: `box-shadow:inset 0 0 0 2px var(--focus-ring)`. Clicking it unpins. Unpinned rows have **no** pin slot — pinning happens through the kebab menu ("Pin"). | active state shown by **placement + colour + fill** (icon only appears for pinned rows; filled vs absent). Passes 1.4.1 (not by colour alone). |
| Kebab (more) | ⚠ pending | — | `.chat-row-more` button: `1.5rem × 1.5rem` (24×24), `border-radius:.25rem`, `background:transparent`, `border:none`, `color:var(--ink-secondary)`, `padding:0`; SVG `14×14` (aligned with the kit's 14px action-icon norm — shared with `.sbx-chat-more`). Hidden at rest (`opacity:0; pointer-events:none`), transition `opacity .12s, color .12s, background-color .12s`. Reveal (`opacity:1; pointer-events:auto`) on row `:hover`/`.s-hover`/`:focus-within`, kebab `:focus-visible`, or `aria-expanded="true"`. Hover → `color:var(--ink-body); background:color-mix(in srgb,var(--brand-primary) 6%,transparent)`. `aria-expanded="true"` → `background:color-mix(in srgb,var(--brand-primary) 8%,transparent); color:var(--ink-body)`. Focus → `box-shadow:inset 0 0 0 2px var(--focus-ring)`. (Brand-mix deliberate — keeps the kebab visible as a distinct surface over the hovered row.) | tertiary icon button; same fade recipe as `.sbx-chat-more`. |
| Open menu | ⚠ pending | — | kebab anchors `.menu.chat-row-menu` dropdown: `position:absolute; top:calc(100% - .25rem); right:.25rem; z-index:30; display:none`, shown via sibling combinator `.chat-row-more[aria-expanded="true"] ~ .chat-row-menu{display:block}`. Parent list gets `overflow:visible` while open (`.chat-list:has(.chat-row-more[aria-expanded="true"])`) so the menu can escape its row. Shell reuses kit `.menu` / `.mi`; items: Pin/Unpin (label reflects current state), Rename, Delete (`.mi.danger` → `--fb-red-text`). Outside click + Esc close it; only one menu open at a time. | menu trigger uses `aria-haspopup="menu"` + `aria-expanded`. While open the row holds its hover state (see Hover row). |

## DOM / markup structure

Row container is a `<div class="chat-row">` (`position:relative`) wrapping, in source order:

```html
<div class="chat-row">                       <!-- add .is-selected / .s-selected when chosen -->
  <span class="cbx"></span>                  <!-- checkbox; hidden until .is-selecting; .cbx.on + checkmark <svg> when checked -->
  <span class="chat-row-name">…</span>        <!-- title; flex:0 1 auto, single-line ellipsis -->
  <button class="chat-row-pin" type="button" aria-label="Unpin" aria-pressed="true">…</button> <!-- ONLY when pinned; pushpin <svg> -->
  <span class="chat-row-time">…</span>        <!-- timestamp; margin-left:auto pushes it + kebab to the right edge -->
  <button class="chat-row-more" type="button" aria-label="More actions" aria-haspopup="menu" aria-expanded="false"> <!-- kebab; 3-dot vertical <svg> -->
    <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>
  </button>
  <div class="menu chat-row-menu">…</div>     <!-- context menu; shown via aria-expanded sibling rule -->
</div>
```

Rows are wrapped in a `.chat-list` container (no base styling of its own; carries `.is-selecting` in selection mode and gets `overflow:visible` when a menu is open). Typography: name inherits row `font-size:.875rem; font-weight:500; color:var(--ink-body)`; `.chat-row-name` is `flex:0 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap`. `.chat-row-time` is `font-size:.75rem; font-weight:400; color:var(--ink-secondary); font-variant-numeric:tabular-nums; flex:none`.

**Dark mode:** no `.chat-row`-specific overrides — all state colours flow through tokens (`--card`, `--border`, `--state-hover`, `--state-pressed`, `--card-border-hover`, `--brand-primary`, `--focus-ring`) whose dark values are defined at the theme level.

## Behaviour spec

- **Live search** — the page-level search input filters rows by name on `input` (no submit). Empty input shows all rows.
- **Select all / Deselect all** — `MetaRow` link toggles every row's `.cbx.on` / `.chat-row.is-selected`. Label flips to "Deselect all" when all visible rows are selected.
- **Pin toggle** — clicking the inline pin marker (visible only on pinned rows) unpins; the row reorders out of the pinned cluster. Pin from the kebab menu (visible on hover for any row).
- **Kebab actions** — `Pin` / `Unpin` (label reflects state), `Rename` (inline editable), `Delete` (destructive, danger token).
- **Single open menu** — clicking another row's kebab or anywhere outside closes the open menu.

## Page composition (chats-landing)

- Container `max-width: 960px`, centred, padding `0 2rem`. Rows sit on the page background (`--bg`) — no card, no border, no panel wrapper.
- MetaRow is fully transparent (no bg, no border).
- Sidebar is **not** duplicated — `pages/chats-landing.html` loads it from `pages/chat-landing.html` via `fetch()` at page load and injects the `<aside class="cl-side">` inner HTML. Single source of truth.

## No change (—)

n/a — new component.

## Token map used

`--card` (rest bg) · `--border` (45% mix → rest border) · `--ink-body` (default text, kebab hover colour) · `--state-hover` (hover bg) · `--state-pressed` (selected bg) · `--card-border-hover` (hover border = brand 25% mix) · `--brand-primary` (pinned marker colour, selected border, 8% mix for pin-hover + kebab-open tint, 6% mix for kebab-hover, 10% mix for selected+hover) · `--ink-secondary` (timestamp, default kebab colour) · `--focus-ring` (focus ring — outer ring of row, inset ring of pin/kebab) · `--bg` (**inner** ring of row focus-visible — not `--card`) · `--shadow-rest` (rest + press shadow) · `--shadow-card-hover` (hover lift shadow) · `--motion-slow`/`--motion-fast`/`--motion-base`/`--motion-ease-out`/`--motion-ease` (transitions) · `.cbx.on` (checked → `--brand-primary` + `--content-on-solid`) · `.mi.danger` (`--fb-red-text`). No new tokens introduced — every state composes from the existing palette.
