# Profession / Unlock Localization Handoff v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`
Scope: queue items 157–167
Integration mode: selective copy/wiring only; do not wholesale-merge the worker branch.

## PROFESSION_KEYS_READY

Primary fixture:
- `prior-work/astra/prototype-m3.2/content/profession-localization-v1.fixture.json`

Source/review:
- `docs/relationship-prep/PROFESSION_DISPLAY_LABEL_DEBT_AUDIT_V1.md`
- `docs/relationship-prep/PROFESSION_RU_SOURCE_LABELS_V1.md`
- `docs/relationship-prep/PROFESSION_EN_PARITY_REVIEW_V1.md`

Coverage:
- exact current ordinary career IDs: 10
- label keys: 10
- description keys: 10
- total profession strings: 20

Stable key form:

`profession.<careerId>.label`

`profession.<careerId>.description`

Exact current careers:
- `lumber`
- `satyr-maid`
- `undead-farm`
- `tavern`
- `hunter`
- `guard`
- `merchant`
- `artist-geisha`
- `assassin`
- `prostitute`

No Palace profession exists.

## STATS_WORK_CONSUMER_REQUIRED

Stats map:
- `docs/relationship-prep/STATS_PROFESSION_CONSUMER_MAP_V1.md`

Current Stats panel still prints raw shift-action catalog labels from the exact `professions` action-ID list.

Recommended:
- keep the same shift action ID for `actionCounts`;
- display `profession.<careerId>.label`;
- optionally use `profession.<careerId>.description` for profession help/tooltip;
- never derive career identity from translated text.

Work map:
- `docs/relationship-prep/WORK_PROFESSION_CONSUMER_MAP_V1.md`

Current Work action cards already have shipped localization under:

`action.<career>.shift.label`

`action.<career>.shift.description`

Those should remain authoritative for the executable shift action.

Profession keys are for profession/career identity. They can be used in Work headings/filters/summaries if Lead wants a separate profession identity display, but action command IDs and current action localization should not be replaced mechanically.

## LEGACY_UNLOCK_KEYS_READY

Audit/source:
- `docs/relationship-prep/LEGACY_UNLOCK_LABEL_DEBT_AUDIT_V1.md`
- `docs/relationship-prep/LEGACY_UNLOCK_LABELS_RU_EN_V1.md`

Fixture:
- `prior-work/astra/prototype-m3.2/content/legacy-unlock-localization-v1.fixture.json`

Coverage: 10 exact current/legacy-compatible visible unlock identities:
- `guild`
- `scholar`
- `calendar`
- `host`
- `mediator`
- `court`
- `vitality`
- `lumber.forewoman.compat`
- `lumber.forest.compat`
- `palace`

Stable key form:

`unlock.<unlockId>.label`

Important:
- `palace` is an unlock only;
- `calendar` remains a legacy-compatible visible ID;
- `lumber.hardwork.compat` is intentionally excluded because current Hard Work completion records typed `hardWork:lumber` progress rather than adding that compatibility string to `meta.unlocks`.

## SHARED_UI_WIRING_REQUIRED

Current Legacy inheritance display still reads the hardcoded `labels` dictionary by unlock ID.

Required presentation rule:

`tr(`unlock.${unlockId}.label`, labels[unlockId] ?? unlockId)`

This preserves compatibility fallback while allowing current RU↔EN switching.

Do not translate or replace the stored unlock ID.

Profession condition displays may later reuse `profession.<careerId>.label`, but this handoff does not require a condition-schema change.

## COLLISION STATUS

Audit:
- `docs/relationship-prep/PROFESSION_UNLOCK_LOCALIZATION_COLLISION_AUDIT_V1.md`

Against the exact audited current root:
- ADDITIVE: 30
- IDENTICAL: 0
- REUSE_EXISTING: 0
- CONFLICT: 0

Some RU unlock values exist in hardcoded `labels.ts`, but they are not root localization keys and do not provide English locale switching.

Profession keys are semantically separate from executable shift-action keys.

Lead must rerun collision classification on the exact integration head.

## REGRESSION SOURCE

Test:
- `prior-work/astra/prototype-m3.2/tests/profession-unlock-localization-source-v1.test.ts`

Validates:
- exact current 10 career IDs;
- no `profession.palace.*`;
- exact generated/current-compatible unlock ID set;
- `lumber.hardwork.compat` excluded from unlock labels;
- `palace` and `calendar` included;
- complete RU+EN pairs;
- no wages/conditions/effects/rewards/RNG/Save fields in presentation fixtures.

Exact-head CI execution remains Lead/QA ownership.

## SELECTIVE COPY

157. `mindy-successor/docs/relationship-prep/PROFESSION_DISPLAY_LABEL_DEBT_AUDIT_V1.md`
158. `mindy-successor/docs/relationship-prep/PROFESSION_RU_SOURCE_LABELS_V1.md`
159. `mindy-successor/docs/relationship-prep/PROFESSION_EN_PARITY_REVIEW_V1.md`
160. `mindy-successor/prior-work/astra/prototype-m3.2/content/profession-localization-v1.fixture.json`
161. `mindy-successor/docs/relationship-prep/STATS_PROFESSION_CONSUMER_MAP_V1.md`
162. `mindy-successor/docs/relationship-prep/WORK_PROFESSION_CONSUMER_MAP_V1.md`
163. `mindy-successor/docs/relationship-prep/LEGACY_UNLOCK_LABEL_DEBT_AUDIT_V1.md`
164. `mindy-successor/docs/relationship-prep/LEGACY_UNLOCK_LABELS_RU_EN_V1.md`
165. `mindy-successor/prior-work/astra/prototype-m3.2/content/legacy-unlock-localization-v1.fixture.json`
166. `mindy-successor/docs/relationship-prep/PROFESSION_UNLOCK_LOCALIZATION_COLLISION_AUDIT_V1.md`
167. `mindy-successor/prior-work/astra/prototype-m3.2/tests/profession-unlock-localization-source-v1.test.ts`
168. `mindy-successor/docs/relationship-prep/PROFESSION_UNLOCK_LOCALIZATION_HANDOFF_V1.md`

## Recommended Lead order

1. Recheck items 160/165 against exact integration-head localization.
2. Merge approved additive profession/unlock keys.
3. Wire Stats profession names using item 161 while keeping exact shift action-count IDs.
4. Keep Work executable cards on existing action-shift keys unless a distinct profession identity is intentionally shown.
5. Wire Legacy unlock labels through `unlock.<id>.label`.
6. Preserve Palace as unlock-only and Hard Work progress as typed meta progress.
7. Run item 167 plus exact-head project CI.

## Acceptance invariants

RU↔EN switching must preserve:
- career IDs;
- shift action IDs;
- action counts;
- wages/costs/requirements;
- career progression;
- Hard Work progress;
- Palace unlock condition;
- ending reward identity;
- meta.unlock IDs;
- Save identity;
- RNG evolution.

Only visible presentation changes.
