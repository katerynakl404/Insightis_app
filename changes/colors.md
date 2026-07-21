# Colors & tokens — prod → expected

The design system moved from a flat, hardcoded palette to a **three-layer system**:
Primitives → Semantic aliases → Component-scoped tokens. Every semantic and component-scoped token references a primitive via `var(--<primitive>)`; raw hex appears only inside the Primitives block. The single exception is `rgba(0,0,0,α)` inside `box-shadow` declarations (universal shadow convention).

## Layer 1 — Primitives (new this design system)

Theme-independent CSS variables defined once in `:root`.

| Scale | Steps | Notes |
|---|---|---|
| **Brand** (teal) | 50 `#E8F2F5` · 100 `#C7DDE5` · 200 `#93C0C8` · 300 `#5DA0A8` · 400 `#2FA29B` · 500 `#148F8D` · 600 `#07807E` · 700 `#066867` · 800 `#142B31` · 900 `#0A1A1F` | Custom Insightis teal |
| **Tertiary** (cyan-teal) | 50 `#EBF8F8` · 100 `#C6EEED` · 200 `#95E1DF` · 300 `#5ED0CF` · 400 `#2EBEC4` · 500 `#14A8AF` · 600 `#0D8E97` · 700 `#0D717A` · 800 `#0E5862` · 900 `#0E464C` · 950 `#052A32` | Custom |
| **Slate** | 50 `#F8FAFC` · 100 `#F1F5F9` · 200 `#E2E8F0` · 300 `#CBD5E1` · 400 `#94A3B8` · **450 `#7C8CA2`** · 500 `#64748B` · 600 `#475569` · 700 `#334155` · 800 `#1E293B` · 900 `#0F172A` · 950 `#020617` | Tailwind + custom 450 |
| **Grey** | 50 `#F9FAFB` · 100 `#F4F4F5` · 200 `#E5E7EB` · 300 `#D1D5DB` · 400 `#9CA3AF` · 500 `#6B7280` · **600 `#525258`** · **700 `#2A2834`** · **800 `#21212C`** · **900 `#17171E`** · **950 `#0F0E14`** | Custom dark end (600/700/800/900/950) for dark-mode surfaces |
| **Red** | 50 `#FEF2F2` · 100 `#FEE2E2` · 200 `#FECACA` · 300 `#FCA5A5` · **400 `#F25555`** · 500 `#EF4444` · 600 `#DC2626` · 700 `#B91C1C` · 800 `#991B1B` · **850 `#7F1D1D`** · **900 `#450A0A`** · **950 `#2A1010`** | Custom 400/850/900/950 |
| **Single-purpose** | `--orange-500: #FF6900` · `--green-light-600: #009966` · `--green-dark-500: #03AF76` | For Feedback/Attention and Feedback/Green which don't sit in a full scale |
| **Achromatic** | `--white: #FFFFFF` · `--black: #000000` | — |

## Layer 2 — Semantic tokens (light & dark)

All semantic tokens are aliases — they resolve through `var(--<primitive>)`. Values in the table show the resolved colour for reference; the source-of-truth alias is in the right column.

| Token | Mode | Current prod | v1.0 | Expected (resolved) | Alias |
|---|---|---|---|---|---|
| Text/Primary | Light | `#111827` | — | `#0F172A` | `var(--slate-900)` |
| Text/Primary | Dark | `#FFFFFF` | — | `#F9FAFB` | `var(--grey-50)` |
| Text/Body | Light | `#314158` | — | `#334155` | `var(--slate-700)` |
| Text/Body | Dark | `#DFDFDF` | — | `#F4F4F5` | `var(--grey-100)` |
| Text/Secondary | Light | `#62748E` | — | `#5A6A80` ⚠️ **primitive lift** | `var(--slate-550)` — **new custom primitive** added this iteration alongside the existing custom `--slate-450`. Slate-500 `#64748B` over `State/Hover` Slate-100 = 4.21:1 — failed AA 4.5:1 for normal text. Jumping straight to Slate-600 `#475569` (7.04:1) felt visually heavy for "secondary" text. **Slate-550 `#5A6A80`** is the minimum darkening that clears AA with margin: **5.01:1** over `State/Hover` and **5.47:1** over Card. Semantic token (`Text/Secondary`) unchanged — only the backing primitive shifts, so every component that uses `Text/Secondary` automatically clears AA on hover surfaces without any component-level edit. |
| Text/Secondary | Dark | `#979798` | — | `#D1D5DB` ⚠️ **primitive lift** | `var(--grey-300)` — bumped this iteration from Grey-400 `#9CA3AF`. The dark ink ladder had collapsed at the bottom: `--ink-secondary` Grey-400 (`~67% L`) and `--ink-inactive` Slate-400 (`~63% L`) were only ~4 % L apart, so section labels and content text looked identical. Light theme had a healthy ~15 % L gap between each ink tier and the hierarchy was clear; dark needs the same separation. Grey-300 sits at `~84% L` — pulls Secondary clearly above Inactive (~20 % L gap) while leaving room for Body at Grey-100 (~96 % L). Contrast stays AAA on every dark surface (≥10 : 1 on Card, Hover, page bg). |
| Text/Inactive | Light | `#979FA9` | — | `#7C8CA2` | `var(--slate-450)` |
| Text/Inactive | Dark | `#505257` | — | `#94A3B8` ⚠️ **lifted twice for visibility on disabled bg** | `var(--slate-400)` — iterations: original `var(--grey-500)` `#6B7280` was ~3:1 over Grey-800 (unreadable); `var(--slate-450)` `#7C8CA2` reached ~5:1 (legible but still felt muted); **`var(--slate-400)` `#94A3B8` lands at ~6:1** with clear visibility while staying in the Slate family so it's hue-distinct from `--ink-secondary` Grey-400 (which is the same lightness but neutral). Disabled buttons (e.g. dark Send) now read clearly on dark composer surfaces. |
| **Text/Highlight** *(new)* | Light | — | — | `#07807E` | `var(--ink-highlight)` → `var(--brand-primary)` → `var(--brand-600)` — 4.77:1 vs Surface/Card `#FFFFFF` (AA Normal at 4.5:1, comfortably passes AA Large at 3:1) |
| **Text/Highlight** *(new)* | Dark | — | — | `#2EBEC4` | `var(--ink-highlight)` → `var(--tertiary-400)` — ~8:1 vs Surface/Card `#17171E` (AAA both Normal and Large). Brighter than `Brand/Primary`'s Brand-500 mapping so links and highlighted text genuinely "pop" against the dark surface without adding a new primitive. **Single semantic source of truth for "emphasised text"** — used by `.link` (every text-link in the kit), `.cl-kw` (the concept-mode keyword highlight in chat-landing's title), and any future "highlighted body text" treatment. Note: dark resolves to a Tertiary while light aliases `Brand/Primary` — the semantic stays consistent, only its theme resolution diverges so each mode reads at its right vibrance. |
| Stroke/Border | Light | `#F0F5FA` | — | `#E2E8F0` ⚠️ | `var(--slate-200)` (bumped this iteration from Slate-100 for visibility) |
| Stroke/Border | Dark | `#1E1E22` | — | `#2A2834` | `var(--grey-700)` |
| Stroke/Border_Hover | Light | `#94A3B8` | — | `#7C8CA2` ⚠️ **softened** | `var(--slate-450)` — was `var(--slate-400)` `#94A3B8`. Softer hover-border for every form control (`.field`, `.ta`, `.igrp`) and any card-like surface that uses `--border-hover` (e.g. `.cl-composer:hover` in chat-landing). Hover is not a critical accessibility surface — the subtler tone reads as a gentle hint rather than a hard line. Card / list-row components that need a brand-tinted hover use the separate `--card-border-hover` token. |
| Stroke/Border_Hover | Dark | `#475569` | — | `#475569` | `var(--slate-600)` — sits one step above the dark Card so hover reads as a subtle lift rather than a strong outline. |
| State/Hover | Light | `#F0F8FB` | — | `#F1F5F9` | `var(--slate-100)` — pale cool tint (96% lightness; RGB 241·245·249 with B highest, no green cast). Light enough to wash gently on white card, cool enough to feel branded without reading as teal. |
| State/Hover | Dark | — | — | `#21212C` | `var(--grey-800)` — pure neutral, lifts above `--card` by only ~4pt lightness; the previous saturated/slate variants read as a visible patch against the neutral dark card — neutral is the clean choice |
| State/Pressed | Light | — | — | `#E8F2F5` | `var(--brand-50)` — pale brand teal, 93% L (3pt darker than Slate-100 hover at 96%). Press feedback comes from the **hue shift** (cool slate → brand teal) more than a lightness drop — subtle lightness step that doesn't pop, brand tint that signals "active interaction". |
| State/Pressed | Dark | — | — | `#2A2834` | `var(--grey-700)` — **lifts** above hover with a pure-neutral colour (dark-mode convention: surfaces gain lightness with elevation). Grey-700 sits ~3pt above Grey-800 hover (18% L vs 15% L) and stays in the same Grey scale — minimal saturation (~13%), no blue tint. Grey-700 is aliased with `--border` and `--chips` in dark, but those surfaces never co-occur with a pressed state's bg. |

> **Usage pattern:** Press feedback across the kit is **bg-shift-only** — no transform, no shadow, no text-position shift on press. Each variant has a distinct pressed colour (Primary → `--btn-primary-bg-press`, Secondary → `--state-pressed`, Outline / Tertiary → `Brand/Primary @8%` overlay, Destructive → `--fb-red-press`). For low-emphasis nav-style items (`.sbx-nav-item`, `.sbx-chat`) the pressed bg simply stays at `--state-hover` — pressed visually equals hover, with the cursor change as the only state cue. This is the Tailwind UI / shadcn / GitHub Primer convention.
| State/Disabled | Light | `#E6EAEF` | `#E2E8F0` | `var(--slate-200)` |
| State/Disabled | Dark | `#232527` | `#2A2834` ⚠️ **lifted for shape visibility on Card** | `var(--grey-700)` — was `var(--grey-800)` `#21212C` but that's only 4pt lightness above `--card` Grey-900 (10% → 14%), so disabled buttons (e.g. the dark Send button) merged into the composer surface and didn't read as buttons. Grey-700 (18% L) gives an 8pt lift — the button shape is clearly distinct from the card while still reading as muted. Aliased with `--state-pressed`, `--chips`, and `--border` in dark, but those surfaces never co-occur with a disabled button's bg. Text `Slate-400` on Grey-700 = ~5.5:1 (still AA). |
| State/Focus_Ring | Light | — | `#0F172A` | `var(--slate-900)` — Figma neutral focus-ring token |
| State/Focus_Ring | Dark | — | `#F1F5F9` | `var(--slate-100)` — Figma neutral focus-ring token |

> **Kit override:** the kit does **not** wire `--focus-ring` to this neutral `State/Focus_Ring` slate. `--focus-ring: var(--focus-ring-brand)` → **brand `#07807E`**, so every focus ring (`--shadow-focus`, all components incl. Destructive) renders brand-teal, not neutral slate. The neutral Figma token is documented here for completeness but is not the shipped focus colour.
| Surface/Card | Light | `#FFFFFF` | `#FFFFFF` | `var(--white)` |
| Surface/Card | Dark | `#1A1A1F` | `#17171E` | `var(--grey-900)` |
| Surface/Card 2 | Light | — | `#F1F5F9` | `var(--slate-100)` |
| Surface/Card 2 | Dark | — | `#21212C` | `var(--grey-800)` |
| Surface/Chips | Light | `#FAFAFA` | `#F8FAFC` | `var(--slate-50)` |
| Surface/Chips | Dark | `#25252A` | `#2A2834` | `var(--grey-700)` |
| Brand/Primary | Light | `#07827F` | `#07807E` | `var(--brand-600)` |
| Brand/Primary | Dark | `#0A9794` | `#148F8D` | `var(--brand-500)` |
| Brand/Secondary | Light | `#06596B` | `#066867` | `var(--brand-700)` |
| Brand/Secondary | Dark | `#1FA8B0` | `#2FA29B` | `var(--brand-400)` |
| Brand/Tertiary | Light | — | `#0D8E97` | `var(--tertiary-600)` |
| Brand/Tertiary | Dark | — | `#14A8AF` | `var(--tertiary-500)` |
| **Feedback/Red** | Light | `#C10007` | `#B91C1C` | `var(--red-700)` — used as **fill** (destructive Button bg) only. Never used as text on a Card. |
| **Feedback/Red** | Dark | `#7D1B1B` | `#B91C1C` ⚠️ **theme-independent fix** | `var(--red-700)` — theme-independent so the destructive Button keeps its AA against white in both modes. For destructive **text** on the dark Card use `Feedback/Red_Text` — Red-700 fails AA 2.76:1 there. |
| **Feedback/Red_Text** *(new)* | Light | — | `#B91C1C` | `var(--red-700)` — 8.39:1 vs Surface/Card `#FFFFFF` |
| **Feedback/Red_Text** *(new)* | Dark | — | `#F25555` | `var(--red-400)` — 5.27:1 vs Surface/Card `#17171E`. **Theme-adaptive** destructive text / icon colour with comfortable AA headroom in dark. Applied to: `.mi.danger` (Dropdown destructive item), `.badge-red` text, `.statv-error` icon, `.file.s-error` icon, `.toast.var-error` icon + progress bar. |
| **Feedback/Error_Hover** *(new)* | Light + Dark | — | `#991B1B` | `var(--red-800)` — same in both themes; AA 8.39:1 vs white |
| **Feedback/Error_Press** *(new)* | Light + Dark | — | `#7F1D1D` | `var(--red-850)` — same in both themes; AAA 10.34:1 vs white |
| Feedback/Attention | Light + Dark | `#FF6900` | `#FF6900` | `var(--orange-500)` |
| Feedback/Green | Light | `#009966` | `#009966` | `var(--green-light-600)` |
| Feedback/Green | Dark | `#03AF76` | `#03AF76` | `var(--green-dark-500)` |
| Logo/Ink (wordmark) | Light | `#111827` | `#0F172A` | `var(--slate-900)` — pre-existing typo `#111827` fixed to closest primitive |
| Logo/Ink (wordmark) | Dark | — | `#E8F2F5` | `var(--brand-50)` — very light teal on dark Card, high-contrast wordmark |
| **Logo/Mark** (icon) | Light | `#07807D` | `#07807E` | `var(--brand-600)` — pre-existing typo `#07807D` fixed to Brand-600. 5.07:1 vs white. |
| **Logo/Mark** (icon) | Dark | — | `#148F8D` ⚠️ **theme-adaptive** | `var(--brand-500)` — must lift in dark: Brand-600 (`#07807E`) on Surface/Card (`#17171E`) is only 3.74:1 (fails AA 4.5:1). Brand-500 (`#148F8D`) reaches 4.54:1 (AA pass) while keeping the same brand hue — same Brand-600/Brand-500 split used by `Brand/Primary`. |

## Tint scale — alpha-strength steps for translucent washes (new this iteration)

Every reusable translucent wash composes one canonical recipe; the strengths live as a small value scale in `kit-theme.css` (block right after `:root`):

```css
/* the scale */                       /* the recipe (the only sanctioned inline color-mix in a rule) */
--tint-5 … --tint-80  /* 11 steps */  color-mix(in srgb, var(--<semantic base>) var(--tint-N), transparent)
```

- **Strength-only, no combinations** — an earlier draft pre-mixed family×strength tokens (`--tint-brand-8`, `--tint-red-15`, … 23 total); most were single-use, so the combos were dropped in favour of the 11-step value scale (5/6/8/10/12/15/20/25/40/55/80). The base must be a **semantic token** (`--brand-primary`, `--fb-*`, `--ink`, `--border`, `--card`) or `currentColor`; the strength must be a `--tint-N` step — **never a literal %** in a component rule or component token. Tuning a strength is still a one-line edit.
- **Why not state names** — the same strength is hover on one component (`.chat-row-pin` 8 %) and press on another (`.btn-outline` 8 %), so state intent stays at the component layer (`--btn-outline-bg-press` composes `var(--tint-8)`).
- **Scoping for free** — because the `color-mix` sits at the use site (not inside a pre-mixed token), it resolves against the *using element's* cascaded bases: nested `.prod` containers and `currentColor` re-resolve per element with no per-scope token re-declaration.
- **Growing the scale** — steps exist only for strengths in use; add a step when a new strength earns a second consumer. `.dark` strength *deviations* (destructive outline 14/22 %) stay literal on their component token in the `.dark` block.
- **Out of scope** — mixes over a surface (`--toast-bg-*`, `--card-lift-border`, `.pg-*-tag` backgrounds) and single-use artistic values (pulse ring 22 %, banner glow 50 %, `.prov-card` dashed-border trio 35/45/55 %, `.chat-row` rest border 45 %, `.ds-card-hover` 78 %, `.chip-meta` 35 %, `.card-c` pressed 4 %) stay component-scoped as before — fold them in only when a second consumer appears.

Zero visual change — pure token-layer refactor; every resolved value is identical.

## Layer 3 — Component-scoped tokens (new this design system)

Most are theme-independent (identical resolved value in both themes) so component contrast budgets aren't at the mercy of theme switching. The Secondary tokens are an exception — they're explicitly *theme-aware* so that hover is always lighter than the default in both themes.

| Token | Resolved value (light / dark) | Alias (light / dark) | Purpose |
|---|---|---|---|
| `--btn-primary-bg` | `#07807E` / `#07807E` | `var(--brand-600)` | Primary Button default fill — 5.07:1 vs white in both themes |
| `--btn-primary-bg-hover` | `#066867` / `#066867` | `var(--brand-700)` | Primary hover — 6.20:1 |
| `--btn-primary-bg-press` | `#0E5862` / `#0E5862` | `var(--tertiary-800)` | Primary pressed — 7.5:1 (replaces previous off-palette `#055454`) |
| `--btn-primary-text` | `#FFFFFF` / `#FFFFFF` | `var(--white)` | Primary label |
| **`--content-on-solid`** *(new)* | `#FFFFFF` / `#FFFFFF` | `var(--white)` | Always-white content on solid surfaces — theme-independent. Used by destructive Button text (`.btn-destructive` color), Checkbox mark (`.cbx` color + `.cbx.s-disabled.on`), Checkbox indeterminate (`.cbx.is-indeterminate` color + the inner horizontal bar `.cbx.is-indeterminate::before` background), and Switch thumb (`.swt::after` background). Replaces raw `#fff` literals so no semantic component reaches into the primitives layer for white. |
| `--focus-ring-brand` | `#07807E` / `#07807E` | `var(--brand-600)` | Reusable brand-tinted focus ring (used by Primary + Outlined + IconButton focus states) |
| **`--card-border-hover`** *(new)* | brand-tinted (~25 % Brand/Primary over transparent) | `color-mix(in srgb, var(--brand-primary) var(--tint-25), transparent)` (tint-scale recipe) — re-resolves per-theme via cascaded `--brand-primary` | Card / list-row hover border. Single source of truth for the kit's "Chats Library hover recipe" (see CLAUDE.md). Used by `.card-c:hover` / `.card-c.s-hover` and the composer's `.cl-composer:hover` in chat-landing. Separate from `--border-hover` (which stays neutral for form controls — `.field`, `.ta`, `.igrp`) so card hovers are brand-tinted but input hovers are not. |
| **`--card-border-press`** *(new)* | brand-tinted (~40 % Brand/Primary over transparent) | `color-mix(in srgb, var(--brand-primary) var(--tint-40), transparent)` (tint-scale recipe) — re-resolves per-theme via cascaded `--brand-primary` | Card / list-row pressed border. Deeper alpha than `--card-border-hover` (40 % vs 25 %) so pressed reads as a clearer step beyond hover, paired with the 4 % brand-primary bg shift. Used by `.card-c:active` / `.card-c.s-pressed`. |
| **`--card-lift-border`** *(new)* | brand-tinted (22 % Brand/Primary over `--border`) | `color-mix(in srgb, var(--brand-primary) 22%, var(--border))` | **Lift-family** card hover border (the `--shadow-lift-hover` + `translateY` recipe), as opposed to `--card-border-hover` (flat row family, 25 % over transparent). Consolidates the value that was inline on `.hov-card` and `.prov-card` (which previously misused `--border-hover`, the form-control token). |
| **`--badge-primary-bg`** *(new)* | `#E8F2F5` / `#0A1A1F` | light: `var(--brand-50)` · dark: `var(--brand-900)` · prod: `color-mix(in srgb,var(--p-primary) 20%,transparent)` | Badge Primary surface. Component-scoped so the three scopes (`:root`, `.dark`, `.prod`) each set their own value without cascade collisions. Replaces the prior color-mix-over-surface recipe so the chip reads as a clean intentional accent. |
| **`--badge-primary-text`** *(new)* | `#066867` / `#2FA29B` | `var(--brand-secondary)` (theme-adaptive — light Brand-700, dark Brand-400). prod scope overrides to `var(--p-primary)`. | Badge Primary text. Switched from `Brand/Primary` because `Brand-600` on `Brand-50` falls to 4.21:1 (below AA); `Brand-700` reaches 5.84:1. Stays paired with `--badge-primary-bg` so AA contrast holds in both themes. |
| **`--badge-secondary-bg`** *(new)* | `#F1F5F9` / `#21212C` | `var(--card2)` (theme-adaptive). prod scope overrides to `var(--chips)` so the Current column still shows what prod ships. | Badge Secondary surface. Replaces the old `var(--chips)` mapping — on the kit's stages `--chips` resolved to `--bg` (Slate-50 in light), making the chip visually invisible against the page background. `--card2` lifts the chip one neutral step above the page bg so the outline + lightness step carry the affordance. |
| **`--badge-secondary-text`** *(new)* | `#334155` / `#F4F4F5` | `var(--ink-body)` (theme-adaptive — light Slate-700, dark Grey-100). prod scope overrides to `var(--ink-secondary)` to mirror the lower-contrast prod recipe. | Badge Secondary text. Pairs with `--badge-secondary-bg` for 10.36:1 (light) / 12.86:1 (dark) AAA contrast. |
| **`--switch-off-bg`** *(new)* | `#CBD5E1` / `#2A2834` | light: `var(--slate-300)` · dark: `var(--grey-700)` · prod: `var(--bg)` (mirrors what prod actually renders) | Switch off-track surface. Filled medium-grey lifts the track above the page bg without resorting to a hard outline. An earlier outlined draft (1.5 px inset stroke over `Surface/Card`) read as visually noisy — filled matches the dominant pattern in shipped systems (shadcn / Headless UI / Primer / Apple's filled variant). |
| **`--switch-off-bg-hover`** *(new)* | `#94A3B8` / `#525258` | light: `var(--slate-400)` · dark: `var(--grey-600)` | Switch off-track hover. One neutral step above the default — symmetric with the on-state hover lift to `Brand/Primary_Hover`. |
| **`--overlay-scrim`** *(new)* | `rgba(15,23,42,.45)` / `rgba(2,6,23,.6)` | light: `rgba(15,23,42,.45)` · dark: `rgba(2,6,23,.6)` | Single source of truth for modal / drawer / sheet backdrops. Replaces the same `rgba(15,23,42,.45)` value that was hand-written across `.dlg-overlay`, `.cl-side-backdrop`, and every page's modal markup. The dark value mirrors the existing `.cl-side-backdrop` dark override. |

## Other non-colour tokens (new this iteration)

| Token | Value | Notes |
|---|---|---|
| ~~`--press-scale`~~ | — (retired) | Press feedback was briefly a `transform: scale(.98)`; visible text-position shift made it feel wrong. Retired in favour of **bg-shift-only press feedback** — every pressed variant uses a distinct darker bg colour, nothing else. No transform, no shadow, no text jump on press. This matches Tailwind UI / shadcn / GitHub Primer. The pressed bg per variant is already documented in the rows above. |
| `--opacity-disabled` | `.65` | Reusable opacity for disabled / loading / "less-interactive" treatments. Applied to `.s-loading.btn` and `.s-loading.iconbtn`. |
| `--shadow-card-hover` *(renamed)* | `0 2px 6px -1px rgba(15,23,42,.08),0 1px 2px 0 rgba(15,23,42,.04)` | Renamed from `--shadow-rest-hover` (the old name read as a contradiction — "rest" + "hover"). It is the hover-lift shadow for flat cards/rows (`.chat-row`, `.ds-conn-row`). Value unchanged. |

## Structural changes (vs prod)

- **New Primitives layer** — every semantic + component token aliases a primitive.
- **Renames:** `Color/Tertiary → Brand/Primary` · `Color/Primary → Brand/Secondary` · `Color/Secondary → Brand/Tertiary` · `Color/Hover → State/Hover` · `Stroke / Border → Stroke/Border` · `Text / Light G → Text/Inactive`.
- **New tokens:** `State/Pressed`, `State/Disabled`, `State/Focus_Ring`, `Brand/Primary_Hover` / `_Press`, `Feedback/Error_Hover`, `Feedback/Error_Press`, `Feedback/Red_Text` (theme-adaptive destructive text/icon), `Surface/Card 2`, `Stroke/Border_Hover`, plus the component-scoped Button family, `--focus-ring-brand`, `--opacity-disabled`, **`--content-on-solid`** (theme-independent always-white alias for `var(--white)`, used by destructive Button text + Checkbox mark + Switch thumb so no semantic component reaches into the primitives layer for white), and **`Text/Highlight` (`--ink-highlight`)** — single semantic source of truth for emphasised body text, used by `.link` and `.cl-kw`, currently aliasing `var(--brand-primary)` but exposed as its own token so the highlight colour can be retargeted independently.
- **Form-control focus + hover softened twice (this iteration):** `--input-focus` first moved from `var(--focus-ring)` (Slate-900 / Slate-100) → `var(--ink-secondary)` (Slate-550 / Grey-400), then softened again to `var(--slate-600)` light `#475569` / `var(--slate-500)` dark `#64748B`. `--border-hover` was simultaneously softened from `var(--slate-400)` / `var(--slate-600)` → `var(--slate-450)` `#7C8CA2` light / `var(--slate-600)` `#475569` dark. Both still clear WCAG 1.4.11's 3:1 UI-contrast minimum (Slate-600 vs white = 7.04:1, Slate-500 vs Grey-900 ≈ 4.5:1) but read as much softer affordances. Affects every form control that uses these tokens (`.field`, `.ta`, `.igrp`) and any card-like surface that adopts the form recipe (e.g. `.cl-composer:hover` + `:focus-within` in chat-landing). Card / list-row components that need brand-tinted hovers use the separate `--card-border-hover` / `--card-border-press` tokens.
- **Deleted:** `Color/Inactive` → replaced by `State/Disabled`.
- **Pre-existing typo fixes (this iteration):** `--logo-ink` light was `#111827` → now `var(--slate-900)` (`#0F172A`); `--logo-mark` light was `#07807D` → now `var(--brand-600)` (`#07807E`).
- **Logo/Mark theme adaptation (this iteration):** `--logo-mark` dark now aliases `var(--brand-500)` `#148F8D` (was inheriting `var(--brand-600)` `#07807E`, which failed AA 3.74:1 vs Surface/Card `#17171E`). Brand-500 reaches 4.54:1 — passes AA 4.5:1. Mirrors the Brand-600/Brand-500 split used by `Brand/Primary`.

## No change (—)

Brand/Primary base values, Brand/Secondary base values, Feedback/Green, Feedback/Attention (values unchanged, only re-bound through primitive aliases).
