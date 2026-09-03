# UploadTray — new component

The progress plate raised during and after a file upload. Prod ships this behaviour (a "5 uploads
complete" plate at the bottom with a chevron and a ✕) but our kit and the Files spec had **no
component for it at all** — meaning we had never described what the product shows while files are
uploading, or what happens when one fails. This closes that gap.

**New component — no Current (prod) column.** Prod's plate is the behavioural reference we
reproduced, not a design baseline to diff against: it has no spec on our side to compare with.

Storybook: [`#uploadtray`](../insightis-preview-kit.html#uploadtray) · CSS: `pages/kit-theme.css` →
UploadTray block · Live consumer: [Data Sources → Files](../pages/approved/data-sources_files-landing.html).

## What it has to get right

**1. The whole bar except the ✕ is the expand target.** `.upl-head` is a real `<button>` at
`flex:1`, so it fills the plate; the ✕ is its **sibling** in `.upl-bar`, never a child. A button
nested inside a button is invalid HTML and unreachable by keyboard — which is exactly the trap this
layout is designed around. Consequences that fall out of it:

- Space / Enter on the bar toggles the list; the bar is in the tab order with its own focus ring.
- The chevron is a **state indicator only**. It rotates off `.upl-head[aria-expanded="true"]`, so
  the glyph direction can never disagree with what assistive tech announces.
- Hovering the ✕ tints only the ✕. The plate does not light up when the pointer is on dismiss —
  the two are siblings, so their hover states are independent, which is what tells the user the ✕
  is a different action from "open the list".

**2. The plate is positioning-neutral.** It declares no `position`. The consuming page docks it —
same division of labour as [MetaRow](MetaRow.md)'s sticky behaviour — so the same component works
docked at the page bottom, inside a drawer, or in a panel. Files docks it with `.dsf-upl-dock`
(`position:fixed`, bottom-right, `z-index:40` — below the dialog overlay at 60, so a Delete confirm
still covers it; full-width inset at ≤600px).

**3. Collapsed is the resting state.** Once a batch finishes the plate stays a one-line summary.
The list is opt-in: the user opens it only when they want the detail. That is also why the summary
line has to carry the whole outcome in words.

**4. State is never colour-only** (1.4.1). The summary *text* states the outcome —
"3 files uploading" / "5 uploads complete" / "1 of 3 uploads failed" — and the icon colour only
reinforces it. Note the failed wording keeps the ratio, so the count of files that *did* land is
not lost. Per-file failure pairs a red alert glyph with a reason sentence.

## States

| State | Class | Expected |
|---|---|---|
| Uploading | `.upl-tray.is-uploading` | Spinning glyph in `Brand/Primary`; title "N file(s) uploading". Each in-flight row carries the kit `.progress` atom with `role="progressbar"` + `aria-valuenow`/`min`/`max` and a tabular-nums percent. Rows that finish flip to `.is-done` while the batch runs on. Spinner honours `prefers-reduced-motion`. |
| Complete | `.upl-tray.is-complete` | Check glyph in `Feedback/Green`; title "N upload(s) complete"; list collapsed (`[hidden]` + `aria-expanded="false"`). |
| Partial failure | `.upl-tray.has-failed` | Alert glyph in `Feedback/Red_Text`; title states the ratio. |
| Row — done | `.upl-item.is-done` | Green check + name + "Done". |
| Row — failed | `.upl-item.is-failed` | Red alert + name + reason sentence + a `.link` **Retry** as the row's single action, on a `Feedback/Red` wash at the `--tint-5` step. |
| Bar hover / pressed | `.upl-head:hover` / `:active` | Neutral `State/Hover` → `State/Pressed`. The bar is a **standalone** interactive on a static surface (nothing above it changes background on interaction), so the neutral recipe is correct — not a brand tint. See the state-stacking rule. |
| Focus | `.upl-head:focus-visible`, `.upl-x:focus-visible` | `--shadow-focus-inset`. Inset, not outset: the plate has no outside margin to draw a halo into, and this matches every other flush-edge control in the kit. |
| Dismiss | `.upl-x` | 32px wide, separated by a `border-left` hairline so it reads as its own target. `aria-label` **and** matching `data-tip` ("Dismiss"). |
| Long batch | `.upl-list` | `max-height:14rem` + `overflow-y:auto`, so a 20-file batch can never push the dismiss ✕ off-screen. |
| Narrow (≤600px) | — | `width:100%; max-width:26rem` on the tray; names ellipsize, the reason sentence wraps with `text-wrap:balance`. The page's dock switches to a full-width inset. |

## DOM / markup contract

```html
<div class="upl-tray is-complete" role="region" aria-label="File uploads">
  <div class="upl-bar">
    <!-- the expand target: fills the bar, ✕ is a SIBLING not a child -->
    <button class="upl-head" type="button" aria-expanded="false" aria-controls="upl-list">
      <span class="upl-head-ic" aria-hidden="true"><svg …>…</svg></span>
      <span class="upl-head-title">5 uploads complete</span>
      <svg class="upl-chev" aria-hidden="true">…</svg>
    </button>
    <button class="upl-x" type="button" aria-label="Dismiss uploads" data-tip="Dismiss">✕</button>
  </div>
  <div class="upl-list" id="upl-list" hidden>
    <div class="upl-item is-uploading">
      <span class="upl-item-ic" aria-hidden="true">…</span>
      <span class="upl-item-body">
        <span class="upl-item-name">quarterly-report.csv</span>
        <span class="progress" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"
              aria-label="Uploading quarterly-report.csv"><span style="width:62%"></span></span>
      </span>
      <span class="upl-item-meta">62%</span>
    </div>
    <div class="upl-item is-failed">
      <span class="upl-item-ic" aria-hidden="true">…</span>
      <span class="upl-item-body">
        <span class="upl-item-name">archive.zip</span>
        <span class="upl-item-err">Unsupported format — upload a .csv, .xls or .xlsx file</span>
      </span>
      <span class="upl-item-act"><button class="link" type="button">Retry</button></span>
    </div>
  </div>
</div>
```

`aria-controls` on the head must name the list's `id`. The tray takes `role="region"` +
`aria-label` so the plate is reachable as a landmark while it is on screen.

## Reused, not reinvented

`.progress` (row progress track + fill) · `.link` (Retry) · `--shadow-overlay` (the same
floating-surface elevation rung as `.menu` / `.toast` / `.pop`) · `--state-hover` / `--state-pressed`
· `--shadow-focus-inset` · `--tint-5` (failed-row wash) · `btn-spin` keyframe (the kit's one
spin animation). No new tokens and no new keyframes were introduced.

## Copy

- Summary: `N file uploading` / `N files uploading` · `N upload complete` / `N uploads complete` ·
  `N of M upload(s) failed` — pluralised, and the failure form keeps the total.
- Per-file reason: one sentence, **no trailing period** (description-copy rule), `text-wrap:balance`
  so no single word orphans onto its own line.

## Accessibility & consistency self-check

- Batch and per-file state carried by text as well as colour (1.4.1). ✓
- Progress exposed as `role="progressbar"` with value/min/max and a per-file `aria-label` naming the file. ✓
- Bar and ✕ are both real buttons: keyboard reachable, `aria-expanded` on the bar, `aria-controls` → list id, visible `focus-visible` ring on each (2.4.7, 4.1.2). ✓
- Hit targets: bar is 20px line + `.625rem` padding = 40px tall; ✕ is 32px wide × the bar's height (2.5.8). ✓
- `.upl-item-err` `--fb-red-text` on the `--tint-5` red wash and `.upl-item-name` `--ink-body` on `--card` both clear 4.5:1 in light and dark; `--fb-red-text` is the AA-corrected red text token, not the fill red. ✓
- Spinner suppressed under `prefers-reduced-motion` (2.3.3). ✓
- Colour-token discipline: the one wash is `color-mix(in srgb, var(--fb-red) var(--tint-5), transparent)` — both halves tokens, no literal percentage. ✓
