# Insightis — type scale

**4 September 2026** · companion to [the UX audit](2026-09-04-insightis-ux-audit.md), item **#24**.


Referenced by **#24**. Nineteen named styles, agreed and implemented in the kit. Four families plus
Display: Heading (500), Title (600), Body (400), Label (500), Overline.

| Style | Size / weight / line-height | Used for |
|---|---|---|
| Display | 88→132 fluid / 500 / 1 | standalone numerals that are the page — the 404 code |
| Heading 36 | 36 / 500 / 40 | largest page-level heading |
| Heading 30 | 30 / 500 / 36 | major section heading |
| Heading 24 | 24 / 500 / 32 | page titles |
| Heading 20 | 20 / 500 / 28 | card and dialog titles |
| Heading 16 | 16 / 500 / 24 | the 500 rung at 16 |
| Title 30 | 30 / 600 / 36 | plan price |
| Title 24 | 24 / 600 / 32 | balance counter |
| Title 20 | 20 / 600 / 28 | metric value, plan name, credit count |
| Title 16 | 16 / 600 / 24 | title of a nested surface — card, banner, sheet, empty state |
| Title 14 | 14 / 600 / 20 | names in rows and cards, section titles |
| Title 12 | 12 / 600 / 16 | smallest emphatic label |
| Body 16 | 16 / 400 / 24 | lead paragraphs |
| Body 14 | 14 / 400 / 20 | default reading text |
| Body 12 | 12 / 400 / 16 | annotation, helper text, descriptions |
| Label 14 | 14 / 500 / 20 | buttons, control labels |
| Label 12 | 12 / 500 / 16 | chips, badges, table headers |
| Label 10 | 10 / 500 / 16 | micro-meta |
| Overline | 10 / 600 / 16 · +.08em | uppercase section labels |

## The point of the set

Pick a size and the available weights are visible. That is the whole answer to *"which leading and
weight can I use at 14?"* — the grid below is the set, read the other way.

| Size | 400 | 500 | 600 |
|---|---|---|---|
| 36 | — | Heading 36 | — |
| 30 | — | Heading 30 | Title 30 |
| 24 | — | Heading 24 | Title 24 |
| 20 | — | Heading 20 | Title 20 |
| 16 | Body 16 | Heading 16 | Title 16 |
| 14 | Body 14 | Label 14 | Title 14 |
| 12 | Body 12 | Label 12 | Title 12 |
| 10 | — | Label 10 | Overline · uppercase |

Every size even, every line-height on the 4px grid, every cell filled. Heading carries 500 and Title
carries 600 across the same rungs — so a heading and a title at 20px differ by weight, not size.
18px left the set entirely.

## Migration — the risk, and how to clear it

Changing a leading changes a box, so this is not a find-and-replace. Measured on the affected
elements: **none has a fixed height or vertical padding** — the leading *is* the box. That is the
worrying half.

The reassuring half: **the parent usually has slack.** The largest case — 80 elements at
`12 / 500 / 12` — sits in a 20px parent with `align-items:center`. At the new 16px leading it still
fits, and nothing moves.

That is the test for every remaining row: compare the **new** leading against the parent's height.
Only where it exceeds does anything shift, and then the fix is the parent's.

**Order of work** — geometry last, so a visual check is needed only at the end:

| Step | Changes | Geometry |
|---|---|---|
| 1 | weight only — 700 / 800 / 900 / 300 → the set's three weights | none |
| 2 | stray tracking removed | width only, a fraction of a pixel per character |
| 3 | size — 13→14, 11→12, 9→10, 18→20 | width: check truncation, especially aliases and file names |
| 4 | leading | height: the parent-slack check, per component |

After the migration prod holds **8 sizes** instead of 15, and **3 weights** instead of 7.

---

*Prepared 4 September 2026. Measurements taken against prod on that date; re-verify before acting on
an item that is more than a release old.*
