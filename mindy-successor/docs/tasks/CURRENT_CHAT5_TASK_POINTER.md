# Current Chat 5 task pointer

Status: ASSIGNED
Owner: Chat 5 / School + Text Localization Content Worker
Queue: **193–204**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT5_MANDATORY_ROLE_PROMPT.md`

## Current context

Your historical Foreman semantic handoff (items 181–192, commit `8d4dbefa8fac47c44ccd61086ddae7c3711fb68e`) has already been taken over for production integration by Chat 1 Developer in PR #63.

Do not duplicate PR #63.

School RU/EN production localization was already integrated previously. Therefore this queue is a **current-main residual-debt audit/preparation wave**, not a rewrite of shipped School localization.

Start a fresh worker branch from current `main`, recommended:
- `chat5/school-residual-localization-193-204`

Only current production identities and currently missing/incorrect presentation text may enter this queue.

## Queue item 193 — current-main School visible localization debt audit v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_CURRENT_MAIN_VISIBLE_LOCALIZATION_DEBT_V1.md`

Audit current normal-player School surfaces after all merged localization/UI work.

Classify each visible School string as:
- LOCALIZED_CURRENT;
- FALLBACK_ONLY;
- RAW_ID;
- MISSING_EN;
- MISSING_RU;
- NOT_PLAYER_VISIBLE.

Do not count debug-only surfaces as production debt.

## Queue item 194 — exact current School presentation identity inventory v2

Create:
- `mindy-successor/docs/school-prep/SCHOOL_CURRENT_PRESENTATION_IDENTITY_INVENTORY_V2.md`

Record exact current production identities used by:
- School panel;
- current eight course tracks;
- reachable lesson result presentation;
- reachable School Night-study presentation.

Do not promote worker-only teacher/exact-course staging or invent new IDs.

## Queue item 195 — School result text gap matrix v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_RESULT_TEXT_GAP_MATRIX_V1.md`

For each currently reachable School result/presentation identity, record:
- current RU rendering source;
- current EN rendering source;
- fallback;
- whether a stable localization key already exists;
- whether any normal-player raw/fallback debt remains.

No gameplay/result-selection changes.

## Queue item 196 — School controls and condition-copy gap matrix v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_CONTROL_CONDITION_COPY_GAP_MATRIX_V1.md`

Audit current School buttons/help/tuition/lesson eligibility and condition explanation copy.

Reuse already-shipped generic UI/condition keys where semantically correct.
Do not create duplicate keys merely because School consumes them.

## Queue item 197 — School accessibility text parity audit v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_ACCESSIBILITY_TEXT_PARITY_AUDIT_V1.md`

Audit alt/caption/help text attached to currently active School presentation identities.

Text audit only.
Do not change media paths/assets or presentation selection; Chat 2 owns asset production.

## Queue item 198 — residual School RU source patch v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-ru-v1.fixture.json`

Include only exact-current **verified missing or incorrect** Russian presentation strings found by items 193–197.

If there is zero RU debt, produce a valid empty patch with explicit invariants and document zero debt.

No mechanics fields.

## Queue item 199 — residual School EN parity patch v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-en-v1.fixture.json`

Provide exact English parity for item 198 and any independently verified EN-only debt.

If there is zero EN debt, produce a valid empty patch with explicit invariants.

## Queue item 200 — residual School localization merged fixture v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-v1.fixture.json`

Merge only approved current RU+EN residual keys from items 198–199 into stable pairs.

No duplicate semantic keys and no new gameplay/content identity.

## Queue item 201 — exact-current collision and ownership audit v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_COLLISION_OWNERSHIP_AUDIT_V1.md`

Compare item 200 against exact current production localization.

Classify keys:
- ADDITIVE;
- IDENTICAL;
- REUSE_EXISTING;
- CONFLICT;
- SUPERSEDED.

Also classify ownership and explicitly exclude:
- Chat 2 media work;
- Chat 3 poverty/Forest/Secret-Debt work;
- PR #63 Foreman semantic integration;
- already-shipped generic UI keys.

## Queue item 202 — current consumer map and no-new-UI proof v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_CONSUMER_MAP_V1.md`

Map every item-200 key to an exact existing current production consumer/fallback.

If a proposed key has no current consumer, remove it from the production patch rather than inventing a UI surface.

## Queue item 203 — School residual localization regression source v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-residual-localization-source-v1.test.ts`

Validate:
- only exact current School production identities;
- RU+EN completeness for non-empty patch keys;
- collision/ownership assumptions;
- no gameplay/RNG/Save/economy/progression fields;
- no teacher/exact-course staging promotion;
- empty patch is accepted if audit proves zero residual debt.

This is a worker regression source; exact-head production CI remains Lead/QA responsibility.

## Queue item 204 — School residual localization handoff v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_HANDOFF_V1.md`

Consolidate items 193–203 into:
- CURRENT_VISIBLE_DEBT;
- VERIFIED_RESIDUAL_KEYS;
- ZERO_DEBT_AREAS;
- COLLISION_STATUS;
- EXISTING_CONSUMERS_ONLY;
- SELECTIVE_COPY;
- OUT_OF_SCOPE.

## Candidate handoff requirements

Complete 193–204 sequentially on the fresh branch.

Before claiming handoff ready:
1. re-read current `main`;
2. ensure PR #63/Chat 3/Chat 2 ownership is not duplicated;
3. run the focused source regression if executable in your environment;
4. run relevant existing School/localization tests where practical;
5. open a worker PR against `main`;
6. report exact head SHA, PR number, changed files and actually-run checks.

Do not implement shared UI/runtime wiring in this queue.
No active PR = queue remains draft/non-deliverable.
