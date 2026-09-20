# Prod migration — interaction states become relative overlays

Target: `insightis-app.devart.info`. Measured on prod 2026-09-19 (light + dark, signed in).

## What is broken today (measured, not assumed)

| # | Defect | Evidence |
|---|---|---|
| 1 | `--state-hover` and `--tbl-row-pressed` resolve to the **same colour** in both themes — light `210 40% 96%` (Slate-100), dark `var(--grey-800)`. Any control with `hover:bg-state-hover` inside a selected row is invisible. | `/metrics`: hovering a row's ⋮ button gives `rgb(241,245,249)`; the row under it is `rgb(241,245,249)`. 10 such buttons on the page. |
| 2 | **Dark only:** `--tbl-row-hover` is defined as `var(--state-hover)` = `grey-800`, and `--tbl-row-pressed` is also `grey-800`. A hovered row and a selected row are identical. | computed on `.dark`: both `240 14% 15%`. |
| 3 | Workaround in the wild: a row control paints its **hover** with the **pressed** token, so it has nothing left for its real pressed state. | `/sources/my-connections`: the row's button carries `hover:bg-state-pressed`. |
| 4 | `/metrics` rows use the **control** tokens instead of the row tokens, and have no pressed state at all. | row classes: `bg-surface-card`, `hover:bg-state-hover`, `has-[button:focus-visible]:bg-state-hover`. No `active:`. |

Root cause for 1–3: the state tokens are **absolute colours**. Any fixed colour will eventually equal the surface it lands on. Fixed colours also cannot stack, so a control inside a row can never be "one step deeper than whatever is under it".

## The change

Each state becomes a **translucent wash** — `color-mix(in srgb, <base> <percentage>, transparent)` — so states composite instead of replacing each other. Four tokens, four percentages, **the same in both themes**; only the base differs.

| Step | Token | Strength | Light | Dark |
|---|---|---|---|---|
| Row hover | `--tbl-row-hover` | `--tint-4` | `#F8FBFC` (Δ7) | `#1C1D24` (Δ5) |
| Row pressed / selected | `--tbl-row-pressed` | `--tint-8` | `#F0F8F9` (Δ15) | `#21222A` (Δ10) |
| Control hover | `--state-hover` | `--tint-8` | `#F0F8F9` (Δ15) | `#21222A` (Δ10) |
| Control pressed / persistent active | `--state-pressed` | `--tint-12` | `#E9F4F7` (Δ22) | `#262830` (Δ15) |

Δ is the distance from the card in the red channel — how much step the eye actually gets.

Rows are deliberately lighter than controls: a row is wide and sits in a stack, where a heavy wash turns a list into stripes; a control is small and often sits alone with nothing to stack on. Inside a row the two compose — 8% over 8% lands at ~15% — so a control on a row is always the deeper of the pair.

One set of percentages serves both themes because `--slate-400` moves against the near-black card at roughly the rate `--brand-300` moves against white. A base that moved at a different rate would force a second ladder.

---

## Step 1 — add the tint scale

Prod has no `--tint-*` tokens today. Add to `:root` (theme-independent, no `.dark` copy):

```css
--tint-4:4%; --tint-8:8%; --tint-12:12%;
```

## Step 2 — retune one primitive, then set the base

`--brand-300` moves from `#5DA0A8` to **`#46A6B9`** (190°, 45% saturation). Check its consumers first — in the kit it had exactly one, this wash.

Why it has to move, in the order the alternatives failed: the brand scale drifts in hue from ~194° at its light end (`Brand-50`, the pale fill prod ships) to 179° at `Brand-600`, so washing with the brand role lands **green**. `Tertiary-600` (186°) reads **minty**. The old `--brand-300` had the right hue (189°) but only 29% saturation, and a desaturated wash reads **dirty** — that, not strength, is what makes a pale tint look muddy. 194° at 60% went **too blue**. Retuning the existing step was chosen over adding a primitive that would exist only to be mixed.

> **Do not desaturate a wash to calm it.** It gets dirty, not softer. Strength is the dial for how loud a state is; hue is what it is.

`--state-overlay` is the colour every state is mixed from — its own layer, because states are **surfaces** and must not reach into a text token or the brand role to paint themselves:

```css
:root { --state-overlay: var(--brand-300); }  /* #46A6B9 */
.dark { --state-overlay: var(--slate-400); }  /* #94A3B8 — the coldest usable base; a coloured wash
                                                 over the near-black card reads as a cast, not a lift */
```

## Step 3 — the four state tokens

Declared once in `:root`, percentage inline, no per-theme copies. Primitives are stored as HSL triplets on prod, so the base **must be wrapped in `hsl()`**:

```css
--tbl-row-hover:   color-mix(in srgb, hsl(var(--state-overlay)) var(--tint-4),  transparent);
--tbl-row-pressed: color-mix(in srgb, hsl(var(--state-overlay)) var(--tint-8),  transparent);
--state-hover:     color-mix(in srgb, hsl(var(--state-overlay)) var(--tint-8),  transparent);
--state-pressed:   color-mix(in srgb, hsl(var(--state-overlay)) var(--tint-12), transparent);
```

Where a **solid** colour is required — a gradient that must end opaque, or anything masking text — pre-composite the same wash over the surface instead of reaching for a state token:

```css
color-mix(in srgb, hsl(var(--state-overlay)) var(--tint-4), hsl(var(--surface-card)))
```

Then **delete** every `.dark` copy of these four. The old block re-declared them with hard-coded greys; leaving any behind pins that state to a fixed colour and re-creates the collision.

**Delete `--tbl-row-selected-hover` entirely** — see Step 5.

Delete the old `.dark` line `--tbl-row-hover: var(--state-hover);` — it is what makes defect 2.

**Do not touch** `--state-disabled`. It is a rest surface, never stacked on another state, and must stay an opaque fill.

## Step 4 — Tailwind colour mapping (this is what breaks if skipped)

These six tokens are no longer HSL triplets, they are finished colours carrying their own alpha. Every mapping of the form

```js
'state-hover': 'hsl(var(--state-hover) / <alpha-value>)'
```

must become

```js
'state-hover': 'var(--state-hover)'
```

for all four. Left as `hsl(...)` the declaration is invalid CSS and the background silently disappears. `--tbl-row-selected-hover` is already a finished colour on prod, so its mapping is the pattern to copy before you delete it.

Consequence to accept: these four lose Tailwind opacity modifiers (`bg-state-hover/50` stops working). Grep for `/` suffixes on these utilities before shipping — there were none at the time of the audit.

## Step 5 — selected must not be painted over by hover

A selected row keeps its own surface while the pointer is over it. There is no combined selected+hover colour, so `--tbl-row-selected-hover` goes away and the utility that used it goes with it:

```
/files, table row — remove this class:
  has-[[data-state=checked]]:hover:!bg-tbl-row-selected-hover
```

What remains — `has-[[data-state=checked]]:!bg-tbl-row-pressed` — already carries `!` (`!important`), so it beats `hover:bg-tbl-row-hover` and the selection holds under the pointer. Verify that on any other selectable list before shipping: if a selected rule is **not** `!important`, it must either outrank the hover rule or be declared after it at equal specificity, otherwise hover wins and the selection visibly disappears while the cursor is on the row.

The row still answers the pointer: its controls (checkbox, ⋮) keep their own hover, which composites on top of the selected surface.

## Step 6 — page-level class fixes

| Page | Element | Now | Change to | Why |
|---|---|---|---|---|
| `/metrics` | metric row | `hover:bg-state-hover` | `hover:bg-tbl-row-hover` | the row was using the control token, giving it the same weight as the ⋮ inside it |
| `/metrics` | metric row | *(no pressed state)* | add `active:bg-tbl-row-pressed` | optional, for parity with `/files`; skip if pressed feedback on rows is not wanted yet |
| `/sources/my-connections` | table row | `hover:bg-tbl-row-hover` · `active:bg-tbl-row-pressed` | **no change** | already on the row tokens; it only inherits the new values. No selected state exists on this table today |
| `/sources/my-connections` | row button | `hover:bg-state-pressed` | `hover:bg-state-hover` | removes the workaround; the button gets its pressed state back |
| `/sources/catalog` | connector cards | `hover:bg-state-hover` · `active:bg-state-pressed` | **no change** | cards, not rows, and nothing nests inside them — 94 state elements, 0 nested pairs |
| `/files` | table row | `hover:bg-tbl-row-hover` · `active:bg-tbl-row-pressed` · `has-[[data-state=checked]]:!bg-tbl-row-pressed` | **no change** | already on the row tokens; it only inherits the new values |
| `/files` | table row | `has-[[data-state=checked]]:hover:!bg-tbl-row-selected-hover` | **remove the class** | see Step 5 — the selected row must not be repainted on hover, and the token it names is deleted |

## Step 7 — find and replace hand-written mixes

Any rule that computes a state colour instead of reading a token will break, because **blending two translucent colours lands lighter than either of them**. Grep for `color-mix` referencing a state token and replace with the composite tokens:

| Pattern | Replace with |
|---|---|
| `color-mix(… var(--tbl-row-hover) 50%, var(--tbl-row-pressed))` | `var(--tbl-row-pressed)` — selected wins, no blend |
| `color-mix(… var(--brand-primary) 10%, var(--tbl-row-pressed))` | `var(--tbl-row-pressed)` |
| `color-mix(… var(--brand-primary) 10%, var(--state-pressed))` | `var(--state-pressed)` |

Same rule for anything that needs a **solid** colour. A state token can no longer terminate a gradient or sit behind text that must be masked — if such a place exists, pre-composite it: `color-mix(in srgb, hsl(var(--state-overlay)) var(--tint-6), hsl(var(--surface-card)))`.

## Step 8 — the row kebab: one control, not three

The ⋮ that opens a row's menu is the clearest consumer of this change, and the place where prod
currently gives four different answers to the same gesture. Two of them are symptoms of the
token defects above and are fixed by Steps 3–6. The third is a component divergence that the token
change does **not** fix and has to be corrected in markup.

### Measured on prod, 2026-09-19 (signed in, light theme, 1568 px viewport)

Computed styles read in the page, not estimated from screenshots.

| Surface | box | radius | glyph | ⋮ hover surface |
|---|---|---|---|---|
| `/metrics` row | **28 × 28** | 6 px | **12 px** | **none visible** |
| `/sources/my-connections` row | **25 × 25** | 6 px | **12 px** | brand-tinted (reads mint) |
| `/files` row | **24 × 24** | **4 px** | **16 px** | neutral, clearly visible |
| sidebar chat row | 24 × 24 | 6 px | 16 px | **none visible** |

Four surfaces, four different combinations of box, radius and glyph. Nothing here is a size *step* —
28 and 24 are on the 4 px grid, 25 is on no grid at all, and the glyph swings 12 → 16 px, which is
the most visible of the three: the ⋮ on `/files` reads noticeably larger than the one on `/metrics`
even though its box is the *smaller* of the two.

For reference, the kit's row step is 24 × 24, radius 4 px, glyph 14 px. `/files` is the closest thing
prod has to it and still differs on the glyph.

**Correction to an earlier draft of this report:** the `/files` ⋮ was described as "≈ 34 px, the base
IconButton step". That was measured off screenshot crops before JS execution was available, and it is
wrong — the box is 24 px. What made it read larger is the 16 px glyph inside it. The same draft
called the `Actions` header on `/sources/my-connections` truncated; it is not — the cell is 113 px
with `scrollWidth === clientWidth` and the full word renders.

**Scope: four surfaces, not three.** The sidebar chat row carries the same control and is included
above. There is no chats-library page on prod — that fifth surface exists only in the design kit, so
whatever is decided here has to hold when that page ships.

### What already works — measured, do not "fix" it

Opened a menu on each surface and moved the pointer right off the row:

| Surface | ⋮ stays visible + pressed | row keeps its hover |
|---|---|---|
| `/files` | ✅ | ❌ goes white |
| `/metrics` | ✅ | ❌ goes white |
| `/sources/my-connections` | ✅ | ❌ goes white |
| sidebar chat row | ✅ | ✅ |

So the trigger never vanishes under its own menu — that failure mode is not present on prod. What is
missing is the **row** half of the same idea: on three of four surfaces the row drops back to rest
while its own menu is open, so an open menu appears to belong to no row. The sidebar already holds
it, which makes it the reference implementation rather than something to invent.

Keyboard focus also already reveals the control: after `Escape` closes the menu on
`/sources/my-connections`, the ⋮ stays visible with a focus ring while the pointer is elsewhere on
the page.

**One thing that is wrong everywhere:** the menu opens **upward** on all four surfaces and overlaps
whatever sits above the row. On `/sources/my-connections` it covers the `Actions` header — the label
for the very column the menu belongs to. Worth deciding deliberately rather than inheriting: below
the trigger by default, flipping up only when there is no room.

One thing is already consistent and must stay that way: on all four surfaces the ⋮ is hidden at rest
and appears on row hover.

### Which defect each symptom is

| Symptom | Cause | Fixed by |
|---|---|---|
| `/metrics` ⋮ has no hover surface | **Defect 1.** The ⋮ paints `state-hover` onto a row already filled with `state-hover` — same absolute colour, so the button disappears into its own row. It is not missing a hover; its hover is invisible. | Step 3 — overlays composite, so the ⋮ lands one step deeper than the row |
| `/sources/my-connections` ⋮ reads mint, deeper than its siblings | **Defect 3.** The workaround: the button paints its hover with `state-pressed`, which on light theme is the brand-tinted step. | Step 6 (already listed) — `hover:bg-state-pressed` → `hover:bg-state-hover`, and it regains `active:bg-state-pressed` |
| No two ⋮ share a box + radius + glyph | **Not a token defect.** The control is built per surface rather than instantiated from one size step — 28/6/12, 25/6/12, 24/4/16, 24/6/16. | markup only — see the table below |

The size divergence is worth fixing on its own terms, not just for consistency: at 36 px the ⋮ is the
tallest child in a row whose every other cell tops out at ~20 px (switch, badge, text line, connector
logo, status pill), so it alone sets the row height — while sitting invisible until hover. The row
pays the height for a control that is not on screen.

### What to replace, where

| Page | Element | Now | Change to | Note |
|---|---|---|---|---|
| all four | row ⋮ | each surface sets its own box, radius and glyph — 28/6/12 · 25/6/12 · 24/4/16 · 24/6/16 | **`IconButton`, tertiary variant, at the row size step — and nothing else.** No box, no radius, no glyph size written at the call site | this is the whole of the component divergence, and it is markup; Steps 3–6 do not touch it |
| `/metrics` | row ⋮ | `hover:bg-state-hover` | **no class change** | invisible today only because of defect 1; Step 3 makes it read |
| sidebar | chat row ⋮ | same symptom as `/metrics` — no visible hover | **no class change** | same cause, same fix from Step 3. Its size (24 px) and its open-menu behaviour are already the target |
| `/sources/my-connections` | row ⋮ | `hover:bg-state-pressed` | `hover:bg-state-hover` · `active:bg-state-pressed` | already listed in Step 6 — this is the same line, named here as the kebab |
| all four | row ⋮ reveal | reveals on row hover | row hover **plus** `focus-visible` on the button **plus** the button's own `aria-expanded="true"` | keyboard focus and the open-menu case were **measured and already work** (see below) — this row is to keep them working when the control is unified, not to fix them. |
| `/files`, `/metrics`, `/sources/my-connections` | the **row** while its ⋮ menu is open | drops back to rest | hold `bg-tbl-row-hover` while a descendant menu is open | measured: the ⋮ holds its pressed box but the row underneath goes white, so the open menu appears to belong to no row. The sidebar chat row already does this correctly — copy it |
| `/files` | Actions column | no header | `Actions` | `/sources/my-connections` already labels it correctly — this is the one to copy |
| `/metrics` | Actions column | **no header cells at all** — the list renders without a `<th>` row | **add the header row.** The kit's metrics table already defines the column set — Metric name · Alias · Definition · Badge · Actions | not a one-word fix like `/files`: the row does not exist yet, so the whole header comes in at once |
| `/sources/my-connections` | Actions header | `Actions`, renders in full | **no change** | verified: 113 px cell, `scrollWidth === clientWidth` |

### Why this is one component, not four sets of matching numbers

The four combinations above are not four decisions that happened to differ. They are the signature of
a control that **is not being instantiated** — each surface hand-builds a small square button and
supplies its own box, radius and glyph. Nothing forced them apart and nothing held them together, so
they drifted, and they will drift again the moment a fifth surface needs a ⋮.

The ⋮ is an **`IconButton`, tertiary variant, at the row size step** — nothing more. Size, radius,
glyph size, icon colour, hover, pressed and focus are the component's job, not the call site's. That
is the actual fix: not "make 28/6/12 and 25/6/12 and 24/4/16 agree on one triple", but **delete the
triples** so no surface is in a position to disagree. A reviewer's test is simple — if a box size, a
radius or a glyph size appears anywhere near a row ⋮, the control is being rebuilt rather than used.

Two consequences worth stating, because they are what makes this worth doing rather than cosmetic:

- If the row step is the only size ever written down, a control that is too tall for a row cannot
  reach production. Today `/metrics` runs a 28 px ⋮ in its rows.
- Steps 3–6 fix the hover and pressed *colours* for every consumer at once precisely because those
  come from tokens. The box and the glyph do not come from anywhere at all yet, which is why they are
  the one part of this report that the token change cannot repair.

After Steps 3–6 and this, the only per-surface thing left is which items the menu opens. The sidebar
chat row is the closest prod has to the target today — it is also the only surface that holds its row
state while the menu is open.
## Verification — measurable, not by eye

Every check is a comparison of computed values, not a look. Run each one in **both themes**.

### A. Token-level — run once, on any page

1. **No two steps of the ladder are equal.** The whole point of the change; if any pair matches, a state is invisible somewhere.
   ```js
   const g = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
   const t = ['--tbl-row-hover','--tbl-row-pressed','--state-hover','--state-pressed'].map(g);
   new Set(t).size === 4   // must be true, light AND dark
   ```
   This is defect 2 (dark: `--tbl-row-hover` === `--tbl-row-pressed`) and defect 1 (`--state-hover` === `--tbl-row-pressed`) in one assertion.
2. **Nothing resolves to a raw string.** A missed Tailwind mapping (Step 4) leaves an unusable value:
   ```js
   ['--tbl-row-hover','--tbl-row-pressed','--state-hover','--state-pressed']
     .every(n => g(n).startsWith('color-mix'))
   ```
3. **The deleted token is gone.** `g('--tbl-row-selected-hover') === ''`

### B. Per page

| Page | What to check | Pass condition |
|---|---|---|
| `/metrics` | hover a row, then hover its ⋮ | the two backgrounds **differ** — this is the defect measured before the change (both were `rgb(241,245,249)`) |
| `/metrics` | row at rest vs hovered | differs, and the hovered row is the **lighter** of hover/selected steps |
| `/metrics` | press a row (if Step 6's optional `active:` was added) | background deepens from the hover value |
| `/sources/my-connections` | hover a row, then hover the row's button | the two backgrounds **differ**; the button is the deeper one |
| `/sources/my-connections` | press the button | differs from its hover — it regained a pressed state that the workaround had taken away |
| `/sources/catalog` | hover a connector card, then press it | two distinct backgrounds; nothing nests here, so this only confirms the base tokens still read correctly on cards |
| `/files` | select a row (checkbox), then hover it | background **does not change** — selection is never repainted by hover (Step 5) |
| `/files` | select a row, then hover its ⋮ | the ⋮ background differs from the row's |
| `/files` | hovered row vs selected row | selected is the deeper of the two |
| every page | anything hovered | no element whose background computes to `rgba(0, 0, 0, 0)` while hovered — that is the signature of a missed Tailwind mapping in Step 4 |
| all four | read box, radius and glyph of each ⋮ in the page | **all four identical** — they were 28/6/12, 25/6/12, 24/4/16, 24/6/16 (Step 8). If they match but the numbers are still written per surface, the defect is unfixed — grep the call sites |
| all four | hover a row, then hover its ⋮ | the ⋮ is the deeper of the two on every surface; on `/metrics` and in the sidebar it had no visible surface at all before |
| all four | tab to a row's ⋮ with the keyboard | the ⋮ is **visible** while focused, without the pointer being on the row — this already worked before, confirm it survives |
| all four | open a row's menu, then move the pointer off the row | the ⋮ stays visible and pressed (already true) **and the row keeps its hover fill** (only the sidebar did this before) |
| all four | open a row's menu | the menu does not cover the header above the row — on `/sources/my-connections` it covered the `Actions` label |
| `/files` | the actions column header | reads `Actions`, same as `/sources/my-connections` |

### C. Expected values

Composited over the card, measured — not computed. Δ is the distance from the card in the red channel, i.e. how much step the eye gets:

| Step | Light (on `#FFFFFF`) | Δ | Dark (on `#17171E`) | Δ |
|---|---|---|---|---|
| Row hover | `#F8FBFC` | 7 | `#1C1D24` | 5 |
| Row pressed / selected | `#F0F8F9` | 15 | `#21222A` | 10 |
| Control hover | `#F0F8F9` | 15 | `#21222A` | 10 |
| Control pressed / active | `#E9F4F7` | 22 | `#262830` | 15 |

Measure with a **real pointer**, not by toggling a simulation class — a synthetic hover class can report a state the live CSS does not produce.

## Also in this batch — control side padding

Measured in the development Storybook (`devart-ui-react`, the `components-*--sizes` stories) against the Expected kit. Unrelated to the states above, but shipping together.

Development already does the important part: side padding does **not** grow with the control height *inside a family*. What differs is the value, and that it is not the same number across the families.

**The canonical ladder — this table is the one all four sources carry** (this report, the [UX audit](2026-09-04-insightis-ux-audit.md) #15/#36, `Insightis/pages/kit-theme.css`, and `devart.ui.react`):

| step | height | button padding | field padding | gap | label | glyph |
|---|---|---|---|---|---|---|
| xs | 28 | 8 | 8 | 4 | 12 | 14 |
| sm | 32 | 12 | 12 | 6 | 14 | 16 |
| md | 36 | 12 | 12 | 8 | 14 | 16 |
| lg | 40 | **16** | 12 | 8 | 16 | 20 |
| xl | 44 | **20** | 12 | 8 | 16 | 20 |

Two things in it are easy to get wrong:

- **The button opens out at `lg` and `xl`; the field does not.** The two share an edge at `xs`, `sm` and `md` — every step the product actually uses — and part company above them. A button's inset is what makes its label read as a target; a field is a place to put text and reads tighter the nearer its value starts to the edge. (This report first settled every family on a flat 12px from `sm` up; amended 2026-09-20.)
- **The gap has three steps, not two.** 8px reads loose at 32px against a 14px label, and `sm` is the step the product uses most — which is why the published package's flat 6px was right *there* and wrong everywhere else.

### Button — `components-button--sizes`

| Size | Height | Dev now | Expected |
|---|---|---|---|
| xs | 28px | `px-2.5` 10px | **`px-2` 8px** |
| sm | 32px | `px-2.5` 10px | **`px-3` 12px** |
| md | 36px | `px-2.5` 10px | **`px-3` 12px** |
| lg | 40px | `px-2.5` 10px | **`px-4` 16px** |
| xl | 44px | `px-2.5` 10px | **`px-5` 20px** |

Height and type level already match Expected — nothing there changes.

### InputGroup / Input — `components-inputgroup--sizes`

Dev splits the inset across two elements: the wrapper has no padding, the leading slot carries `pl-2.5` (10px), and the input itself carries `px-1.5` (6px). A field without a leading icon therefore starts its text 6px from the edge and one with an icon starts at 10px — two rails for the same component.

| | Dev now | Expected |
|---|---|---|
| Wrapper side padding | `0` | **12px** (8px at `xs`) — the wrapper owns the inset |
| Leading slot | `pl-2.5` 10px | **0** — inherits the wrapper's inset |
| Input element | `px-1.5` 6px | **`pl-1` 4px, `pr-0`** — only the gap to the icon, as `.field` does |
| Trailing action inset | — | **8px** = side padding − 4px, so both glyphs sit on the same rail |

Net effect: the text starts at 12px whether or not there is a leading icon.

### TextArea — `components-textarea--sizes`

| Size | Dev now (h / v) | Expected (h / v) |
|---|---|---|
| xs | 6 / 8px | **8 / 4px** |
| sm | 8 / 8px | **12 / 6px** |
| md | 8 / 8px | **12 / 8px** |
| lg | 8 / 10px | **12 / 8px** |
| xl | 8 / 12px | **12 / 10px** |

Vertical padding still climbs in Expected, just on a lower ramp — it scales with the height and keeps the first line centred.

> Dev's TextArea `min-height` (48 / 48 / 56 / 60 / 64) also differs from Expected (28 / 32 / 36 / 40 / 44). That is a separate question and is **not** part of this change.

Verify: `getComputedStyle(el).paddingLeft` reads 12px on every `sm`–`xl` control across Button, Input, InputGroup, Select trigger and TextArea, and 8px on `xs`.

## Also in this batch — a nested row is 8px, everywhere

A row that belongs to the row above it — a metric under its provider, a schema
under its connection — takes **8px** of vertical padding against a top-level
row's 10px.

That number already existed. It existed **once**, as a local override on one
table:

```css
.mx-metric-child td{padding:.5rem 1rem;height:2.875rem;box-sizing:border-box}
```

Which is the problem. A number that lives on `.mx-metric-child` is a fact
about the metrics table, so every other place that nests rows has to either
invent its own value or not tighten at all — and the contract had already
drifted off it: `changes/Table.md` documented the same cell as `.4375rem`
(7px) while the CSS said `.5rem`. Two sources, two answers, no way to tell
which was intended.

**Why 8 and not 10.** A child row set at the same height as its parent reads as
its *sibling*. The tighter rhythm is the thing that says it is one level down,
and it is deliberately the only difference: no tint, no smaller type, no
separate border treatment. Those would make a child look like a different
**kind** of object rather than the same object nested.

**What is not in the rule.** Horizontal padding does not change. The first
cell's indent stays with whoever owns the parent row, because how far in a
child sits depends on what is in the parent's first cell — a chevron, a logo,
or both — which the table itself cannot know. In the metrics table that is
still `--mx-prov-indent`, and the fixed `height:2.875rem` also stays local,
since "every metric row is identical regardless of content" is a decision about
that table, not about nesting.

### The change, in three places

| Where | File | Change |
|---|---|---|
| Kit | `pages/kit-theme.css` | new `table.tbl tbody tr[data-nested] td{padding:.5rem 1rem}` beside `table.tbl td`; `.mx-metric-child td` keeps only `height` |
| Kit markup | `components/MetricsTable.html`, `insightis-preview-kit.html`, `skeletons/MetricsTable.html`, `pages/approved/metrics-landing.html` | `data-nested` on every `tr.mx-metric-child`, including the two rows built in JS |
| Contract | `changes/Table.md` | a **Nested row** entry in the shared-atoms table; the metric-child entry stops restating the padding (and stops being wrong about it) |

The design system carries the same rule as a prop rather than a class, since it
has no stylesheet to put it in:

```jsx
<TableRow nested>   // → data-nested → TableCell's group-data-[nested]/row:py-2
```

`@devart/ui-react`, `src/components/Table/TableRow.tsx` +
`TableCell.tsx`. Recorded there as §66.

**Zero visual delta on prod.** The only rows that carry `data-nested` today
are the ones that already had `.5rem` from the override. This is a move of
where the number lives, not a change to it — which is also why it can ship in
this batch without its own verification pass.

Verify: `getComputedStyle(document.querySelector('tr.mx-metric-child td')).paddingTop`
reads `8px`, and removing `.mx-metric-child` from the element still reads
`8px` as long as `data-nested` is present.

## Rollback

**Steps 1–7 are a single revertable commit:** the tint scale, `--state-overlay`, the four token definitions, the Tailwind mapping, five class strings. No component markup changes, no renames — every consumer keeps reading the same token names.

**Step 8 is a second commit** and should not be folded into the first. Two of its three symptoms are fixed by Steps 3–6 with no markup change at all; what remains is markup — the `/files` ⋮ size step, the reveal triggers, and two column headers. Keeping them apart means a revert of the token change does not drag the kebab markup back with it, and the kebab work can ship on its own if the token change slips.
