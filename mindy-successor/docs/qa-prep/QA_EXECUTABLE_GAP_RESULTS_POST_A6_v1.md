# Post-A6 Executable QA Gap Results v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Base: `1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`  
Branch: `chat4/post-a6-gate`

## Added executable coverage

### `tests/qa-architecture-gaps.test.ts`

Adds direct acceptance proofs for:

- full simultaneously eligible `terminal -> forced -> critical_progression -> optional_world` class ordering;
- numeric priority ordering inside one class;
- least-recently-shown ordering beating lexical ID when earlier tie-breaks are equal;
- strict Effect-v2 rejection of a forged arbitrary save-path effect;
- direct loader rejection of a Resolver `activityResult` trigger referencing an unknown Activity result ID.

These assertions are aligned with direct current implementation evidence:

- `src/core/engine.ts:candidateSort` orders priority class, numeric priority, eligibleSince, history lastDay, then stable event ID;
- `src/core/schema.ts:effectSchema` is a strict discriminated union with no arbitrary-path effect kind;
- `src/core/content.ts:checkReactionTrigger` rejects an Activity result ID not declared by that Activity.

No core/runtime modification was made.

### `tests/qa-exactly-once-reload.test.ts`

Adds adversarial checkpoint coverage not isolated in one existing test before:

- paid Work cost + wage + Energy + action counter remain exactly once after save/reload;
- Activity success remains exactly once after reloading the already completed post-result state;
- one combined A6 path reloads at commitment, completion/reward and pre-New-Run boundaries, then verifies Meta proof survives New Run while Run domains reset.

The tests use synthetic QA definitions only and exercise the real parser and command pipeline.

### `tests/qa-orphan-stage-gate.test.ts`

This is intentionally isolated failing gate evidence.

The Architecture Migration Slice requires the catalog validator to reject an orphan/unreachable state-machine stage. Current `src/core/content.ts:validateMachine` checks:

- duplicate stages/transitions;
- initial stage existence;
- transition `from` stage existence;
- transition `to` stage existence;
- transition condition/effect validity;

but it performs no reachability traversal from `initialStage`.

The test defines `new -> ready` plus an unreferenced `orphan` stage and requires `loadCatalog` to reject it. Direct source inspection shows the current loader accepts this shape, so this test is expected to fail until runtime validation is fixed.

Per task instruction, Chat 4 did not modify the loader to make the test pass.

## Existing A5/A6 coverage re-used rather than duplicated

The current integrated tests already directly cover most requested A5/A6 adversarial cases:

- `tests/activity.test.ts`: one-time 2-Energy entry, internal resource separation, deterministic reload inside Activity, success/escape/failure distinction, result→Resolver, repeated result action blocked, version validation.
- `tests/ending-meta.test.ts`: eligibility/commit separation, no reward at commit, RunResult creation, reload before and after completion, unique reward idempotency, repeated ending across later run, New Run Meta preservation, transaction-proof merge.

The new reload test therefore targets the remaining combined checkpoint shapes rather than copying the same assertions.

## Gaps still not executable without a normative/API addition

### Known legacy flag -> typed fact migration

This is already a direct **FAILED** architecture requirement, not merely missing coverage. Current `migrateV3` creates empty target progression domains and copies old flags into `legacyCompat.flags`.

Chat 4 did not invent a target fact name or mapping table in a test. A correct executable migration test requires the Lead/product architecture to define the approved legacy-flag-to-typed-fact mapping.

### Migration alias collision

No migration-alias registry or content alias schema is exposed on the audited implementation. A collision test cannot be written against a nonexistent API without inventing implementation surface. This remains `NOT_COVERED`.

## Execution note

The connected GitHub repository exposes source and write operations but no repository-local runner in this chat environment. The private checkout is not mounted into the container, and the container has no network access for dependency installation. Therefore Chat 4 did not claim a fresh local `npm test` run.

The expected suite disposition from direct current source inspection is:

- the new priority/schema/Activity-result tests are consistent with implemented comparator/schema/loader behavior;
- the new exactly-once reload tests exercise already implemented A5/A6/atomic action paths;
- `qa-orphan-stage-gate.test.ts` is expected to fail against current `validateMachine`;
- consequently the branch should not be reported fully green until the Lead runs the suite and addresses or explicitly adjudicates the orphan-stage gate failure.

This execution limitation does not change the observed source-level failure: the validator currently contains no orphan-stage reachability check.
