# Design system — single source of truth

**17 September 2026** · reconciling `@devart/ui-react` (the package + its Storybook) with the
Insightis kit (`pages/kit-theme.css` + the preview kit).

The two are **not** two design systems. They are one design in two vocabularies, plus a set of
components that only ever got built on one side. This report records what was measured, what was
changed, and what is still open.

---

## 1. What was measured

| | `@devart/ui-react` | Insightis kit |
|---|---|---|
| Colour roles | 195 semantic/component tokens | 254 |
| Shared token **names** (before) | 97 | 97 |
| Colour roles that were the **same value under a different name** | 7 high-traffic, 21 total | |
| Named type styles | 19 (`Typography` `textStyle`) | 19 (`--ts-*`) |
| Type styles that resolve identically | **18 / 19** | |
| Components | 50 | 55 documented in `changes/` |

The colour palettes agreed on **46 of 71** matched roles before any change, and the type scale
agreed on 18 of 19 styles. The divergence was overwhelmingly *naming*, not *design*.

---

## 2. What was changed

### 2.1 One vocabulary — the package's

Seven kit tokens were renamed to the names the package already publishes as Tailwind utilities
(`bg-surface-page`, `text-ink-primary`, `border-stroke`). **1037 occurrences across 19 files**
— `kit-theme.css`, the preview kit, every approved and concept page, `kit-kit.js`.

| kit (was) | now | uses |
|---|---|---|
| `--border` | `--stroke-border` | 284 |
| `--ink` | `--ink-primary` | 277 |
| `--card` | `--surface-card` | 243 |
| `--surface-page` ← `--bg` | `--surface-page` | 105 |
| `--card2` | `--surface-card2` | 70 |
| `--chips` | `--surface-chips` | 43 |
| `--border-hover` | `--field-border-hover` | 23 |

Values are unchanged — this was a rename only. Verified in both themes on a served copy: every new
token resolves, every old name is gone, no console errors.

### 2.2 `--slate-150` — the code disagreed with its own comment

`globals.css` declared `--slate-150: 214 32% 94%` and commented it `#EAEFF5`. That triplet
resolves to **#EBEFF5**. The comment and the kit agreed on `#EAEFF5`, so the triplet was the
error, not the comment.

Corrected to `212.7 35.5% 93.9%`, which round-trips to `#EAEFF5` exactly. Affects
`--tbl-header-bg` and `--mx-group-band`. **Visual state preserved** — the mockups were right.

### 2.3 `--bg` and `--surface-page` were the same token

`globals.css` declared both, identical in both themes. `--bg` had exactly two consumers
(`--icon-wrapper-bg` and the `surface.bg` Tailwind key). Removed; `InputGroup` moved from
`bg-surface-bg` to `bg-surface-page`.

### 2.4 `--border-hover` was dark-only and read by nothing

Declared only under `.dark`, but mapped in `THEME_COLORS` for both themes — so the
`border-stroke-border-hover` class emitted invalid CSS in light mode. Nothing used it. Removed
rather than completed. (The kit's `--border-hover` is a *different* role — the form-field hover —
and is now `--field-border-hover`, matching the package.)

### 2.5 A tint scale on both sides

A **tint** is a wash of a colour over `transparent`. A **blend** is a ratio between two opaque
colours. They look alike and are not the same thing, and only the first has an "overlay strength".

Both files now carry the identical 12-step scale:

```
--tint-5 --tint-6 --tint-8 --tint-10 --tint-12 --tint-15
--tint-20 --tint-25 --tint-30 --tint-40 --tint-55 --tint-80
```

- **globals.css**: 23 tints tokenised. 25 blends and 12 shadow/gradient stops deliberately keep
  literals — `--segctrl-btn-hover-bg` is the 50% midpoint between two surfaces, and 50% is the
  meaning, not a strength.
- **kit-theme.css**: 11 tints tokenised, closing the gap against the kit's own `CLAUDE.md` rule
  ("literal % is forbidden"), which was previously ~35% applied.

`30%` was added to the scale rather than snapping the four toast borders down to 25% — they have
four real consumers and sit in the obvious 25→40 gap. Seven values moved, none by more than 11%:

| token | was | now |
|---|---|---|
| `--banner-grad-sub` | 82% | 80% |
| `--banner-grad-ic-bg` (light + dark) | 18% / 12% | 20% / 12% |
| `--banner-grad-ic-border` | 18% | 20% |
| `--chat-glow-fill` (dark) | 18% | 20% |
| `--btn-outline-destructive-bg-hover` (dark) | 14% | 15% |
| `--btn-outline-destructive-bg-press` (dark) | 22% | 20% |
| `--btn-destructive-tertiary-bg-press` (dark) | 32% | 30% |

### 2.6 The palette generator dropped every tint

`gen-color-tokens.mjs` resolves `color-mix()` by regex and only understood a literal percentage.
The moment tints became `var(--tint-N)`, **all 23 tint tokens silently vanished** from the
generated `colors.css` (89 tokens instead of 107). Fixed: the generator now inlines the tint step
before matching, and throws on an unknown one rather than dropping the token.

A full diff of the regenerated palette confirms **only** the intended values moved.

### 2.7 Documentation

`SPEC.md` counts were already stale before this work (it listed `--overlay-scrim` as dark-only
when it is declared in both). Re-measured and corrected: 78 dark declarations = 76 overrides + 2
dark-only, 9 verbatim repeats, real delta 67 values. The tint-vs-blend rule is now written down.

---

## 3. Still open

### 3.1 Table row hover — RESOLVED 2026-09-17: package aligned to the kit

`CHANGES-from-connections.md` records two separate things that got conflated:

1. **A package bug** — `constants.ts` mapped the token as a bare `var(--tbl-row-hover)`, so light
   theme emitted `background-color: 210 40% 98%`, which is invalid. The hover did not paint at
   all. *Already fixed.*
2. **A step change** — hover moved from `#f8fafc` (slate-50) to `#f1f5f9` (`--state-hover`).

The kit was never broken; it renders `#f8fafc` and the concepts hovered correctly. The step
should not have moved — **see section 5**, where the package was brought back to the kit.

Was: package `#f1f5f9`, kit `#f8fafc`.

**A third value is affected by the same decision:** `--tbl-row-pressed`. The kit binds it to
`--surface-card2` (light `#f1f5f9`), so **selected equals the thead band by construction** —
that is the kit's stated contract (`changes/Table.md`). The package moved it to `slate-200`
`#e2e8f0`, breaking that identity. So the disagreement is a whole ladder, not one token:

| | kit | package |
|---|---|---|
| hover (light) | `#f8fafc` | `#f1f5f9` |
| selected / pressed (light) | `#f1f5f9` (= thead band) | `#e2e8f0` |
| hover (dark) | `color-mix(grey-800 50%, grey-900)` ≈ `#1c1c25` | `#21212c` |
| selected / pressed (dark) | `#21212c` | `#2a2834` |

### 3.2 Selected + hover — RESOLVED 2026-09-17: brand tint removed

Second disagreement on the same ladder, and this one was never written down.

| | recipe | resolved (light) |
|---|---|---|
| kit | `color-mix(--tbl-row-hover 50%, --tbl-row-pressed)` — a neutral blend **between** the two steps | ≈ `#f4f7fb` |
| package | `color-mix(--brand-primary 10%, --tbl-row-pressed)` — brand-tinted | `#ccdee5` |

The kit forbids this explicitly (`kit-theme.css` L2112, `_ds_bundle.css` L1837: *"Neutral, never
brand-tinted… so no table row state carries brand hue"*). The package's tint is visible: measured
on the Connections concept, selected+hover is a teal `#ccdee5`, a 9.44% luminance step off
selected — while the kit's blend sits between hover and selected and reads as a nudge.

**And the package recipe inverts the ladder.** `TableCell` sends selected+active back to
`--tbl-row-pressed`:

- selected `#e2e8f0` → selected+hover `#ccdee5` → selected+**active** `#e2e8f0`

Pressing a selected row makes it *lighter* than hovering it. Press has to be a step deeper than
hover, not a step back. This holds whichever ladder wins, so it is fixable now.

The two themes also diverge in kind under the package recipe: on light the tint is both a
lightness step and a hue shift (9.44%), on dark it is almost only hue (`#2a2834` → `#28323d`,
0.81%). A recipe tuned on one theme.

**Measurement of the live app is still blocked** — `insightis-app.devart.info` is behind sign-in,
and signing in is not something the assistant can do.

### 3.3 `display` is the one type style that differs

| | fluid term |
|---|---|
| package | `clamp(5.5rem, 8vw, 8.25rem)` |
| kit | `clamp(5.5rem, 16vw, 8.25rem)` |

Same floor and ceiling, half the scaling rate. Between ~825px and ~1650px they render differently
— at 1200px the package gives 96px and the kit gives the capped 132px. One is wrong; the 404 page
is the only consumer.

### 3.4 Eleven type styles are named differently

The 19 styles resolve identically but are named two ways. `Title` uses px on both sides; `Heading`,
`Body` and `Label` use px in the package and t-shirt sizes in the kit:

`heading36`↔`heading-l` · `heading30`↔`heading-m` · `heading24`↔`heading-s` ·
`heading20`↔`heading-xs` · `body16`↔`body-l` · `body14`↔`body-m` · `body12`↔`body-s` ·
`label14`↔`label-l` · `label12`↔`label-m` · `label10`↔`label-s`

### 3.5 The component gap — corrected

An earlier draft of this report claimed twelve components were simply missing. That was wrong:
matching by name alone hid the ones the package already ships under a different name. Corrected:

**a. Already in the package, different name — no work beyond documenting the mapping**

| kit name | package | note |
|---|---|---|
| `Chip` | `FilterChips` (the item) | `rounded-full`, `h-7` at `size="sm"` = the kit's 28px — but see 3.4d |
| `ChipRow` | `FilterChips` (the root) | a Radix radio group, which is what single-select wants |
| `Link` | inside `Banner` / `Button` | never extracted |
| `Overlay` | inside `Modal` / `Sheet` | never extracted |
| `Dropdown` | `DropdownMenu` | |
| `Selector` | `Button` variants | |
| `TooltipBubble` | `Tooltip` / `TruncatedTitleTooltip` | |

**b. Tokens shipped, component never built**

Both hit the hazard `SPEC.md` warns about in its own text — *"an exposed token with no call site
drifts"*:

- **`DropZone`** — five `--dropzone-*` tokens exist and are exposed through `THEME_COLORS`
  (`dropzone.border`, `.border-active`, `.bg-active`). **Zero call sites.**
- **`ChipMeta`** — `--badge-chip-bg` / `--badge-chip-text` exist and are exposed as
  `badge.chip-bg` / `badge.chip-text`. **Zero call sites**; no `Badge` variant reads them. They
  also disagree with the kit: the token resolves `--badge-chip-text` to `--ink-body` `#334155`,
  while the kit's `.chip-meta` uses `--ink-secondary` `#5A6A80`.

**c. Genuinely absent — no component, no tokens**

`ChatRow` · `ChatList` · `DataSourceCard` · `ProviderCard` · `MetaRow` · `AccountPopover` ·
`UploadTray`

Four of these are marked *"New component — no prod equivalent"* in `changes/`, so nothing is
regressing; they were simply never built in the package.

**d. `FilterChips` implements the *Current* column, not the *Expected* one**

This is the substantive finding. `Chip.md` specifies a prod → Expected diff; the package still
renders prod on four of eight rows.

| State | Expected (`changes/Chip.md`) | `FilterChips` today | |
|---|---|---|---|
| Default | bg `--surface-card`, border `--stroke-border` | `bg-transparent border-stroke` | still prod |
| Hover | bg `--state-hover`, text `--ink-primary`, **border unchanged** | `hover:bg-state-hover` **+ `hover:border-stroke-field-hover`** | still prod — the border must not move |
| Pressed | bg `--state-pressed`, border unchanged | *no pressed state* | missing |
| Active | bg `--state-pressed`, border + text `--ink-highlight`, `cursor:default` | `bg-brand-primary/8 border-brand-primary text-brand-secondary` | still prod — the alpha tint the redesign replaced |
| Focus | 2px `--surface-card` + 4px `--focus-ring` | `ring-2 ring-focus-ring-brand ring-offset-2` | equivalent |
| Disabled | `--opacity-disabled` | `disabled:opacity-disabled` | matches |

The `.chip-row` responsive contract has no equivalent either: below 767px the kit scrolls on one
line with a scroll-driven `mask-image` fade (`data-chip-scroll` = `none|start|middle|end`), while
`FilterChips` only wraps.

**e. Twelve package components have no entry in `changes/`**

`ConnectorLogo` · `DropdownMenu` · `FilterChips` · `PageHeader` · `RadioButton` · `Timeline` ·
`Toggle` · `ToggleGroup` · `Typography` · `Foundations` · `DialogTitleFallback` · `PortalContainer`

### 3.6 The published Storybook is behind the branch

`devart-ui-react-a83534.gitlabpages.devart.com` serves **44 components / 244 stories**. The local
`design-sync/insightis-audit` branch has 51. Absent from the published build: the whole
`Foundations/*` section (Colors, Radius, Shadows, Spacing, Typography), `ConnectorLogo`,
`FilterChips`, `PageHeader`.

So the published Storybook cannot be used to judge coverage — `FilterChips`, the component that
answers the `Chip` question, is not in it.

### 3.7 Two packages, one product

`changes/*.md` cite **`@insightis/ui`** as their source (`current/` mirrors it — the live prod
system), while the Expected design is being implemented in **`@devart/ui-react`**. The kit is the
bridge between them. Worth stating explicitly somewhere permanent, because "the package" is
ambiguous in every document that uses the phrase.

### 3.8 Two dead tokens remain, same class as `--border-hover`

`--fb-red-hover` and `--fb-red-press` are declared only under `.dark`, exposed in `THEME_COLORS`,
and used by no component. The package also has `--fb-error-hover` / `--fb-error-press` at the same
values in both themes. Duplicates, half-broken. Not removed — flagged.

### 3.9 The bundles are stale and disagree with each other

| | shape | captured | exports |
|---|---|---|---|
| `devart.ui.react/ds-bundle` | storybook | 16 Sep | 51 |
| `Insightis/.claude-design/ds-bundle` | package | **20 Jul** | 72 |

Of 34 components present in both, **zero** render identically. 35 exports in the Insightis copy
have no component in the package at all — it was captured from a different source, two months ago.
`ds-bundle/_ds_needs_recompile` is set.

The token layer of `devart.ui.react/ds-bundle` was regenerated as part of this work. The component
renders need the full attended loop (package build → storybook build → Playwright compare →
upload), which has not been run.

---

## 4. Where the truth now lives

- **Colour, spacing, radius, type tokens** → `devart.ui.react/globals.css`. The kit now speaks its
  vocabulary; `colors.css` and `_ds_bundle.css` are generated from it and must not be hand-edited.
- **Component behaviour and markup** → `src/components/*`, with the Storybook as the fidelity
  oracle.
- **Page composition and Insightis-only molecules** → `pages/kit-theme.css`. This is the legitimate
  remainder, not drift: `--card-stack-*`, `--intg-*`, `--plan-ribbon-*`, `--code-*`, `--mx-*`.
- **What prod does today** → `current/`. **What should change** → `changes/` and `page-changes/`.


---

## 5. Resolution of 3.1 and 3.2 — 2026-09-17

Decision: **the package follows the kit.** The kit is what ships; the package had
drifted a step darker on both row tokens and had picked up a brand tint the kit
forbids. The drift came from a fix that conflated two things — a real package bug
(bare `var()` emitted an invalid `background-color`, so light-theme hover painted
nothing) and an unnecessary step change made alongside it.

`devart.ui.react/globals.css` now carries the kit's own construction:

```css
--tbl-row-hover: var(--slate-50);              /* light */
--tbl-row-pressed: var(--surface-card2);       /* both themes, no .dark override */
--tbl-row-selected-hover: color-mix(in srgb, hsl(var(--tbl-row-hover)) 50%,
                                             hsl(var(--tbl-row-pressed)));
/* .dark */
--tbl-row-hover: 240 14% 12.7%;                /* = mix(grey-800 50%, grey-900) */
```

Dark hover is written as a triplet, not the kit's `color-mix`, because the package
consumes the token through `hsl(var(…))` in `constants.ts` — a `color-mix` there
reproduces exactly the invalid-value bug above. The rendered colour is identical.

Measured on the Connections concept after the change (live `getComputedStyle`):

| State | light | dark | kit expects |
|---|---|---|---|
| hover | `#f8fafc` | `#1c1c25` | same |
| selected / pressed | `#f1f5f9` | `#21212c` | same, and equal to the thead band |
| selected + hover | `#f4f7fa` | `#1e1e28` | neutral blend, ±1 on one channel from srgb rounding |

The inversion noted in 3.2 is gone with it: hover now sits *above* selected in
lightness, so returning to `--tbl-row-pressed` on press is a step toward more
contrast, not away from it.

**On the word "prod" — an earlier caveat here was wrong and is withdrawn.** The `.prod`
scope is *not* part of the kit. It was removed from `pages/kit-theme.css` on 2026-09-14 and
archived in `archive/2026-09-14-kit-current-prod-column/`, where the README states what it
was: the "Current (prod)" column of a Current-vs-Expected comparison — a snapshot of the
**old** product the redesign replaces. It survives only in generated mirrors
(`.claude-design/ds-bundle/_ds_bundle.css`, `.claude-design/ds-react/dist/kit.css`) and in
agent worktrees, which is precisely why those must not be read as sources.

So there is no ambiguity to resolve: the approved kit page is the target, and the package
now matches it.
