# Changes — prod → expected

One file per component / property. Each file documents what differs between the
**current production** appearance (from the `@insightis/ui` code: `globals.css` + component classes)
and the **expected** new design system (`../token-diff-report.md`). Components with no change
are marked with a dash (—) and have no file.

Open `../insightis-preview-kit.html` for the visual side-by-side; each component links here.

## Index

- [colors](colors.md)
- [Tracking (letter-spacing)](Tracking.md) — foundation token scale
- [Disabled state](DisabledState.md) — cross-component: disabled stops killing pointer events, so it can carry a tooltip
- [Button](Button.md)
- IconButton — see [Button](Button.md) (shares variants)
- [Input](Input.md)
- TextArea — same token shifts as [Input](Input.md)
- [Checkbox](Checkbox.md)
- [Switch](Switch.md)
- [Badge](Badge.md)
- [Avatar](Avatar.md)
- [Table](Table.md)
- [Tabs](Tabs.md)
- [ProgressBar](ProgressBar.md)
- [Dropdown](Dropdown.md)
- [Modal](Modal.md)
- [Pagination](Pagination.md)
- [Sidebar](Sidebar.md) — new component (no pending change)
- [TruncatedTitleTooltip](TruncatedTitleTooltip.md) — new component (no pending change)
- [Tooltip](Tooltip.md) — dark-mode token fix + `.tt` class promotion
- [ChatRow](ChatRow.md) — new component; ⚠ Current column pending prod DOM capture
- [MetaRow](MetaRow.md) — new component; ⚠ Current column pending prod DOM capture
- [SegmentedControl](SegmentedControl.md) — new component (no pending change)
- [StepSlider](StepSlider.md) — new component (discrete level picker; composer Effort row)
- [QueueBand](QueueBand.md) — new component; AI Chat message queue (AIINS-1808), nothing on prod to diff
- [QueueItem](QueueItem.md) — new component; same feature
- [Alert](Alert.md) — new component; the generic inline notice the queue needed (supersedes the queue-private QueuePause)
- [Radio](Radio.md) — new component; Checkbox’s one-of-N sibling, the kit had none
- [AskUserPanel](AskUserPanel.md) — exists on prod; the whole card, three variants (single select · multi select · several questions) on one radio/checkbox option row
- [SortableList](SortableList.md) — new kit BEHAVIOUR (kit-kit.js § 4); drag + Alt+↑/↓ reorder
- [ThinkingIndicator](ThinkingIndicator.md) — exists on prod; the skeleton went, the label carries the wait
- [Counter](Counter.md) — new component; one small round count, in the queue row and the sidebar alike
- [ChatShell](ChatShell.md) — exists on prod; moved out of four page `<style>` blocks into the kit
- [DataSourcesFiles](DataSourcesFiles.md)
- typography — no change (—)
- Spinner — no change (—)

## New on prod (04.06) — no pending change
- [Accordion](Accordion.md)
- [StatusView](StatusView.md)
- [Resizable](Resizable.md)
- [Stepper](Stepper.md)

## Components added in this pass (no own change — hex shifts via [colors](colors.md))

Surfaces:
- [Card](Card.md)
- [Separator](Separator.md)
- [Sheet](Sheet.md)
- [Popover](Popover.md)
- [Upgrade popover](UpgradePopover.md) — brand plan-gate explainer + the `.is-locked` state
- [Upgrade modal](UpgradeModal.md) — what a locked ACTION answers with (U3)
- [Meter](Meter.md) — label, figure, bar: how much of an allowance is gone
- [Promo card](PromoCard.md) — the sidebar's offer card (C7)
- [ScrollShadow](ScrollShadow.md)

Forms:
- [InputGroup](InputGroup.md)
- [PasswordInput](PasswordInput.md) — composes [InputGroup](InputGroup.md)
- [Autocomplete](Autocomplete.md) — composes InputGroup + Dropdown + Badge
- [Datepicker](Datepicker.md)
- [File](File.md)

Feedback / state:
- [Toast](Toast.md)
- [Skeleton](Skeleton.md)
- [CircularProgress](CircularProgress.md)
- [Collapsible](Collapsible.md) — pure Radix re-export

Each entry is "**no component-level change (—)**" — only the underlying token hex shifts (documented in [colors](colors.md)) and best-practice state gaps (focus parity, hover, disabled, loading) called out in the files.

[Sidebar](Sidebar.md) was also expanded to cover the overall composition + every sub-part (SidebarHeader / Content / Footer / Group / Menu / MenuSub / Rail / Trigger / Inset) — SidebarFooter and the container itself were missing from the previous docs.

**Theme switch (2026-10-06).** Light / Dark is a kit harness now, not page markup: `.segctrl`
buttons carrying `data-theme-switch="light|dark"`, stored in `insightis.theme` and restored on
every page, broadcast as `kit:theme`. Four pages had a bare "Light / Dark" toggle button and two had
a segmented control of their own, none of them remembering anything — so a dark-theme review
started over on every screen.

**Icon stroke (2026-10-06).** Prod was measured before deciding: every UI glyph on
`insightis-app.devart.info/chat` is the Lucide default, `stroke-width="2"` in a 24 viewBox — 20
glyphs, 13 in a 16px box and 7 in a 14px box. **One weight; the box does the scaling.** No ladder.
(The logo mark and wordmark draw at 1, but they are artwork, not UI glyphs.)

A proportional ladder across the kit was tried the same day and reverted: at 12–14px a stroke of
1.25–1.5 reads as a scratch, because below ~16px a stroke has to stay heavy enough to survive
rasterisation. A single lighter default (1.75) was then tried, because the `#mi-*` symbol dictionary
had always drawn at 1.75 while inline SVGs in buttons carried 2 — the same mark at the same box in
two weights. 1.75 closed that split the wrong way: it made the kit 12% lighter than the identical
glyph in prod. **The kit now draws every UI glyph at 2**, matching prod — `--icon-stroke` and the
dictionary moved together, and the value 1.75 no longer appears in live markup.

Two things that have to stay true:
- **The token does not reach a `<use>` icon.** `stroke-width` sits on the `<symbol>`, and a
  presentation attribute on an element beats a value *inherited* from the referencing `<svg>`; CSS
  only outranks an attribute on the **same** element. So `--icon-stroke` governs inline SVGs and the
  dictionary attribute governs the 161 `<use>` icons — change one and you must change the other, or
  the original split comes back. (Both ways measured in the storybook; the old CSS comment claimed
  the token won, and it did not.)
- **Alert has no exception any more.** A measured `--icon-stroke-sm` (1.5 at 16px) /
  `--icon-stroke-md` (2 at 20px) pair survived the first pass on 2026-10-06 and was dropped later
  the same day: an Alert whose glyph is lighter than the button beside it reads as a different icon
  set, not as a smaller alert. Both sizes now take `--icon-stroke`; only the box steps. The two
  tokens are gone, and the Devart UI Alert made the same move so the package and the kit agree.

**What "one weight" actually means.** Prod only ever draws glyphs at 14–20px, so `2` in a 24
viewBox and "one optical weight" are the same statement there. Outside that band they are not: a
10px chevron at 2 renders 0.83px and dissolves. The rule the kit follows is the optical one —
**≈1.2–1.33px on screen**, which is `2` for every glyph in the 14–20px band. 110 glyphs that sat
at 1.6 / 1.8 / 1.9 / 2.2 / 2.25 / 2.4 / 2.5 inside that band were brought to 2 on 2026-10-06
(`.cl-dropdown-icon`, `.cl-model-check`, `.upl-item-ic`, `.dsf-drop-ic`, `.b-ic`, and the inline
attributes inside `.btn` / `.iconbtn`, which the CSS was already overriding — the markup simply
lied about what it rendered).

Four things keep their own weight, and each is a drawing rather than a UI glyph:

| what | weight | why |
|---|---|---|
| `.chip-meta-arrow`, `.sbx-sect-chev` | 2.5 at a 10px box | = 1.04px on screen, the same optical weight. 2 here would be 0.83px. |
| `.cbx` tick | 3 at a 12px box | a tick has to read at 12px; matches the Devart UI Checkbox. |
| `.spin` | 2.5 | a progress arc, not a glyph. |
| `.empty-ic`, `.cp-fp-empty-ic`, `.es-card`, logo marks | 1–1.5 at 32–48px | illustration. 2 at 48px is a 4px line. |

`.ty-info` (storybook annotation) stays at 1.5 because its viewBox is 16, not 24 — 1.5 × 14/16 =
1.31px, already the band weight. `.chat-row-pin` stays at 1.5 because the mark is filled, so the
stroke is an outline on a solid shape rather than the shape itself. Anything new in the 14–20px
band takes 2; anything outside it matches the screen weight, not the number.
