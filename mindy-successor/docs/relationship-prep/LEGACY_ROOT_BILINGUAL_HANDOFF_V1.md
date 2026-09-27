# Legacy Root Bilingual Handoff v1

Date: 2026-09-27
Owner: Chat 5
Current-main baseline checked for this handoff: `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
Scope: queue items 61–71
Integration mode: selective copy only; do not wholesale-merge the worker branch.

## SAFE_TO_COPY_NOW

### Audit and authored sources
- `docs/relationship-prep/LEGACY_ROOT_EVENT_LOCALIZATION_DEBT_AUDIT_V1.md`
- `docs/relationship-prep/BASE_ARRIVAL_HOME_EVENT_BANK_RU_EN_V1.md`
- `docs/relationship-prep/BASE_ORDINARY_TOWN_EVENT_BANK_RU_EN_V1.md`
- `docs/relationship-prep/GOPHER_EVENT_BANK_RU_EN_V1.md`
- `docs/relationship-prep/STAGE_GOBLIN_EVENT_BANK_RU_EN_V1.md`
- `docs/relationship-prep/LEGACY_ROOT_MEDIA_ALT_LOCALIZATION_INVENTORY_V1.md`

### Root-localization staging source
- `prior-work/astra/prototype-m3.2/content/legacy-root-event-localization-v1.fixture.json`

The fixture contains:
- 17 exact current event IDs;
- event titles;
- every current variant body;
- every current choice label;
- every current choice body;
- 16 exact current media-alt identities;
- complete RU+EN;
- locale-neutral keys only;
- no gameplay fields.

At the audited source baseline, the only pre-existing collision was `media.base.workshop.alt`, and it was exact-identical. Lead must re-run collision review against the integration head.

### Guard / acceptance sources
- `prior-work/astra/prototype-m3.2/tests/legacy-root-event-localization-v1.test.ts`
- `docs/relationship-prep/LEGACY_ROOT_EVENT_NATURAL_PATH_MATRIX_V1.md`
- `docs/relationship-prep/LEGACY_ROOT_EVENT_COPY_DUPLICATION_AUDIT_V1.md`
- `docs/relationship-prep/LEGACY_ROOT_EVENT_PRODUCTION_INTEGRATION_CHECKLIST_V1.md`

Current shared renderer already consumes generic event title, variant body, choice-label and media-alt localization keys, so those surfaces can use the root strings without event-specific runtime code.

## SHARED_UI_REQUIRED

### Choice outcome/body presentation

Prepared key form:

`event.<eventId>.choice.<choiceId>.text`

Current event resolution writes embedded source `sceneChoice.text` into the gameplay journal and may copy it into `lastAction.text`. The pending event renderer does not render localized choice-body text.

Therefore Lead must not solve this by writing locale-selected strings into Save.

If localized post-choice outcome text is exposed, it must remain presentation-derived from stable event/choice identity or another locale-neutral reference. Until that consumer exists, item-67 choice-body entries are safe root localization data but are not a complete visible EN fix for journal/outcome text.

No other shared UI gap was found for the covered pending event surfaces.

## EXCLUDED_OTHER_OWNER

Do not copy this wave into or use it to modify:

### School
- `base.school`
- `school-lesson-content-v1.*`
- `school-life-content-v1.*`
- other School localization/runtime

### Forest / Chat3-owned route-result work
- `forest-result-content-v1.*`
- Forest Activity route/result semantics

`gopher.receipt` is included only as the already-shipped legacy/tutorial event around `forest-search`; its text does not redefine Forest Activity ownership.

### Ordinary poverty
- `poverty-street-production*`
- `poverty-cheap-production*`
- `poverty-pressure-production.*`
- `poverty-recovery-production.*`

### Lumber / Foreman streams outside this legacy root wave
- `ds-lumber.*`
- `lumber-cross.*`
- `lumber.career-first-shift`
- `lumber.foreman-notice`
- `lumber-night.foreman-professional`

### Secret Debt / Product-open forced-night content
Entirely out of scope.

## PRODUCT_OPEN

No Product decision is required to merge the approved localization strings for the covered current identities.

Still Product/open or otherwise out of scope:
- changing any route, trigger, condition, effect, reward, flag or balance;
- adding new characters/events/choices;
- changing the world mystery or festival resolution;
- introducing new Hunter Forest semantics;
- changing goblin relationship/progression semantics;
- new media assets or media path changes;
- making localized prose part of gameplay Save identity.

## Exact selective-copy list

61. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_EVENT_LOCALIZATION_DEBT_AUDIT_V1.md`
62. `mindy-successor/docs/relationship-prep/BASE_ARRIVAL_HOME_EVENT_BANK_RU_EN_V1.md`
63. `mindy-successor/docs/relationship-prep/BASE_ORDINARY_TOWN_EVENT_BANK_RU_EN_V1.md`
64. `mindy-successor/docs/relationship-prep/GOPHER_EVENT_BANK_RU_EN_V1.md`
65. `mindy-successor/docs/relationship-prep/STAGE_GOBLIN_EVENT_BANK_RU_EN_V1.md`
66. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_MEDIA_ALT_LOCALIZATION_INVENTORY_V1.md`
67. `mindy-successor/prior-work/astra/prototype-m3.2/content/legacy-root-event-localization-v1.fixture.json`
68. `mindy-successor/prior-work/astra/prototype-m3.2/tests/legacy-root-event-localization-v1.test.ts`
69. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_EVENT_NATURAL_PATH_MATRIX_V1.md`
70. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_EVENT_COPY_DUPLICATION_AUDIT_V1.md`
71. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_EVENT_PRODUCTION_INTEGRATION_CHECKLIST_V1.md`
72. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_BILINGUAL_HANDOFF_V1.md`

## Recommended Lead integration order

1. Reconcile item 67 with the current integration-head root localization using item 68.
2. Optionally apply the text-only label refinements in item 70 before root merge; keep RU and EN paired.
3. Merge approved item-67 entries into root localization.
4. Use item 69 to exercise exact current natural paths.
5. Assert pending event RU↔EN invariance for title/body/choice label/media alt.
6. Keep choice-body localization out of locale-specific Save writes; add a shared presentation consumer only if Lead chooses to expose localized outcomes.
7. Run exact-head CI per item 71.

## Remaining root-event localization debt after this wave

Within the assigned Chat5 legacy root scope, after item 67 is merged:
- event title debt: none;
- variant-body debt: none;
- choice-label debt: none;
- covered media-alt debt: none;
- choice-body root-string debt: none;
- **visible choice-outcome/journal localization debt remains because the current engine stores embedded source text rather than a locale-neutral choice-text reference.**

All other remaining root-event localization work belongs to the excluded owner namespaces above or to future explicitly queued Product/shared-runtime work.

## Locked invariants

- same event ID in RU and EN;
- same variant ID;
- same allowed choice IDs;
- same presentation/media identity;
- same effects and flags exactly once;
- same RNG behavior;
- gameplay Save identity independent of locale;
- no worker-branch wholesale merge.
