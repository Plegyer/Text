# Product Acceptance No-False-Green Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: PR20 merged; PR21 latest shipped gate evidence reviewed

## Purpose

Prevent fixture accelerators, direct state mutation and synthetic integration helpers from being reported as full Product Acceptance passes.

This audit reviews the current PA/worker evidence patterns most likely to create a false green.

Classification:

- **LEGITIMATE_ACCELERATOR** — compresses repetition or opens a lower-level boundary while the real command under test still executes; may support accelerator-only evidence.
- **NON_PASSING_FIXTURE_EVIDENCE** — useful architecture/integration proof, but cannot promote the corresponding Product Acceptance row.
- **INVALID_AS_PRODUCT_PASS** — if used to claim a shipped row passed, the evidence would be false.
- **SAFE_ASSERTION_ONLY** — direct state inspection/setup is not itself a claim of natural reachability.

---

# 1. Direct Forest capability worldFact injection

## Locations reviewed

PR21 shipped evidence:

`tests/product-acceptance-shipped-v1.test.ts`

uses:

```ts
s.run.progression.worldFacts.push(
  'lumber.capability.enter-old-boundary'
);
```

Chat 4 regression subset uses the merged fixture adapter to apply the same fact.

Main/Chat 3 isolated Lumber tests use:

`grantOldBoundaryTokenCapability(...)`

which converts the fixture capability into:

`addWorldFact('lumber.capability.enter-old-boundary')`.

## Classification

**LEGITIMATE_ACCELERATOR** for:

- Activity entry cost;
- Activity save/reload;
- success/escape;
- result -> Resolver;
- Lumber continuation.

**INVALID_AS_PRODUCT_PASS** for:

- PA09 meaningful item acquisition;
- PA17 item changes Activity action space.

## Required reporting rule

Any test using direct capability fact injection must label downstream rows:

`ACCELERATOR_EVIDENCE_ONLY`

unless a separate normal production test proves real item acquisition/capability.

PR21 follows this rule correctly.

---

# 2. `old_boundary_token` fixture capability

## Location

`content/lumber-item-capabilities.fixture.json`

and tests including:

- main `lumber-target-cross-system.test.ts`;
- Chat 3 `lumber-forest-acceptance-depth.test.ts`;
- Chat 3 `lumber-item-capability-integration-audit.test.ts`;
- Chat 4 regression subset.

The fixture itself identifies the boundary as:

`TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA`.

## Classification

**NON_PASSING_FIXTURE_EVIDENCE.**

It locks:

- item identity `old_boundary_token`;
- capability identity `enter_old_boundary`;
- temporary worldFact adapter.

It does not prove:

- inventory schema integration;
- acquisition source;
- retain/consume semantics;
- player-facing capability explanation;
- item-dependent Activity action.

## Required reporting rule

The fixture may support A5/Activity regression.

It cannot close PA09 or PA17.

---

# 3. Direct Lumber counter mutation to 49

## Locations

PR21 shipped evidence prepares:

```ts
counters:{completed_shifts:49}
```

before one real `lumber.shift`.

Chat 4 regression subset directly sets:

```ts
completed_shifts=49
```

Chat 3 ending-independence tests construct exact threshold states.

## Classification

**LEGITIMATE_ACCELERATOR** for the 49/50 threshold.

Reason:

- the locked rule under test is exactly 50 completed shifts;
- the test still executes the real 50th `lumber.shift`;
- eligibility is computed by the real engine;
- no ending eligibility or reward is directly inserted.

This is repetition compression, not fabrication of the condition under test.

## What it does not prove

It does not prove a player manually completed 49 earlier shifts in that same test.

Do not describe the test as a full 50-shift user journey.

---

# 4. Direct Lumber career/fact pre-state for complex ending

## PR21 pattern

The PA21+ setup creates a validated Lumber career state containing:

- stage `accepted-hand`;
- `completed_shifts=49`;
- facts:
  - `forest-truth-known`;
  - `forest-problem-resolved`.

It then performs the real 50th shift and lets ending registration calculate eligibility.

## Classification

**LEGITIMATE_ACCELERATOR** for ending coexistence/commit/completion mechanics.

**NON_PASSING_FIXTURE_EVIDENCE** for the natural complex Forest route.

The same PR21 suite separately proves the real Forest continuation can create those facts after the capability accelerator, which makes the ending setup traceable but still not naturally player-reachable.

## Required reporting rule

PA21–PA26 remain accelerator evidence until the real item/capability and Forest authoring blockers are closed.

---

# 5. Direct ending eligibility/pre-result state

## Critical reviewed tests

No critical PR21 shipped test directly inserts:

- `ending.lumber.hard-work` into `run.endings.eligible`;
- committed Hard Work state to skip `commitEnding`;
- RunResult to skip `completeEnding`;
- `hardWork:lumber` into Meta to claim completion.

The PR21 threshold setup calls a real shift and lets normal registration produce eligibility.

Then it calls real:

- `commitEnding`;
- `completeEnding`;
- `newLife`.

## Classification

**SAFE / NO FALSE GREEN FOUND** in the reviewed PR21 ending sequence.

Any future test that directly inserts eligible/committed/result state may still be useful for narrow parser tests, but it must not be counted as PA21–PA26 end-to-end evidence.

---

# 6. Synthetic School action `school.lumber-management`

## Location

Isolated:

`content/lumber-target-definitions.fixture.json`

and main/worker fixture tests such as:

`lumber-target-cross-system.test.ts`

dispatch:

```ts
{type:'action',id:'school.lumber-management'}
```

to prove a School-result-like world fact can trigger Lumber continuation.

Production explicitly excludes this action.

PR21 asserts:

```ts
catalog.definitions.actions.some(
  action=>action.id==='school.lumber-management'
) === false
```

## Classification

**NON_PASSING_FIXTURE_EVIDENCE** for the cross-system resolver architecture.

**INVALID_AS_PRODUCT_PASS** for PA07 or PA08.

## Required reporting rule

The synthetic action must never be used to claim that the eight-course first-class School system emits the management/accounting public result.

PR21 correctly keeps PA07/PA08 OPEN.

---

# 7. Direct School management worldFact insertion

## Reviewed PR21 evidence

PR21 does **not** directly insert:

`lumber.school.management-ready`.

Instead, after a real paid Arcana lesson it asserts the fact remains absent.

## Classification

**SAFE / NO FALSE GREEN FOUND.**

Any future test that directly inserts that fact may be used to test the Lumber listener in isolation, but is:

**INVALID_AS_PRODUCT_PASS** for PA07/PA08.

The natural closure requires the authoritative School progression/milestone provider.

---

# 8. Product Acceptance harness accelerator hooks

The harness interface defines optional:

- `reachMilestone`;
- `reachTwoEndings`.

Its own comment states these hooks may place a validated generated fixture immediately before repetition-heavy thresholds and must not bypass the command under test.

## Classification

**LEGITIMATE_ACCELERATOR CONTRACT** only when:

- the accelerated threshold is explicitly named;
- the command that crosses/resolves the boundary still executes;
- no open authoring requirement is fabricated.

The presence of the hook itself proves nothing.

A row becomes evidence only when a concrete runner uses it and labels the result honestly.

---

# 9. Direct Activity internal state setup

Activity/Forest worker tests may construct an active envelope or use fixture capability to enter it.

## Classification

For parser/adapter tests:

**LEGITIMATE_ACCELERATOR / SAFE FIXTURE SETUP.**

For PA14–PA20 product reachability:

**NON_PASSING_FIXTURE_EVIDENCE** unless normal production entry prerequisites were reached.

An active-envelope parser test proves save compatibility, not item acquisition.

---

# 10. Direct Night phase setup

Low-level NightFlow tests may construct a Night state at a specific phase to test:

- lodging payment;
- reload;
- next-day modifiers;
- invalid persisted combinations.

## Classification

**SAFE FIXTURE SETUP** for Night state-machine/save tests.

It cannot replace the shipped PR21 flow for PA10–PA13.

PR21 already provides real production command evidence for those rows, so low-level Night fixtures are supporting regression only.

---

# 11. Direct creation/arrival ready-state helpers

Tests commonly use helpers such as:

`started()`

or manually set:

- creation complete;
- `story.arrived=true`.

## Classification

**LEGITIMATE PRECONDITION ACCELERATOR** for testing post-arrival subsystems.

It does not prove PA00/PA01 by itself.

PA00/PA01 rely on separate core/UI coverage.

Tests must not describe a started helper as end-to-end character creation evidence.

---

# 12. Direct money/Energy/stat setup

Tests set resource/stat values to establish sufficient/insufficient preconditions.

## Classification

**SAFE ASSERTION/PRECONDITION SETUP** when the command under test still performs the actual charge/effect.

Examples:

- setting money just below tuition to prove atomic rejection;
- setting Energy to exactly the required boundary;
- snapshotting stats before paid School.

It becomes false-green evidence only if the test directly writes the post-command value and then claims the transaction executed.

No such pattern was found in the reviewed PR21 shipped test.

---

# 13. Chat 3 ending independence pre-states

`lumber-ending-independence.test.ts` deliberately constructs exact ending-family states to prove:

- Hard Work independent at 49/50;
- Forewoman independent;
- Forest independent;
- no reward cross-contamination;
- completion idempotency.

## Classification

**LEGITIMATE_ACCELERATOR** for condition independence and transaction mechanics.

**NON_PASSING_FIXTURE_EVIDENCE** for natural route completion.

This test remains valuable after PR21 because its purpose is independence, not product reachability.

---

# 14. Chat 3 Forest depth tests

These tests use the temporary capability adapter to exercise:

- Activity cost;
- checkpoint reload;
- deterministic success;
- escape/failure;
- result idempotency;
- Forest ending.

## Classification

**LEGITIMATE_ACCELERATOR** for A5/Forest runtime mechanics.

**NON_PASSING_FIXTURE_EVIDENCE** for:

- PA09;
- PA16 authored 3×3 depth;
- PA17 item-dependent action.

The test name “acceptance depth” must not be interpreted as proof that the missing authored 3-route/3-challenge content exists; the assertions themselves correctly expose current adapter limits.

---

# 15. Static fixture equality / manifest tests

Examples include:

- activation manifests;
- semantic-ID registries;
- exact Hard Work definition equality;
- item-capability audit manifests.

## Classification

**SAFE CONTRACT EVIDENCE**, not execution evidence.

They can protect stable IDs/rules.

They cannot turn a non-reachable product flow green.

---

# False-green decision table

| Evidence pattern | Valid use | Must never prove |
|---|---|---|
| capability worldFact injection | Activity/A5 mechanics | PA09, PA17, natural PA14 |
| `old_boundary_token` test adapter | locked identity + lower-level Activity | shipped inventory/capability |
| direct `completed_shifts=49` | 49/50 boundary compression | full 50-shift user journey |
| direct Forest ending facts | coexistence/ending mechanics | natural complex route |
| synthetic `school.lumber-management` | resolver cross-system fixture | PA07/PA08 |
| direct management worldFact | Lumber listener isolation only | School milestone/public result |
| active Activity envelope construction | parser/reload mechanics | legitimate entry |
| Night phase construction | Night state machine | shipped Night route |
| started/post-arrival helper | subsystem precondition | creation/arrival flow |
| exact definition/manifest assertion | contract lock | gameplay reachability |

---

# Current PR21 no-false-green disposition

PR21 is honest on the critical boundaries:

- capability injection is labeled accelerator;
- natural Forest entry failure is asserted first;
- PA09/PA17 remain open;
- School management fact is not injected;
- PA07/PA08 remain open;
- synthetic School action is asserted absent from production;
- 49-shift setup is labeled accelerator;
- real 50th shift executes;
- ending eligibility is engine-calculated;
- commitment/completion/newLife are real commands.

Therefore the PR21 classification:

- SHIPPED_PASS;
- ACCELERATOR_EVIDENCE_ONLY;
- OPEN_AUTHORING_BLOCKED

is materially supported by the tests and does not hide the main product gaps.

No production runtime/UI/content file was modified by Chat 4.
