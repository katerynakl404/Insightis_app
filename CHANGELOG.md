# Changelog

Зміни в Insightis design-handoff kit. Версії проставляються **вручну** — користувач явно вказує номер наступного релізу (`bump to 1.1.1`, `bump to 1.0.1`, etc.).

Конвенція:
- **`current/`** — дзеркало live `@insightis/ui` системи (неявне 1.0.0-prod). Цей файл не нумерує його — версії нижче відносяться до Expected дизайн-системи в `pages/kit-theme.css` + `insightis-preview-kit.html` + `changes/`.
- **`[Unreleased]`** — поточна робота. Промотується в номерну версію коли користувач каже "bump to X.Y.Z".

---

## [Unreleased]

### Sidebar

- **Tooltips removed** ([`changes/Sidebar.md`](changes/Sidebar.md), [`changes/TruncatedTitleTooltip.md`](changes/TruncatedTitleTooltip.md))
  - Dropped the `TruncatedTitleTooltip` wiring on `.sbx-chat` (chat-row labels no longer surface a hover tooltip with the full title — the persistent right-edge gradient fade is the only truncation signal; kebab → Rename remains the way to access/edit the full label). Removed `title=` from chat-row markup in [`pages/concept/chat-landing.html`](pages/concept/chat-landing.html) and the storybook chat-row demo in [`insightis-preview-kit.html`](insightis-preview-kit.html).
  - Dropped `data-tip` / `data-tip-side="right"` from every `.sbx-nav-item` in [`pages/concept/data-sources_connections-landing.html`](pages/concept/data-sources_connections-landing.html) and [`pages/concept/data-sources_files-landing.html`](pages/concept/data-sources_files-landing.html). Collapsed-mode nav rows still expose their name via `aria-label` (preserved); no visual tooltip overlays remain in the sidebar.
  - Tooltip primitive itself is unchanged — `.tt` class and `[data-tip-side]` CSS rules stay for other consumers (Chats Library row, breadcrumbs, future surfaces).

### Pages

- **Metrics — connector card empty-state redesign** ([`pages/concept/metrics-landing.html`](pages/concept/metrics-landing.html) + [`page-changes/metrics-landing.md`](page-changes/metrics-landing.md) + [`pages/kit-theme.css`](pages/kit-theme.css))
  - Logo tile: size `2.5rem → 2.75rem`, border-radius `0.5rem → 0.625rem`, fill changed from plain `--bg` to brand-tinted `color-mix(Brand-primary 5%, --bg)`, added `box-shadow: 0 1px 3px rgba(15,23,42,.08)`. Image icon increased from `1.5rem → 1.625rem`.
  - Provider name: `white-space:nowrap` + `text-overflow:ellipsis` — single line guaranteed, logo and title block now align cleanly.
  - Connection status: added `.mx-c3-status-dot` (`7px × 7px` round dot, `--ink-inactive`) markup in all connector-card instances. Paired with "Not connected" label (ready to flip to green dot + "Connected").
  - Metric chips (in card context): soft fill `--state-hover` / no visible border at rest; hover → brand-tinted fill + border. Scoped via `.mx-c3-prov-card .chip-meta` in `kit-theme.css` (global chip-meta storybook demo unchanged).
  - Chip chevron (in card context): color `--brand-primary → --ink-inactive`, extra `margin-left: 0.125rem` gap. Scoped via `.mx-c3-prov-card .chip-meta-arrow`.
  - Footer: removed "X metrics available" count span from all 27 provider cards. Connect button is now full-width in the footer row.
  - Connect button: `btn-secondary` — unchanged.
  - Card hover: border-color changed from `color-mix(Brand-primary 22%, --border)` to `--border-hover` (neutral) — no saturated teal ring on hover; `translateY` increased from `-1px → -2px` for stronger lift feel. Added explicit `:focus-visible` ring using `--shadow-focus-brand`.

### Sidebar nav

- **New top-level nav item: `Files`** ([`changes/Sidebar.md`](changes/Sidebar.md))
  - Promoted from a tab inside the Data Sources page to its own top-level sidebar destination, ordered `New Chat → Sources → Metrics → Files` (Files last).
  - Icon: Lucide `folder` (`<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`), 16 px, stroke 2 — same shape/weight as Sources and Metrics so the row group reads as one family.
  - `Files` is now active on [`pages/data-sources_files-landing.html`](pages/data-sources_files-landing.html); `Sources` remains active on [`pages/data-sources_connections-landing.html`](pages/data-sources_connections-landing.html).
  - Storybook full-composition + collapsed previews include the new row.
  - Side-effect: nav row count `2 → 3` everywhere it's documented; `changes/Sidebar.md` updated.

### Pages

- **Data Sources — split into two top-level pages**
  - **Files** ([`pages/data-sources_files-landing.html`](pages/data-sources_files-landing.html)) is now reached from the new sidebar `Files` item, not from a Connections/Files tab inside Data Sources. The page h1 changed from "Data Sources" to "Files". The previous in-page `.dsf-tabrow` tabset was removed; the `Browse Files` action moved into the page header (right-aligned next to the h1).
  - **Connections** ([`pages/data-sources_connections-landing.html`](pages/data-sources_connections-landing.html)) keeps the h1 "Data Sources" but no longer renders the Connections/Files tabs — it's connections-only. The dual-content `.dsf-panel-files` section in this page is now dead markup (kept for now to minimise diff risk; will be cleaned up in a follow-up) and never displays because no element toggles the `.dsf-tab-files` class.

- **Metrics** ([`pages/metrics-landing.html`](pages/metrics-landing.html) + [`page-changes/metrics-landing.md`](page-changes/metrics-landing.md))
  - Connector-first mental model: empty state shows available providers; connecting adds a connector and switches to the filled state automatically.
  - Unified empty/filled view — Browse / My Metrics tab split removed. Single `mx-empty` / `mx-filled` layout gated by `#mx-root.is-filled`.
  - Concept 3 renamed to **Concept 2** throughout (CSS classes `mx-c2-*`, state `is-c2`, JS `mxC2Filter`, button label).
  - C1 filled state: search toolbar (`#mx-c1-toolbar`, `mxC1Filter`) filters flat table by metric name or provider.
  - Custom metric MRR growth row now shows connector sub-label "via Skyvia Jira" in the Provider cell.
  - Copy updated: "data source" → "connector/provider"; CTA buttons → "Connect a provider"; connect dialog title → "Add a connector"; dialog body updated; add-custom select placeholder → "Select a connector…".
  - `+ Add new` pill hidden in empty state, shown in filled state.

- **Chats Library** ([`pages/chats-landing.html`](pages/chats-landing.html))
  - Removed stale `.prod-empty` / `.prod-list` / `.prod-list-row` CSS (no markup used these classes).
  - Cleaned stale "across Current and Expected" comment from Metrics nav icon.

- **Chat** ([`pages/chat-landing.html`](pages/chat-landing.html))
  - Removed stale "Suppressed in Current (.prod)" and "across Current and Expected modes" comments.

- **Data Sources — Connections** ([`pages/data-sources_connections-landing.html`](pages/data-sources_connections-landing.html))
  - Removed stale "Current (.prod)" references from CSS comments.

### Components

- **SegmentedControl** ([`pages/kit-theme.css`](pages/kit-theme.css) + [`changes/SegmentedControl.md`](changes/SegmentedControl.md))
  - Active rim змінено з `inset 0 0 0 1px rgba(0,0,0,.10)` на `inset 0 0 0 1px var(--border)` (slate-200) на світлій темі — кеп rim тепер використовує канонічний системний edge-колір замість сирого black-alpha. Гармонує з усіма іншими 1 px бордерами kit-у.
  - Hover rim змінено з `rgba(0,0,0,.05)` на `color-mix(in srgb, var(--border) 50%, transparent)` — half-strength варіант того ж системного `--border`. Той самий shape що в active, half-tinted → чиста default → hover → active прогресія.
  - Знято `font-weight: 600` bump з `.segctrl.is-md.is-active` — текст більше не жирніє при натиску. Active відрізняється тільки кольором/bg/rim, не вагою.
  - Hover bg переключено з `color-mix(white 50%, transparent)` на theme-aware token `--segctrl-btn-hover-bg` (= `--card` світла / `--chips` темна) — both themes тепер мають симетричну логіку.
  - Інтерполяція active footprint: при hover завжди показуємо такий самий 1 px rim що при active, тільки півпрозоріше → видимий розмір кнопок ідентичний у hover і active (раніше hover виглядав ширшим бо не мав rim-у).
  - Dark recipe незмінний (white-alpha rim бо `--border` grey-700 = pill bg = невидимий).

- **Link** ([`pages/kit-theme.css`](pages/kit-theme.css) + [`insightis-preview-kit.html`](insightis-preview-kit.html) + [`current/Link.md`](current/Link.md) + [`changes/Link.md`](changes/Link.md))
  - Новий primitive: `.link` клас зі своїм storybook section (`#link` під Actions у sidebar nav).
  - Hover underline отримав `text-underline-offset: 25%` (відстань від baseline = 25% від font-size) + `text-decoration-thickness: 1 px` (constant thickness не залежить від font-size).
  - Колір `--ink-highlight` (Brand-700 світла = 8.39:1 / Brand-400 темна = 5.27:1 vs Card) — theme-adaptive AA контраст.

- **Context menus** ([`pages/kit-theme.css`](pages/kit-theme.css) + landing pages)
  - `.menu` fluid sizing: `min-width: 140 px` / `max-width: 320 px` / `width: max-content` — меню тепер хагає найдовший item у діапазоні 140-320, не фіксовано на 176 px. `.sbx-chat-menu` втратив свій override `width: 160 px` — успадковує від base.
  - Сепаратор `<hr class="menu-sep">` вилучений з усіх ≤3-row меню (sidebar pinned chats, recent chats, ds-conn-menu, files chat-row-menu, Help dropdown, kit example). Залишений тільки у 4-row library chat-row-menu в `chats-landing.html` JS template (де Pin/Unpin → Select → Rename → Delete).
  - Move up / Move down menu items вилучені з усіх pinned-chat context menus (sidebar + library). Відповідні JS handlers + дані `pinnedOrder` / `canMoveUp` / `canMoveDown` в `chats-landing.html` теж вилучені.

### Landing pages

- **Current state removed from all 5 landing pages** ([`pages/chat-landing.html`](pages/chat-landing.html), [`chats-landing.html`](pages/chats-landing.html), [`chat_page-landing.html`](pages/chat_page-landing.html), [`data-sources_connections-landing.html`](pages/data-sources_connections-landing.html), [`data-sources_files-landing.html`](pages/data-sources_files-landing.html))
  - Видалено всі `.cl-only-prod` / `.cp-only-prod` markup-блоки (Current state).
  - Видалено `.cl-only-exp` / `.cp-only-exp` wrappers (просто розгорнуто).
  - Видалено `Current / Expected` toggle button у топбарі кожної сторінки.
  - Видалено всі `.prod`-scoped CSS-правила в інлайн `<style>` блоках.
  - Видалено всі `html:not(.prod)` qualifier-и — правила тепер безумовні.
  - JS-селектори `.cl-only-exp .sbx` змінено на `.cl-side .sbx`.
  - Тільки Expected state залишається; `.prod` scope більше не використовується на landing-сторінках. Kit (`insightis-preview-kit.html` + `pages/kit-theme.css`) зберігає `.prod` scope для Current vs Expected демонстрацій всередині kit-у — це навмисно.

- **New Chat як nav-row** ([`pages/kit-theme.css`](pages/kit-theme.css) + усі sidebars в landing pages)
  - Migration: filled-pill primary CTA → nav-row з circle-plus icon (інтегровано в menu замість окремої hero pill).
  - CSS swap правила (`.sbx-nav-newchat` show / `.sbx-cta` hide в Expected scope) перенесено з inline-стилю chat-landing.html у спільний `pages/kit-theme.css` — кожна landing page тепер успадковує однакову поведінку.
  - `.sbx-nav-newchat` markup додано як перший рядок `.sbx-nav` у кожному Expected sidebar (kit + 4 landing pages).

- **Sidebar padding 10 → 8 px** ([`pages/kit-theme.css`](pages/kit-theme.css))
  - `.sbx-head`, `.sbx-nav`, `.sbx-chats`, `.sbx-foot` усі горизонтальні padding-и переведено з 10 px → 8 px. `.sbx-pop-account` / `.sbx-pop-tokens` anchors теж 10 → 8.

- **chat-landing composer** ([`pages/chat-landing.html`](pages/chat-landing.html))
  - `.cl-prompt`: padding `4 8` (top/bottom 0 → 4 px, left/right 6 px → 8 px), font-size .9375rem → .875rem (matches kit's `.field input`).
  - `.cl-composer`: padding 12 px → 8 px top/right/bottom, 4 px left (асиметрія для лівого краю промпта).
  - `.cl-actions` IconButton variants: `.iconbtn-tertiary` → `.iconbtn-secondary` (4 інстанси, hover тепер успадковує `--state-hover` / `--state-pressed`).

### Component-level refinements

- **Button + IconButton** ([`pages/kit-theme.css`](pages/kit-theme.css))
  - `.btn-secondary`, `.btn-tertiary`, `.iconbtn-secondary`, `.iconbtn-tertiary` hover/pressed уніфіковано з nav-items: використовують `--state-hover` / `--state-pressed` замість brand-mix. Brand-tint hover залишений тільки для Outline-варіантів (defining identity).

- **Menu items** (`.mi` в [`pages/kit-theme.css`](pages/kit-theme.css))
  - `.mi:hover` змінено з `color-mix(in srgb, var(--brand-primary) 10%, var(--card))` (pale-teal, дуже схожий на `--state-pressed`) на `--state-hover` — уніфікація з рештою низько-наголошених поверхонь. Додано explicit `.mi:active` → `--state-pressed`.
  - `.mi.danger` зберігає red-tinted hover (8% red mix) — destructive-cue intent.

- **Filled input text** ([`pages/kit-theme.css`](pages/kit-theme.css))
  - Колір типованого тексту у `.field input`, `.ta`, `.igrp .igrp-input`, `.acpl .acpl-ctrl input`, `.cl-prompt` змінено з `--ink-body` (Slate-700) на `--ink` (Slate-900) — темніший filled-state для контрасту з placeholder (`--ink-inactive`).

- **`.tt` Tooltip class** ([`pages/kit-theme.css`](pages/kit-theme.css))
  - Inline tooltip styles промотовано до shared `.tt` class з theme-aware `--ink-inverse` token. Дарк-mode bug fixed (раніше hardcoded `color:#fff` робив текст невидимим на світлому grey-50 фоні в dark).

- **Stats tiles у user_profile-modal** ([`pages/user_profile-modal.html`](pages/user_profile-modal.html))
  - Monthly Credits / Extra Credits tiles: background змінено з `var(--bg)` (dark-mode = grey-950 → виглядали як заглибина) на `transparent` + збережено 1 px `var(--border)`. Тайли тепер показують modal-card surface крізь себе, лише обведені бордером — works in both themes.

- **Sentence-case labels у Account modal + sidebar Account/Tokens popovers** (`pages/user_profile-modal.html`, [`pages/chat-landing.html`](pages/chat-landing.html), [`pages/chats-landing.html`](pages/chats-landing.html), [`pages/chat_page-landing.html`](pages/chat_page-landing.html), [`pages/metrics-landing.html`](pages/metrics-landing.html), [`pages/data-sources_connections-landing.html`](pages/data-sources_connections-landing.html), [`pages/data-sources_files-landing.html`](pages/data-sources_files-landing.html), [`pages/changes/AccountModal.md`](pages/changes/AccountModal.md))
  - Усі багатословні label-и переведені на sentence-case (тільки перша літера велика). Загальне правило для labels у системі.
  - Затронуті строки: `My Account` → `My account`, `Manage Plan` → `Manage plan`, `Sign Out` → `Sign out`, `Leave Feedback` → `Leave feedback`, `Delete Account` → `Delete account`, `Upgrade Plan` → `Upgrade plan`, `Update Plan` → `Update plan`, `Buy Credits` → `Buy credits`, `Your Feedback` → `Your feedback`, `Monthly Credits` → `Monthly credits`, `Extra Credits` → `Extra credits`, `Credit Usage` → `Credit usage`, `Subscription Tokens` → `Subscription tokens`, `Purchased Credits` → `Purchased credits`.
  - Слова що залишилися без змін: однословні label-и (`Billing`, `Balance`, `Account`, `Support`, `Resources`, `Theme`, `Category`, `Light`, `Dark`, `System`, `Feature`, `Bug`, `Feedback`, `Attach`, `Send`, `Update`, `Cancel`) — sentence case вже задовольняється.
  - JS dictionary `acctSectionTitles` у `user_profile-modal.html` оновлено разом з HTML markup (replace_all захопив обидва місця).
  - `pages/changes/AccountModal.md` оновлено: всі цитовані label-и в state-таблиці тепер у sentence-case.

- **Metrics detail panel — Name value font-size bump** ([`pages/metrics-landing.html`](pages/metrics-landing.html))
  - У detail-панелі (`mxOpenDetail()` rendered `<dl class="mx-dl">`) поле `<dt>Name</dt><dd>...</dd>` мало значення на `font-size:1rem` (text-base/16 px) — занадто маленьке для назви метрики як заголовка панелі.
  - Збільшено до `font-size:1.25rem;line-height:1.75rem` (kit `.text-xl` utility — 20 px / 28 px line). Цей розмір вже існує в kit-theme.css (рядок 1307 `.text-xl{font-size:1.25rem;line-height:1.75rem}`) та матчиться з `.comp>h2` heading style.
  - Інші поля у dl (`Provider`, `Alias`, `Type`, `Definition`) залишаються на `.875rem` (text-sm) — створюють hierarchy: Name = primary identity / інші = secondary metadata.

- **Account modal — Send button label слідує за вибраним feedback category** ([`pages/user_profile-modal.html`](pages/user_profile-modal.html), [`pages/changes/AccountModal.md`](pages/changes/AccountModal.md))
  - Раніше Send button мав fixed label "Send feedback" незалежно від обраного category — `Feature` / `Bug` / `Feedback`. Тепер CTA label рерайтиться в момент вибору, щоб primary action завжди називав саме ту дію, що буде відправлена.
  - Mapping: `Feature` → "Send feature request", `Bug` → "Send bug report", `Feedback` → "Send feedback".
  - Реалізація: `data-send-label="..."` атрибут на кожному з 3 `.segctrl-btn` усередині `#acct-fb-cat`, document-level click listener зчитує `data-send-label` з кліку та пише його у `.textContent` of `#acct-fb-send`. Source of truth — атрибут на кнопці, не окремий state. Initial markup ship-ається з "Send feature request" щоб matchи default `is-active` Feature segment.

- **Account modal Feedback action buttons → kit Buttons** ([`pages/user_profile-modal.html`](pages/user_profile-modal.html) + [`pages/changes/AccountModal.md`](pages/changes/AccountModal.md))
  - Hand-rolled `.acct-fb-attach` (icon + "Attach" label, бордерована) замінено на `<button class="btn btn-secondary btn-sm">` — стандартний kit Button з icon + label, успадковує hover/pressed/focus від `.btn-secondary`.
  - Hand-rolled `.acct-fb-send` (filled brand pill) замінено на `<button class="btn btn-primary btn-sm">` — kit primary button.
  - CSS-правила `.acct-fb-attach`, `.acct-fb-attach:hover`, `.acct-fb-send`, `.acct-fb-send:hover` вилучені з `<style>` блоку `user_profile-modal.html`. `.acct-fb-bottom` залишено — це flex layout-обгортка.
  - **Labels подовжено замість padding-override**: `Attach` → `Attach file`, `Send` → `Send feedback`. Початково я додав був inline `padding:0 1.25rem` / `0 1.5rem` для відновлення прод-style spacious feel — це порушення правила "kit components завжди композуються, ніколи з overrides". Правильний шлях — rephrase міток (повний intent дії), natural width-bump приходить від довшого тексту. Бонус: aria-label на Attach більше не потрібен (visible text matches intent).
  - `pages/changes/AccountModal.md` оновлено: Actions row тепер документується як `.btn .btn-secondary .btn-sm` + `.btn .btn-primary .btn-sm` з inline-padding override, "Reused kit classes" список доповнено `.btn-secondary`. Drift між doc (раніше казав iconbtn-tertiary) і кодом (бордерована one-off) тепер resolved у користь icon+label form factor.

- **Sidebar chat-row corner fix при відкритому меню** ([`pages/kit-theme.css`](pages/kit-theme.css))
  - `.sbx-chat::after` (right-edge fade gradient) отримав `border-top-right-radius: 6px` + `border-bottom-right-radius: 6px`. До цього, коли menu kebab відкривалось → row flip-ував на `overflow:visible` (щоб menu могло escape вниз) → rectangular gradient `::after` виходив за межі rounded corners → row візуально мав прямі праві кути. Тепер gradient несе свій border-radius самостійно, тож row залишається rounded навіть коли overflow:visible.

### Rules & documentation

- **State-stacking rule** додано в [`claude-code/instructions.md`](claude-code/instructions.md)
  - Загальне правило: при зміні hover/active/focus/selected bg на елементі, треба перевірити чи parent цього елемента не має того самого token-а на власному hover-стані. Якщо так — потрібен contrasting bg (brand-mix), інакше child збігається з parent і візуально зникає.
  - Приклад: kebab кнопки всередині chat-row → brand-mix hover (parent .chat-row hovers to --state-hover); standalone menu items → state-hover.

- **`changes/SegmentedControl.md`** оновлено: state recipes, token map, accessibility self-check всі відображають поточний стан коду (після rim/font-weight refinements).

### File structure

- **CHANGELOG.md** створений у корені проекту, baseline 1.0.0 датований 2026-06-06. Конвенція: manual bumps (`bump to X.Y.Z`), `[Unreleased]` накопичує зміни.

---

## [1.0.0] — 2026-06-06

Перший пронумерований baseline Expected design system. Знімок поточного стану kit-у, описаного через `changes/<X>.md` як діф від live `@insightis/ui` (тобто від `current/`).

### Foundations
- Трирівнева система токенів: **Primitives → Semantic aliases → Component-scoped tokens**. Усі semantic / component-scoped токени резолвляться через `var(--<primitive>)`; raw hex живе тільки в Primitives.
- Primitives: Brand (teal 50–900), Tertiary (cyan-teal 50–950), Slate (50–950 + custom 150/450/550), Grey (50–950 з custom dark-end 600/700/800/850/900/950), Red (50–950 з custom 400/850/900/950), single-purpose (orange-500, green-light-600, green-dark-500), achromatic.
- Light & Dark Semantic tokens: Text (`/Primary` / `/Body` / `/Secondary` / `/Inactive` / `/Inverse` / `/Highlight`), Surface (`/Card` / `/Card2` / `/Chips`), Stroke (`/Border` / `/Border_Hover`), State (`/Hover` / `/Pressed` / `/Disabled` / `/Focus_Ring`), Brand (`/Primary` / `/Secondary` / `/Tertiary`), Feedback (`/Red` / `/Red_Text` / `/Error_Hover` / `/Error_Press` / `/Green` / `/Attention`), Logo (`/Ink` / `/Mark`).
- Component-scoped tokens: `--btn-primary-bg/-hover/-press/-text`, `--btn-secondary-bg/-bg-hover`, `--badge-primary-bg/-text`, `--badge-secondary-bg/-text`, `--switch-off-bg/-bg-hover`, `--focus-ring-brand`, `--shadow-focus-brand`, `--input-focus`, `--input-error`, `--content-on-solid`, `--opacity-disabled` (.65).
- Typography: DM Sans на повному Tailwind-scale (text-xs → text-5xl) з semantic-level mapping (H1–H6, lead, large, p, span, blockquote, code).
- Radius: sm 2 / md 6 / lg 8 / xl 12 / full. Spacing: 4 px step.

### Components (Expected design — переписані з прод)
- **Button** (Primary / Secondary / Outline / Tertiary / Destructive · xs/sm/md/lg/xl · loading state).
- **IconButton** (Primary / Secondary / Outline / Tertiary).
- **Link** (новий primitive — `.link` клас, `--ink-highlight` token, hover з `text-underline-offset: 25%`).
- **Input** + **TextArea** (єдина form-control система; hover / focus / pressed / error / disabled / read-only).
- **InputGroup**, **PasswordInput**, **Autocomplete**, **Datepicker**, **Dropdown menu** (.menu / .mi), **Popover**, **Sheet**, **Modal**.
- **Checkbox** (default · hover · focus · indeterminate · error · disabled — uncheked & checked side-by-side; уніфікований opacity-based disabled).
- **Switch** (filled track, off Slate-300 / Grey-700; 44×44 invisible hit area; off & on parity for every state).
- **Badge** (Primary через `Brand-50/Brand-900` solid surface + `Brand/Secondary` text для AA; Secondary з `--ink-body` text для cohesion; нові варіанти leading icon / removable × / status dot).
- **Avatar**, **Tabs** (нові focus + disabled), **ProgressBar**, **Spinner**, **CircularProgress**, **Card**, **Collapsible**, **File chip**, **ScrollShadow**, **Separator**, **Skeleton**, **Toast**, **Tooltip** (fixed dark-mode text bug — promoted to `.tt` class with `--ink-inverse`), **TruncatedTitleTooltip**, **Pagination**, **Table** (sort header + selected/pressed row + 4-row preview), **StatusView**, **Accordion**, **Resizable**, **Stepper**, **Sidebar** (повний redesign + collapsed mode + Account & Tokens popovers).

### State system (уніфіковано в кит)
- Hover & Pressed для `.btn-secondary`, `.btn-tertiary`, `.iconbtn-secondary`, `.iconbtn-tertiary`, `.mi`, `.sbx-pop-item`, `.sbx-nav-item`, `.cl-dd`, `.tab` усі використовують `--state-hover` / `--state-pressed`. Brand-tint hover залишений тільки для Outline-варіантів (defining identity) і для вкладених кебабів (`.sbx-chat-more`, `.chat-row-more`, `.chat-row-pin`) щоб не зливатись з parent row hover.
- Disabled рецепт уніфіковано на `--opacity-disabled` (.65) для Button / IconButton / Tabs / Switch / Checkbox.
- Form-control focus = нейтральний `--focus-ring`; nav-style focus = brand-tinted `--focus-ring-brand`.

### Landing pages (`pages/*.html`)
- `chat-landing.html`, `chats-landing.html`, `chat_page-landing.html`, `data-sources_connections-landing.html`, `data-sources_files-landing.html` — Expected-only (Current toggle вилучено, тільки нова дизайн-система).
- Sidebar: New Chat як nav-row (а не filled CTA), Tokens + Account popovers, повний sbx redesign.
- Chat context menus: уніфікований порядок (Pin/Unpin → Select? → Rename → Delete), без сепаратора для ≤3 рядків.

### Component docs (`current/` + `changes/`)
- 30+ компонентів з `current/<X>.md` (live prod baseline) + `changes/<X>.md` (діф від current до Expected).
- Доданий `current/Link.md` + `changes/Link.md` цього baseline.

### Rules & instructions
- `claude-code/instructions.md` — colour-token discipline, change-discipline rules, golden rule "діф завжди від `current/`", state-stacking rule для nested interactive elements, accessibility & consistency self-check.
- `token-diff-report.md` — авторитетний колір-токен migration spec.

---

## Версіонування зараз — як це працює

Користувач каже `bump to X.Y.Z` (наприклад `bump to 1.1.1` чи `bump to 1.0.1`). Я:
1. Створюю новий розділ `## [X.Y.Z] — YYYY-MM-DD` під `## [Unreleased]`.
2. Переношу всі накопичені пункти з `[Unreleased]` у новий розділ.
3. Залишаю `[Unreleased]` пустим для наступної ітерації.

Між bump-ами зміни пишуться в `[Unreleased]` як buleted-список з посиланнями на затронуті файли. Якщо bump не оголошувався, нові зміни просто додаються в `[Unreleased]` і чекають свого моменту.
