# Ordinary Poverty Pack Review v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed branch: chat3/lumber-production-proof-next
Reviewed scope: Chat3 items 87-104

## Disposition

SELECTIVE_INTEGRATION_READY, subject to fresh-main exact-head CI.

Do not merge the worker branch wholesale.

Current divergence against main:
- status: diverged
- ahead: 155 commits
- behind: 80 commits
- merge base: 88a0f7526bc43493d2415a0e7859296408e7b564

The poverty files should be recreated or selectively copied onto a fresh Lead branch from current main.

## Production pack set

Reviewed six proposed ordinary-poverty packs:
- poverty-street-production.json
- poverty-street-production-v2.json
- poverty-cheap-production.json
- poverty-cheap-production-v2.json
- poverty-recovery-production.json
- poverty-pressure-production.json

A proposed inclusion manifest explicitly lists only those six packs and excludes Secret Debt content.

## Production schema validity

Static review against current main confirms the packs use currently supported contracts:
- housingTier
- calendarSeason
- calendarDayInYear
- nightPhase after_lodging
- normal_progression priority
- modifyResource
- addItem
- addNextDayModifier
- declared capability reads/writes
- free/safe exit requirement

No new engine/schema primitive is required by the reviewed ordinary-poverty bundle.

Official current-main validation still must run after selective copy.

## Natural-path reachability

Tests use normal production flow:
EndDay -> chooseLodging(street or cheap) -> Resolver pending event.

They do not inject pending event state as proof of reachability.

Street, cheap-lodging, recovery and pressure tests all assert production housing conditions and NightFlow position.

Result:
NATURAL_PATH_CONTRACT_PRESENT.

Runtime execution on current main:
PENDING FRESH-MAIN CI.

## Content diversity

The reviewed packs provide:
- helpful ordinary street events;
- neutral/context events;
- bad-pressure events with a safe/free exit;
- cheap-lodging context distinct from normal/street;
- recovery/help events;
- seasonal/context variants.

The presentation inventory records:
- 6 packs;
- 14 event identities;
- 20 event variants.

This is real authored content depth, not only a lodging primitive.

## Initial tuning boundary

Worker docs consistently classify current:
- money deltas;
- next-day pressure;
- cooldowns;
- maxShows;
- priorities;
- seasonal placements;
- deterministic occurrence windows

as INITIAL_TUNING rather than Product locks.

Tests prefer direction/structure assertions rather than exact tuning numbers.

PASS.

## Anti-softlock

The authored anti-softlock regression:
- starts from zero money;
- naturally enters street lodging;
- resolves the worst available ordinary pressure outcome;
- advances to the next day;
- requires at least one executable starter job;
- does not require Secret Debt.

Pressure events retain a safe/free resolution.

PASS as authored contract.
Fresh-main execution still required.

## Reload and idempotency

Authored tests cover:
- pending event/variant persistence;
- RNG/pending identity stability;
- effect commits once;
- next-day modifier applies once;
- calendar advances once;
- event history/cooldown persists;
- cheap-lodging pending state survives reload.

PASS as authored coverage.
Fresh-main execution still required.

## Secret Debt boundary

Reviewed packs/tests do not add:
- lender events;
- debt activation;
- bound-career gating;
- forced debt Night;
- debt outcomes;
- debt Meta rewards.

Namespaces and tests explicitly exclude Secret Debt semantics.

PASS.

## Presentation

Current events use shipped fallback surfaces:
- street -> stage.outside
- cheap lodging -> stage.room

The presentation draft introduces no invented GIF path.
Mechanics do not depend on media.

PASS.

## Worker validation evidence

Worker acceptance document correctly states:
- structural audit: PASS;
- npm run validate: NOT EXECUTED;
- targeted runtime tests: NOT EXECUTED;
- npm run check: NOT EXECUTED;
- GitHub Actions: none on the worker evidence head.

No false CI-green claim was found.

PASS.

## Selective integration bundle

Production packs:
- six reviewed poverty packs listed above.

Tests:
- poverty-street-production.test.ts
- poverty-street-reload.test.ts
- poverty-street-seasonal.test.ts
- poverty-street-content-anti-softlock.test.ts
- poverty-cheap-production.test.ts
- poverty-street-production-v2.test.ts
- poverty-cheap-production-v2.test.ts
- poverty-recovery-production.test.ts
- poverty-pressure-production.test.ts
- poverty-long-run-distribution.test.ts
- poverty-production-integration-bundle.test.ts

Support:
- poverty-production-inclusion-v1.fixture.json
- ordinary-poverty-v1 presentation draft
- initial-tuning ledger
- presentation identity inventory
- worker acceptance/handoff evidence

## Required fresh-main gate

After selective copy:
1. run current content validation;
2. run all poverty targeted tests;
3. retain PR33 anti-softlock regression;
4. run full npm run check;
5. require exact-head GitHub Actions;
6. inspect namespaces against current main;
7. preserve Lumber Hard Work and Forest continuation invariants.

## Final classification

- production schema shape: REVIEW PASS
- natural-path design: PASS
- content diversity: PASS
- tuning labeling: PASS
- anti-softlock contract: PASS
- reload/idempotency coverage: PASS
- Secret Debt separation: PASS
- whole-branch merge: BLOCKED
- selective copy: READY
- current-main executable green: NOT YET PROVEN

No production runtime/UI/content file was modified by Chat 4.
