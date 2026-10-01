# Chat 1 Developer — queue v7 current-main integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-61..C1D-72
Fresh baseline: `a341303183dc277a26b3e64a61d8ed8e35c5d05f`
Branch: `chat1/c1d-v7-final-current-main`

## C1D-61 — post-v6 integration inventory

Current main at queue start already contains the QA-accepted worker waves used by v7:
- PR #125 / C4-91 PASS — presentation production-binding preparation/current active coverage;
- PR #126 / C4-92 PASS-WITH-NOTES — Forest + ordinary-poverty consumer-ready handoffs;
- PR #127 / C4-93 PASS-WITH-NOTES — School generic/Night-study content preparation.

Chat 1 queue-v6 candidate remains separate and frozen:
- PR #124 exact head `63efb509e4776264af41af72d5ff41d7df8e3bc6`;
- repository CI #394 green, 537/537 tests;
- not merged into current main at queue-v7 start;
- its Forest/poverty selector scope is not duplicated on this branch.

## C1D-62 — central availability-reason helper

`actionAvailability()` now derives one result from the existing action contract and current Save:
- authored-condition misses;
- unconfigured late-career contract (empty conditions for non-starter careers);
- run/creation/arrival/scene/Night/Activity flow state;
- money and Energy availability.

`actionAvailable()` remains the narrow semantic eligibility predicate used by existing callers. No threshold or redundant unlock state is added.

The generic action command path now consumes the same availability result for semantic eligibility, arrival, money and Energy gates.

## C1D-63 — Work-panel locked-career reason consumer

Work UI now consumes `actionAvailability()` instead of recomputing action eligibility/resources separately.

Player-facing help is derived from:
- exact authored missing conditions when present;
- the existing generic late-career message when a non-starter career still has no authored conditions;
- current money/Energy and flow blockers.

All new generic blocker strings are RU/EN localized. Starter-trio behavior remains unchanged and no late-career threshold is selected.

## C1D-64 — derived availability Save/reload regression

`tests/action-availability-v7.test.ts` proves:
- semantic eligibility remains separate from temporary Energy/resource blockers;
- unconfigured late-career and authored-condition blockers remain distinct;
- a test-only authored world-fact condition unlocks through the existing evaluator;
- locked/unlocked availability is re-derived after `parseSave()` round trips;
- no authoritative `jobUnlocked` field is introduced.

## C1D-65 — generic School after-lesson reactive audit

Current main already has exactly two production consumers of generic `actionCompleted: school`:
- `school-lesson-content-v1.after-school`;
- `school-life-content-v1.after-paid-lesson`.

The merged PR #127 audit confirms this seam is course/teacher agnostic and explicitly unsafe for exact-course inference. Stat deltas are not used as identity.

## C1D-66 — generic School after-lesson consumer

Disposition: CURRENT-MAIN NO-OP.

A third generic after-School consumer would duplicate the two existing production consumers. No additional generic event/publisher is created.

## C1D-67 — exact Night-study reaction consumer

Merged PR #127 supplies 24 QA-accepted exact-choice Night-study text pairs keyed to current `school.night_study.<course>.<stat>` IDs.

Integration uses only existing state already present while the current generic after-Night-study scene is pending:
- `run.flow.night.selectedNightChoiceId`;
- existing pending event `school-life-content-v1.after-night-study`.

`src/ui/schoolNightStudyReactive.ts` maps the 24 exact current choice IDs to accepted title/body keys. The existing `school-life-content-v1.after-night-study` event is switched from non-blocking optional delivery to the existing blocking/live Night intercept path so its already-authored `nightChoiceCompleted` triggers become player-facing before NightFlow resumes. The UI selects exact text from `selectedNightChoiceId`, falling back to the event's generic text when no exact mapping is present.

Promoted root localization: exactly 48 RU/EN keys (24 titles + 24 bodies). No new event, ReactionFact, NightFlow field, curriculum, threshold, relationship state or School progression write.

`tests/ui.test.ts` now verifies exact EN/RU reactive text for Literacy & Numbers / Reason while locale switching leaves the pending Save unchanged.

## C1D-68 — prepared presentation override integration audit

PR #125 / C4-91 reports all 47 selected semantic presentation slots already active on current main: 9 endings, 10 Forest, 20 ordinary-poverty and 8 School-course bindings. Prepared-only selected bindings remaining: zero.

## C1D-69 — approved presentation override activation

Disposition: CURRENT-MAIN NO-OP.

No presentation-registry activation is required. This branch does not edit media sources or presentation semantic bindings.

## C1D-70 — Forest exact-route/result consumer audit

PR #126 confirms the current route/result identities are safe consumer seams but leaves the v2 prose preparation-only because shared selector integration belongs to Chat 1.

The already-frozen PR #124 owns that pending Forest selector/consumer scope. Queue v7 does not duplicate or move the frozen candidate.

## C1D-71 — ordinary-poverty exact-event/variant consumer audit

PR #126 confirms housing/small-job/contact-recovery handoff identities and effect snapshots remain independent from Secret Debt.

The already-frozen PR #124 owns the pending ordinary-poverty selector scope. Queue v7 does not duplicate it or consume small-job text without an exact persisted variant seam.

## C1D-72 — candidate gate

Candidate scope is limited to:
- central derived action availability result and command/UI consumption;
- RU/EN blocker messages;
- exact-choice Night-study presentation consumer and 48 accepted text keys;
- focused availability/Night-study parity regressions;
- this integration ledger.

Explicit non-goals:
- no career thresholds;
- no `jobUnlocked`/parallel unlock state;
- no new School generic event or producer fact;
- no new NightFlow/Save field; the existing after-Night-study event uses the existing blocking/live intercept contract;
- no Forest/poverty selector duplication from frozen PR #124;
- no media-source edits;
- no ending-rule changes.

Freeze only after exact-head full repository CI is green.
