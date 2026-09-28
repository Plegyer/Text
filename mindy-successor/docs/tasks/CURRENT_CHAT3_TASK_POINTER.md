# Current Chat 3 task pointer

Status: ASSIGNED
Owner: Chat 3 / Forest + Poverty Content Bundles Worker
Queue: **341–352**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT3_MANDATORY_ROLE_PROMPT.md`
Ownership matrix: `mindy-successor/docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Historical source

Previous draft handoff:
- branch: `chat3/lumber-production-proof-next`
- head: `721eb4daa32a6e51104cc38e01b03b3150729593`
- handoff: `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_DEPTH_HANDOFF_V3.md`
- historical queue: items 329–340

That branch is a **historical draft source only**.
Do not continue or merge it wholesale.

The old handoff contains useful ordinary-poverty depth/accessibility/lookup material, but its audited baseline is stale. Refresh it selectively against exact current `main`.

Production runtime/UI integration is **not** Chat 3 ownership. Chat 3 prepares a current, reviewable handoff PR; Lead/Chat 1 Developer decides later production integration.

Start a fresh branch from current `main`, recommended:
- `chat3/ordinary-poverty-depth-refresh-341-352`

## Queue item 341 — current-main ordinary poverty identity audit v4

Create:
- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_CURRENT_MAIN_IDENTITY_AUDIT_V4.md`

Revalidate exact current production:
- six ordinary-poverty pack IDs;
- event IDs;
- gameplay variant IDs;
- choice IDs;
- current localization namespaces;
- active poverty presentation/static identities.

Secret Debt remains excluded.

Record differences from the historical v3 handoff baseline.

## Queue item 342 — poverty depth key collision audit v4

Create:
- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_DEPTH_KEY_COLLISION_AUDIT_V4.md`

Reclassify the historical 26 `presentation.poverty.depth.*` keys against exact current production localization:
- ADDITIVE;
- IDENTICAL;
- REUSE_EXISTING;
- CONFLICT;
- SUPERSEDED.

Do not alter production localization in this worker queue.

## Queue item 343 — poverty static accessibility target revalidation v3

Create:
- `mindy-successor/docs/poverty-prep/POVERTY_STATIC_ACCESSIBILITY_TARGET_REVALIDATION_V3.md`

Revalidate the historical 20 alt/caption targets against current active poverty presentation assets.

Classify:
- ACTIVE_TARGET;
- ALREADY_REPLACED;
- NO_LONGER_ACTIVE;
- CONFLICT;
- OWNED_ELSEWHERE.

Do not change media paths/assets.

## Queue item 344 — poverty depth candidate ordering refresh v2

Create:
- `mindy-successor/docs/poverty-prep/POVERTY_DEPTH_CANDIDATE_ORDERING_LEDGER_V2.md`

For every exact current eventId + variantId group that can use depth text:
- record deterministic ordered candidate keys;
- preserve the existing no-gameplay-RNG selection rule;
- record current occurrence source;
- identify any mapping that is no longer valid.

No Save field additions.

## Queue item 345 — poverty depth fallback coverage refresh v2

Create:
- `mindy-successor/docs/poverty-prep/POVERTY_DEPTH_FALLBACK_COVERAGE_AUDIT_V2.md`

Prove every current ordinary-poverty event/variant pair is either:
- mapped to valid depth candidates; or
- explicitly covered by current core variant-text fallback.

No invented variants.

## Queue item 346 — current-main poverty depth localization fixture v3

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v3.fixture.json`

Contain only exact-current approved depth RU+EN presentation keys from item 342.

If some historical keys are superseded/conflicting, omit them and record the reason in the audit.

No event IDs, mechanics, RNG or Save payload.

## Queue item 347 — current-main poverty accessibility fixture v3

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/poverty-static-accessibility-v3.fixture.json`

Contain only current ACTIVE_TARGET accessibility replacements from item 343.

Presentation text only.
No asset/path/gameplay changes.

## Queue item 348 — current-main poverty render lookup fixture v2

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/poverty-depth-render-lookup-v2.fixture.json`

Map exact current:
- eventId;
- variantId;
- ordered approved depth keys;
- core fallback localization identity.

Presentation contract only.
Do not add selector/runtime code.

## Queue item 349 — poverty depth Journal non-overlap regression v2

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/poverty-depth-journal-nonoverlap-v2.test.ts`

Validate exact current:
- depth keys remain pending-scene presentation only;
- Journal refs remain stable eventId + choiceId identity;
- no depth key enters Save identity;
- no gameplay RNG field is used;
- locale change does not alter Journal identity.

## Queue item 350 — poverty depth current-main ownership/collision regression v4

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/ordinary-poverty-localization-depth-v4.test.ts`

Validate:
- exact current ordinary-poverty IDs;
- RU+EN completeness of item 346;
- valid targets in item 347;
- lookup/fallback coherence with item 348;
- no Secret Debt;
- no School ownership;
- no Foreman/PR65 ownership;
- no Chat 2 media-source ownership;
- no gameplay/RNG/Save fields.

## Queue item 351 — ordinary poverty depth selective handoff v4

Create:
- `mindy-successor/docs/poverty-prep/ORDINARY_POVERTY_DEPTH_HANDOFF_V4.md`

Consolidate 341–350 into:
- CURRENT_IDENTITIES;
- DEPTH_KEYS_READY;
- ACCESSIBILITY_READY;
- ORDERED_LOOKUP_READY;
- FALLBACK_COMPLETE;
- JOURNAL_NONOVERLAP;
- OWNERSHIP_NONOVERLAP;
- SELECTIVE_COPY;
- PRODUCTION_WIRING_DEFERRED.

Explicitly identify which historical v3 artifacts were:
- REUSED;
- REBUILT;
- DROPPED.

## Queue item 352 — candidate handoff PR

Before completion:
1. re-read exact current `main`;
2. run items 349 and 350;
3. run relevant existing ordinary-poverty tests;
4. run `npm run check` if the environment permits;
5. open a focused worker PR against `main`;
6. report exact head SHA, changed files and actually-run checks.

The PR is a **content/handoff candidate**, not production runtime/UI integration.

Once handed to Chat 4/Lead, freeze the exact head under the project QA freeze protocol.

No open PR = queue remains draft/non-deliverable.
