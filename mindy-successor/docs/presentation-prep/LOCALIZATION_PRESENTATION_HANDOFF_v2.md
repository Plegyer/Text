# Localization Presentation Handoff v2

Scope:
consolidated Lead integration guidance for Queue items 134–142.

Current production milestone:
- PR #41 merged as `974d6e077ffc511e304a64aef32f2aab81167f41`;
- PR41 head `6890aaa85dbe5a545219e8200560d307dce8f35d`;
- exact-head `mindy-successor check`: **SUCCESS**.

PR41 establishes the first real RU/EN localization runtime and UI slice.

## 1. What PR41 already ships

### Localization runtime

Current-main:
`src/core/localization.ts`

provides:
- `Locale = 'ru' | 'en'`;
- RU default locale;
- RU required / EN optional schema;
- EN -> RU fallback;
- legacy fallback parameter;
- `missingEnglishKeys()`;
- locale normalization independent from gameplay.

### Active bilingual UI

PR41 actively localizes:
- language menu;
- town shell;
- HUD shell;
- main panel labels/subtitles;
- Work panel shell;
- result-shell labels;
- all 10 ordinary career shift labels;
- all 10 ordinary career shift descriptions.

Current localization bundle:
- 56 keys;
- 0 missing EN values at the audit point.

## 2. Stable localization-key convention

Ready document:

`docs/presentation-prep/LOCALIZATION_KEY_CONVENTION_FOR_PRESENTATION_v1.md`

Recommended locale-neutral patterns:

```text
loc/action/<actionId>/label
loc/action/<actionId>/description
loc/event/<eventId>/title
loc/event/<eventId>/variant/<variantId>/text
loc/event/<eventId>/choice/<choiceId>/label
loc/event/<eventId>/choice/<choiceId>/text
loc/presentation/<presentationId>/caption
loc/presentation/<presentationId>/fallback/text
loc/presentation/<presentationId>/candidate/<candidateKey>/alt
loc/presentation/<presentationId>/static/alt
```

Locale does not appear in the key.

Keys are lookup addresses only and never gameplay identity.

## 3. First migration batch ready

Machine-readable authoring package:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-presentation-migration-batch-v1.json`

Contains:
- 10 Work-panel action label entries;
- 4 Lumber seasonal shift presentation surfaces;
- Lumber result/default;
- 3 reachable School generic/Night surfaces;
- 4 representative ordinary-poverty surfaces.

All entries use:
- shared stable IDs;
- RU source;
- EN localization;
- shared static media;
- RU/EN alt;
- RU/EN text fallback.

Status:
`AUTHORING_ONLY_NOT_RUNTIME_WIRED`.

Recommended Lead use:
copy reviewed strings into the PR41 localization catalog or a presentation-localization catalog using stable keys.

## 4. Ten-career localization bundle

Machine-readable package:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-localization-v1.json`

Covers all 10 ordinary careers:
- one actionId each;
- RU/EN label;
- RU/EN description;
- RU/EN result-shell text;
- 4 shared seasonal semantic presentation IDs per career;
- stable result/default ID;
- locale-neutral pool reference;
- shared static fallback;
- RU/EN candidate alt.

No gameplay action is duplicated by locale.

## 5. Full ten-career media alt pack

Document:

`docs/presentation-prep/TEN_CAREER_MEDIA_ALT_RU_EN_v1.md`

Coverage:
- 10 careers;
- 4 seasonal shift surfaces per career;
- 3 media candidate entries per surface;
- **120 RU+EN alt pairs**.

Every candidate:
- preserves semantic ID;
- preserves candidate key;
- describes visible presentation only;
- avoids hidden mechanics and outcome claims.

This pack is ready to feed the future presentation/media localization layer.

## 6. Fallback contract

Fixture:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/localization-fallback-v1.fixture.json`

Includes four authoring cases:
1. fully translated RU+EN;
2. RU-only migration debt;
3. missing localization value with bilingual legacy fallback;
4. localized multi-GIF caption + alt with one shared candidate.

Required production behavior:

### RU request

```text
RU
-> EN if RU missing
-> legacy fallback
```

### EN request

```text
EN
-> RU if EN missing
-> legacy fallback
```

PR41 already implements the critical EN -> RU behavior.

Final ship acceptance still requires complete RU+EN for intended shipped keys.

## 7. Regression contracts ready

### Localization + multi-GIF matrix

`tests/presentation-localization-multigif-contract.test.ts`

Authoring-contract coverage:
- locale switch keeps semantic presentationId;
- locale switch keeps candidate key/media path;
- RU/EN alt/caption vary only as text;
- missing EN deterministically falls back to RU;
- action IDs remain shared;
- no gameplay conditions/effects appear.

### Locale-switch contract v2

`tests/presentation-locale-switch-contract-v2.test.ts`

Coverage:
- shared semantic IDs RU ↔ EN;
- same multi-GIF candidate RU ↔ EN;
- deterministic RU fallback;
- missing EN remains QA-visible;
- no gameplay mechanics in localization bundles.

These worker tests were authored here; do not claim they executed unless Lead runs them after selective integration.

## 8. Current production coverage after PR41

Audit:

`docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`

### SHIPPED_RU_EN

- town shell;
- HUD shell;
- main panel tiles/subtitles;
- Work panel UI;
- 10 ordinary career action labels/descriptions.

### RU_FALLBACK

Deeper current UI still contains hardcoded/legacy RU:
- School inner panel;
- Forest/Explore inner panel;
- Night inner panel;
- condition/explanation strings;
- additional stats/journal/bag/legacy content.

### STAGED_RU_EN

Worker authoring exists for:
- career seasonal/result presentation;
- School reachable presentation hooks;
- ordinary poverty production presentation;
- School Night-study presentation;
- multi-GIF alt/captions.

### NOT_MIGRATED

- full Forest Activity presentation;
- general NightFlow presentation;
- actual ending titles/descriptions/epilogues;
- explicit multi-GIF runtime pool/selector.

## 9. School next integration package

Ready content identities:
- 8 paid lesson result semantic IDs;
- generic post-School hook;
- generic School-life after-paid hook;
- exact Night-study hook.

Recommended localization migration:
1. add RU/EN keys for event title/variant/choice;
2. add RU/EN presentation caption;
3. add RU/EN static/media alt;
4. keep current School gameplay IDs unchanged.

Teacher/course-specific libraries remain staged where exact paid-course routing is unavailable.

Do not localize them into incorrect generic routing.

## 10. Ordinary-poverty next integration package

PR37 provides real production identities.

Next localization package should cover all current:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck

events.

Migrate:
- title;
- variant text;
- choice labels;
- choice explanatory text;
- presentation captions;
- static/media alt.

Do not alter:
- event/variant/choice IDs;
- effects;
- cooldowns;
- next-day modifiers;
- item/money outcomes.

Secret Debt remains separate.

## 11. Career seasonal/result next integration package

PR41 localized action labels/descriptions.

Next career slice should add:
- seasonal presentation captions/text;
- stable result/default text;
- static alt;
- 3–5 candidate alt.

Recommended first smoke:
`job/lumber/shift/spring/default`.

Then expand:
1. all Lumber seasons/result;
2. Satyr Maid + Undead Farm;
3. remaining seven careers.

## 12. Multi-GIF runtime interaction

Localization runtime now exists.

Explicit multi-GIF pool runtime still does not.

Required composition:

```text
gameplay occurrence
-> shared presentationId
-> deterministic candidate key
-> one shared media asset
-> PR41 locale resolver for caption/alt
```

Locale must not be included in the candidate-selection seed.

### Remaining Lead-owned multi-GIF work

- optional `pool` slot schema;
- 3–5 candidates;
- stable candidate keys;
- deterministic occurrence selector;
- animation-off fallback;
- missing-candidate fallback.

No Save migration is preferred.

## 13. No-save-migration rule

PR41 locale is UI/presentation state.

Presentation localization should not create:
- RU event copy;
- EN event copy;
- locale-specific presentationId;
- locale-specific candidate key;
- locale-specific Save progression.

Multi-GIF candidate stability should also remain derivable from shared occurrence identity.

## 14. Exact selective-integration list — items 134–142

### Item 134
- `docs/presentation-prep/LOCALIZATION_KEY_CONVENTION_FOR_PRESENTATION_v1.md`

### Item 135
- `docs/presentation-prep/BILINGUAL_PRESENTATION_FALLBACK_AUDIT_v1.md`

### Item 136
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-presentation-migration-batch-v1.json`

### Item 137
- `prior-work/astra/prototype-m3.2/tests/presentation-localization-multigif-contract.test.ts`

### Item 138
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-localization-v1.json`

### Item 139
- `docs/presentation-prep/TEN_CAREER_MEDIA_ALT_RU_EN_v1.md`

### Item 140
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/localization-fallback-v1.fixture.json`

### Item 141
- `prior-work/astra/prototype-m3.2/tests/presentation-locale-switch-contract-v2.test.ts`

### Item 142
- `docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`

Worker branch remains long-lived.

Do not merge wholesale.

Selectively copy reviewed artifacts onto a fresh Lead branch from current main.

## 15. Recommended Lead integration order

1. Keep PR41 localization runtime unchanged as baseline.
2. Adopt localization-key convention.
3. Integrate the first migration batch strings.
4. Run localization unit/UI tests.
5. Add career seasonal/result localization.
6. Add School reachable-hook localization.
7. Add PR37 poverty localization.
8. Add ending/Forest/Night packages only when their content inventories are ready.
9. Implement multi-GIF pool runtime separately.
10. Attach localized alt/caption through the same PR41 resolver.
11. Run locale-switch + gameplay-invariance regressions.

## 16. Next production media batches

### Ready now after string integration
- ten-career base-shift static alt;
- Lumber seasonal/result bilingual presentation;
- reachable School generic/Night static alt;
- representative PR37 poverty static alt.

### Ready after multi-GIF runtime
- 120 career candidate RU+EN alt mappings;
- School 3–5 candidate pools;
- PR37 poverty 3–5 candidate pools.

### Staged
- teacher-specific routed pools;
- non-Lumber endings/Hard Work identities not yet authored;
- Secret Debt;
- unresolved Forest-specific content depth.

## Final disposition

PR41 solved the fundamental localization seam.

The next work is incremental content migration plus presentation-media integration.

The stable architecture is now:

**shared gameplay identity + shared presentation identity + shared media identity + RU/EN localized text.**

No gameplay fork and no Save migration are required.
