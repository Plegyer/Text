# School Current-Main Visible Localization Debt v1

Date: 2026-09-28
Owner: Chat 5 / School + Text Localization Content Worker
Exact current-main baseline: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`

## Scope

Audited current normal-player School presentation only:
- School panel shell;
- eight current paid course cards;
- lesson result screen;
- School lesson notification events;
- exact-course Night-study labels/help;
- reachable Night-study follow-up event;
- active School presentation alt text;
- shared condition/help text actually reused by School.

Excluded:
- debug-only inspector/editor surfaces;
- worker-only teacher/exact-course staging;
- media asset creation/selection owned by Chat 2;
- shared runtime integration owned by Chat 1 Developer;
- poverty/Forest/Secret Debt owned by Chat 3;
- PR #63 Foreman integration.

## Summary

The current School localization is broadly complete. No normal-player School control, course label/description, lesson result text, Night-study text, or event copy is missing RU/EN.

Verified residual debt is limited to **four active accessibility alt keys** whose text is present in both locales but contains exact-current wording/grammar defects.

| Surface | Current status | Residual debt |
|---|---|---|
| School panel title/help | LOCALIZED_CURRENT | none |
| 8 course labels | LOCALIZED_CURRENT | none |
| 8 course descriptions | LOCALIZED_CURRENT | none |
| stat gain labels | LOCALIZED_CURRENT via shipped `stat.*.label` | none |
| tuition/current-day Energy line | LOCALIZED_CURRENT | none |
| lesson button | LOCALIZED_CURRENT | none |
| lesson result title/body | LOCALIZED_CURRENT | none |
| paid-lesson follow-up event copy | LOCALIZED_CURRENT | none |
| exact-course Night-study dynamic labels | LOCALIZED_CURRENT | none |
| Night-study help/button | LOCALIZED_CURRENT | none |
| Night-study follow-up event copy | LOCALIZED_CURRENT | none |
| School media fallback alts | LOCALIZED_CURRENT | none |
| active course static alts | LOCALIZED_CURRENT, quality correction required on 4 keys | 4 keys |
| presentation captions | NOT_PLAYER_VISIBLE in current `mediaHTML()` | no production debt |
| unused legacy School static caption/alt keys not attached to current School slots | NOT_PLAYER_VISIBLE | no production debt |
| teacher/exact-course staging names | NOT_PLAYER_VISIBLE / not production identity | excluded |

## Exact verified residual accessibility keys

### `presentation.static.school-course-literacy-and-numbers.alt`

Current RU uses an older course name:
- current: `Учебная сцена курса «Грамота и числа» ...`
- exact current course label: `Грамотность и счёт`

Classification:
- RU: LOCALIZED_CURRENT but **incorrect current identity wording**
- EN: LOCALIZED_CURRENT and semantically correct

### `presentation.static.school-course-etiquette-and-presentation.alt`

Current RU uses an older shortened course name:
- current: `Этикет и подача`
- exact current course label: `Этикет и самопрезентация`

Current EN has article error:
- current: `A Etiquette & Presentation lesson scene ...`

Classification:
- RU: LOCALIZED_CURRENT but **incorrect current identity wording**
- EN: LOCALIZED_CURRENT but **grammar correction required**

### `presentation.static.school-course-arcana.alt`

Current EN:
- `A Arcana lesson scene ...`

Expected grammar:
- `An Arcana lesson scene ...`

Classification:
- RU: LOCALIZED_CURRENT
- EN: LOCALIZED_CURRENT but **grammar correction required**

### `presentation.static.school-course-arts-and-performance.alt`

Current EN:
- `A Arts & Performance lesson scene ...`

Expected grammar:
- `An Arts & Performance lesson scene ...`

Classification:
- RU: LOCALIZED_CURRENT
- EN: LOCALIZED_CURRENT but **grammar correction required**

## FALLBACK_ONLY

No verified normal-player School string is fallback-only on the audited main.

Catalog English labels remain runtime fallbacks in code, but every current School course label/description and School UI key used by the normal-player surface has a shipped RU+EN localization entry.

## RAW_ID

No verified normal-player School control or result surface exposes a raw current School course/track ID.

Exact-course Night-study choice labels are built from:
- localized course label;
- localized stat label;
- localized generic Night-study template.

The housing eligibility condition is not rendered on the current Night-study card; it only controls eligibility.

## MISSING_EN

None.

The three English accessibility defects above are incorrect grammar, not missing English entries.

## MISSING_RU

None.

The two Russian accessibility defects above are stale wording, not missing Russian entries.

## NOT_PLAYER_VISIBLE

Current presentation caption keys are not consumed by `mediaHTML()`, which resolves only the selected candidate alt through `altKey`/media alt.

Therefore caption wording differences are not current normal-player localization debt.

Likewise, worker/test teacher staging is not promoted into production by this audit.

## Conclusion

Residual School localization debt is **four existing active accessibility alt keys only**.

No new School content identity, UI, teacher canon, result mechanic, condition, economy, Save field, or RNG behavior is required.
