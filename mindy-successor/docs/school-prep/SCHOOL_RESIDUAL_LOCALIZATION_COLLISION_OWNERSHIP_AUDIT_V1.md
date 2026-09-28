# School Residual Localization Collision / Ownership Audit v1

Date: 2026-09-28
Owner: Chat 5 / School + Text Localization Content Worker
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`
Fixture: `content/school-residual-localization-v1.fixture.json`

## Exact-current collision classification

| Key | Classification | Reason |
|---|---|---|
| `presentation.static.school-course-literacy-and-numbers.alt` | SUPERSEDED | same current key exists; RU uses stale course identity wording and is intentionally corrected; current EN remains valid |
| `presentation.static.school-course-arcana.alt` | SUPERSEDED | same current key exists; EN article grammar is incorrect (`A Arcana`) and is intentionally corrected |
| `presentation.static.school-course-etiquette-and-presentation.alt` | SUPERSEDED | same current key exists; RU uses stale course identity wording and EN article grammar is incorrect |
| `presentation.static.school-course-arts-and-performance.alt` | SUPERSEDED | same current key exists; EN article grammar is incorrect (`A Arts & Performance`) and is intentionally corrected |

Summary:
- ADDITIVE: 0
- IDENTICAL: 0
- REUSE_EXISTING: 0
- CONFLICT: 0
- SUPERSEDED: 4

These are reviewed text corrections to already-existing exact-current localization keys, not new semantic keys.

## Locale-level delta

### Literacy & Numbers
- RU: changed
- EN: unchanged

### Arcana
- RU: unchanged
- EN: changed

### Etiquette & Presentation
- RU: changed
- EN: changed

### Arts & Performance
- RU: unchanged
- EN: changed

## Ownership classification

All four keys are:
- existing School course static-image accessibility alt keys;
- already referenced by exact current School presentation slots;
- text-only localization values.

Ownership: **Chat 5 text/localization preparation**.

No ownership transfer is implied for media assets or presentation selection.

## Explicit exclusions

### Chat 2 media

Excluded:
- SVG/GIF creation or replacement;
- media path changes;
- presentation slot selection;
- new School images;
- animation semantics.

This patch changes text values only.

### Chat 3 poverty / Forest / Secret Debt

No key or content in item 200 belongs to:
- poverty;
- Forest;
- Secret Debt.

### PR #63 Foreman semantic integration

No `relationship.lumber.foreman.*`, Foreman event, Night, or condition key is touched.

PR #63 remains separate.

### Already-shipped generic UI keys

No `ui.*`, `stat.*`, `housing.*`, condition, Night shell, or generic localization key is duplicated.

Current generic School consumers remain reused as shipped.

## Teacher / staging exclusion

No teacher identity, teacher copy, worker-only exact-course staging, or new School canon enters the patch.

## Mechanics boundary

Item 200 contains no:
- course IDs;
- course mechanics;
- tuition;
- Energy costs;
- stat effects;
- Night-study effects;
- conditions;
- rewards;
- progression;
- Save/RNG fields.

## Integration rule

Because all four entries are intentional same-key corrections, production integration should replace only the corresponding RU/EN text values after an exact-head recheck.

Any future divergence of those same keys from this audited baseline must be reviewed again rather than overwritten automatically.
