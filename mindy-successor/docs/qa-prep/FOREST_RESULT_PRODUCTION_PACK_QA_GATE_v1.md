# Forest Result Production Pack QA Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed worker branch: chat3/lumber-production-proof-next
Worker head observed: 50bac14c3c9451da1fab27a43d481994d3bf800a

## Scope

Review gate for:
- content/packs/forest-result-content-v1.json
- tests/forest-result-content-v1.test.ts

Worker artifact status:
- pack exists;
- test exists;
- worker branch is long-lived/diverged;
- selective integration only.

Observed branch divergence from current main:
- ahead 176
- behind 136
- merge base 88a0f7526bc43493d2415a0e7859296408e7b564

Do not merge the worker branch wholesale.

## 1. Exact activityResult boundaries

The pack currently defines exactly three Forest result reactions:

Success:
- kind: activityResult
- activity: lumber.forest
- outcome: success
- result: lumber.forest.success

Escape:
- kind: activityResult
- activity: lumber.forest
- outcome: escape
- result: lumber.forest.escape

Failure:
- kind: activityResult
- activity: lumber.forest
- outcome: failure
- result: lumber.forest.failure

Current main still defines those exact three Activity result IDs/outcomes.

PASS.

## 2. Success / escape / failure stay distinct

Required:
- three separate event IDs;
- three separate exact result IDs;
- no success alias for escape;
- no escape alias for failure;
- no generic “Forest finished” trigger replacing the exact boundary.

Current worker pack:
- forest-result-content-v1.success
- forest-result-content-v1.escape
- forest-result-content-v1.failure

PASS.

## 3. Effects are content/presentation-only

Current worker choices have empty effects.

The reaction pack does not:
- add Forest success/failure facts itself;
- modify Activity progress;
- change Energy;
- grant money/items;
- modify career progress;
- grant ending/Meta rewards.

The authoritative Activity result remains the owner of its existing world-fact effect.

PASS.

## 4. Lumber Hard Work firewall

The result pack must not depend on or alter:
- completed_shifts threshold;
- Lumber ending eligibility;
- hardWork:lumber reward.

Current worker test explicitly verifies:

Lumber Hard Work condition:
completed_shifts >= 50

Meta reward:
hardWork:lumber

The pack contains no completed_shifts or hardWork:lumber references.

PASS.

## 5. Reload and duplicate-effect safety

Required path:
Activity resolves
-> result reaction materializes
-> save/reload
-> same event/variant remains
-> resolve reaction once
-> no second gameplay effect.

Current worker test:
- persists pending event/variant;
- reloads twice;
- resolves the return choice;
- asserts resources/worldFacts/career state unchanged by the content reaction;
- rejects a second choice when no scene is active.

PASS as authored worker coverage.

Fresh-main execution still required.

## 6. Strict pack namespace

Expected:
- pack ID: forest-result-content-v1
- event IDs: forest-result-content-v1.*
- media IDs: forest-result-content-v1.*

Current worker pack follows that rule.

No event/media ID uses:
- lumber-* pack namespace;
- School namespace;
- poverty namespace;
- Secret Debt namespace.

PASS.

## 7. Capability ownership

Current worker pack declares:
- read capability on Activity lumber.forest;
- no writes.

That is appropriate for a result reaction pack.

It must not declare write ownership for Lumber career state merely to present content.

PASS.

## 8. Presentation fallback

Current worker media:
- forest-result-content-v1.success
- forest-result-content-v1.escape
- forest-result-content-v1.failure

All resolve to existing:
assets/stage-forest.svg

The test verifies the asset exists and every variant media reference resolves.

PASS.

## 9. Current-main stale fixture issue

The worker test uses:
content/lumber-target-definitions.fixture.json

That old fixture still gives lumber.forest an entry condition:
worldFact lumber.capability.enter-old-boundary.

Current main has changed:
- lumber.forest entryConditions are now empty;
- forest.route.logging-road is naturally available;
- forest.route.old-boundary is gated by itemCapability enter_old_boundary.

Therefore the worker test’s ready() helper injects an obsolete entry fact.

This does not invalidate the pack’s exact result reactions.

It does mean the test must be adapted on a fresh current-main integration branch.

Required integration correction:
- use current production catalog/definitions;
- enter Forest naturally;
- use logging-road for representative success;
- test old-boundary gating separately only when relevant;
- do not preserve the stale entry worldFact as production truth.

Classification:
PACK_STATIC_REVIEW_PASS / TEST_CURRENT_MAIN_ADAPTATION_REQUIRED.

## 10. Failure-path test

Current worker failure test modifies Activity adapterConfig to force failure.

This is acceptable as a boundary accelerator for testing the exact failure result.

It must be labeled as test setup and must not be used as evidence for a naturally authored production failure challenge path.

Required classification:
ACCELERATOR_BOUNDARY_EVIDENCE.

## 11. Natural-path success and escape

On fresh main require:

Success:
normal start
-> enter lumber.forest
-> logging-road
-> normal advance sequence
-> exact lumber.forest.success
-> forest-result-content-v1.success

Escape:
normal start
-> enter lumber.forest
-> escape
-> exact lumber.forest.escape
-> forest-result-content-v1.escape

No injected Old Boundary fact/capability is needed for these representative paths.

## 12. Localization parity

Current worker pack was authored as English-only player-facing content.

Current Product rule now requires:
- Russian source authoring;
- full English second locale;
- one gameplay/event identity across both languages;
- locale changes text/presentation only.

Before production integration:
- migrate/review result title/text/choice labels as RU + EN;
- do not duplicate gameplay events for English;
- keep the same three event IDs and mechanics.

Because the pack predates this rule, do not blindly rewrite worker history; perform localization during fresh-main selective integration.

Classification:
LOCALIZATION_MIGRATION_REQUIRED.

## 13. Fresh-main CI gate

Lead integration branch must run:
- content validation;
- forest-result-content-v1 targeted test adapted to current main;
- existing Forest/Activity tests;
- Lumber cross-system tests;
- full npm run check;
- exact-head GitHub Actions.

After merge:
- main push CI.

Do not use worker branch age/static review as CI evidence.

## 14. Integration disposition

Production pack:
SELECTIVE_COPY_READY_WITH_LOCALIZATION.

Test:
REAUTHOR_OR_ADAPT_ON_CURRENT_MAIN.

Whole worker branch:
DO_NOT_MERGE_WHOLESALE.

Required blockers before merge:
1. adapt stale Forest entry assumptions;
2. add RU + EN player-facing text with one semantic/event identity;
3. exact-head current-main CI green.

## Final checklist

- exact activityResult success: PASS
- exact activityResult escape: PASS
- exact activityResult failure: PASS
- identities distinct: PASS
- result reaction effect-free: PASS
- no Lumber Hard Work dependency: PASS
- reload/idempotency authored coverage: PASS
- strict pack namespace: PASS
- fallback asset: PASS
- current-main test assumptions: NEED ADAPTATION
- RU+EN production text: NEED MIGRATION
- fresh-main exact-head CI: REQUIRED

No production runtime/UI/content file was modified by Chat 4.
