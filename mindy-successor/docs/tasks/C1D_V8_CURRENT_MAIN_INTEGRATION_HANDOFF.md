# Chat 1 Developer — queue v8 current-main integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-73..C1D-84
Fresh baseline: `a341303183dc277a26b3e64a61d8ed8e35c5d05f`
Branch: `chat1/c1d-v8-final-current-main`

## C1D-73 — post-v7 integration inventory

Current main does not yet contain the two frozen Chat 1 candidates that own pending runtime/UI integration:
- PR #124 / C1D-60 exact frozen head `63efb509e4776264af41af72d5ff41d7df8e3bc6`; C4-79 PASS-WITH-NOTES, C4-86 PASS, C4-87 PASS-WITH-NOTES and C4-108 PASS; still open/unmerged at this queue boundary.
- PR #139 / C1D-72 exact frozen head `2e8075aa50ec6b038597bc28efecf8a832b67209`; exact CI #408 green; candidate-only at this queue boundary.

Current main therefore still uses:
- the merged starter-trio `actionAvailable()` contract and current Work help from PR #97/#116;
- generic School reaction routing with no exact paid-course reaction fact;
- worker-prepared exact Night-study content from merged PR #127, but no Chat 1 exact Night-study runtime/UI consumer;
- current Forest/poverty production identities without the PR #124 depth selectors.

Queue v8 must not duplicate candidate-only work while those exact heads remain frozen.

## C1D-74 — availability reason localization consistency

Audit result: no new current-main repair is made.

Current main already has:
- bilingual `ui.work.lockedCareerHelp` and `ui.work.lockedCareerAria` for the unconfigured seven late careers;
- exact authored condition rendering through the existing `explain()` path;
- existing command errors that remain engine-owned.

PR #139 owns the pending central availability-result/localized-resource-reason change. Re-implementing it on this current-main branch would create two active copies of the same shared seam. No threshold or second eligibility system is added.

## C1D-75 — command/UI availability parity regression v2

Added `tests/command-ui-availability-parity-v8.test.ts`.

On one `started()` Save it checks all ten ordinary careers:
- Work button enabled/disabled state equals the existing current-main `actionAvailable()` result;
- the three starters are available through both UI and command execution;
- all seven late careers remain unavailable and command dispatch rejects them with the existing condition gate;
- no product threshold is selected.

## C1D-76 — School generic/Night-study Save-locale stability

Generic after-School behavior is already covered by current production tests and remains on current main.

Exact Night-study player-facing consumption is not yet a current-main surface: it belongs to frozen PR #139. Queue v8 does not duplicate or move that frozen head. Full exact Night-study Save/locale verification is therefore dependency-gated on PR #139 QA/merge; its exact-head #408 already proves its own candidate behavior.

## C1D-77 — paid-course identity boundary regression

Added `tests/school-paid-course-boundary-v8.test.ts`.

The regression executes real Literacy & Numbers and Arcana paid lessons through the existing School adapter and proves:
- exact course identity remains in the direct return object and existing `lastAction.presentationId`;
- generic School reactions still emit `actionCompleted: school` rather than course/teacher identity;
- overlapping `reason` stat-change facts occur for both courses and are not treated as exact-course identity;
- no teacher fact or `lumber.school.management-ready` publisher appears.

## C1D-78 — Forest depth selector stability

Current main still has no Chat 1 Forest depth selector. The accepted selector is frozen on PR #124 and has already passed C4-86 using only current route ID + season + Activity steps and current result-event ID + event-history count.

Disposition: no duplicate selector/test copy on queue v8. Re-verify after PR #124 merge if Lead advances a later queue.

## C1D-79 — ordinary-poverty depth effect invariance

Merged Chat 3 parity already verifies exact current event/variant/choice identities and current effect snapshots. Frozen PR #124 additionally passed C4-87 for presentation-only selected depth with Secret Debt separation.

Disposition: no duplicate selector or effect rewrite on this branch. Small-job depth remains unconsumed until an exact safe persisted identity seam exists.

## C1D-80 — active presentation binding integration audit

Merged PR #125 / C4-91 reports all selected production bindings already active:
- 9 ending slots;
- 10 Forest bindings;
- 20 ordinary-poverty bindings;
- 8 School-course bindings.

Prepared-only selected bindings remaining: zero. No shared runtime/UI integration gap requires a presentation-registry edit here. Media sources remain Chat 2 ownership.

## C1D-81 — ending presentation-state consumer audit

Added `tests/ending-presentation-state-v8.test.ts`.

It proves:
- every current ending maps through `presentationIdForEnding()` to a live presentation slot;
- Lumber Hard Work uses one stable semantic presentation identity while eligibility is active, after explicit commit, and after RunResult completion;
- no eligibility, commitment or reward rule is changed.

## C1D-82 — cross-domain current-main smoke regression v2

Added `tests/cross-domain-current-main-smoke-v8.test.ts`.

One current-main Save covers:
- starter/late ordinary-career availability contract;
- a real paid Rhetoric & Social School lesson with exact current presentation identity and no Lumber management publisher;
- Save/reload;
- real Forest entry + Logging Road route identity and active presentation binding;
- ordinary-poverty independence from Secret Debt/debt writes;
- all current ending presentation slots.

## C1D-83 — stale integration artifact audit

Current-main Chat 1 handoff docs v3/v4/v5 still reported `Status: WORKING` even though those queues are historical completed evidence and the current pointer has advanced through v8.

Only the status line on those three Chat 1-owned docs is updated to `HISTORICAL`, pointing readers to `CURRENT_CHAT1_DEVELOPER_TASK_POINTER.md`. No historical task claims, worker handoffs or technical evidence are rewritten.

No v6/v7 candidate handoff is copied into current main because PR #124/#139 remain separate frozen candidates.

## C1D-84 — candidate gate

Candidate scope is intentionally regression/documentation-only on current main:
- command/UI ordinary-career availability parity v2;
- paid-course identity boundary;
- ending presentation-state audit;
- cross-domain current-main smoke v2;
- stale Chat 1 handoff status cleanup;
- this task ledger.

Explicit unresolved/deferred integration:
- PR #139 central availability/localized-resource reasons and exact Night-study consumer remain candidate-only until QA/merge;
- PR #124 Forest/ordinary-poverty depth selectors and paid-course direct presentation consumer remain accepted candidate-only until merge;
- natural School→Lumber management publisher is still unresolved;
- late-career unlock thresholds and intermediate Lumber progression remain unresolved;
- Secret Debt Product values remain unresolved.

No threshold, new Save field, NightFlow field, School producer, media source, Forest mechanic, poverty effect, or ending rule is added by queue v8.

Freeze only after exact-head full repository CI is green.
