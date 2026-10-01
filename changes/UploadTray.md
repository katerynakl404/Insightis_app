# UploadTray — new component

The progress plate raised during and after a file upload. Prod ships this behaviour (a "5 uploads
complete" plate at the bottom with a chevron and a ✕) but our kit and the Files spec had **no
component for it at all** — meaning we had never described what the product shows while files are
uploading, or what happens when one fails. This closes that gap.

**Prod has a full spec for this** — `components-uploadtray` in prod's Storybook, with typed props and
seven stories. The earlier note here said prod's plate was "the behavioural reference we reproduced…
it has no spec on our side to compare with". Both halves were wrong: prod has a spec, and we did not
reproduce it. Measured 2026-09-29:

| Prod prop | Contract |
|---|---|
| `status` | `uploading` · `complete` · `failed` — chooses the summary glyph |
| `title` | the summary sentence, in words: "2 uploads complete", "1 of 3 uploads failed" |
| `open` / `defaultOpen` | controlled, or self-managed — **`defaultOpen: true`** |
| `spinner` | on by default; **off** for a batch waiting on the *person*, where a spinner would promise progress nothing is making (marked DRAFT) |
| `autoDismiss` / `autoDismissDelay` | off by default, `4000`ms. Settled rows retire themselves and the plate follows the last one out; **a failed row never retires** — it is the one row still holding a question |
| `onRowClick` | the whole row is the target: the name stretches over it with `after:absolute after:inset-0`, so the accessible target is the file name, not an unlabelled box |
| `onDismiss` | renders the ✕ — omit it and the plate cannot be dismissed |
| labels | `dismissLabel` "Dismiss" · `expandLabel` "Show the files" · `collapseLabel` "Hide the files" |

Prod's row, measured: `gap:10px; padding:8px; radius:6px`, background **transparent in every state**.
The left glyph is always the neutral `file-text` in `--ink-secondary`; the name is a `<button>` at
14/400 `--ink-body` that **truncates and never wraps**; the reason is 12/400 `--fb-red-text` with
`text-balance`. The **right** slot carries the per-row outcome — file size, percent, `circle-check`
in `--fb-green`, or Retry (12/500 `--brand-primary`) beside `circle-alert` in `--fb-red-text`. The
summary glyph is `--ink-secondary` in **every** status, and the chevron and ✕ are each their own
`<button>`.

**Aligned to prod 2026-09-29** ([hosted Storybook](https://katerynakl404.github.io/devart.ui/?path=/docs/components-uploadtray--docs)).
The kit had drifted from that model on four counts, all corrected in one pass:

| Was — kit | Now — matching prod |
|---|---|
| Summary glyph painted per status (`Brand/Primary` / `Feedback/Green` / `Feedback/Red_Text`) | `--ink-secondary` in **every** status — the glyph's *shape* carries the outcome, so the plate is never painted |
| The leading row glyph carried the state (green check / red alert) | always the neutral file mark, so a column of rows reads as a column of **files** |
| A finished row said the word **"Done"** | `circle-check` in `--fb-green` as `.upl-item-stat` at the row's **end**, named for AT |
| A failed row sat on a `--fb-red` × `--tint-5` wash | transparent, like every other row — the mark does the work |
| The bar was flush and `align-items:stretch`; the head padded `10px 12px` | the bar is padded `6px 8px` with `gap:4px`; the head is inset `4px` and takes its own `6px` corner |
| The head lit up on hover | no hover on the head — it belongs to the two icon buttons, so only the control under the pointer lights up |
| The ✕ was a bespoke 32px cell fenced off by a `border-left` hairline | the kit icon button at `xs` — 28px box, 14px glyph — and no hairline |
| The chevron was a bare glyph **inside** the head | its own kit icon button beside it, labelled "Show the files" / "Hide the files" |
| The chevron rotated when **expanded** | rotates when **collapsed** — the tray docks at the bottom and the list opens upward |
| The complete glyph was an open arc-check | `circle-check`, the same closed-circle family as `circle-alert` |
| The Files page said "N files uploading" while the kit said "N uploading" | both say `N uploading` |

Two things prod does are **deliberately not** adopted; the kit keeps its own:

- **The progress bar is exposed to AT.** Prod's bar is a plain `div`; the kit reuses the `.progress`
  atom with `role="progressbar"` + `aria-valuenow`/`min`/`max` and a per-file `aria-label`.
- **Collapsed is the resting state.** Prod's `defaultOpen` is `true`; the kit settles closed, for the
  reason under point 3 below.

Prod also ships `autoDismiss` / `autoDismissDelay`, a `spinner` opt-out for a batch that is waiting on
the *person* rather than on a transfer, and `onRowClick`. The kit implements none of the three — they
are behaviour rather than appearance, and this component does not cover them.

Storybook: [`#uploadtray`](../insightis-preview-kit.html#uploadtray) · CSS: `pages/kit-theme.css` →
UploadTray block · Live consumer: [Data Sources → Files](../pages/approved/data-sources_files-landing.html).

## What it has to get right

**1. The bar is three siblings, never nested.** `.upl-head` is a real `<button>` at `flex:1` that
fills the space and carries `aria-expanded` + `aria-controls`; the chevron and the ✕ follow it as
two kit icon buttons. A button inside a button is invalid HTML and unreachable by keyboard, which is
the trap this layout is designed around. What falls out of it:

- Space / Enter on the head toggles the list, and so does the chevron button — two ways in, one
  state. The head is the one that announces it.
- **The chevron is a real button**, `aria-label` "Show the files" / "Hide the files". Its glyph
  still rotates off `.upl-head[aria-expanded]`, so the direction can never disagree with what is
  announced — but the rotation is **inverted** against the obvious reading: the tray docks at the
  bottom and the list opens **upward**, so collapsed points up and expanded points down.
- **The head has no hover surface.** A wash under the title would make the whole bar read as one
  button and swallow the two real ones beside it. Hover belongs to the chevron and the ✕, which
  bring the icon button's own recipe — so only the control under the pointer ever lights up.
- **No hairline between the controls.** The ✕ used to be a 32px cell fenced off by a `border-left`.
  It is not a cell; it is a button on a padded bar, and it reads as one without the rule.

**2. The plate is positioning-neutral.** It declares no `position`. The consuming page docks it —
same division of labour as [MetaRow](MetaRow.md)'s sticky behaviour — so the same component works
docked at the page bottom, inside a drawer, or in a panel. Files docks it with `.dsf-upl-dock`
(`position:fixed`, bottom-right, `z-index:40` — below the dialog overlay at 60, so a Delete confirm
still covers it; full-width inset at ≤600px).

**3. Collapsed is the resting state.** Once a batch finishes the plate stays a one-line summary.
The list is opt-in: the user opens it only when they want the detail. That is also why the summary
line has to carry the whole outcome in words.

**4. State is never colour-only** (1.4.1), and the plate is never painted. The summary glyph stays
`--ink-secondary` in every status: what changes is its **shape** (spinner / `circle-check` /
`circle-alert`), and the summary *text* states the outcome in words — "3 uploading" /
"5 uploads complete" / "1 of 3 uploads failed". Per-row state works the same way — shape first,
colour only reinforcing — and it sits at the **end** of the row, never in the leading glyph, so a
column of rows reads as a column of files. Note the failed wording keeps the ratio, so the count of files that *did* land is
not lost. Per-file failure pairs a red alert glyph with a reason sentence.

## States

| State | Class | Expected |
|---|---|---|
| Uploading | `.upl-tray.is-uploading` | Spinning glyph in `Text/Secondary`; title "N file(s) uploading". Each in-flight row carries the kit `.progress` atom with `role="progressbar"` + `aria-valuenow`/`min`/`max` and a tabular-nums percent. Rows that finish flip to `.is-done` while the batch runs on. Spinner honours `prefers-reduced-motion`. |
| Complete | `.upl-tray.is-complete` | Check glyph in `Text/Secondary`; title "N upload(s) complete"; list collapsed (`[hidden]` + `aria-expanded="false"`). |
| Partial failure | `.upl-tray.has-failed` | Alert glyph in `Text/Secondary`; title states the ratio. |
| Row — done | `.upl-item.is-done` | Neutral file glyph + name, and `circle-check` in `Feedback/Green` as `.upl-item-stat` at the row's **end**. The word "Done" is not used — the mark carries it, with `role="img" aria-label="Done"` so it is still announced. |
| Row — failed | `.upl-item.is-failed` | Neutral file glyph + name + reason sentence, then a `.link` **Retry** and `circle-alert` in `Feedback/Red_Text` as `.upl-item-stat`. **No wash** — the row background stays transparent like every other row. |
| Hover / pressed | `.iconbtn-tertiary:hover` / `:active` | Lives on the chevron and the ✕ only — neutral `State/Hover` → `State/Pressed`, inherited from the kit icon button. `.upl-head` has **no** hover surface, so the plate never lights up as a whole. |
| Focus | `.upl-head:focus-visible` · the two `.iconbtn`s | The head takes `--shadow-focus-inset` — it runs flush to the bar's edge with no outside margin for a halo. The chevron and ✕ take the icon button's own `--shadow-focus`, which now has room because the bar is padded `6px 8px`. |
| Chevron · Dismiss | `.iconbtn.iconbtn-xs.iconbtn-tertiary` | Both are the kit icon button at `xs` — 28px box, 14px glyph, `--ink-body`. The tray adds no styling of its own and no hairline between them. Each carries an `aria-label` **and** a matching `data-tip`; the chevron's says which way it goes. |
| Long batch | `.upl-list` | `max-height:14rem` + `overflow-y:auto`, so a 20-file batch can never push the dismiss ✕ off-screen. |
| Narrow (≤600px) | — | `width:100%; max-width:26rem` on the tray; names ellipsize, the reason sentence wraps with `text-wrap:balance`. The page's dock switches to a full-width inset. |

## DOM / markup contract

```html
<div class="upl-tray is-complete" role="region" aria-label="File uploads">
  <div class="upl-bar">
    <!-- three siblings; nothing is nested inside anything -->
    <button class="upl-head" type="button" aria-expanded="false" aria-controls="upl-list">
      <span class="upl-head-ic" aria-hidden="true">…spinner | circle-check | circle-alert…</span>
      <span class="upl-head-title">5 uploads complete</span>
    </button>
    <button class="iconbtn iconbtn-xs iconbtn-tertiary upl-chevbtn" type="button"
            aria-label="Show the files" data-tip="Show the files">
      <svg class="upl-chev" aria-hidden="true">…chevron-down…</svg>
    </button>
    <button class="iconbtn iconbtn-xs iconbtn-tertiary" type="button"
            aria-label="Dismiss uploads" data-tip="Dismiss">…x…</button>
  </div>
  <div class="upl-list" id="upl-list" hidden>
    <!-- the leading glyph is ALWAYS the neutral file mark, in every row state -->
    <div class="upl-item is-uploading">
      <span class="upl-item-ic" aria-hidden="true">…file…</span>
      <span class="upl-item-body">
        <span class="upl-item-name">quarterly-report.csv</span>
        <span class="progress" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"
              aria-label="Uploading quarterly-report.csv"><span style="width:62%"></span></span>
      </span>
      <span class="upl-item-meta">62%</span>
    </div>
    <div class="upl-item is-done">
      <span class="upl-item-ic" aria-hidden="true">…file…</span>
      <span class="upl-item-body"><span class="upl-item-name">budget-2026.xls</span></span>
      <!-- the outcome lives at the END of the row, named for AT since no word carries it -->
      <span class="upl-item-stat" role="img" aria-label="Done">…circle-check…</span>
    </div>
    <div class="upl-item is-failed">
      <span class="upl-item-ic" aria-hidden="true">…file…</span>
      <span class="upl-item-body">
        <span class="upl-item-name">archive.zip</span>
        <span class="upl-item-err">Unsupported format — upload a .csv, .xls or .xlsx file</span>
      </span>
      <span class="upl-item-act"><button class="link" type="button">Retry</button></span>
      <span class="upl-item-stat" role="img" aria-label="Failed">…circle-alert…</span>
    </div>
  </div>
</div>
```

`aria-controls` on the head must name the list's `id`. The tray takes `role="region"` +
`aria-label` so the plate is reachable as a landmark while it is on screen.

## Reused, not reinvented

`.iconbtn.iconbtn-xs.iconbtn-tertiary` (the chevron and the ✕ — the tray styles neither) · `.progress` (row progress track + fill) · `.link` (Retry) · `--shadow-overlay` (the same
floating-surface elevation rung as `.menu` / `.toast` / `.pop`) · `--state-hover` / `--state-pressed`
· `--shadow-focus-inset` · `btn-spin` keyframe (the kit's one
spin animation). No new tokens and no new keyframes were introduced.

## Copy

- Summary: `N uploading` · `N upload complete` / `N uploads complete` ·
  `N of M upload(s) failed` — pluralised, and the failure form keeps the total.
- Per-file reason: one sentence, **no trailing period** (description-copy rule), `text-wrap:balance`
  so no single word orphans onto its own line.

## Accessibility & consistency self-check

- Batch and per-file state carried by text as well as colour (1.4.1). ✓
- Progress exposed as `role="progressbar"` with value/min/max and a per-file `aria-label` naming the file. ✓
- Bar and ✕ are both real buttons: keyboard reachable, `aria-expanded` on the bar, `aria-controls` → list id, visible `focus-visible` ring on each (2.4.7, 4.1.2). ✓
- Hit targets: the bar is 40px tall and the head fills it; the chevron and ✕ are 28px boxes, clear of the 24px floor (2.5.8). ✓
- `.upl-item-err` `--fb-red-text` and `.upl-item-name` `--ink-body`, both on the plain `--card` surface, clear 4.5:1 in light and dark; `--fb-red-text` is the AA-corrected red text token, not the fill red. ✓
- Spinner suppressed under `prefers-reduced-motion` (2.3.3). ✓
- Colour-token discipline: the tray now holds no `color-mix()` at all — every colour is a flat token. ✓
- The row's outcome glyph is `role="img"` with an `aria-label` ("Done" / "Failed"), so dropping the word "Done" cost nothing to a screen reader (1.4.1, 4.1.2). ✓
